CREATE TYPE "public"."timestamp_accuracy" AS ENUM('year', 'month', 'day', 'hour', 'minute', 'second', 'millisecond', 'microsecond');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "locations" (
	"id" integer PRIMARY KEY NOT NULL,
	"geometry" geometry(point) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "media_blobs" (
	"id" integer PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"createdAt" timestamp NOT NULL,
	"recordedAt" timestamp NOT NULL,
	"recordedAtAccuracy" timestamp_accuracy NOT NULL,
	"mimeType" text NOT NULL,
	"data" "bytea" NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "nodes" (
	"id" integer PRIMARY KEY NOT NULL,
	"pathId" text NOT NULL,
	"path" "ltree" NOT NULL,
	"locationId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "node_media_blobs" (
	"id" integer PRIMARY KEY NOT NULL,
	"nodeId" integer NOT NULL,
	"mediaBlobId" integer NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "nodes" ADD CONSTRAINT "nodes_locationId_locations_id_fk" FOREIGN KEY ("locationId") REFERENCES "public"."locations"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "node_media_blobs" ADD CONSTRAINT "node_media_blobs_nodeId_nodes_id_fk" FOREIGN KEY ("nodeId") REFERENCES "public"."nodes"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "node_media_blobs" ADD CONSTRAINT "node_media_blobs_mediaBlobId_media_blobs_id_fk" FOREIGN KEY ("mediaBlobId") REFERENCES "public"."media_blobs"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
