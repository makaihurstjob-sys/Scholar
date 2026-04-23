def build_essay_prompt(*, scholarship_name: str, scholarship_description: str, resume_text: str) -> str:
    return f"""
You are helping a student write a scholarship essay.

Task requirements:
1) Use the applicant's resume as factual context for background and achievements.
2) Identify values, keywords, and priorities from the scholarship description and align the essay to them.
3) Write in first person with a natural, human tone (not robotic or generic).
4) Keep the essay between 400 and 600 words unless the scholarship prompt specifies otherwise.
5) Be specific, authentic, and persuasive while remaining truthful to the resume context.

Scholarship name:
{scholarship_name}

Scholarship description:
{scholarship_description}

Applicant resume context:
{resume_text}

Return only the final essay text.
""".strip()
