import json
from pathlib import Path
from typing import Dict, Any

from fastapi import FastAPI

app = FastAPI(title="Registry Guard Backend")

@app.get("/")
async def root():
    return {"message": "Registry Guard Backend is running", "docs_url": "/docs"}


BUILD_INFO_FILE = Path(__file__).parent.parent / "build_info.json"

def get_build_info() -> Dict[str, Any]:
    if BUILD_INFO_FILE.exists():
        try:
            with open(BUILD_INFO_FILE, "r") as f:
                return json.load(f)
        except Exception:
            pass
    return {}

@app.get("/registry")
async def get_registry_metadata():
    build_info = get_build_info()
    
    return {
        "repository_tags": ["registry-guard:latest", "registry-guard:v1.0.0"],
        "digest": "sha256:e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
        "size_bytes": 12345678,
        "layers": [
            "sha256:a1b2c3d4e5f6...",
            "sha256:b1b2c3d4e5f6...",
            "sha256:c1b2c3d4e5f6..."
        ],
        "validation_checksum": build_info.get("data_checksum", "Not available (Dev Mode)"),
        "validated_row_count": build_info.get("row_count", 0)
    }

@app.get("/health")
async def health_check():
    return {"status": "ok"}
