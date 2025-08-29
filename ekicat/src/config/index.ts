import { z } from 'zod';

const configShape = z.object({
    dbUri: z.string().default("postgres://ekicatdev:ekicatdev@postgres:5432/ekicatdev"),
});
export type Config = z.infer<typeof configShape>;

/**
 * Load configuration from environment.
 **/
export function LoadConfig(): Config {
    const res = configShape.safeParse({
        dbUri: process.env.DB_URI,
    });

    if (res.success === false) {
        throw new Error(`Failed to load configuration from environment: ${res.error}`);
    }

    return res.data;
}
