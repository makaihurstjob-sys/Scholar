import logging

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers.essay import router as essay_router
from routers.resume import router as resume_router
from services.storage import ensure_data_dir

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)s [%(name)s] %(message)s",
)

app = FastAPI(title="Scholar Backend", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def on_startup() -> None:
    ensure_data_dir()


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


app.include_router(resume_router)
app.include_router(essay_router)
