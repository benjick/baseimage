import { drizzle } from "drizzle-orm/node-postgres";

import * as schema from "./schema";
import { env } from "@/env";

// You can specify any property from the node-postgres connection options
export const db = drizzle({
  connection: {
    connectionString: env.DATABASE_URL,
    ssl: false,
  },
  schema,
});
