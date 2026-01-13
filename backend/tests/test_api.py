from fastapi.testclient import TestClient
from src.api import app

client = TestClient(app)

def test_read_health():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}

def test_read_registry():
    response = client.get("/registry")
    assert response.status_code == 200
    data = response.json()
    assert "repository_tags" in data
    assert "digest" in data
    assert "validation_checksum" in data
    assert isinstance(data["repository_tags"], list)
