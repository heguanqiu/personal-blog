import { listPublishedPosts } from "@/server/content/posts";

export async function GET() {
  const baseUrl = process.env.APP_URL || "http://localhost:3000";
  const posts = await listPublishedPosts().catch(() => []);

  const items = posts
    .map(
      (post) => `
      <item>
        <title><![CDATA[${post.title}]]></title>
        <link>${baseUrl}/articles/${post.slug}</link>
        <description><![CDATA[${post.summary}]]></description>
        <pubDate>${(post.publishedAt || post.createdAt).toUTCString()}</pubDate>
        <guid>${baseUrl}/articles/${post.slug}</guid>
      </item>`,
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0">
    <channel>
      <title>Personal Blog</title>
      <link>${baseUrl}</link>
      <description>GitHub 趋势、文章与案例</description>
      ${items}
    </channel>
  </rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
