# eki.cat
🚆🐈

# Development
Nextjs is used along side Docker compose which runs a local Postgres.

1. Start local Postgres:

   ``` shell
   docker compose up -d
   ```
2. Run psql in docker compose in order to follow the [Database Setup instructions](#database-setup):

   ``` shell
   ./scripts/psql.sh -f /app/scripts/pg-setup.sql
   ```
3. Install node dependencies:
   ```shell
   npm install
   ```
4. Migrate the dev database:
   ```shell
   npm run db:migrate
   ```
5. Start a dev server:
   ```shell
   npm run dev
   ```

After changing schemas run `npm run db:generate`

# Operations
## Database Setup
Ensure the database has the required extensions installed by running the [`scripts/pg-setup.sql`](./scripts/pg-setup.sql) file:

``` shell
psql -f scripts/pg-setup.sql
```

> Note: `scripts/pg-setup.sql` refers to a file **inside** the postgres container. A mount for the [`scripts/`](./scripts) directory is configured in the [`docker-compose.yaml`](./docker-compose.yaml) file.
