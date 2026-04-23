import { cn } from "@/lib/utils";
import type { ApplicationStatus } from "@/lib/mockData";

const styles: Record<ApplicationStatus, string> = {
  Won: "bg-success/15 text-success border-success/25",
  Pending: "bg-warning/15 text-warning border-warning/25",
  "In Progress": "bg-primary/15 text-primary border-primary/25",
  Rejected: "bg-destructive/15 text-destructive border-destructive/25",
};

export function StatusBadge({ status }: { status: ApplicationStatus }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium",
        styles[status],
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}
