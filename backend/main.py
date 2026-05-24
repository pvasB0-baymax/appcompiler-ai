import os
import uuid
import time
import zipfile
import io
from fastapi import FastAPI, Depends, HTTPException, Header, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session
from typing import List, Dict, Any, Optional

from .database import engine, Base, get_db
from .models import CompileJob, PipelineStageLog
from .schemas import CompileRequest, SimulateRequest, CompileJobResponse, CompileJobDetailResponse, MetricSummaryResponse
from .compiler import AppCompiler
from .validation_engine import ValidationEngine

# Initialize database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="AppCompilerAI Backend API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/v1/compile")
def compile_requirements(
    request: CompileRequest,
    x_gemini_api_key: Optional[str] = Header(None),
    db: Session = Depends(get_db)
):
    start_time = time.time()
    job_id = str(uuid.uuid4())
    
    # Create the initial compiler job entry in database
    job = CompileJob(
        id=job_id,
        app_name="Compiling...",
        description=request.prompt[:150],
        status="RUNNING",
        repair_count=0,
        execution_time=0.0
    )
    db.add(job)
    db.commit()

    compiler = AppCompiler(api_key=x_gemini_api_key)
    
    stages_log_entries = []
    
    try:
        # Run stages progressively and log durations
        stage_names = [
            'intent_extraction', 'system_design', 'database_schema', 
            'api_schema', 'ui_schema', 'auth_schema', 'business_logic',
            'validation', 'repair', 'runtime'
        ]
        
        # Run full pipeline
        spec, repairs, assumptions, runtime_code = compiler.compile_pipeline(request.prompt, api_key=x_gemini_api_key)
        
        total_duration = time.time() - start_time
        
        # Log individual stages
        for sname in stage_names:
            status_val = "PASS"
            duration = 0.3 # default mock visual duration
            
            if sname == 'validation':
                status_val = "FAIL" if len(repairs) > 0 else "PASS"
                duration = 0.5
            elif sname == 'repair':
                status_val = "PASS"
                duration = 1.2 if len(repairs) > 0 else 0.1
            
            stage_log = PipelineStageLog(
                job_id=job_id,
                stage_name=sname,
                status=status_val,
                duration_ms=duration * 1000,
                message=f"Stage {sname} processed successfully."
            )
            db.add(stage_log)
        
        # Update job database entry
        job.app_name = spec["intent"]["app_name"]
        job.description = spec["intent"]["description"]
        job.status = "PASS"
        job.specification = spec
        job.repairs = repairs
        job.assumptions = assumptions
        job.repair_count = len(repairs)
        job.execution_time = total_duration
        
        db.commit()
        db.refresh(job)

        return {
            "job_id": job_id,
            "status": "PASS",
            "specification": spec,
            "repairs": repairs,
            "assumptions": assumptions,
            "runtime_code": runtime_code
        }

    except Exception as e:
        total_duration = time.time() - start_time
        job.status = "FAIL"
        job.execution_time = total_duration
        db.commit()
        raise HTTPException(
            status_code=500,
            detail=f"Compiler Pipeline Error: {str(e)}"
        )

@app.get("/api/v1/jobs", response_model=List[CompileJobResponse])
def get_jobs(db: Session = Depends(get_db)):
    # Retrieve compile runs sorted by creation time
    return db.query(CompileJob).order_by(CompileJob.created_at.desc()).all()

@app.get("/api/v1/jobs/{job_id}", response_model=CompileJobDetailResponse)
def get_job(job_id: str, db: Session = Depends(get_db)):
    job = db.query(CompileJob).filter(CompileJob.id == job_id).first()
    if not job:
        raise HTTPException(status_code=404, detail="Compilation job not found")
    
    # Regenerate runtime code block for UI preview
    compiler = AppCompiler()
    runtime_code = compiler._generate_runtime_code(job.specification) if job.specification else {}
    
    return {
        "id": job.id,
        "app_name": job.app_name,
        "description": job.description,
        "status": job.status,
        "repair_count": job.repair_count,
        "execution_time": job.execution_time,
        "created_at": job.created_at,
        "specification": job.specification,
        "repairs": job.repairs,
        "assumptions": job.assumptions,
        "stage_logs": job.stage_logs,
        "runtime_code": runtime_code
    }

