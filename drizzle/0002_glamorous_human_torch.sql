DROP INDEX "idx_documents_slug";--> statement-breakpoint
DROP INDEX "idx_series_slug";--> statement-breakpoint
DROP INDEX "idx_tags_slug";--> statement-breakpoint
ALTER TABLE "categories" ADD COLUMN "slug_id" varchar(7) NOT NULL;--> statement-breakpoint
ALTER TABLE "documents" ADD COLUMN "slug_id" varchar(7) NOT NULL;--> statement-breakpoint
ALTER TABLE "series" ADD COLUMN "slug_id" varchar(7) NOT NULL;--> statement-breakpoint
ALTER TABLE "tags" ADD COLUMN "slug_id" varchar(7) NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX "idx_documents_slug_id" ON "documents" USING btree ("slug_id");--> statement-breakpoint
CREATE UNIQUE INDEX "idx_series_slug_id" ON "series" USING btree ("slug_id","slug");--> statement-breakpoint
CREATE UNIQUE INDEX "idx_tags_slug_id" ON "tags" USING btree ("slug_id","slug");