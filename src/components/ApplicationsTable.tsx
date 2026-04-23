import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatusBadge } from "./StatusBadge";
import type { Application } from "@/lib/mockData";

function formatDeadline(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function daysUntil(iso: string) {
  const ms = new Date(iso).getTime() - Date.now();
  return Math.ceil(ms / (1000 * 60 * 60 * 24));
}

export function ApplicationsTable({ items }: { items: Application[] }) {
  return (
    <div className="overflow-hidden rounded-xl border bg-card">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-[40%]">Scholarship Name</TableHead>
            <TableHead>Deadline</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-[200px]">Match Score</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((app) => {
            const days = daysUntil(app.deadline);
            return (
              <TableRow key={app.id} className="cursor-pointer">
                <TableCell>
                  <div className="font-medium">{app.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {app.organization} · {app.amount}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm">{formatDeadline(app.deadline)}</div>
                  <div className="text-xs text-muted-foreground">
                    {days > 0 ? `in ${days} day${days === 1 ? "" : "s"}` : "passed"}
                  </div>
                </TableCell>
                <TableCell>
                  <StatusBadge status={app.status} />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-gradient-primary"
                        style={{ width: `${app.matchScore}%` }}
                      />
                    </div>
                    <span className="w-9 text-right text-sm font-medium tabular-nums">{app.matchScore}%</span>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
