import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";

import { cfg } from "@/config/get";
import * as schema from "./schema";

export const db = drizzle(cfg.dbUri!, { schema });
