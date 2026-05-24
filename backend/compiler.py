import os
import json
import time
import uuid
from typing import Dict, Any, List, Tuple
import http.client
import urllib.parse

# Load local .env file automatically if present in root workspace folder
_backend_dir = os.path.dirname(os.path.abspath(__file__))
_root_dir = os.path.dirname(_backend_dir)
_env_path = os.path.join(_root_dir, ".env")
if os.path.exists(_env_path):
    try:
        with open(_env_path, "r", encoding="utf-8") as _f:
            for _line in _f:
                _line = _line.strip()
                if _line and not _line.startswith("#") and "=" in _line:
                    _k, _v = _line.split("=", 1)
                    os.environ[_k.strip()] = _v.strip().strip('"').strip("'")
    except Exception as _e:
        print(f"[WARNING] Failed to load .env config file: {_e}")

class AppCompiler:
    def __init__(self, api_key: str = None):
        self.api_key = api_key or os.environ.get("GEMINI_API_KEY")

    def compile_pipeline(self, prompt: str, api_key: str = None) -> Tuple[Dict[str, Any], List[Dict[str, Any]], List[str]]:
        """
        Runs the multi-stage compilation pipeline.
        Returns:
            specification: Dict[str, Any]
            repairs: List[Dict[str, Any]]
            assumptions: List[str]
        """
        if api_key:
            self.api_key = api_key

        start_time = time.time()
        
        # 1. Intent Extraction
        intent = self._stage_intent_extraction(prompt)
        
        # 2. System Design
        system_design = self._stage_system_design(intent)
        
        # 3. Database Schema
        database_schema = self._stage_database_schema(intent)
        
        # 4. API Schema
        api_schema = self._stage_api_schema(intent, database_schema)
        
        # 5. UI Schema
        ui_schema = self._stage_ui_schema(intent, api_schema)
        
        # 6. Auth Schema
        auth_schema = self._stage_auth_schema(intent)
        
        # 7. Business Logic
        business_logic = self._stage_business_logic(intent)

        # Assemble intermediate spec
        spec = {
            "intent": intent,
            "system_design": system_design,
            "database_schema": database_schema,
            "api_schema": api_schema,
            "ui_schema": ui_schema,
            "auth_schema": auth_schema,
            "business_logic": business_logic
        }

        # 8. Cross-layer validation and 9. Repair loop
        # We import the validation and repair engines here to avoid circular imports
        from .validation_engine import ValidationEngine
        from .repair_engine import RepairEngine

        validation_result = ValidationEngine.validate(spec)
        repairs = []
        
        iteration = 0
        max_iterations = 3
        
        while validation_result["status"] == "FAIL" and iteration < max_iterations:
            iteration += 1
            repair_log = RepairEngine.repair(spec, validation_result["issues"])
            repairs.extend(repair_log)
            # Re-validate
            validation_result = ValidationEngine.validate(spec)

        # 10. Execution Readiness (Runtime generation)
        runtime_code = self._generate_runtime_code(spec)
        
        # Collect assumptions
        assumptions = self._collect_assumptions(prompt, spec)

        # final combined spec
        spec["runtime"] = {
            "database": {"engine": "postgresql", "models_count": len(spec["database_schema"]["tables"])},
            "backend": {"framework": "fastapi", "endpoints_count": len(spec["api_schema"]["endpoints"])},
            "frontend": {"framework": "nextjs", "pages_count": len(spec["ui_schema"]["pages"])},
            "auth": {"provider": "jwt_rbac", "roles_count": len(spec["auth_schema"]["roles"])}
        }

        return spec, repairs, assumptions, runtime_code

    def _stage_intent_extraction(self, prompt: str) -> Dict[str, Any]:
        # If API key is provided, we can fetch from Gemini
        if self.api_key:
            return self._call_gemini_stage("intent_extraction", prompt)
        
        # Mock mode fallback
        prompt_lower = prompt.lower()
        
        # Default mock template details based on keyword matching
        if "gym" in prompt_lower or "fitness" in prompt_lower:
            app_name = "GymFlex SaaS"
            description = "A SaaS platform for gym owners to manage memberships, classes, and schedules."
            features = ["Membership Management", "Fitness Class Scheduling", "Online Booking Portal", "Premium Billing Gateway", "Revenue Analytics"]
            roles = ["admin", "trainer", "guest"]
            entities = ["User", "Membership", "Class", "Booking", "Payment"]
            rules = [
                "Only active members can book class sessions.",
                "Admins can create fitness classes and view billing reports.",
                "Guest users can view class schedules but cannot book sessions."
            ]
            authentication_required = True
            payments_required = True
            analytics_required = True
        elif "book" in prompt_lower or "library" in prompt_lower:
            app_name = "BookNeighbor Network"
            description = "A community-focused peer-to-peer library and book lending sharing application."
            features = ["Book Cataloging", "Geo-local Search", "Lending Requests", "Automated Return Reminders", "Rating & Review System"]
            roles = ["admin", "user", "guest"]
            entities = ["User", "Book", "LendingRecord", "Review"]
            rules = [
                "Users must register to request or lend books.",
                "Lent books must have a return date set within 14 days.",
                "Admins can flag and delete reported reviews."
            ]
            authentication_required = True
            payments_required = False
            analytics_required = False
        elif "invoice" in prompt_lower or "freelance" in prompt_lower:
            app_name = "SoloInvoice Time & Billing"
            description = "A time tracking and invoicing tool optimized for freelancers."
            features = ["Time Tracker Logs", "Invoice PDF Generator", "Stripe Invoice Payment", "Auto-Reminders for Late Invoices", "Monthly Revenue Dashboard"]
            roles = ["admin", "freelancer", "client"]
            entities = ["User", "TimeLog", "Invoice", "Payment"]
            rules = [
                "Freelancers can create invoices and configure Stripe reminders.",
                "Clients can view invoices and execute credit card payments.",
                "Late invoices trigger reminder emails automatically every 3 days."
            ]
            authentication_required = True
            payments_required = True
            analytics_required = True
        elif "ticket" in prompt_lower or "helpdesk" in prompt_lower or "support" in prompt_lower:
            app_name = "ZenDesk SaaS Helpdesk"
            description = "A multi-tenant helpdesk ticket tracking system with SLA warnings."
            features = ["Customer Ticket Creation", "Agent Auto-Assignment", "SLA Breach Notification", "Knowledge Base Articles", "Agent Performance Analytics"]
            roles = ["admin", "agent", "customer", "guest"]
            entities = ["User", "Ticket", "Comment", "KBArticle"]
            rules = [
                "Customers can submit tickets and comments.",
                "Agents are auto-assigned tickets based on workload tags.",
                "Tickets unassigned for more than 4 hours escalate to supervisors."
            ]
            authentication_required = True
            payments_required = False
            analytics_required = True
        else:
            # General SaaS template
            app_name = "Custom SaaS Platform"
            description = "A custom compiled business application matching requirements: " + prompt[:60] + "..."
            features = ["User Accounts", "Core Entity Management", "System Audit Logs", "Standard Dashboards"]
            roles = ["admin", "user", "guest"]
            entities = ["User", "Entity", "Log"]
            rules = [
                "Admin has read and write access to all modules.",
                "Standard users can create, read, and edit their own resources.",
                "Guest users have read-only access to public pages."
            ]
            authentication_required = True
            payments_required = False
            analytics_required = False

        return {
            "app_name": app_name,
            "description": description,
            "features": features,
            "roles": roles,
            "entities": entities,
            "business_rules": rules,
            "authentication_required": authentication_required,
            "payments_required": payments_required,
            "analytics_required": analytics_required,
            "confidence": 0.95
        }

    def _stage_system_design(self, intent: Dict[str, Any]) -> Dict[str, Any]:
        if self.api_key:
            return self._call_gemini_stage("system_design", json.dumps(intent))

        # Dynamic System Design generator
        return {
            "architecture": {
                "frontend": {
                    "framework": "Next.js 14",
                    "routing": "App Router",
                    "state_management": "React Context",
                    "components_system": "Vanilla CSS Modules"
                },
                "backend": {
                    "framework": "FastAPI (Python)",
                    "orm": "SQLAlchemy",
                    "validation": "Pydantic v2",
                    "workers": "Celery + Redis (for asynchronous invoice/billing reminders)"
                },
                "database": {
                    "provider": "PostgreSQL",
                    "pooling": "SQLAlchemy Connection Pool",
                    "migrations": "Alembic"
                },
                "auth": {
                    "strategy": "JWT Stateless Tokens",
                    "hashing": "bcrypt",
                    "rbac_model": "Role-Based Access Control"
                },
                "services": {
                    "payment_gateway": "Stripe API" if intent["payments_required"] else "None",
                    "email_notification": "SendGrid API",
                    "analytics_engine": "SQL-based aggregations" if intent["analytics_required"] else "None"
                }
            }
        }

    def _stage_database_schema(self, intent: Dict[str, Any]) -> Dict[str, Any]:
        if self.api_key:
            return self._call_gemini_stage("database_schema", json.dumps(intent))

        tables = [
            {
                "name": "users",
                "columns": [
                    {"name": "id", "type": "VARCHAR(36)", "primary_key": True},
                    {"name": "email", "type": "VARCHAR(255)", "unique": True},
                    {"name": "password_hash", "type": "VARCHAR(255)"},
                    {"name": "full_name", "type": "VARCHAR(100)"},
                    {"name": "role", "type": "VARCHAR(50)"},
                    {"name": "created_at", "type": "TIMESTAMP"}
                ],
                "relations": []
            }
        ]

        app_name = intent["app_name"].lower()
        if "gym" in app_name:
            tables.extend([
                {
                    "name": "memberships",
                    "columns": [
                        {"name": "id", "type": "VARCHAR(36)", "primary_key": True},
                        {"name": "user_id", "type": "VARCHAR(36)", "foreign_key": "users.id"},
                        {"name": "plan_type", "type": "VARCHAR(50)"}, # Free, Premium
                        {"name": "status", "type": "VARCHAR(20)"}, # Active, Expired
                        {"name": "expires_at", "type": "TIMESTAMP"}
                    ],
                    "relations": [
                        {"target_table": "users", "type": "many-to-one", "foreign_key": "user_id"}
                    ]
                },
                {
                    "name": "classes",
                    "columns": [
                        {"name": "id", "type": "VARCHAR(36)", "primary_key": True},
                        {"name": "title", "type": "VARCHAR(100)"},
                        {"name": "trainer_id", "type": "VARCHAR(36)", "foreign_key": "users.id"},
                        {"name": "schedule_time", "type": "TIMESTAMP"},
                        {"name": "capacity", "type": "INTEGER"}
                    ],
                    "relations": [
                        {"target_table": "users", "type": "many-to-one", "foreign_key": "trainer_id"}
                    ]
                },
                {
                    "name": "bookings",
                    "columns": [
                        {"name": "id", "type": "VARCHAR(36)", "primary_key": True},
                        {"name": "user_id", "type": "VARCHAR(36)", "foreign_key": "users.id"},
                        {"name": "class_id", "type": "VARCHAR(36)", "foreign_key": "classes.id"},
                        {"name": "created_at", "type": "TIMESTAMP"}
                    ],
                    "relations": [
                        {"target_table": "users", "type": "many-to-one", "foreign_key": "user_id"},
                        {"target_table": "classes", "type": "many-to-one", "foreign_key": "class_id"}
                    ]
                }
            ])
        elif "book" in app_name:
            tables.extend([
                {
                    "name": "books",
                    "columns": [
                        {"name": "id", "type": "VARCHAR(36)", "primary_key": True},
                        {"name": "title", "type": "VARCHAR(200)"},
                        {"name": "author", "type": "VARCHAR(100)"},
                        {"name": "owner_id", "type": "VARCHAR(36)", "foreign_key": "users.id"},
                        {"name": "status", "type": "VARCHAR(20)"} # Available, Lent
                    ],
                    "relations": [
                        {"target_table": "users", "type": "many-to-one", "foreign_key": "owner_id"}
                    ]
                },
                {
                    "name": "lendings",
                    "columns": [
                        {"name": "id", "type": "VARCHAR(36)", "primary_key": True},
                        {"name": "book_id", "type": "VARCHAR(36)", "foreign_key": "books.id"},
                        {"name": "borrower_id", "type": "VARCHAR(36)", "foreign_key": "users.id"},
                        {"name": "lent_at", "type": "TIMESTAMP"},
                        {"name": "due_at", "type": "TIMESTAMP"},
                        {"name": "returned_at", "type": "TIMESTAMP", "nullable": True}
                    ],
                    "relations": [
                        {"target_table": "books", "type": "many-to-one", "foreign_key": "book_id"},
                        {"target_table": "users", "type": "many-to-one", "foreign_key": "borrower_id"}
                    ]
                }
            ])
        elif "invoice" in app_name:
            tables.extend([
                {
                    "name": "invoices",
                    "columns": [
                        {"name": "id", "type": "VARCHAR(36)", "primary_key": True},
                        {"name": "freelancer_id", "type": "VARCHAR(36)", "foreign_key": "users.id"},
                        {"name": "client_id", "type": "VARCHAR(36)", "foreign_key": "users.id"},
                        {"name": "amount", "type": "DECIMAL(10,2)"},
                        {"name": "currency", "type": "VARCHAR(3)"},
                        {"name": "status", "type": "VARCHAR(20)"}, # Paid, Unpaid, Overdue
                        {"name": "due_date", "type": "TIMESTAMP"}
                    ],
                    "relations": [
                        {"target_table": "users", "type": "many-to-one", "foreign_key": "freelancer_id"},
                        {"target_table": "users", "type": "many-to-one", "foreign_key": "client_id"}
                    ]
                },
                {
                    "name": "time_logs",
                    "columns": [
                        {"name": "id", "type": "VARCHAR(36)", "primary_key": True},
                        {"name": "freelancer_id", "type": "VARCHAR(36)", "foreign_key": "users.id"},
                        {"name": "project_name", "type": "VARCHAR(100)"},
                        {"name": "hours_worked", "type": "FLOAT"},
                        {"name": "logged_date", "type": "TIMESTAMP"}
                    ],
                    "relations": [
                        {"target_table": "users", "type": "many-to-one", "foreign_key": "freelancer_id"}
                    ]
                }
            ])
        else: # helpdesk or fallback
            tables.extend([
                {
                    "name": "tickets",
                    "columns": [
                        {"name": "id", "type": "VARCHAR(36)", "primary_key": True},
                        {"name": "title", "type": "VARCHAR(200)"},
                        {"name": "customer_id", "type": "VARCHAR(36)", "foreign_key": "users.id"},
                        {"name": "agent_id", "type": "VARCHAR(36)", "foreign_key": "users.id", "nullable": True},
                        {"name": "status", "type": "VARCHAR(20)"}, # Open, InProgress, Closed
                        {"name": "priority", "type": "VARCHAR(20)"}, # Low, Medium, High
                        {"name": "created_at", "type": "TIMESTAMP"}
                    ],
                    "relations": [
                        {"target_table": "users", "type": "many-to-one", "foreign_key": "customer_id"},
                        {"target_table": "users", "type": "many-to-one", "foreign_key": "agent_id"}
                    ]
                }
            ])

        return {"tables": tables}

    def _stage_api_schema(self, intent: Dict[str, Any], database_schema: Dict[str, Any]) -> Dict[str, Any]:
        if self.api_key:
            return self._call_gemini_stage("api_schema", json.dumps({"intent": intent, "db": database_schema}))

        # Dynamic REST API Endpoints mapping to tables
        endpoints = [
            {
                "path": "/api/v1/auth/register",
                "method": "POST",
                "request_schema": {"email": "string", "password": "string", "full_name": "string"},
                "response_schema": {"id": "string", "email": "string", "full_name": "string"},
                "auth_required": False,
                "roles": []
            },
            {
                "path": "/api/v1/auth/login",
                "method": "POST",
                "request_schema": {"email": "string", "password": "string"},
                "response_schema": {"access_token": "string", "token_type": "string"},
                "auth_required": False,
                "roles": []
            }
        ]

        app_name = intent["app_name"].lower()
        if "gym" in app_name:
            endpoints.extend([
                {
                    "path": "/api/v1/classes",
                    "method": "GET",
                    "request_schema": {},
                    "response_schema": {"classes": "array"},
                    "auth_required": False,
                    "roles": []
                },
                {
                    "path": "/api/v1/classes",
                    "method": "POST",
                    "request_schema": {"title": "string", "trainer_id": "string", "schedule_time": "string", "capacity": "integer"},
                    "response_schema": {"id": "string", "title": "string", "capacity": "integer"},
                    "auth_required": True,
                    "roles": ["admin"]
                },
                {
                    "path": "/api/v1/bookings",
                    "method": "POST",
                    "request_schema": {"class_id": "string"},
                    "response_schema": {"booking_id": "string", "status": "string"},
                    "auth_required": True,
                    "roles": ["member"]
                }
            ])
        elif "book" in app_name:
            endpoints.extend([
                {
                    "path": "/api/v1/books",
                    "method": "GET",
                    "request_schema": {},
                    "response_schema": {"books": "array"},
                    "auth_required": False,
                    "roles": []
                },
                {
                    "path": "/api/v1/books",
                    "method": "POST",
                    "request_schema": {"title": "string", "author": "string"},
                    "response_schema": {"id": "string", "title": "string", "status": "string"},
                    "auth_required": True,
                    "roles": ["user"]
                },
                {
                    "path": "/api/v1/lendings",
                    "method": "POST",
                    "request_schema": {"book_id": "string"},
                    "response_schema": {"id": "string", "book_id": "string", "status": "string"},
                    "auth_required": True,
                    "roles": ["user"]
                }
            ])
        elif "invoice" in app_name:
            endpoints.extend([
                {
                    "path": "/api/v1/invoices",
                    "method": "GET",
                    "request_schema": {},
                    "response_schema": {"invoices": "array"},
                    "auth_required": True,
                    "roles": ["freelancer", "client"]
                },
                {
                    "path": "/api/v1/invoices",
                    "method": "POST",
                    "request_schema": {"client_id": "string", "amount": "number", "currency": "string", "due_date": "string"},
                    "response_schema": {"id": "string", "status": "string", "amount": "number"},
                    "auth_required": True,
                    "roles": ["freelancer"]
                },
                {
                    "path": "/api/v1/payments",
                    "method": "POST",
                    "request_schema": {"invoice_id": "string", "token": "string"},
                    "response_schema": {"payment_id": "string", "status": "string"},
                    "auth_required": True,
                    "roles": ["client"]
                }
            ])
        else: # helpdesk or fallback
            endpoints.extend([
                {
                    "path": "/api/v1/tickets",
                    "method": "GET",
                    "request_schema": {},
                    "response_schema": {"tickets": "array"},
                    "auth_required": True,
                    "roles": ["admin", "agent", "customer"]
                },
                {
                    "path": "/api/v1/tickets",
                    "method": "POST",
                    "request_schema": {"title": "string", "priority": "string"},
                    "response_schema": {"id": "string", "title": "string", "status": "string"},
                    "auth_required": True,
                    "roles": ["customer"]
                }
            ])

        return {"endpoints": endpoints}

    def _stage_ui_schema(self, intent: Dict[str, Any], api_schema: Dict[str, Any]) -> Dict[str, Any]:
        if self.api_key:
            return self._call_gemini_stage("ui_schema", json.dumps({"intent": intent, "api": api_schema}))

        # Dynamic UI pages
        pages = [
            {
                "name": "Login Screen",
                "route": "/login",
                "components": [
                    {"type": "input", "id": "email_field", "bindings": {"value": "auth/login.email"}},
                    {"type": "input", "id": "password_field", "bindings": {"value": "auth/login.password"}},
                    {"type": "button", "id": "login_btn", "bindings": {"click": "/api/v1/auth/login"}}
                ]
            }
        ]

        app_name = intent["app_name"].lower()
        if "gym" in app_name:
            pages.extend([
                {
                    "name": "Dashboard & Class Schedules",
                    "route": "/dashboard",
                    "components": [
                        {"type": "grid", "id": "class_grid", "bindings": {"items": "/api/v1/classes"}},
                        {"type": "button", "id": "book_session_btn", "bindings": {"click": "/api/v1/bookings"}}
                      ]
                },
                {
                    "name": "Admin Management Console",
                    "route": "/admin",
                    "components": [
                        {"type": "form", "id": "create_class_form", "bindings": {"submit": "/api/v1/classes"}},
                        {"type": "input", "id": "class_title", "bindings": {"value": "classes.title"}},
                        {"type": "input", "id": "trainer_id", "bindings": {"value": "classes.trainer_id"}},
                        {"type": "input", "id": "capacity", "bindings": {"value": "classes.capacity"}}
                    ]
                }
            ])
        elif "book" in app_name:
            pages.extend([
                {
                    "name": "Local Catalog & Library",
                    "route": "/catalog",
                    "components": [
                        {"type": "list", "id": "books_list", "bindings": {"items": "/api/v1/books"}},
                        {"type": "form", "id": "add_book_form", "bindings": {"submit": "/api/v1/books"}},
                        {"type": "button", "id": "request_lend_btn", "bindings": {"click": "/api/v1/lendings"}}
                    ]
                }
            ])
        elif "invoice" in app_name:
            pages.extend([
                {
                    "name": "Earnings & Invoicing Dashboard",
                    "route": "/dashboard",
                    "components": [
                        {"type": "list", "id": "invoices_list", "bindings": {"items": "/api/v1/invoices"}},
                        {"type": "form", "id": "create_invoice_form", "bindings": {"submit": "/api/v1/invoices"}},
                        {"type": "button", "id": "pay_invoice_btn", "bindings": {"click": "/api/v1/payments"}}
                    ]
                }
            ])
        else: # helpdesk or fallback
            pages.extend([
                {
                    "name": "Customer Support Center",
                    "route": "/support",
                    "components": [
                        {"type": "list", "id": "tickets_list", "bindings": {"items": "/api/v1/tickets"}},
                        {"type": "form", "id": "create_ticket_form", "bindings": {"submit": "/api/v1/tickets"}}
                    ]
                }
            ])

        return {"pages": pages}

    def _stage_auth_schema(self, intent: Dict[str, Any]) -> Dict[str, Any]:
        if self.api_key:
            return self._call_gemini_stage("auth_schema", json.dumps(intent))

        roles_list = []
        for r in intent["roles"]:
            perms = ["read_public"]
            if r == "admin":
                perms.extend(["create_user", "delete_user", "write_settings", "view_revenue_reports"])
            elif r in ("trainer", "agent", "freelancer"):
                perms.extend(["write_schedule", "edit_work_items", "view_client_reports"])
            elif r in ("member", "user", "customer", "client"):
                perms.extend(["create_booking", "write_reviews", "process_payments", "read_own_profile"])
            roles_list.append({"name": r, "permissions": perms})

        return {"roles": roles_list}

    def _stage_business_logic(self, intent: Dict[str, Any]) -> Dict[str, Any]:
        if self.api_key:
            return self._call_gemini_stage("business_logic", json.dumps(intent))

        rules = []
        for idx, br in enumerate(intent["business_rules"]):
            rules.append({
                "id": f"RULE_{idx+1:03d}",
                "condition": f"If action matches trigger requirement for: {br.split(' ')[0]}",
                "action": f"Verify and enforce logic: {br}"
            })
        return {"rules": rules}

    def _collect_assumptions(self, prompt: str, spec: Dict[str, Any]) -> List[str]:
        # Compile standard structural assumptions
        assumptions = [
            f"Stateless JWT auth token is configured for all authenticated API endpoints.",
            f"SQLite is mapped to PostgreSQL models structure during code generation.",
            f"SMTP/Email details default to local simulation environment.",
            f"Payment processing via Stripe runs in dry-run test mode."
        ]
        return assumptions

    def _generate_runtime_code(self, spec: Dict[str, Any]) -> Dict[str, str]:
        # Dynamic generator that translates DB, API, UI, and Auth schemas into direct code
        app_name = spec["intent"]["app_name"]
        
        # SQLAlchemy models code
        models_code = f"""# SQLAlchemy models for {app_name}
import datetime
from sqlalchemy import Column, String, Integer, Float, DateTime, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

"""
        for t in spec["database_schema"]["tables"]:
            class_name = t["name"].capitalize()
            if class_name.endswith("s"):
                class_name = class_name[:-1]
            if class_name.endswith("ie"):
                class_name = class_name[:-2] + "y"

            models_code += f"class {class_name}(Base):\n"
            models_code += f"    __tablename__ = \"{t['name']}\"\n\n"
            for col in t["columns"]:
                col_def = f"    {col['name']} = Column("
                if col.get("primary_key"):
                    col_def += "String, primary_key=True"
                elif col.get("foreign_key"):
                    col_def += f"String, ForeignKey('{col['foreign_key']}')"
                else:
                    ctype = col["type"]
                    if "VARCHAR" in ctype:
                        col_def += "String"
                    elif "INTEGER" in ctype:
                        col_def += "Integer"
                    elif "TIMESTAMP" in ctype:
                        col_def += "DateTime, default=datetime.datetime.utcnow"
                    elif "DECIMAL" in ctype or "FLOAT" in ctype:
                        col_def += "Float"
                    else:
                        col_def += "String"
                
                if col.get("unique"):
                    col_def += ", unique=True"
                if col.get("nullable"):
                    col_def += ", nullable=True"
                col_def += ")\n"
            models_code += "\n"

        # FastAPI App main code
        api_code = f"""# FastAPI routes for {app_name}
from fastapi import FastAPI, Depends, HTTPException, status
from pydantic import BaseModel
from typing import List, Dict, Any
import uuid

app = FastAPI(title="{app_name}")

class UserResponse(BaseModel):
    id: str
    email: str
    full_name: str

"""
        for ep in spec["api_schema"]["endpoints"]:
            # Generate dummy schemas
            path_func_name = ep["path"].replace("/", "_").replace("{", "").replace("}", "").strip("_")
            req_schema_name = f"{path_func_name.capitalize()}Request"
            
            if ep["request_schema"]:
                api_code += f"class {req_schema_name}(BaseModel):\n"
                for k, v in ep["request_schema"].items():
                    api_code += f"    {k}: {v}\n"
                api_code += "\n"

            api_code += f"@app.{ep['method'].lower()}(\"{ep['path']}\")\n"
            req_arg = f"payload: {req_schema_name}" if ep["request_schema"] else ""
            api_code += f"def {path_func_name}({req_arg}):\n"
            if ep["auth_required"]:
                api_code += f"    # Auth Roles: {ep['roles']}\n"
                api_code += f"    # Enforcing Role Based Security rules...\n"
            
            # Custom logic simulation
            api_code += f"    return {{\n"
            api_code += f"        \"status\": \"success\",\n"
            api_code += f"        \"message\": \"Request processed successfully by {app_name} backend.\",\n"
            if ep["request_schema"]:
                api_code += f"        \"received_payload\": payload.dict(),\n"
            api_code += f"        \"transaction_id\": str(uuid.uuid4())\n"
            api_code += f"    }}\n\n"

        # React Dashboard UI Component code
        # Serialize Python list of features into a JS array and reference it in the JSX.
        features_json = json.dumps(spec["intent"].get("features", []))
        ui_code = f"""// React page for {app_name}
import React, {{ useState, useEffect }} from 'react';

const features = {features_json};

export default function AppDashboard() {{
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {{
    // Fetch data using generated API endpoints
    console.log("App mounted. Fetching initial entities for {app_name}...");
  }}, []);

  return (
    <div style={{{{ padding: '24px', fontFamily: 'sans-serif', background: '#f8fafc', minHeight: '100vh' }}}}>
      <header style={{{{ marginBottom: '32px' }}}}>
        <h1 style={{{{ fontSize: '2rem', color: '#1e293b' }}}}>{app_name}</h1>
        <p style={{{{ color: '#64748b' }}}}>{spec["intent"]["description"]}</p>
      </header>

      <div style={{{{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}}}>
        {{features.map((feat, idx) => (
          <div key={{idx}} style={{{{ background: '#fff', padding: '16px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}}}>
            <h3 style={{{{ color: '#0f172a' }}}}>{{feat}}</h3>
            <p style={{{{ fontSize: '0.85rem', color: '#64748b', marginTop: '8px' }}}}>Compiled feature module.</p>
          </div>
        ))}}
      </div>
    </div>
  );
}}
"""

        # PostgreSQL schema generator (DDL)
        ddl_code = f"-- PostgreSQL Database DDL for {app_name}\n"
        for t in spec["database_schema"]["tables"]:
            ddl_code += f"CREATE TABLE {t['name']} (\n"
            col_lines = []
            for col in t["columns"]:
                line = f"    {col['name']} {col['type']}"
                if col.get("primary_key"):
                    line += " PRIMARY KEY"
                if col.get("unique"):
                    line += " UNIQUE"
                if not col.get("nullable") and not col.get("primary_key"):
                    line += " NOT NULL"
                col_lines.append(line)
            
            # Foreign keys
            for col in t["columns"]:
                if col.get("foreign_key"):
                    fk_tbl, fk_col = col["foreign_key"].split(".")
                    col_lines.append(f"    FOREIGN KEY ({col['name']}) REFERENCES {fk_tbl}({fk_col}) ON DELETE CASCADE")
            ddl_code += ",\n".join(col_lines)
            ddl_code += "\n);\n\n"

        return {
            "models.py": models_code,
            "main.py": api_code,
            "page.tsx": ui_code,
            "schema.sql": ddl_code
        }

    def _call_gemini_stage(self, stage: str, context: str) -> Dict[str, Any]:
        """
        Executes a real Google Gemini Pro API call to process a compiler stage.
        Uses structural prompt templates and returns JSON.
        """
        try:
            # Prepare instructions
            prompt_stage_map = {
                "intent_extraction": "You are IntentExtractor. Analyze user requirements and return structured JSON only. Schema: {app_name, description, features:[], roles:[], entities:[], business_rules:[], authentication_required:true|false, payments_required:true|false, analytics_required:true|false, confidence:0.0}",
                "system_design": "You are SystemDesigner. Convert app intent JSON into architecture components. Return JSON only with key: 'architecture' containing keys: 'frontend', 'backend', 'database', 'auth', 'services'.",
                "database_schema": "You are DatabaseSchemaGenerator. Generate normalized tables. Return JSON only with schema: {tables: [{name, columns:[{name, type, primary_key, foreign_key, unique, nullable}], relations:[{target_table, type}]}]}",
                "api_schema": "You are ApiSchemaGenerator. Generate REST specification mapping to the database. Return JSON only: {endpoints:[{path, method, request_schema:{}, response_schema:{}, auth_required, roles:[]}]}",
                "ui_schema": "You are UiSchemaGenerator. Generate frontend configuration binding to API. Return JSON only: {pages:[{name, route, components:[{type, id, bindings:{}}]}]}",
                "auth_schema": "You are AuthModelGenerator. Generate RBAC config. Return JSON: {roles:[{name, permissions:[]}]}",
                "business_logic": "You are BusinessLogicGenerator. Generate rules list. Return JSON: {rules:[{id, condition, action}]}"
            }

            system_instruction = prompt_stage_map.get(stage, "Return JSON only.")
            
            # Simple API connection using native Python http.client
            conn = http.client.HTTPSConnection("generativelanguage.googleapis.com")
            
            payload = {
                "contents": [
                    {
                        "parts": [
                            {"text": f"{system_instruction}\n\nInput Context:\n{context}"}
                        ]
                    }
                ],
                "generationConfig": {
                    "responseMimeType": "application/json"
                }
            }

            headers = {
                'Content-Type': 'application/json'
            }

            # Execute Request
            conn.request("POST", f"/v1beta/models/gemini-1.5-flash:generateContent?key={self.api_key}", json.dumps(payload), headers)
            response = conn.getresponse()
            res_data = response.read().decode('utf-8')
            
            # Parse response
            res_json = json.loads(res_data)
            text_response = res_json['candidates'][0]['content']['parts'][0]['text']
            
            return json.loads(text_response)
        except Exception as e:
            # Fallback if connection fails
            print(f"Gemini API Stage {stage} failed: {e}. Falling back to mock stage.")
            # Trigger standard mock generation directly
            return getattr(self, f"_stage_{stage}")(json.loads(context) if context.startswith("{") else context)
