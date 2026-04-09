"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

type CommentFormProps = {
  targetType: "POST" | "CASE" | "GUESTBOOK";
  targetId: string;
};

export function CommentForm({ targetType, targetId }: CommentFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [nickname, setNickname] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    const formData = new FormData(event.currentTarget);
    const honeypot = String(formData.get("company") || "");

    startTransition(async () => {
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          targetType,
          targetId,
          nickname,
          content,
          honeypot,
        }),
      });

      const data = (await response.json()) as { message?: string };

      if (!response.ok) {
        setMessage(data.message || "评论提交失败");
        return;
      }

      setNickname("");
      setContent("");
      setMessage("评论已发布。");
      router.refresh();
    });
  }

  return (
    <form onSubmit={handleSubmit} className="glass card">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="section-title">匿名评论</p>
          <h3 className="mt-2 text-2xl font-semibold">不用登录，直接说话</h3>
        </div>
        <span className="text-sm text-[var(--muted)]">带有限流与敏感词过滤</span>
      </div>
      <div className="mt-6 grid gap-4">
        <input
          className="field"
          value={nickname}
          onChange={(event) => setNickname(event.target.value)}
          placeholder="你的昵称"
          required
        />
        <textarea
          className="field min-h-32"
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder="留下你的评论"
          required
        />
        <input name="company" className="hidden" tabIndex={-1} autoComplete="off" />
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-[var(--muted)]">{message}</p>
          <button disabled={isPending} className="btn btn-primary" type="submit">
            {isPending ? "提交中..." : "发布评论"}
          </button>
        </div>
      </div>
    </form>
  );
}
