import { headers } from "next/headers";

import { env } from "@/env";

export async function getUser(): Promise<string> {
  const authHeaderName = env.AUTH_HEADER_NAME;
  if (!authHeaderName) {
    return "unauthenticated";
  }
  const authHeader = (await headers()).get(authHeaderName);
  if (!authHeader) {
    return "unauthenticated";
  }
  return authHeader;
}
