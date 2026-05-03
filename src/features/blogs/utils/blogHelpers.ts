import type { BlogContentBlock } from "../types";

export function getBlogContentText(content: BlogContentBlock[] = []) {
  return content
    .map((block) => block.text)
    .filter(Boolean)
    .join(" ");
}

export function getIsoMonthDate(dateLabel: string | undefined) {
  const match = /^([A-Za-z]{3})\s+(\d{4})$/.exec(dateLabel || "");
  if (!match) return undefined;

  const month = (
    {
      Jan: "01",
      Feb: "02",
      Mar: "03",
      Apr: "04",
      May: "05",
      Jun: "06",
      Jul: "07",
      Aug: "08",
      Sep: "09",
      Oct: "10",
      Nov: "11",
      Dec: "12",
    } as Record<string, string>
  )[match[1]];

  return month ? `${match[2]}-${month}-01` : undefined;
}

export function getReadTimeMinutes(readTime: string) {
  const minutes = parseInt(readTime, 10);
  return Number.isNaN(minutes) ? 5 : minutes;
}
