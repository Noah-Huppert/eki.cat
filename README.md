# eki.cat
🚆🐈

# Development
Nextjs and Postgres are used. Docker compose which runs both.

Change to the `ekicat/` directory, then:

1. Install NodeJS dependencies:
   ```shell
   npm install
   ```
2. Start Docker Compose

   ``` shell
   docker compose up -d
   ```
3. Run psql in docker compose in order to follow the [Database Setup instructions](#database-setup):

   ``` shell
   ./scripts/psql.sh -f /app/scripts/pg-setup.sql
   ```
4. Migrate the dev database:
   ```shell
   npm run db:migrate
   ```

After changing schemas run `npm run db:generate`

# Operations
## Database Setup
Ensure the database has the required extensions installed by running the [`scripts/pg-setup.sql`](./scripts/pg-setup.sql) file:

``` shell
psql -f scripts/pg-setup.sql
```

> Note: `scripts/pg-setup.sql` refers to a file **inside** the postgres container. A mount for the [`scripts/`](./scripts) directory is configured in the [`docker-compose.yaml`](./docker-compose.yaml) file.
