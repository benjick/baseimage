"use server";

import { google } from "@ai-sdk/google";
import { generateText } from "ai";
import { revalidatePath } from "next/cache";

import { db } from "@/db";
import { postsTable } from "@/db/schema";
import { model } from "@/lib/ai";
import { action } from "@/lib/next-safe-action";

export const generatePost = action
  .metadata({
    name: "generate-post",
  })
  .action(async () => {
    const { text: generatedText } = await generateText({
      model: google(model),
      prompt: "Write a short, one-sentence interesting fact about technology.",
    });

    await db.insert(postsTable).values({
      title: "AI Generated Fact",
      content: generatedText,
    });

    revalidatePath("/");
  });

export const seedPosts = action
  .metadata({
    name: "seed-posts",
  })
  .action(async () => {
    await db.insert(postsTable).values([
      {
        title: "First Post",
        content: "This is a test post to verify DB connectivity.",
      },
    ]);
    revalidatePath("/");
  });
