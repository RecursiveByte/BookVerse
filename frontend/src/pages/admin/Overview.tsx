import { useState, useEffect } from "react";
import { Users, BookOpen, Star, TrendingUp, Activity } from "lucide-react";
import { getStats } from "@/services/admin.service";
import type{ StatsResponse } from "@/types/user.type";
import { showError } from "@/utils/toast";

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
  <div className="p-6 flex flex-col gap-6">
    <div className="flex flex-col gap-1 pb-4 border-b border-[hsl(var(--border))]">
      <div className="animate-pulse h-8 w-48 rounded-md bg-[hsl(var(--primary)/0.08)]" />
      <div className="animate-pulse h-4 w-64 rounded-md bg-[hsl(var(--primary)/0.08)]" />
    </div>
    <div className="animate-pulse h-6 w-32 rounded-md bg-[hsl(var(--primary)/0.08)]" />
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {[...Array(3)].map((_, i) => <StatCardSkeleton key={i} />)}
    </div>
    <div className="animate-pulse h-6 w-40 rounded-md bg-[hsl(var(--primary)/0.08)]" />
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {[...Array(2)].map((_, i) => (
        <div key={i} className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl p-5 flex flex-col gap-3">
          <div className="animate-pulse h-4 w-32 rounded-sm bg-[hsl(var(--primary)/0.08)]" />
          <div className="flex flex-col gap-2">
            {[...Array(4)].map((_, j) => (
              <div key={j} className="animate-pulse h-3 w-full rounded-sm bg-[hsl(var(--primary)/0.08)]" />
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

const StatCard = ({
  label,
  value,
  icon: Icon,
  color,
  bg,
}: {
  label: string;
  value: number;
  icon: React.ElementType;
  color: string;
  bg: string;
}) => (
  <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl p-5 flex flex-col gap-3 hover:shadow-[0_0_16px_hsl(var(--primary)/0.12)] transition-all duration-300">
    <div className="flex items-center justify-between">
      <span className="text-sm text-[hsl(var(--muted-foreground))]">{label}</span>
      <div className={`w-9 h-9 rounded-md ${bg} flex items-center justify-center`}>
        <Icon className={`w-4 h-4 ${color}`} />
      </div>
    </div>
    <span className="text-3xl font-bold text-[hsl(var(--foreground))] tracking-tight">
      {value.toLocaleString()}
    </span>
    <div className="flex items-center gap-1">
      <TrendingUp className="w-3 h-3 text-[hsl(var(--primary))]" />
      <span className="text-xs text-[hsl(var(--muted-foreground))]">all time</span>
    </div>
  </div>
);

const formatDate = (dateStr: string) => {
  const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
};

const Overview = () => {
  const [stats, setStats] = useState<StatsResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await getStats();
        setStats(res.data);
      } catch {
        showError("Failed to fetch stats");
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <OverviewSkeleton />;

  return (
    <div className="p-6 flex flex-col gap-6">

      <div className="flex flex-col gap-1 pb-4 border-b border-[hsl(var(--border))]">
        <h1 className="text-3xl font-bold text-[hsl(var(--primary))]">Admin Dashboard</h1>
        <p className="text-sm text-[hsl(var(--muted-foreground))]">Manage and monitor your BookVerse platform</p>
      </div>

      <div className="flex items-center gap-2">
        <Activity className="w-4 h-4 text-[hsl(var(--primary))]" />
        <h2 className="text-base font-semibold text-[hsl(var(--foreground))]">Overview</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard label="Total Users"   value={stats?.totalUsers ?? 0}   icon={Users}    color="text-blue-400"                       bg="bg-blue-400/10" />
        <StatCard label="Total Books"   value={stats?.totalBooks ?? 0}   icon={BookOpen} color="text-[hsl(var(--primary))]"         bg="bg-[hsl(var(--primary)/0.1)]" />
        <StatCard label="Total Reviews" value={stats?.totalReviews ?? 0} icon={Star}     color="text-yellow-400"                     bg="bg-yellow-400/10" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

        <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl p-5 flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[hsl(var(--primary))]" />
            <h3 className="text-sm font-semibold text-[hsl(var(--foreground))]">Recently Added Books</h3>
          </div>
          <div className="flex flex-col divide-y divide-[hsl(var(--border))]">
            {stats?.recentBooks.map((book) => (
              <div key={book.title} className="flex items-center justify-between py-2.5">
                <div className="flex flex-col gap-0.5 min-w-0">
                  <span className="text-sm font-medium truncate text-[hsl(var(--foreground))]">{book.title}</span>
                  <span className="text-xs text-[hsl(var(--muted-foreground))]">{book.author}</span>
                </div>
                <span className="text-xs text-[hsl(var(--muted-foreground))] shrink-0 ml-4">{formatDate(book.createdAt)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl p-5 flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-yellow-400" />
            <h3 className="text-sm font-semibold text-[hsl(var(--foreground))]">Recent Reviews</h3>
          </div>
          <div className="flex flex-col divide-y divide-[hsl(var(--border))]">
            {stats?.recentReviews.map((review) => (
              <div key={review.user.email + review.book.title} className="flex items-center justify-between py-2.5">
                <div className="flex flex-col gap-0.5 min-w-0">
                  <span className="text-sm font-medium truncate text-[hsl(var(--foreground))]">{review.book.title}</span>
                  <span className="text-xs text-[hsl(var(--muted-foreground))] truncate">{review.user.email}</span>
                </div>
                <div className="flex flex-col items-end gap-0.5 shrink-0 ml-4">
                  <span className="text-xs text-yellow-400">{"★".repeat(review.rating ?? 0)}{"☆".repeat(5 - (review.rating ?? 0))}</span>
                  <span className="text-xs text-[hsl(var(--muted-foreground))]">{formatDate(review.createdAt)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Overview;