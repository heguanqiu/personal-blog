import sanitizeHtml from "sanitize-html";

const allowedTags = [
  "p",
  "h1",
  "h2",
  "h3",
  "blockquote",
  "pre",
  "code",
  "ul",
  "ol",
  "li",
  "strong",
  "em",
  "a",
  "img",
  "hr",
  "br",
];

export function sanitizeContentHtml(html: string) {
  return sanitizeHtml(html, {
    allowedTags,
    allowedAttributes: {
      a: ["href", "target", "rel"],
      img: ["src", "alt"],
      code: ["class"],
    },
    allowedSchemes: ["http", "https", "mailto"],
    transformTags: {
      a: sanitizeHtml.simpleTransform("a", {
        rel: "noopener noreferrer nofollow",
        target: "_blank",
      }),
    },
  });
}
