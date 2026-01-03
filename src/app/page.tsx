import { desc } from "drizzle-orm";

import { ActionBar } from "./_components/action-bar";
import { ClientOnly } from "@/components/client-only";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { db } from "@/db";
import { postsTable } from "@/db/schema";
export const dynamic = "force-dynamic";

export default async function Page() {
  const posts = await db
    .select()
    .from(postsTable)
    .orderBy(desc(postsTable.createdAt));

  return (
    <div className="flex h-full w-full flex-col items-center justify-start p-8 gap-8">
      <div className="flex flex-col items-center gap-4 text-center">
        <h1 className="text-4xl font-bold">Latest Posts</h1>
        <p className="text-muted-foreground">
          This content is served from the database.
        </p>

        <ActionBar />
      </div>

      <div className="w-full max-w-2xl grid gap-4">
        {posts.length === 0 ? (
          <div className="text-center p-8 border rounded-lg text-muted-foreground">
            No posts found. Click &quot;Seed Posts&quot; to add some data.
          </div>
        ) : (
          posts.map((post) => (
            <Card key={post.id} className="w-full">
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
                <CardDescription>
                  {new Date(post.createdAt).toLocaleDateString("sv-SE")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>{post.content}</p>
              </CardContent>
            </Card>
          ))
        )}
      </div>
      <ClientOnly>Test</ClientOnly>
    </div>
  );
}
