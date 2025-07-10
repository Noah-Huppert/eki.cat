import { Provider } from "@nestjs/common";
import { drizzle } from "drizzle-orm/node-postgres";
import { Config } from "src/config/config.module";

export const dbProvider: Provider = {
    provide: 'db',
    useFactory: (cfg: Config) => {
        const db = drizzle(cfg.databaseURI)
        return db;
    };
}
