import { useEffect, useState } from "react";
import { FileText, Eye, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ResumeDropzone } from "@/components/ResumeDropzone";

interface StoredResume {
  file: File;
  url: string;
  uploadedAt: Date;
}

const Resume = () => {
  const [resume, setResume] = useState<StoredResume | null>(null);

  useEffect(() => {
    return () => {
      if (resume) URL.revokeObjectURL(resume.url);
    };
  }, [resume]);

  const handleFile = (file: File) => {
    if (resume) URL.revokeObjectURL(resume.url);
    setResume({ file, url: URL.createObjectURL(file), uploadedAt: new Date() });
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">My Resume</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Upload your resume once — Scholar will use it to tailor every essay you generate.
        </p>
      </div>

      {!resume ? (
        <ResumeDropzone onFile={handleFile} />
      ) : (
        <Card className="shadow-card p-5">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <FileText className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{resume.file.name}</p>
              <p className="text-xs text-muted-foreground">
                {formatSize(resume.file.size)} · uploaded{" "}
                {resume.uploadedAt.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
            <div className="flex flex-shrink-0 gap-2">
              <Button variant="outline" size="sm" asChild>
                <a href={resume.url} target="_blank" rel="noreferrer">
                  <Eye className="h-4 w-4" />
                  View
                </a>
              </Button>
              <Button variant="outline" size="sm" onClick={() => setResume(null)}>
                <RefreshCw className="h-4 w-4" />
                Replace
              </Button>
            </div>
          </div>
        </Card>
      )}

      <Card className="bg-muted/20 p-5">
        <h3 className="text-sm font-semibold">Tips for a strong resume</h3>
        <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
          <li>• Lead each bullet with a verb and a measurable outcome.</li>
          <li>• Keep it to one page if you have under five years of experience.</li>
          <li>• Mirror the language used in the scholarship's eligibility criteria.</li>
        </ul>
      </Card>
    </div>
  );
};

export default Resume;
