import { Link } from "react-router-dom";
import { FileCheck2, Clock, Trophy, Loader2, Plus, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/StatCard";
import { ApplicationsTable } from "@/components/ApplicationsTable";
import { applications, stats } from "@/lib/mockData";

const Dashboard = () => {
  const recent = applications.slice(0, 6);

  return (
    <div className="mx-auto w-full max-w-7xl space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Dashboard</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Track your scholarship pipeline and start a new application.
          </p>
        </div>
        <Button asChild className="bg-gradient-primary text-primary-foreground shadow-glow hover:opacity-90">
          <Link to="/new">
            <Plus className="h-4 w-4" />
            New Application
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Applied" value={stats.totalApplied} delta="+3 this month" icon={FileCheck2} />
        <StatCard label="Pending" value={stats.pending} delta="Awaiting review" icon={Clock} tone="warning" />
        <StatCard label="Won" value={stats.won} delta="$17,000 secured" icon={Trophy} tone="success" />
        <StatCard label="In Progress" value={stats.inProgress} delta="Drafts in flight" icon={Loader2} tone="primary" />
      </div>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Recent applications</h2>
            <p className="text-sm text-muted-foreground">Your latest scholarship submissions and drafts.</p>
          </div>
          <Button asChild variant="ghost" size="sm">
            <Link to="/history">
              View all
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        <ApplicationsTable items={recent} />
      </section>
    </div>
  );
};

export default Dashboard;
