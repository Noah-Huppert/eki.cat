import { pgEnum, integer, pgTable, text, timestamp, geometry } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { bytea, ltree } from "@/db/coltypes";

/**
 * Describes the confidence of a timestamp by identifying the most specific column that can be relied upon.
 **/
export const timestampAccuracy = pgEnum("timestamp_accuracy", ["year", "month", "day", "hour", "minute", "second", "millisecond", "microsecond"]);

/**
 * Stores data for many types of media.
 * The mimeType field determines how data is formated.
 * @param id - Unique identifier
 * @param title - Short description
 * @param createdAt - When the row was inserted into the database
 * @param recordedAt - When the data was recorded, see {@link recordedAtAccuracy}
 * @param recordedAtAccuracy - How accurate {@link recordedAt} is
 * @param mimeType - The MIME type of {@link data}
 * @param data - Binary data formatted according to {@link mimeType}
 **/
export const mediaBlob = pgTable("media_blobs", {
    id: integer().primaryKey(),
    title: text().notNull(),
    createdAt: timestamp().notNull(),
    recordedAt: timestamp().notNull(),
    recordedAtAccuracy: timestampAccuracy().notNull(),
    mimeType: text().notNull(),
    data: bytea().notNull(),
});

/**
 * Any type of location.
 * @param id - Unique identifier
 * @param geometry - Spatial data
 */
export const location = pgTable("locations", {
    id: integer().primaryKey(),
    geometry: geometry().notNull(),
});

/**
 * Node in graph of information represented by website.
 **/
export const node = pgTable("nodes", {
    id: integer().primaryKey(),
    pathId: text().notNull(),
    path: ltree().notNull(),
    locationId: integer().notNull().references(() => location.id),
});

export const nodeRelations = relations(node, ({ one, many }) => ({
    location: one(location),
    nodeMediaBlobs: many(nodeMediaBlob),
})) 

/**
 * Links media blobs to nodes.
 **/
export const nodeMediaBlob = pgTable("node_media_blobs", {
    id: integer().primaryKey(),
    nodeId: integer().notNull().references(() => node.id),
    mediaBlobId: integer().notNull().references(() => mediaBlob.id),
});

export const nodeMediaBlobRelations = relations(nodeMediaBlob, ({ one }) => ({
    node: one(node),
    mediaBlob: one(mediaBlob),
}));
