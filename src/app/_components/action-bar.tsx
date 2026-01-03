"use client";

import { Loader2Icon } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";

import { generatePost, seedPosts } from "../actions";
import { Button } from "@/components/ui/button";
import { onActionError } from "@/lib/next-safe-action/helper";

export function ActionBar() {
  const seedPostsAction = useAction(seedPosts, {
    onError: onActionError,
    onSuccess: () => {
      toast.success("Posts seeded successfully");
    },
  });

  const generatePostAction = useAction(generatePost, {
    onError: onActionError,
    onSuccess: () => {
      toast.success("Post generated successfully");
    },
  });
  return (
    <div className="flex gap-4">
      <Button onClick={() => seedPostsAction.execute()} variant="outline">
        {seedPostsAction.isPending && (
          <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
        )}
        Seed Posts
      </Button>
      <Button onClick={() => generatePostAction.execute()}>
        {generatePostAction.isPending && (
          <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
        )}
        Generate AI Post
      </Button>
    </div>
  );
}
