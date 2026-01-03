import { DEFAULT_SERVER_ERROR_MESSAGE } from "next-safe-action";
import { ZodError } from "zod";

import { PublicError } from "../errors";
import type { Metadata } from "./metadata";
import { env } from "@/env";

export function handleServerError(
  e: unknown,
  utils: {
    metadata: Metadata;
  },
) {
  if (env.NODE_ENV === "development") {
    // The logger isn't too helpful with stack traces, so we log to the console in development

    console.error(e);
  }
  if (e instanceof PublicError) {
    console.error(
      { message: e.message, metadata: utils.metadata },
      "🚨 PublicError",
    );
    return e.message;
  }
  if (e instanceof ZodError) {
    console.error(
      { issues: e.issues, metadata: utils.metadata },
      "🚨 ZodError",
    );
    return e.issues[0]?.message ?? "Validation error";
  }
  if (e instanceof Error) {
    console.error(
      { message: e.message, name: e.name, metadataName: utils.metadata.name },
      "🚨 Error in next-safe-action",
    );
  }
  return DEFAULT_SERVER_ERROR_MESSAGE;
}
