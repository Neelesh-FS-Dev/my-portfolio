import type { IncomingMessage, ServerResponse } from "node:http";

export interface VercelRequest extends IncomingMessage {
  body: unknown;
  query: Record<string, string | string[] | undefined>;
}

export interface VercelResponse extends ServerResponse {
  status: (statusCode: number) => VercelResponse;
  json: (body: unknown) => VercelResponse;
  send: (body: unknown) => VercelResponse;
}

export interface ContactFormBody {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export interface GitHubContributionDay {
  date: string;
  contributionCount: number;
  color?: string;
}

export interface GitHubContributionWeek {
  contributionDays: GitHubContributionDay[];
}

export interface GitHubContributionsCollection {
  totalCommitContributions?: number;
  totalPullRequestContributions?: number;
  totalIssueContributions?: number;
  restrictedContributionsCount?: number;
  contributionCalendar: {
    totalContributions: number;
    weeks: GitHubContributionWeek[];
  };
}

export interface GitHubUser {
  name: string;
  avatarUrl: string;
  contributionsCollection: GitHubContributionsCollection;
}
