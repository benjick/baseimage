import { z } from "zod";

export const metadataSchema = z.object({
  name: z.string(),
});

export type Metadata = z.infer<typeof metadataSchema>;
