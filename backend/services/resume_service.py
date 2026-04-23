import logging
from io import BytesIO

import pdfplumber
from fastapi import HTTPException, UploadFile, status

logger = logging.getLogger(__name__)

MAX_PDF_SIZE_BYTES = 10 * 1024 * 1024


def validate_pdf(file: UploadFile, file_bytes: bytes) -> None:
    content_type = (file.content_type or "").lower()
    if content_type not in {"application/pdf", "application/x-pdf"}:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Only PDF files are accepted.",
        )

    if len(file_bytes) > MAX_PDF_SIZE_BYTES:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="File too large. Maximum size is 10 MB.",
        )


def extract_pdf_text(file_bytes: bytes) -> str:
    try:
        with pdfplumber.open(BytesIO(file_bytes)) as pdf:
            pages = [page.extract_text() or "" for page in pdf.pages]
        parsed_text = "\n".join(page.strip() for page in pages if page.strip()).strip()
    except Exception as exc:  # pragma: no cover - defensive boundary
        logger.exception("Failed to parse PDF resume")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Could not read this PDF. Please upload a readable resume PDF.",
        ) from exc

    if not parsed_text:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="No readable text found in the PDF.",
        )

    return parsed_text
