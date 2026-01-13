# Stage 1: Validation and Build
FROM python:3.11-slim as builder

WORKDIR /app

# Install uv
COPY --from=ghcr.io/astral-sh/uv:latest /uv /bin/uv

# Install dependencies for validation
COPY backend/pyproject.toml .
# Create venv and install dependencies
RUN uv venv && uv pip install .

# Copy source and data
COPY backend/src ./src
COPY backend/data ./data

# Run Validation
# This will fail the build if data is invalid
# We need to use the venv python
RUN . .venv/bin/activate && python src/main.py

# Calculate checksums and metadata
RUN echo '{"data_checksum": "'$(sha256sum data/transactions.json | awk '{print $1}')'", "row_count": '$(grep -c "transaction_id" data/transactions.json)'}' > build_info.json

# Stage 2: Final Image
FROM python:3.11-slim

WORKDIR /app

# Install uv
COPY --from=ghcr.io/astral-sh/uv:latest /uv /bin/uv

# Install runtime dependencies
COPY backend/pyproject.toml .
RUN uv venv && uv pip install .

# Copy application code
COPY backend/src ./src

# Copy validation artifacts from builder
COPY --from=builder /app/build_info.json .

# Expose API port
EXPOSE 8000

# Metadata Labels (Static)
LABEL app.name="registry-guard-backend"
LABEL app.type="backend"

# Run the application using the venv
CMD ["/app/.venv/bin/uvicorn", "src.api:app", "--host", "0.0.0.0", "--port", "8000"]
