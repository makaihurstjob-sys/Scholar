import logging

from fastapi import APIRouter, File, UploadFile

from models.schemas import ResumeUploadResponse
from services.resume_service import extract_pdf_text, validate_pdf
from services.storage import save_resume_json

logger = logging.getLogger(__name__)

router = APIRouter(tags=["resume"])


@router.post("/upload-resume", response_model=ResumeUploadResponse)
async def upload_resume(file: UploadFile = File(...)) -> ResumeUploadResponse:
    file_bytes = await file.read()
    validate_pdf(file, file_bytes)
    parsed_text = extract_pdf_text(file_bytes)

    filename = file.filename or "resume.pdf"
    saved = save_resume_json(filename=filename, parsed_text=parsed_text)

    logger.info("Resume uploaded and parsed: filename=%s", filename)

    return ResumeUploadResponse(**saved)
