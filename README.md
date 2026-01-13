# Registry Guard Suite

A full-stack application for validating and viewing registry data.

## Tech Stack
- **Frontend**: React, Vite, TypeScript, Tailwind CSS
- **Backend**: FastAPI, Pydantic, Python 3.11+
- **Tooling**: `uv` (Python), `npm` (Node), Docker

## How to Run Locally

You will need two terminal windows.

### 1. Start the Backend

```bash
cd backend
# Install dependencies
uv pip install -r pyproject.toml --system  # or just: uv sync
# Run the API server
uv run uvicorn src.api:app --reload --port 8000
```
*The backend will run at `http://localhost:8000`*

### 2. Start the Frontend

```bash
# Install dependencies
npm install
# Run the dev server
npm run dev
```
*The frontend will run at `http://localhost:8080` (or similar) and proxy API requests to port 8000.*

## Docker Build & Run (Production-like)

To build the entire stack (backend validation + serving) and run it:

```bash
# Build the image (runs validation during build)
docker build -t registry-guard .

# Run the container
docker run -p 8000:8000 registry-guard
```

## Running Tests

```bash
# Backend Tests
cd backend
export PYTHONPATH=$PWD
uv run pytest tests

# Integration Test (Requires Docker)
./tests/integration_test.sh
```
