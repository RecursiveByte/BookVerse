export type User = { id: string; role: string } | null;

export interface UserRes {
    id: number;
    name: string;
    email: string;
    role: "admin" | "user";
  }


  export interface StatsResponse {
    totalUsers: number;
    totalBooks: number;
    totalReviews: number;
    recentBooks: { title: string; author: string; createdAt: string }[];
    recentReviews: { rating: number | null; createdAt: string; book: { title: string }; user: { email: string } }[];
  }