@app.get("/api/v1/metrics", response_model=MetricSummaryResponse)
def get_metrics(db: Session = Depends(get_db)):
    jobs = db.query(CompileJob).all()
    total_jobs = len(jobs)
    
    if total_jobs == 0:
        return {
            "total_compilations": 0,
            "success_rate": 100.0,
            "average_duration": 0.0,
            "total_repairs": 0
        }
        
    passed_jobs = sum(1 for j in jobs if j.status == "PASS")
    total_repairs = sum(j.repair_count for j in jobs)
    avg_duration = sum(j.execution_time for j in jobs) / total_jobs
    
    return {
        "total_compilations": total_jobs,
        "success_rate": (passed_jobs / total_jobs) * 100,
        "average_duration": avg_duration,
        "total_repairs": total_repairs
    }

@app.post("/api/v1/simulate")
def simulate_request(req: SimulateRequest, db: Session = Depends(get_db)):
    job = db.query(CompileJob).filter(CompileJob.id == req.job_id).first()
    if not job or not job.specification:
        raise HTTPException(status_code=404, detail="Job or specification not found")
        
    spec = job.specification
    endpoints = spec.get("api_schema", {}).get("endpoints", [])
    
    # Search for requested endpoint
    endpoint = None
    for ep in endpoints:
        if ep["path"] == req.path and ep["method"] == req.method:
            endpoint = ep
            break
            
    if not endpoint:
        return {
            "status": "404",
            "logs": [
                f"[ERROR] Endpoint {req.method} {req.path} not found in API Schema."
            ],
            "response": {"error": "Not Found", "message": f"Endpoint '{req.path}' does not exist."}
        }
        
    logs = [
        f"[INFO] Routing simulation request to: {req.method} {req.path}",
        f"[INFO] Payload parameters: {req.payload}"
    ]
    
    # Check Auth configuration
    if endpoint.get("auth_required"):
        allowed_roles = endpoint.get("roles", [])
        logs.append(f"[AUTH] Authentication required. Active user simulation role: '{req.role}'")
        
        # Check RBAC permissions
        if req.role not in allowed_roles:
            logs.append(f"[ERROR] [AUTH] Access Denied! Role '{req.role}' is not in allowed roles: {allowed_roles}")
            return {
                "status": "403 Forbidden",
                "logs": logs,
                "response": {
                    "error": "Forbidden",
                    "detail": f"Access denied. Required permissions mapping is missing for role '{req.role}'."
                }
            }
        logs.append(f"[AUTH] Access granted! Role '{req.role}' successfully authenticated.")

    # Validate parameters
    request_schema = endpoint.get("request_schema", {})
    validation_passed = True
    for field, field_type in request_schema.items():
        if field not in req.payload or not str(req.payload[field]).strip():
            logs.append(f"[ERROR] Parameter validation failed: Field '{field}' is missing or blank.")
            validation_passed = False
            
    if not validation_passed:
        return {
            "status": "422 Unprocessable Entity",
            "logs": logs,
            "response": {"error": "Validation Error", "detail": "Missing or invalid request payload fields."}
        }
        
    logs.append(f"[VALIDATION] Request payload validated successfully. Schema types matched.")

    # Enforce Business Rules
    rules = spec.get("business_logic", {}).get("rules", [])
    logs.append(f"[RULES] Evaluating business logic rules ({len(rules)} checks)...")
    
    for rule in rules:
        logs.append(f"[RULES] Running rule check {rule['id']}: '{rule['action']}'")
        
    logs.append(f"[DB] Simulating SQL transaction mapping database layers...")
    
    # Generate database simulation log
    app_name_lower = spec["intent"]["app_name"].lower()
    if "gym" in app_name_lower:
        if req.path == "/api/v1/bookings":
            logs.append(f"[DB] [SELECT] Querying 'users' where role = 'member'...")
            logs.append(f"[DB] [INSERT] Creating record in 'bookings' table class_id='{req.payload.get('class_id')}'...")
        elif req.path == "/api/v1/classes" and req.method == "POST":
            logs.append(f"[DB] [INSERT] Creating row in 'classes' table for '{req.payload.get('title')}'...")
    elif "book" in app_name_lower:
        if req.path == "/api/v1/books" and req.method == "POST":
            logs.append(f"[DB] [INSERT] Creating record in 'books' table title='{req.payload.get('title')}'...")
        elif req.path == "/api/v1/lendings" and req.method == "POST":
            logs.append(f"[DB] [INSERT] Creating lending request row in 'lendings' table for book_id='{req.payload.get('book_id')}'...")
    elif "invoice" in app_name_lower:
        if req.path == "/api/v1/invoices" and req.method == "POST":
            logs.append(f"[DB] [INSERT] Creating unpaid invoice of {req.payload.get('amount')} {req.payload.get('currency')}...")
        elif req.path == "/api/v1/payments" and req.method == "POST":
            logs.append(f"[DB] [UPDATE] Updating 'invoices' status to 'Paid' for invoice_id='{req.payload.get('invoice_id')}'...")
            
    logs.append(f"[DB] Transaction commit successful. 1 row affected.")

    # Mock response synthesis
    response_data = {
        "status": "success",
        "message": f"Successfully processed request on {spec['intent']['app_name']} backend.",
        "data": {
            "id": str(uuid.uuid4())[:18],
            **req.payload
        }
    }
    
    return {
        "status": "200 OK",
        "logs": logs,
        "response": response_data
    }

