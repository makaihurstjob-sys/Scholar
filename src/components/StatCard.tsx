import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: number | string;
  delta?: string;
  icon: LucideIcon;
  tone?: "default" | "success" | "warning" | "primary";
}

const toneStyles = {
  default: "text-muted-foreground bg-muted/40",
  success: "text-success bg-success/10",
  warning: "text-warning bg-warning/10",
  primary: "text-primary bg-primary/10",
};

export function StatCard({ label, value, delta, icon: Icon, tone = "default" }: StatCardProps) {
  return (
    <Card className="shadow-card relative overflow-hidden p-5">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</p>
          <p className="text-3xl font-semibold tracking-tight">{value}</p>
        </div>
        <div className={cn("rounded-lg p-2", toneStyles[tone])}>
          <Icon className="h-4 w-4" />
        </div>
      </div>
      {delta && <p className="mt-3 text-xs text-muted-foreground">{delta}</p>}
    </Card>
  );
}
