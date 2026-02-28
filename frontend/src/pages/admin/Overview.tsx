import { useState, useEffect } from "react";
import { Users, BookOpen, Star } from "lucide-react";

// ─── Skeleton ─────────────────────────────────────────────────────────────

const StatCardSkeleton = () => (
  <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl p-5 flex flex-col gap-4">
    <div className="flex items-center justify-between">
      <div className="animate-pulse h-3 w-24 rounded-sm bg-[hsl(var(--primary)/0.08)]" />
      <div className="animate-pulse h-9 w-9 rounded-md bg-[hsl(var(--primary)/0.08)]" />
    </div>
    <div className="animate-pulse h-8 w-28 rounded-md bg-[hsl(var(--primary)/0.08)]" />
  </div>
);

export const OverviewSkeleton = () => (
  <div className="p-6 flex flex-col gap-4">
    <div className="animate-pulse h-6 w-32 rounded-md bg-[hsl(var(--primary)/0.08)]" />
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {[...Array(3)].map((_, i) => <StatCardSkeleton key={i} />)}
    </div>
  </div>
);

// ─── Stat Card ────────────────────────────────────────────────────────────

const stats = [
  { label: "Total Users",   value: "12,480", icon: Users,    color: "text-blue-400",              bg: "bg-blue-400/10" },
  { label: "Total Books",   value: "3,241",  icon: BookOpen, color: "text-[hsl(var(--primary))]", bg: "bg-[hsl(var(--primary)/0.1)]" },
  { label: "Total Reviews", value: "28,754", icon: Star,     color: "text-yellow-400",            bg: "bg-yellow-400/10" },
];

const StatCard = ({ label, value, icon: Icon, color, bg }: typeof stats[0]) => (
  <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl p-5 flex flex-col gap-3 hover:shadow-[0_0_16px_hsl(var(--primary)/0.12)] transition-all duration-300">
    <div className="flex items-center justify-between">
      <span className="text-sm text-[hsl(var(--muted-foreground))]">{label}</span>
      <div className={`w-9 h-9 rounded-md ${bg} flex items-center justify-center`}>
        <Icon className={`w-4 h-4 ${color}`} />
      </div>
    </div>
    <span className="text-3xl font-bold text-[hsl(var(--foreground))] tracking-tight">
      {value}
    </span>
  </div>
);

// ─── Overview ─────────────────────────────────────────────────────────────

const Overview = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(t);
  }, []);

  if (loading) return <OverviewSkeleton />;

  return (
    <div className="p-6 flex flex-col gap-6">
      <div className="flex flex-col gap-1 pb-4 border-b border-[hsl(var(--border))]">
        <h1 className="text-3xl font-bold text-[hsl(var(--primary))]">Admin Dashboard</h1>
        <p className="text-sm text-[hsl(var(--muted-foreground))]">Manage and monitor your BookVerse platform</p>
      </div>
      <h2 className="text-xl font-bold text-[hsl(var(--foreground))]">Overview</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((s) => <StatCard key={s.label} {...s} />)}
      </div>
    </div>
  );

};

export default Overview;