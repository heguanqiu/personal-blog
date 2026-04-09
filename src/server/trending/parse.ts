import { load } from "cheerio";

import { toInt } from "@/lib/utils";

export type ParsedTrendingRepo = {
  repoFullName: string;
  owner: string;
  repoName: string;
  description: string;
  language: string | null;
  starsTotal: number;
  forks: number;
  starsGained: number;
  rank: number;
  keywords: string[];
};

function extractKeywords(input: string) {
  const words = input
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fa5\s-]/g, " ")
    .split(/\s+/)
    .filter((word) => word.length > 2);

  return [...new Set(words)].slice(0, 8);
}

export function parseTrendingHtml(html: string): ParsedTrendingRepo[] {
  const $ = load(html);
  const repos: ParsedTrendingRepo[] = [];

  $("article.Box-row").each((index, element) => {
    const repoHref = $(element).find("h2 a").attr("href")?.trim();
    if (!repoHref) {
      return;
    }

    const repoFullName = repoHref.replace(/^\//, "").replace(/\s+/g, "");
    const [owner, repoName] = repoFullName.split("/");
    const description = $(element).find("p").first().text().trim();
    const language = $(element).find('span[itemprop="programmingLanguage"]').text().trim() || null;
    const stats = $(element).find("a.Link--muted");
    const starsTotal = toInt(stats.eq(0).text());
    const forks = toInt(stats.eq(1).text());
    const starsGained = toInt($(element).find("span.d-inline-block.float-sm-right").text());

    repos.push({
      repoFullName,
      owner,
      repoName,
      description,
      language,
      starsTotal,
      forks,
      starsGained,
      rank: index + 1,
      keywords: extractKeywords(`${repoName} ${description}`),
    });
  });

  return repos;
}
