import { createMiddleware } from "next-safe-action";

import { getUser } from "../auth";

export const withSessionMiddleware = createMiddleware<{
  metadata: { name: string };
}>().define(async ({ next }) => {
  const user = await getUser();
  return next({ ctx: { user } });
});
