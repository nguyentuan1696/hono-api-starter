CREATE TABLE "categories" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp,
	"updated_at" timestamp,
	"parent_id" uuid,
	"name" varchar(255) NOT NULL,
	"description" varchar(255) NOT NULL,
	"slug" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "documents_files" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp,
	"updated_at" timestamp,
	"document_id" uuid,
	"file_id" uuid
);
--> statement-breakpoint
CREATE TABLE "documents_series" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp,
	"updated_at" timestamp,
	"serie_id" uuid,
	"document_id" uuid,
	"position" integer
);
--> statement-breakpoint
CREATE TABLE "documents" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp,
	"updated_at" timestamp,
	"category_id" uuid NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" varchar(255) NOT NULL,
	"slug" varchar(255) NOT NULL,
	"content" text,
	"status" varchar(50) DEFAULT 'draft' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "documents_tags" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp,
	"updated_at" timestamp,
	"tag_id" uuid,
	"document_id" uuid
);
--> statement-breakpoint
CREATE TABLE "files" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp,
	"updated_at" timestamp,
	"file_name" varchar(255),
	"file_key" varchar(255),
	"file_url" text NOT NULL,
	"file_type" varchar(100),
	"file_size" bigint
);
--> statement-breakpoint
CREATE TABLE "series" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp,
	"updated_at" timestamp,
	"name" varchar(255) NOT NULL,
	"description" varchar(255) NOT NULL,
	"slug" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tags" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp,
	"updated_at" timestamp,
	"name" varchar(255) NOT NULL,
	"slug" varchar(255) NOT NULL
);
--> statement-breakpoint
DROP TABLE "users" CASCADE;--> statement-breakpoint
ALTER TABLE "categories" ADD CONSTRAINT "categories_parent_id_categories_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."categories"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "documents_files" ADD CONSTRAINT "documents_files_document_id_documents_id_fk" FOREIGN KEY ("document_id") REFERENCES "public"."documents"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "documents_files" ADD CONSTRAINT "documents_files_file_id_files_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."files"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "documents_series" ADD CONSTRAINT "documents_series_serie_id_series_id_fk" FOREIGN KEY ("serie_id") REFERENCES "public"."series"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "documents_series" ADD CONSTRAINT "documents_series_document_id_documents_id_fk" FOREIGN KEY ("document_id") REFERENCES "public"."documents"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "documents" ADD CONSTRAINT "documents_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "documents_tags" ADD CONSTRAINT "documents_tags_tag_id_tags_id_fk" FOREIGN KEY ("tag_id") REFERENCES "public"."tags"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "documents_tags" ADD CONSTRAINT "documents_tags_document_id_documents_id_fk" FOREIGN KEY ("document_id") REFERENCES "public"."documents"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_categories_parent_id" ON "categories" USING btree ("parent_id");--> statement-breakpoint
CREATE UNIQUE INDEX "idx_categories_name" ON "categories" USING btree ("name");--> statement-breakpoint
CREATE UNIQUE INDEX "idx_categories_parent_slug" ON "categories" USING btree ("parent_id","slug");--> statement-breakpoint
CREATE UNIQUE INDEX "idx_categories_parent_name" ON "categories" USING btree ("parent_id","name");--> statement-breakpoint
CREATE INDEX "idx_documents_files_doc_id" ON "documents_files" USING btree ("document_id");--> statement-breakpoint
CREATE INDEX "idx_documents_files_file_id" ON "documents_files" USING btree ("file_id");--> statement-breakpoint
CREATE UNIQUE INDEX "idx_documents_files_unique" ON "documents_files" USING btree ("document_id","file_id");--> statement-breakpoint
CREATE INDEX "idx_documents_series_doc_id" ON "documents_series" USING btree ("document_id");--> statement-breakpoint
CREATE INDEX "idx_documents_series_ser_id" ON "documents_series" USING btree ("serie_id");--> statement-breakpoint
CREATE UNIQUE INDEX "idx_documents_series_unique" ON "documents_series" USING btree ("document_id","serie_id");--> statement-breakpoint
CREATE INDEX "idx_documents_category_id" ON "documents" USING btree ("category_id");--> statement-breakpoint
CREATE INDEX "idx_documents_status" ON "documents" USING btree ("status");--> statement-breakpoint
CREATE UNIQUE INDEX "idx_documents_slug" ON "documents" USING btree ("slug");--> statement-breakpoint
CREATE UNIQUE INDEX "idx_documents_name" ON "documents" USING btree ("name");--> statement-breakpoint
CREATE INDEX "idx_documents_tags_doc_id" ON "documents_tags" USING btree ("document_id");--> statement-breakpoint
CREATE INDEX "idx_documents_tags_tag_id" ON "documents_tags" USING btree ("tag_id");--> statement-breakpoint
CREATE UNIQUE INDEX "idx_documents_tags_unique" ON "documents_tags" USING btree ("document_id","tag_id");--> statement-breakpoint
CREATE UNIQUE INDEX "idx_series_name" ON "series" USING btree ("name");--> statement-breakpoint
CREATE UNIQUE INDEX "idx_series_slug" ON "series" USING btree ("slug");--> statement-breakpoint
CREATE UNIQUE INDEX "idx_tags_name" ON "tags" USING btree ("name");--> statement-breakpoint
CREATE UNIQUE INDEX "idx_tags_slug" ON "tags" USING btree ("slug");