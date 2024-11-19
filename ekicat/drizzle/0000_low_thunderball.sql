CREATE TYPE "public"."timestamp_accuracy" AS ENUM('year', 'month', 'day', 'hour', 'minute', 'second', 'millisecond', 'microsecond');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "locations" (
	"id" integer PRIMARY KEY NOT NULL,
	"geometry" geometry(point) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "media_blobs" (
	"id" integer PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"created_at" timestamp NOT NULL,
	"recorded_at" timestamp NOT NULL,
	"recorded_at_accuracy" timestamp_accuracy NOT NULL,
	"mime_type" text NOT NULL,
	"data" "bytea" NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "nodes" (
	"id" integer PRIMARY KEY NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "node_edges" (
	"id" integer PRIMARY KEY NOT NULL,
	"source_node_id" integer NOT NULL,
	"target_node_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "node_locations" (
	"id" integer PRIMARY KEY NOT NULL,
	"node_id" integer NOT NULL,
	"location_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "node_media_blobs" (
	"id" integer PRIMARY KEY NOT NULL,
	"node_id" integer NOT NULL,
	"media_blob_id" integer NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "node_edges" ADD CONSTRAINT "node_edges_source_node_id_nodes_id_fk" FOREIGN KEY ("source_node_id") REFERENCES "public"."nodes"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "node_edges" ADD CONSTRAINT "node_edges_target_node_id_nodes_id_fk" FOREIGN KEY ("target_node_id") REFERENCES "public"."nodes"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "node_media_blobs" ADD CONSTRAINT "node_media_blobs_node_id_nodes_id_fk" FOREIGN KEY ("node_id") REFERENCES "public"."nodes"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "node_media_blobs" ADD CONSTRAINT "node_media_blobs_media_blob_id_media_blobs_id_fk" FOREIGN KEY ("media_blob_id") REFERENCES "public"."media_blobs"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
