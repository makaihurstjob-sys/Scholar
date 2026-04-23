import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ApplicationsTable } from "@/components/ApplicationsTable";
import { applications, type ApplicationStatus } from "@/lib/mockData";

const statuses: (ApplicationStatus | "All")[] = ["All", "Pending", "In Progress", "Won", "Rejected"];

const History = () => {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<(typeof statuses)[number]>("All");

  const filtered = useMemo(() => {
    return applications.filter((a) => {
      const matchesStatus = status === "All" || a.status === status;
      const q = query.trim().toLowerCase();
      const matchesQuery =
        !q || a.name.toLowerCase().includes(q) || a.organization.toLowerCase().includes(q);
      return matchesStatus && matchesQuery;
    });
  }, [query, status]);

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Application History</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Every scholarship you've applied to or drafted, in one place.
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by name or organization…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={status} onValueChange={(v) => setStatus(v as ApplicationStatus | "All")}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {statuses.map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {filtered.length > 0 ? (
        <ApplicationsTable items={filtered} />
      ) : (
        <div className="rounded-xl border bg-card p-12 text-center">
          <p className="text-sm font-medium">No applications match your filters</p>
          <p className="mt-1 text-xs text-muted-foreground">Try clearing the search or status.</p>
        </div>
      )}
    </div>
  );
};

export default History;
