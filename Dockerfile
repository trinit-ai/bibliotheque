FROM python:3.11-slim

WORKDIR /app

# Copy requirements first for layer caching
COPY api/requirements.txt ./api/requirements.txt
RUN pip install --no-cache-dir -r api/requirements.txt

# Copy the full repo (api + protocols needed for pack loading)
COPY api/ ./api/
COPY protocols/ ./protocols/

WORKDIR /app/api

EXPOSE 8001

CMD uvicorn app:app --host 0.0.0.0 --port ${PORT:-8001}
# Force rebuild 1774106306
