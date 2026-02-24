import { GitHub } from "arctic";

export const githubClient = new GitHub(
  process.env.GITHUB_CLIENT_ID!,
  process.env.GITHUB_CLIENT_SECRET!,
  `${process.env.BACKEND_URL}/api/auth/github/callback`
);