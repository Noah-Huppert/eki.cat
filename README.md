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
   docker compose exec postgres psql postgres://ekicatdev:ekicatdev@localhost/ekicatdev -f /app/operations/pg-setup.sql
   ```
3. Install node dependencies:
   ```shell
   npm install
   ```
4. Migrate the dev database:
   ```shell
   npm run db:migrate
   ```

After changing schemas run `npm run db:generate`

# Operations
## Database Setup
Ensure the database has the required extensions installed by running the [`operations/pg-setup.sql`](./operations/pg-setup.sql) file:

``` shell
psql -f ./operations/pg-setup.sql
```
