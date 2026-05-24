import datetime
from sqlalchemy import Column, String, Integer, Float, DateTime, ForeignKey, JSON
from sqlalchemy.orm import relationship
from .database import Base

class CompileJob(Base):
    __tablename__ = "compile_jobs"

    id = Column(String, primary_key=True, index=True)
    app_name = Column(String, index=True)
    description = Column(String)
    status = Column(String, default="PENDING")  # PASS, FAIL
    specification = Column(JSON, nullable=True)
    repairs = Column(JSON, default=list)
    assumptions = Column(JSON, default=list)
    repair_count = Column(Integer, default=0)
    execution_time = Column(Float, default=0.0)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    # Relationships
    stage_logs = relationship("PipelineStageLog", back_populates="job", cascade="all, delete-orphan")

class PipelineStageLog(Base):
    __tablename__ = "pipeline_stage_logs"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    job_id = Column(String, ForeignKey("compile_jobs.id"))
    stage_name = Column(String)
    status = Column(String)  # SUCCESS, FAILED
    duration_ms = Column(Float)
    message = Column(String, nullable=True)
    input_payload = Column(JSON, nullable=True)
    output_payload = Column(JSON, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    # Relationships
    job = relationship("CompileJob", back_populates="stage_logs")
