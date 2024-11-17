import { customType } from 'drizzle-orm/pg-core';

/**
 * Large bytes storage type
 * Postgres bytea type.
 **/
export const bytea = customType<{ data: Buffer }>({
  dataType() {
    return "bytea";
  },
});

export const ltree = customType<{ data: string }>({
    dataType() {
        return "ltree";
    },
});
