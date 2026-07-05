import { bigint, index, integer, pgTable, text, timestamp, uniqueIndex, uuid, varchar } from "drizzle-orm/pg-core";
import type { AnyPgColumn } from "drizzle-orm/pg-core";

const commonColumns = {
  id: uuid("id").defaultRandom().primaryKey(),
  createdAt: timestamp("created_at", { mode: "date" }),
  updatedAt: timestamp("updated_at", { mode: "date" }),
};

export const categoriesTable = pgTable(
  "categories",
  {
    ...commonColumns,
    parentId: uuid("parent_id").references((): AnyPgColumn => categoriesTable.id),
    name: varchar("name", { length: 255 }).notNull(),
    description: varchar("description", { length: 255 }).notNull(),
    slugId: varchar("slug_id", { length: 7 }).notNull(),
    slug: varchar("slug", { length: 255 }).notNull(),
  },
  (table) => [
    index("idx_categories_parent_id").on(table.parentId),
    uniqueIndex("idx_categories_name").on(table.name),
    uniqueIndex("idx_categories_parent_slug").on(table.parentId, table.slug),
    uniqueIndex("idx_categories_parent_name").on(table.parentId, table.name),
  ]
);

export const documentsTable = pgTable(
  "documents",
  {
    ...commonColumns,
    categoryId: uuid("category_id")
      .notNull()
      .references(() => categoriesTable.id),
    name: varchar("name", { length: 255 }).notNull(),
    description: varchar("description", { length: 255 }).notNull(),
    slugId: varchar("slug_id", { length: 7 }).notNull(),
    slug: varchar("slug", { length: 255 }).notNull(),
    content: text("content"),
    status: varchar("status", { length: 50 }).notNull().default("draft"),
  },
  (table) => [index("idx_documents_category_id").on(table.categoryId), index("idx_documents_status").on(table.status), uniqueIndex("idx_documents_slug_id").on(table.slugId), uniqueIndex("idx_documents_name").on(table.name)]
);

export const tagsTable = pgTable(
  "tags",
  {
    ...commonColumns,
    name: varchar("name", { length: 255 }).notNull(),
    slugId: varchar("slug_id", { length: 7 }).notNull(),
    slug: varchar("slug", { length: 255 }).notNull(),
  },
  (table) => [uniqueIndex("idx_tags_name").on(table.name), uniqueIndex("idx_tags_slug_id").on(table.slugId, table.slug)]
);

export const seriesTable = pgTable(
  "series",
  {
    ...commonColumns,
    name: varchar("name", { length: 255 }).notNull(),
    description: varchar("description", { length: 255 }).notNull(),
    slugId: varchar("slug_id", { length: 7 }).notNull(),
    slug: varchar("slug", { length: 255 }).notNull(),
  },
  (table) => [uniqueIndex("idx_series_name").on(table.name), uniqueIndex("idx_series_slug_id").on(table.slugId, table.slug)]
);

export const filesTable = pgTable("files", {
  ...commonColumns,
  fileName: varchar("file_name", { length: 255 }),
  fileKey: varchar("file_key", { length: 255 }),
  fileUrl: text("file_url").notNull(),
  fileType: varchar("file_type", { length: 100 }),
  fileSize: bigint("file_size", { mode: "number" }),
});

export const documentsTagsTable = pgTable(
  "documents_tags",
  {
    ...commonColumns,
    tagId: uuid("tag_id").references(() => tagsTable.id),
    documentId: uuid("document_id").references(() => documentsTable.id),
  },
  (table) => [index("idx_documents_tags_doc_id").on(table.documentId), index("idx_documents_tags_tag_id").on(table.tagId), uniqueIndex("idx_documents_tags_unique").on(table.documentId, table.tagId)]
);

export const documentsFilesTable = pgTable(
  "documents_files",
  {
    ...commonColumns,
    documentId: uuid("document_id").references(() => documentsTable.id),
    fileId: uuid("file_id").references(() => filesTable.id),
  },
  (table) => [index("idx_documents_files_doc_id").on(table.documentId), index("idx_documents_files_file_id").on(table.fileId), uniqueIndex("idx_documents_files_unique").on(table.documentId, table.fileId)]
);

export const documentsSeriesTable = pgTable(
  "documents_series",
  {
    ...commonColumns,
    serieId: uuid("serie_id").references(() => seriesTable.id),
    documentId: uuid("document_id").references(() => documentsTable.id),
    position: integer("position"),
  },
  (table) => [index("idx_documents_series_doc_id").on(table.documentId), index("idx_documents_series_ser_id").on(table.serieId), uniqueIndex("idx_documents_series_unique").on(table.documentId, table.serieId)]
);
