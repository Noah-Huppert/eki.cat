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
export type MediaBlobRow = typeof mediaBlob.$inferInsert;

/**
 * Any type of location.
 * @param id - Unique identifier
 * @param geometry - Spatial data
 */
export const location = pgTable("locations", {
    id: integer().primaryKey(),
    geometry: geometry().notNull(),
});
export type LocationRow = typeof location.$inferInsert;

/**
 * Node in graph of information represented by website.
 * @param id - Unique identifier
 **/
export const node = pgTable("nodes", {
    id: integer().primaryKey(),
});
export type NodeRow = typeof node.$inferInsert;

/**
 * Relations for a {@link node}
 **/
export const nodeRelations = relations(node, ({ one, many }) => ({
    locations: many(nodeLocation),
    edges: many(nodeEdge),
    mediaBlobs: many(nodeMediaBlob),
}));

/**
 * Places a node in an undirected graph.
 * @param id - Unique identifier
 * @param sourceNodeId - The node of which an edge is being defined
 * @param targetNodeId - The node between which an edge exists
 **/
export const nodeEdge = pgTable("node_edges", {
    id: integer().primaryKey(),
    sourceNodeId: integer().notNull().references(() => node.id),
    targetNodeId: integer().notNull().references(() => node.id),
});
export type NodeEdgeRow = typeof nodeEdge.$inferInsert;

/**
 * Relations for {@link nodeEdge}.
 */
export const nodeEdgeRelations = relations(nodeEdge, ({ one }) => ({
    sourceNode: one(node, {
        fields: [nodeEdge.sourceNodeId],
        references: [node.id],
    }),
    targetNode: one(node, {
        fields: [nodeEdge.targetNodeId],
        references: [node.id],
    }),
}));

/**
 * Links a location to a node.
 * @param id - Unique identifier
 * @param nodeId - Node being linked
 * @param locationId - Location being linked
 **/
export const nodeLocation = pgTable("node_locations", {
    id: integer().primaryKey(),
    nodeId: integer().notNull(),
    locationId: integer().notNull(),
});
export type NodeLocationRow = typeof nodeLocation.$inferInsert;

export const nodeLocationRelations = relations(nodeLocation, ({ one }) => ({
    node: one(node, {
        fields: [nodeLocation.nodeId],
        references: [node.id],
    }),
    location: one(node, {
        fields: [nodeLocation.locationId],
        references: [location.id],
    }),
}));

/**
 * Links media blobs to nodes.
 * @param id - Unique identifier
 * @param nodeId - The node to which the media blob is being linked
 * @param mediaBlobId - ID of media blob being linked
 **/
export const nodeMediaBlob = pgTable("node_media_blobs", {
    id: integer().primaryKey(),
    nodeId: integer().notNull().references(() => node.id),
    mediaBlobId: integer().notNull().references(() => mediaBlob.id),
});
export type NodeMediaBlobRow = typeof nodeMediaBlob.$inferInsert;

/**
 * Relations for {@link nodeMediaBlob}
 **/
export const nodeMediaBlobRelations = relations(nodeMediaBlob, ({ one }) => ({
    node: one(node, {
        fields: [nodeMediaBlob.nodeId],
        references: [node.id],
    }),
    mediaBlob: one(mediaBlob, {
        fields: [nodeMediaBlob.mediaBlobId],
        references: [mediaBlob.id],
    }),
}));
