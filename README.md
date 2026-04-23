# Scholar: Scholarship Application Assistant

Scholar combines a Vite/React frontend with a local FastAPI backend and Ollama to help you upload a resume and generate scholarship essays locally (no API keys required).

## Architecture

- **Frontend:** React + TypeScript (Vite)
- **Backend:** FastAPI (Python)
- **Resume parsing:** `pdfplumber`
- **Essay generation:** Ollama local API (`llama3` default, `mistral` optional)

## Prerequisites

- Node.js 18+
- Python 3.10+
- [Ollama](https://ollama.com/download)

## 1) Start Ollama locally

Install Ollama, then run:

```bash
ollama serve
```

In a new terminal, pull the default model:

```bash
ollama pull llama3
```

Optional alternative:

```bash
ollama pull mistral
```

## 2) Run backend (FastAPI)

From the project root:

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

Backend endpoints:

- `GET /health`
- `POST /upload-resume`
- `POST /generate-essay`

## 3) Run frontend (Vite)

From project root in a separate terminal:

```bash
npm install
npm run dev
```

Optional frontend env override:

```bash
VITE_API_BASE_URL=http://localhost:8000
```

## End-to-end flow

1. Open the frontend.
2. Go to **My Resume** and upload a PDF.
3. The backend parses the PDF text and stores it in `backend/data/resume.json`.
4. Go to **New Application**.
5. Enter scholarship name + description.
6. Click **Generate Essay** to call Ollama through backend `/generate-essay`.

## Troubleshooting

### CORS errors in browser
- Ensure backend is running on port `8000`.
- Ensure frontend runs on `http://localhost:5173` (or update backend CORS origins).

### `Could not connect to local Ollama service`
- Start Ollama with `ollama serve`.
- Verify Ollama reachable at `http://localhost:11434`.

### Model not found / generation fails
- Pull the model first: `ollama pull llama3`.
- If using another model, pass that model name in request body (`model`).

### Resume upload fails
- Upload must be a readable PDF and under 10 MB.
- Scanned-image PDFs without OCR text may fail extraction.

### Connection refused from frontend
- Confirm backend URL matches `VITE_API_BASE_URL` (defaults to `http://localhost:8000`).
