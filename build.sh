#!/bin/bash
set -e

echo "Running Pre-build Validation..."
# Ideally we run this in a container to ensure consistent environment, 
# but for simplicity we rely on the Dockerfile build to validate.

# However, to use LABEL for the checksum, we need to calculate it BEFORE the build 
# or use a complex buildx output.
# Here we calculate it locally to pass as ARG if we wanted to support dynamic LABELs fully.

CHECKSUM=$(sha256sum backend/data/transactions.json | awk '{print $1}')
ROW_COUNT=$(grep -o '"transaction_id"' backend/data/transactions.json | wc -l)

echo "Data Checksum: $CHECKSUM"
echo "Row Count: $ROW_COUNT"

echo "Building Docker Image..."
# We can pass these as ARGs if we update the Dockerfile to accept them
# For now, we rely on the internal validation in the Dockerfile.
docker build -t registry-guard-backend .

echo "Build Complete. Validation passed inside Docker."
