import { defineConfig, loadEnv } from "vite";
import type { Connect, Plugin } from "vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";
import type { IncomingMessage, ServerResponse } from "node:http";

const GITHUB_GRAPHQL = "https://api.github.com/graphql";
const CONTRIBUTION_QUERY = `
  query($login: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $login) {
      name
      avatarUrl
      contributionsCollection(from: $from, to: $to) {
        totalCommitContributions
        totalPullRequestContributions
        totalIssueContributions
        restrictedContributionsCount
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              color
            }
          }
        }
      }
    }
  }
`;

interface ContributionDay {
  date: string;
  contributionCount: number;
  color?: string;
}

interface ContributionWeek {
  contributionDays: ContributionDay[];
}

interface ContributionsCollection {
  totalCommitContributions?: number;
  totalPullRequestContributions?: number;
  totalIssueContributions?: number;
  restrictedContributionsCount?: number;
  contributionCalendar: {
    totalContributions: number;
    weeks: ContributionWeek[];
  };
}

interface GitHubUser {
  name: string;
  avatarUrl: string;
  contributionsCollection: ContributionsCollection;
}

async function fetchContributions(
  username: string,
  token: string,
  from: string,
  to: string,
): Promise<GitHubUser> {
  const res = await fetch(GITHUB_GRAPHQL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: CONTRIBUTION_QUERY,
      variables: { login: username, from, to },
    }),
  });
  if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
  const data = (await res.json()) as {
    data?: { user: GitHubUser };
    errors?: Array<{ message: string }>;
  };
  if (data.errors) throw new Error(data.errors[0].message);
  if (!data.data) throw new Error("Missing data in GitHub response");
  return data.data.user;
}

function mergeCalendars(cal1: GitHubUser, cal2: GitHubUser | null) {
  const dateMap: Record<string, number> = {};
  for (const user of [cal1, cal2]) {
    if (!user) continue;
    for (const week of user.contributionsCollection.contributionCalendar.weeks)
      for (const day of week.contributionDays)
        dateMap[day.date] = (dateMap[day.date] || 0) + day.contributionCount;
  }
  const mergedWeeks =
    cal1.contributionsCollection.contributionCalendar.weeks.map((week) => ({
      contributionDays: week.contributionDays.map((day) => ({
        date: day.date,
        contributionCount: dateMap[day.date] || 0,
      })),
    }));
  return {
    totalContributions: Object.values(dateMap).reduce((a, b) => a + b, 0),
    weeks: mergedWeeks,
  };
}

function githubContributionsPlugin(env: Record<string, string>): Plugin {
  return {
    name: "github-contributions-api",
    configureServer(server) {
      const handler: Connect.NextHandleFunction = async (
        _req: IncomingMessage,
        res: ServerResponse,
      ) => {
        res.setHeader("Content-Type", "application/json");
        res.setHeader("Access-Control-Allow-Origin", "*");
        try {
          const personalUsername = env.GITHUB_USERNAME_PERSONAL;
          const companyUsername = env.GITHUB_USERNAME_COMPANY;
          const personalToken = env.GITHUB_TOKEN_PERSONAL;
          const companyToken = env.GITHUB_TOKEN_COMPANY;

          if (!personalToken || !companyToken) {
            res.statusCode = 500;
            res.end(
              JSON.stringify({ message: "GitHub tokens not configured" }),
            );
            return;
          }

          const to = new Date().toISOString();
          const from = new Date(
            Date.now() - 365 * 24 * 60 * 60 * 1000,
          ).toISOString();

          const [personal, company] = await Promise.allSettled([
            fetchContributions(personalUsername, personalToken, from, to),
            fetchContributions(companyUsername, companyToken, from, to),
          ]);

          const personalData =
            personal.status === "fulfilled" ? personal.value : null;
          const companyData =
            company.status === "fulfilled" ? company.value : null;

          if (!personalData && !companyData) {
            res.statusCode = 500;
            res.end(
              JSON.stringify({ message: "Failed to fetch from both accounts" }),
            );
            return;
          }

          const baseData = (personalData || companyData)!;
          const mergedCalendar =
            personalData && companyData
              ? mergeCalendars(personalData, companyData)
              : baseData.contributionsCollection.contributionCalendar;

          const personalStats = personalData?.contributionsCollection;
          const companyStats = companyData?.contributionsCollection;

          const accounts = [
            personalData &&
              personalStats && {
                username: personalUsername,
                name: personalData.name,
                avatar: personalData.avatarUrl,
                totalContributions:
                  personalData.contributionsCollection.contributionCalendar
                    .totalContributions,
                commits: personalStats.totalCommitContributions || 0,
                prs: personalStats.totalPullRequestContributions || 0,
                issues: personalStats.totalIssueContributions || 0,
                privateCount: personalStats.restrictedContributionsCount || 0,
              },
            companyData &&
              companyStats && {
                username: companyUsername,
                name: companyData.name,
                avatar: companyData.avatarUrl,
                totalContributions:
                  companyData.contributionsCollection.contributionCalendar
                    .totalContributions,
                commits: companyStats.totalCommitContributions || 0,
                prs: companyStats.totalPullRequestContributions || 0,
                issues: companyStats.totalIssueContributions || 0,
                privateCount: companyStats.restrictedContributionsCount || 0,
              },
          ].filter(Boolean);

          res.end(JSON.stringify({ calendar: mergedCalendar, accounts }));
        } catch (err) {
          const error = err as Error;
          res.statusCode = 500;
          res.end(JSON.stringify({ message: error.message }));
        }
      };
      server.middlewares.use("/api/github-contributions", handler);
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const isAnalyze = env.ANALYZE === "true";

  return {
    plugins: [
      react(),
      githubContributionsPlugin(env),
      isAnalyze &&
        visualizer({
          filename: "dist/stats.html",
          template: "treemap",
          gzipSize: true,
          brotliSize: true,
          open: false,
        }),
    ].filter(Boolean) as Plugin[],
    server: {
      port: 3000,
      open: true,
    },
    build: {
      outDir: "dist",
      sourcemap: true,
      rollupOptions: {
        output: {
          manualChunks(id: string) {
            if (!id.includes("node_modules")) return;

            if (id.includes("react-router-dom")) return "router";
            if (id.includes("react-helmet-async")) return "seo";
            if (id.includes("react-icons")) return "icons";
            if (id.includes("/three/")) return "three";
            if (id.includes("/react/") || id.includes("/react-dom/")) {
              return "vendor";
            }

            return "vendor";
          },
        },
      },
    },
  };
});
