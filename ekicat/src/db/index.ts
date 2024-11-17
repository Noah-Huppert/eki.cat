import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";

import { cfg } from "@/config/get";

export const db = drizzle(cfg.dbUri!);
