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

async function fetchContributions(username, token, from, to) {
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

  const data = await response.json();
  if (data.errors) {
    throw new Error(data.errors[0].message);
  }

  return data.data.user;
}

function mergeCalendars(cal1, cal2) {
  // Build a map of date -> count from both calendars
  const dateMap = {};

  for (const user of [cal1, cal2]) {
    if (!user) continue;
    for (const week of user.contributionsCollection.contributionCalendar
      .weeks) {
      for (const day of week.contributionDays) {
        dateMap[day.date] = (dateMap[day.date] || 0) + day.contributionCount;
      }
    }
  }

  // Rebuild weeks structure from cal1 (base), updating counts
  const mergedWeeks =
    cal1.contributionsCollection.contributionCalendar.weeks.map((week) => ({
      contributionDays: week.contributionDays.map((day) => ({
        date: day.date,
        contributionCount: dateMap[day.date] || 0,
      })),
    }));

  const totalContributions = Object.values(dateMap).reduce((a, b) => a + b, 0);

  return {
    totalContributions,
    weeks: mergedWeeks,
  };
}

const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || "";

export default async function handler(req, res) {
  const origin = req.headers.origin || "";
  if (ALLOWED_ORIGIN && origin === ALLOWED_ORIGIN) {
    res.setHeader("Access-Control-Allow-Origin", ALLOWED_ORIGIN);
  } else if (!ALLOWED_ORIGIN) {
    // fallback during local dev when env var is not set
    res.setHeader("Access-Control-Allow-Origin", origin || "*");
  }
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate"); // cache 1hr

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const personalUsername = process.env.GITHUB_USERNAME_PERSONAL;
  const companyUsername = process.env.GITHUB_USERNAME_COMPANY;
  const personalToken = process.env.GITHUB_TOKEN_PERSONAL;
  const companyToken = process.env.GITHUB_TOKEN_COMPANY;

  if (!personalToken || !companyToken) {
    return res.status(500).json({ message: "GitHub tokens not configured" });
  }

  // Fetch last 12 months
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

    // If only one succeeded, return that one directly
    const baseData = personalData || companyData;
    const mergedCalendar =
      personalData && companyData
        ? mergeCalendars(personalData, companyData)
        : baseData.contributionsCollection.contributionCalendar;

    const personalStats = personalData?.contributionsCollection || {};
    const companyStats = companyData?.contributionsCollection || {};

    return res.status(200).json({
      calendar: mergedCalendar,
      accounts: [
        personalData && {
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
        companyData && {
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
      ].filter(Boolean),
    });
  } catch (err) {
    console.error("GitHub contributions error:", err.message);
    return res.status(500).json({ message: err.message });
  }
}
