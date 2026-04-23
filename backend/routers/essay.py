from fastapi import APIRouter

from models.schemas import EssayRequest, EssayResponse
from services.ollama_service import generate_essay
from services.prompt_builder import build_essay_prompt

router = APIRouter(tags=["essay"])


@router.post("/generate-essay", response_model=EssayResponse)
def generate_essay_endpoint(payload: EssayRequest) -> EssayResponse:
    prompt = build_essay_prompt(
        scholarship_name=payload.scholarship_name,
        scholarship_description=payload.scholarship_description,
        resume_text=payload.resume_text,
    )
    essay, usage = generate_essay(prompt=prompt, model=payload.model or "llama3")
    return EssayResponse(essay=essay, model=payload.model or "llama3", usage=usage)
