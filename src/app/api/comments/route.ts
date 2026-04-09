import { NextRequest, NextResponse } from "next/server";

import { submitComment } from "@/server/comments/service";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as {
      targetType: "POST" | "CASE" | "GUESTBOOK";
      targetId: string;
      nickname: string;
      content: string;
      honeypot?: string;
    };

    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded?.split(",")[0]?.trim() || "0.0.0.0";
    const userAgent = request.headers.get("user-agent") || "unknown";

    await submitComment({
      targetType: body.targetType,
      targetId: body.targetId,
      nickname: body.nickname,
      content: body.content,
      honeypot: body.honeypot,
      ip,
      userAgent,
    });

    return NextResponse.json({ ok: true, message: "评论已发布" });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        message: error instanceof Error ? error.message : "评论提交失败",
      },
      { status: 400 },
    );
  }
}
