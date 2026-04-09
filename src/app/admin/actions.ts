"use server";

import { ContentStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { sanitizeContentHtml } from "@/lib/sanitize";
import { hideComment } from "@/server/comments/service";
import { validateAdminCredentials, createAdminSession, clearAdminSession, requireAdmin } from "@/server/auth/session";
import { saveCase } from "@/server/content/cases";
import { savePost } from "@/server/content/posts";
import { upsertSiteSettings } from "@/server/settings/site-settings";
import { runTrendingJob } from "@/server/jobs/trending-job";

export async function loginAction(formData: FormData) {
  const username = String(formData.get("username") || "");
  const password = String(formData.get("password") || "");

  if (!validateAdminCredentials(username, password)) {
    redirect("/admin/login?error=invalid");
  }

  await createAdminSession(username);
  redirect("/admin");
}

export async function logoutAction() {
  await clearAdminSession();
  redirect("/");
}

export async function savePostAction(formData: FormData) {
  await requireAdmin();
  const intent = String(formData.get("intent") || "draft");

  await savePost({
    id: String(formData.get("id") || "") || undefined,
    title: String(formData.get("title") || ""),
    summary: String(formData.get("summary") || ""),
    coverImage: String(formData.get("coverImage") || ""),
    category: String(formData.get("category") || ""),
    tags: String(formData.get("tags") || ""),
    contentHtml: String(formData.get("contentHtml") || "<p></p>"),
    seoTitle: String(formData.get("seoTitle") || ""),
    seoDescription: String(formData.get("seoDescription") || ""),
    status: intent === "publish" ? ContentStatus.PUBLISHED : ContentStatus.DRAFT,
  });

  revalidatePath("/");
  revalidatePath("/articles");
  revalidatePath("/admin/posts");
  redirect("/admin/posts");
}

export async function saveCaseAction(formData: FormData) {
  await requireAdmin();
  const intent = String(formData.get("intent") || "draft");

  await saveCase({
    id: String(formData.get("id") || "") || undefined,
    title: String(formData.get("title") || ""),
    summary: String(formData.get("summary") || ""),
    coverImage: String(formData.get("coverImage") || ""),
    gallery: String(formData.get("gallery") || ""),
    techStack: String(formData.get("techStack") || ""),
    projectUrl: String(formData.get("projectUrl") || ""),
    repoUrl: String(formData.get("repoUrl") || ""),
    contentHtml: String(formData.get("contentHtml") || "<p></p>"),
    seoTitle: String(formData.get("seoTitle") || ""),
    seoDescription: String(formData.get("seoDescription") || ""),
    featured: Boolean(formData.get("featured")),
    status: intent === "publish" ? ContentStatus.PUBLISHED : ContentStatus.DRAFT,
  });

  revalidatePath("/");
  revalidatePath("/cases");
  revalidatePath("/admin/cases");
  redirect("/admin/cases");
}

export async function hideCommentAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  if (id) {
    await hideComment(id);
  }
  revalidatePath("/");
  revalidatePath("/guestbook");
  revalidatePath("/admin/comments");
}

export async function saveTrendSummaryAction(formData: FormData) {
  await requireAdmin();
  const summaryId = String(formData.get("summaryId") || "");
  const editedSummary = String(formData.get("editedSummary") || "");

  if (summaryId) {
    await prisma.gitHubTrendingSummary.update({
      where: { id: summaryId },
      data: {
        editedSummary,
        status: "EDITED",
      },
    });
  }

  revalidatePath("/");
  revalidatePath("/trending");
  revalidatePath("/admin/trending");
}

export async function runTrendingNowAction() {
  await requireAdmin();
  await runTrendingJob("daily");
  revalidatePath("/");
  revalidatePath("/trending");
  revalidatePath("/admin/trending");
}

export async function saveSettingsAction(formData: FormData) {
  await requireAdmin();

  const socialLinks = String(formData.get("socialLinks") || "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [label, url] = line.split("|");
      return {
        label: label?.trim() || "Link",
        url: url?.trim() || "",
      };
    })
    .filter((item) => item.url);

  await upsertSiteSettings({
    heroTitle: String(formData.get("heroTitle") || ""),
    heroIntro: String(formData.get("heroIntro") || ""),
    aboutHtml: sanitizeContentHtml(String(formData.get("aboutHtml") || "")),
    commentsEnabled: Boolean(formData.get("commentsEnabled")),
    socialLinks,
    seoDefaults: {
      title: String(formData.get("seoTitle") || ""),
      description: String(formData.get("seoDescription") || ""),
    },
  });

  revalidatePath("/");
  revalidatePath("/guestbook");
  revalidatePath("/admin/settings");
  redirect("/admin/settings");
}
