import { execFile } from "node:child_process";
import { promisify } from "node:util";

const BASE_URL = "https://github.com/trending";
const execFileAsync = promisify(execFile);

export async function fetchGitHubTrendingHtml(period: "daily" | "weekly", language?: string) {
  const url = new URL(BASE_URL);
  url.searchParams.set("since", period);
  if (language && language !== "all") {
    url.pathname = `${url.pathname}/${language}`;
  }

  try {
    const response = await fetch(url.toString(), {
      headers: {
        "User-Agent": "personal-blog-bot/1.0",
        Accept: "text/html,application/xhtml+xml",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch trending HTML: ${response.status}`);
    }

    return response.text();
  } catch (error) {
    const { stdout } = await execFileAsync("curl", [
      "-L",
      "--max-time",
      "20",
      "-H",
      "User-Agent: personal-blog-bot/1.0",
      "-H",
      "Accept: text/html,application/xhtml+xml",
      url.toString(),
    ]);

    if (!stdout.trim()) {
      throw error;
    }

    return stdout;
  }
}
