@echo off
title AppCompilerAI Launcher
echo ===================================================
echo             Starting AppCompilerAI Servers         
echo ===================================================
echo.

:: Check for Python
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Python is not installed or not in PATH. Please install Python.
    pause
    exit /b 1
)

:: Check for Node.js
node -v >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed or not in PATH. Please install Node.js.
    pause
    exit /b 1
)

echo [INFO] Python and Node.js detected.
echo [INFO] Installing backend dependencies...
python -m pip install fastapi uvicorn sqlalchemy pydantic
if %errorlevel% neq 0 (
    echo [WARNING] Failed to install backend packages. Trying fallback 'pip install'...
    pip install fastapi uvicorn sqlalchemy pydantic
)

echo [INFO] Starting FastAPI Backend on port 8000...
start "AppCompilerAI Backend" cmd /k "echo FastAPI Server Running... && python -m uvicorn backend.main:app --reload --port 8000"

echo [INFO] Installing frontend dependencies and starting Next.js dev server on port 3000...
start "AppCompilerAI Frontend" cmd /k "echo Next.js Server Running... && cd frontend && npm install && npm run dev"

echo.
echo ===================================================
echo AppCompilerAI is launching!
echo.
echo - Frontend: http://localhost:3000
echo - Backend API Docs: http://127.0.0.1:8000/docs
echo ===================================================
echo.
echo Opening browser in 3 seconds...
timeout /t 3 >nul
start http://localhost:3000
exit /b 0