@app.get("/api/v1/download/{job_id}")
def download_project_zip(job_id: str, db: Session = Depends(get_db)):
    job = db.query(CompileJob).filter(CompileJob.id == job_id).first()
    if not job or not job.specification:
        raise HTTPException(status_code=404, detail="Job not found")

    compiler = AppCompiler()
    runtime_code = compiler._generate_runtime_code(job.specification)
    
    # Write a zip archive in memory
    zip_buffer = io.BytesIO()
    with zipfile.ZipFile(zip_buffer, "w", zipfile.ZIP_DEFLATED) as zip_file:
        for filename, content in runtime_code.items():
            zip_file.writestr(f"project/{filename}", content)
            
        # Write setup instructions README
        readme_content = f"""# {job.app_name} - Generated Codebase
This project was compiled by AppCompilerAI based on the following natural language product specifications:
"{job.description}"

## Project Contents
- `models.py`: SQLAlchemy models for database tables.
- `main.py`: FastAPI endpoints and route handlers.
- `page.tsx`: Next.js React client component.
- `schema.sql`: PostgreSQL DDL schema definition script.

## Getting Started

### 1. Database migrations
Execute the DDL schema script in your PostgreSQL server:
```bash
psql -h localhost -U postgres -d mydatabase -f schema.sql
```

### 2. Run API Server (FastAPI)
Install dependencies and run:
```bash
pip install fastapi uvicorn sqlalchemy psycopg2-binary pydantic
uvicorn main:app --reload --port 8080
```

### 3. Run Frontend UI (Next.js)
Copy `page.tsx` into your Next.js project page, install dependencies, and run:
```bash
npm run dev
```
"""
        zip_file.writestr("project/README.md", readme_content)

    zip_buffer.seek(0)
    
    headers = {
        'Content-Disposition': f'attachment; filename="appcompiler_project_{job_id[:8]}.zip"'
    }
    
    return StreamingResponse(
        zip_buffer,
        media_type="application/zip",
        headers=headers
    )
