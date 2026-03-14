export type User = { id: string; role: string } | null;

export interface UserRes {
    id: number;
    name: string;
    email: string;
    role: "admin" | "user";
  }