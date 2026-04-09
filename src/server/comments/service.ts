import { CommentStatus, CommentTargetType } from "@prisma/client";
import { z } from "zod";

import { prisma } from "@/lib/prisma";
import { hasHoneypot, hasSensitiveWords } from "@/server/comments/filter";
import { assertWithinRateLimit, hashIdentifier } from "@/server/comments/rate-limit";
import { getSiteSettings } from "@/server/settings/site-settings";

export const commentInputSchema = z.object({
  targetType: z.nativeEnum(CommentTargetType),
  targetId: z.string().min(1),
  nickname: z.string().min(1).max(30),
  content: z.string().min(1).max(1000),
  honeypot: z.string().optional(),
  ip: z.string().default("0.0.0.0"),
  userAgent: z.string().default("unknown"),
});

export async function listVisibleComments(targetType?: CommentTargetType, targetId?: string) {
  return prisma.comment.findMany({
    where: {
      status: CommentStatus.VISIBLE,
      ...(targetType ? { targetType } : {}),
      ...(targetId ? { targetId } : {}),
    },
    orderBy: { createdAt: "desc" },
    take: targetType && targetId ? 50 : 12,
  });
}

export async function submitComment(input: z.infer<typeof commentInputSchema>) {
  const parsed = commentInputSchema.parse(input);
  const settings = await getSiteSettings();

  if (!settings.commentsEnabled) {
    throw new Error("评论已关闭。");
  }

  if (hasHoneypot(parsed.honeypot)) {
    throw new Error("评论提交失败。");
  }

  if (hasSensitiveWords(parsed.content)) {
    throw new Error("评论内容包含受限词。");
  }

  const ipHash = hashIdentifier(parsed.ip);
  const uaHash = hashIdentifier(parsed.userAgent);
  await assertWithinRateLimit(ipHash);

  return prisma.comment.create({
    data: {
      targetType: parsed.targetType,
      targetId: parsed.targetId,
      nickname: parsed.nickname,
      content: parsed.content,
      status: CommentStatus.VISIBLE,
      ipHash,
      uaHash,
      postId: parsed.targetType === CommentTargetType.POST ? parsed.targetId : null,
      caseStudyId: parsed.targetType === CommentTargetType.CASE ? parsed.targetId : null,
    },
  });
}

export async function hideComment(id: string) {
  return prisma.comment.update({
    where: { id },
    data: { status: CommentStatus.HIDDEN },
  });
}
