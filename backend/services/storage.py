import json
from datetime import datetime, timezone
from pathlib import Path

DATA_DIR = Path(__file__).resolve().parent.parent / "data"
RESUME_PATH = DATA_DIR / "resume.json"


def ensure_data_dir() -> None:
    DATA_DIR.mkdir(parents=True, exist_ok=True)


def save_resume_json(*, filename: str, parsed_text: str) -> dict:
    ensure_data_dir()
    payload = {
        "filename": filename,
        "uploaded_at": datetime.now(timezone.utc).isoformat(),
        "parsed_text": parsed_text,
    }

    temp_path = RESUME_PATH.with_suffix(".json.tmp")
    with temp_path.open("w", encoding="utf-8") as temp_file:
        json.dump(payload, temp_file, ensure_ascii=False, indent=2)
    temp_path.replace(RESUME_PATH)

    return payload
