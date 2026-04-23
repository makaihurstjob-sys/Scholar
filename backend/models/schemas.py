from pydantic import BaseModel, Field


class ResumeUploadResponse(BaseModel):
    filename: str
    uploaded_at: str
    parsed_text: str


class EssayRequest(BaseModel):
    scholarship_name: str = Field(..., min_length=1)
    scholarship_description: str = Field(..., min_length=1)
    resume_text: str = Field(..., min_length=1)
    model: str = "llama3"


class EssayResponse(BaseModel):
    essay: str
    model: str
    usage: dict | None = None
