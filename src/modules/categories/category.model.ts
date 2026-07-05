import { categoriesTable } from "@/common/db/schema";
import type { InferSelectModel } from "drizzle-orm";

type Category = InferSelectModel<typeof categoriesTable>;

export type CreateCategory = Pick<Category, "name" | "description" | "parentId" | "slugId" | "slug">;

export type QueryCategories = {
  id: string;
  name: string;
  description: string;
  slugId: string;
  slug: string;
  parentId: string | null;
  parentName: string | null;
  createdAt: Date | null;
  updatedAt: Date | null;
};

export type GetCategory = {
  id: string;
  name: string;
  description: string;
  slugId: string;
  slug: string;
  parentId: string | null;
  parentName: string | null;
  createdAt: Date | null;
  updatedAt: Date | null;
};

export type UpdateCategory = Pick<Category, "id" | "name" | "description" | "slug">;

export type DeleteCategory = Pick<Category, "id">;

export type ListCategories = Pick<Category, "id" | "name" | "slug">;
