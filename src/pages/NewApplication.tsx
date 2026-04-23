import { useEffect, useState } from "react";
import { Sparkles, Copy, RefreshCw, Check, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/hooks/use-toast";
import { generateEssay } from "@/lib/api";

const RESUME_STORAGE_KEY = "scholar_resume_text";
const DEFAULT_RESUME_TEXT =
  "Upload your resume on the Resume page to auto-fill this field, or paste your resume text here.";

const NewApplication = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [resumeText, setResumeText] = useState(DEFAULT_RESUME_TEXT);
  const [essay, setEssay] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const storedResumeText = localStorage.getItem(RESUME_STORAGE_KEY);
    if (storedResumeText?.trim()) {
      setResumeText(storedResumeText);
    }
  }, []);

  const generate = async () => {
    if (!name.trim() && !description.trim()) {
      toast({ title: "Add a scholarship", description: "Paste a name or description first." });
      return;
    }

    if (!resumeText.trim()) {
      toast({ title: "Add your resume", description: "Upload or paste resume text first." });
      return;
    }

    setLoading(true);
    setEssay("");

    try {
      const response = await generateEssay({
        scholarship_name: name.trim() || "Untitled Scholarship",
        scholarship_description: description.trim(),
        resume_text: resumeText.trim(),
      });

      setEssay(response.essay);
      toast({ title: "Essay generated", description: "Your draft is ready to review." });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Generation failed.";
      toast({ title: "Unable to generate essay", description: message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const copy = async () => {
    await navigator.clipboard.writeText(essay);
    setCopied(true);
    toast({ title: "Copied to clipboard" });
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">New Application</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Paste the scholarship details and we'll draft an essay tailored to your resume.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <Card className="shadow-card space-y-4 p-5">
            <div className="space-y-2">
              <label className="text-sm font-medium">Scholarship name</label>
              <Input
                placeholder="e.g. Horizon STEM Excellence Award"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Description / prompt</label>
              <Textarea
                placeholder="Paste the full scholarship description, eligibility, and essay prompt here…"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="min-h-[200px] resize-y"
              />
            </div>
          </Card>

          <Card className="shadow-card space-y-3 p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-medium">
                <FileText className="h-4 w-4 text-primary" />
                Your resume
              </div>
              <span className="text-xs text-muted-foreground">Editable</span>
            </div>
            <Textarea
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              className="min-h-[140px] resize-y bg-muted/30 font-mono text-xs"
            />
          </Card>

          <Button
            onClick={generate}
            disabled={loading}
            size="lg"
            className="w-full bg-gradient-primary text-primary-foreground shadow-glow hover:opacity-90"
          >
            <Sparkles className="h-4 w-4" />
            {loading ? "Generating…" : "Generate Essay"}
          </Button>
        </div>

        <Card className="shadow-card flex flex-col p-5 lg:sticky lg:top-20 lg:max-h-[calc(100vh-7rem)]">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-semibold">Generated essay</h2>
            {essay && (
              <div className="flex gap-2">
                <Button size="sm" variant="ghost" onClick={copy}>
                  {copied ? <Check className="h-4 w-4 text-success" /> : <Copy className="h-4 w-4" />}
                  {copied ? "Copied" : "Copy"}
                </Button>
                <Button size="sm" variant="ghost" onClick={generate} disabled={loading}>
                  <RefreshCw className={loading ? "h-4 w-4 animate-spin" : "h-4 w-4"} />
                  Regenerate
                </Button>
              </div>
            )}
          </div>

          <div className="flex-1 overflow-auto rounded-lg border bg-muted/20 p-4">
            {loading ? (
              <div className="space-y-3">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-2/3" />
                <div className="h-4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            ) : essay ? (
              <div className="whitespace-pre-wrap text-sm leading-relaxed text-foreground/90">{essay}</div>
            ) : (
              <div className="flex h-full min-h-[300px] flex-col items-center justify-center text-center">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Sparkles className="h-5 w-5" />
                </div>
                <p className="text-sm font-medium">Your essay will appear here</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Fill in the scholarship details and click Generate Essay.
                </p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default NewApplication;
