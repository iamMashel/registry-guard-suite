#!/bin/bash
set -e

echo "Starting Integration Test..."

# 1. Build Docker Image
echo "[Test] Building Docker image..."
# Use the build script which handles pre-validation if needed, or direct docker build
docker build -t registry-guard-test .

# 2. Run Container
echo "[Test] Starting container..."
CONTAINER_ID=$(docker run -d -p 8081:8000 registry-guard-test)

# Cleanup trap
cleanup() {
  echo "[Test] Cleaning up..."
  docker stop $CONTAINER_ID
  docker rm $CONTAINER_ID
}
trap cleanup EXIT

# Wait for healthy
echo "[Test] Waiting for service..."
sleep 5

# 3. Test API Endpoint
echo "[Test] Verifying /registry..."
RESPONSE=$(curl -f -s http://localhost:8081/registry)
echo "Response: $RESPONSE"

if [[ $RESPONSE != *"repository_tags"* ]]; then
  echo "Error: /registry response missing required fields"
  exit 1
fi

# 4. Test OpenAPI Spec (OpenAI Integration)
echo "[Test] Verifying /openapi.json..."
SPEC_RESPONSE=$(curl -f -s http://localhost:8081/openapi.json)
if [[ $SPEC_RESPONSE != *"openapi"* ]]; then
  echo "Error: /openapi.json valid response not found"
  exit 1
fi

echo "[Test] Integration Test Passed!"
