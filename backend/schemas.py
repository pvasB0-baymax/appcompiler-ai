from pydantic import BaseModel, Field
from typing import Dict, Any, List, Optional
from datetime import datetime

class CompileRequest(BaseModel):
    prompt: str = Field(..., description="The natural language product requirements")

class SimulateRequest(BaseModel):
    job_id: str
    path: str
    method: str
    role: str
    payload: Dict[str, Any] = Field(default_factory=dict)

class StageLogResponse(BaseModel):
    stage_name: str
    status: str
    duration_ms: float
    message: Optional[str] = None
    
    class Config:
        orm_mode = True

class CompileJobResponse(BaseModel):
    id: str
    app_name: str
    description: str
    status: str
    repair_count: int
    execution_time: float
    created_at: datetime

    class Config:
        orm_mode = True

class CompileJobDetailResponse(BaseModel):
    id: str
    app_name: str
    description: str
    status: str
    repair_count: int
    execution_time: float
    created_at: datetime
    specification: Optional[Dict[str, Any]] = None
    repairs: Optional[List[Dict[str, Any]]] = None
    assumptions: Optional[List[str]] = None
    stage_logs: List[StageLogResponse] = []
    runtime_code: Optional[Dict[str, str]] = None

    class Config:
        orm_mode = True

class MetricSummaryResponse(BaseModel):
    total_compilations: int
    success_rate: float
    average_duration: float
    total_repairs: int
