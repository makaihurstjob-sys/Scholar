export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000";

export interface UploadResumeResponse {
  filename: string;
  uploaded_at: string;
  parsed_text: string;
}

export interface GenerateEssayPayload {
  scholarship_name: string;
  scholarship_description: string;
  resume_text: string;
  model?: string;
}

export interface GenerateEssayResponse {
  essay: string;
  model: string;
  usage?: Record<string, unknown>;
}

function normalizeError(error: unknown, fallback: string): string {
  if (error instanceof Error) return error.message;
  return fallback;
}

async function parseError(response: Response): Promise<string> {
  try {
    const data = await response.json();
    return data.detail ?? data.message ?? "Request failed.";
  } catch {
    return `Request failed with status ${response.status}.`;
  }
}

export async function uploadResume(file: File): Promise<UploadResumeResponse> {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch(`${API_BASE_URL}/upload-resume`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(await parseError(response));
    }

    return (await response.json()) as UploadResumeResponse;
  } catch (error) {
    throw new Error(normalizeError(error, "Unable to upload resume."));
  }
}

export async function generateEssay(payload: GenerateEssayPayload): Promise<GenerateEssayResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/generate-essay`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(await parseError(response));
    }

    return (await response.json()) as GenerateEssayResponse;
  } catch (error) {
    throw new Error(normalizeError(error, "Unable to generate essay."));
  }
}
