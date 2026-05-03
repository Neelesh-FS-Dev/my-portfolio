import type {
  GitHubContributionsCollection,
  GitHubUser,
  VercelRequest,
  VercelResponse,
} from "./_types";

export const config = {
  api: {
    bodyParser: false,
  },
};

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

interface GraphQLResponse {
  data?: { user: GitHubUser };
  errors?: Array<{ message: string }>;
}

interface MergedCalendar {
  totalContributions: number;
  weeks: Array<{
    contributionDays: Array<{ date: string; contributionCount: number }>;
  }>;
}

async function fetchContributions(
  username: string,
  token: string,
  from: string,
  to: string,
): Promise<GitHubUser> {
  const response = await fetch(GITHUB_GRAPHQL, {
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

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status}`);
  }

  const data = (await response.json()) as GraphQLResponse;
  if (data.errors) {
    throw new Error(data.errors[0].message);
  }
  if (!data.data) {
    throw new Error("Missing data in GitHub response");
  }

  return data.data.user;
}

function mergeCalendars(cal1: GitHubUser, cal2: GitHubUser): MergedCalendar {
  const dateMap: Record<string, number> = {};

  for (const user of [cal1, cal2]) {
    if (!user) continue;
    for (const week of user.contributionsCollection.contributionCalendar
      .weeks) {
      for (const day of week.contributionDays) {
        dateMap[day.date] = (dateMap[day.date] || 0) + day.contributionCount;
      }
    }
  }

  const mergedWeeks =
    cal1.contributionsCollection.contributionCalendar.weeks.map((week) => ({
      contributionDays: week.contributionDays.map((day) => ({
        date: day.date,
        contributionCount: dateMap[day.date] || 0,
      })),
    }));

  const totalContributions = Object.values(dateMap).reduce((a, b) => a + b, 0);

  return { totalContributions, weeks: mergedWeeks };
}

const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || "";

interface AccountSummary {
  username: string;
  name: string;
  avatar: string;
  totalContributions: number;
  commits: number;
  prs: number;
  issues: number;
  privateCount: number;
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  const origin = (req.headers.origin as string) || "";
  if (ALLOWED_ORIGIN && origin === ALLOWED_ORIGIN) {
    res.setHeader("Access-Control-Allow-Origin", ALLOWED_ORIGIN);
  } else if (!ALLOWED_ORIGIN) {
    res.setHeader("Access-Control-Allow-Origin", origin || "*");
  }
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate");

  if (req.method === "OPTIONS") return res.status(200).send("");
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const personalUsername = process.env.GITHUB_USERNAME_PERSONAL;
  const companyUsername = process.env.GITHUB_USERNAME_COMPANY;
  const personalToken = process.env.GITHUB_TOKEN_PERSONAL;
  const companyToken = process.env.GITHUB_TOKEN_COMPANY;

  if (
    !personalToken ||
    !companyToken ||
    !personalUsername ||
    !companyUsername
  ) {
    return res.status(500).json({ message: "GitHub tokens not configured" });
  }

  const to = new Date().toISOString();
  const from = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString();

  try {
    const [personal, company] = await Promise.allSettled([
      fetchContributions(personalUsername, personalToken, from, to),
      fetchContributions(companyUsername, companyToken, from, to),
    ]);

    const personalData =
      personal.status === "fulfilled" ? personal.value : null;
    const companyData = company.status === "fulfilled" ? company.value : null;

    if (!personalData && !companyData) {
      return res
        .status(500)
        .json({ message: "Failed to fetch from both accounts" });
    }

    const baseData = (personalData || companyData) as GitHubUser;
    const mergedCalendar: MergedCalendar | GitHubContributionsCollection["contributionCalendar"] =
      personalData && companyData
        ? mergeCalendars(personalData, companyData)
        : baseData.contributionsCollection.contributionCalendar;

    const personalStats = personalData?.contributionsCollection;
    const companyStats = companyData?.contributionsCollection;

    const accounts: AccountSummary[] = [];
    if (personalData && personalStats) {
      accounts.push({
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
      });
    }
    if (companyData && companyStats) {
      accounts.push({
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
      });
    }

    return res.status(200).json({ calendar: mergedCalendar, accounts });
  } catch (err) {
    const error = err as Error;
    console.error("GitHub contributions error:", error.message);
    return res.status(500).json({ message: error.message });
  }
}
