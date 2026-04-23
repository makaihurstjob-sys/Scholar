import logging

import requests
from fastapi import HTTPException, status

logger = logging.getLogger(__name__)
OLLAMA_GENERATE_URL = "http://localhost:11434/api/generate"


def generate_essay(*, prompt: str, model: str = "llama3") -> tuple[str, dict]:
    payload = {
        "model": model,
        "prompt": prompt,
        "stream": False,
    }

    try:
        response = requests.post(OLLAMA_GENERATE_URL, json=payload, timeout=120)
    except requests.RequestException as exc:
        logger.exception("Failed to connect to Ollama service")
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Could not connect to local Ollama service at http://localhost:11434.",
        ) from exc

    if response.status_code >= 400:
        logger.error("Ollama generate failed: %s", response.text)
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail="Ollama failed to generate an essay. Ensure the model is pulled and service is running.",
        )

    data = response.json()
    essay = (data.get("response") or "").strip()
    if not essay:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail="Ollama returned an empty essay.",
        )

    usage = {
        "total_duration": data.get("total_duration"),
        "prompt_eval_count": data.get("prompt_eval_count"),
        "eval_count": data.get("eval_count"),
    }
    return essay, usage
