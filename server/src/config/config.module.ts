import { Injectable, Module, Provider } from '@nestjs/common';
import "dotenv/config";
import { z } from "zod";

/**
 * Schema of config values.
 **/
export const CONFIG_SCHEMA = z.object({
    databaseURI: z.string().default("postgresql://ekicatdev:ekicatdev@postgres/ekicatdev"),
});

/**
 * Type alias for {@link CONFIG_SCHEMA}.
 **/
@Injectable()
export type Config = z.infer<typeof CONFIG_SCHEMA>;

export function getConfig(): Config {
    const res = CONFIG_SCHEMA.safeParse({
        databaseURI: process.env.DATABASE_URI,
    });

    if (res.success === false) {
        throw new Error(`Failed to load config: ${res.error}`);
    }

    return res.data;
}

/**
 * Load {@link Config} from environment variables.
 **/
const configProvider: Provider = {
    provide: "cfg",
    useFactory: getConfig,
};


@Module({
    providers: [
        configProvider,
    ],
})
export class ConfigModule {}
