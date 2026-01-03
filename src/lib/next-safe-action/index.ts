import { createSafeActionClient } from "next-safe-action";

import { withSessionMiddleware } from "./auth.middleware";
import { handleServerError } from "./error";
import { metadataSchema } from "./metadata";

const baseAction = createSafeActionClient({
  handleServerError,
  defineMetadataSchema: () => metadataSchema,
});

export const action = baseAction.use(withSessionMiddleware);
