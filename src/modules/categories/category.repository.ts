import { and, asc, desc, eq, ilike, isNull, or } from "drizzle-orm";
import { alias } from "drizzle-orm/pg-core";
import { logger } from "@common/logger";
import { db } from "@/common/db/database";
import { categoriesTable } from "@/common/db/schema";
import type { GetCategoryRequest, ListCategoriesRequest, QueryCategoriesRequest } from "@/modules/categories/category.dto";
import type { CreateCategory, DeleteCategory, ListCategories, QueryCategories, UpdateCategory } from "@/modules/categories/category.model";

const parentCategory = alias(categoriesTable, "parent_category");

class CategoryRepository {
  async createCategory(createCategory: CreateCategory) {
    try {
      return await db.insert(categoriesTable).values(createCategory);
    } catch (error) {
      logger.error({ error }, "Failed to create category");
      throw error;
    }
  }

  async queryCategories(request: QueryCategoriesRequest): Promise<{ categories: QueryCategories[]; total: number }> {
    try {
      const { page, limit, parentId, search, orderBy, order } = request;
      const offset = (page - 1) * limit;
      const keyword = search ? `%${search}%` : null;
      const orderFn = order === "asc" ? asc : desc;

      const whereCondition = and(parentId ? eq(categoriesTable.parentId, parentId) : undefined, keyword ? or(ilike(categoriesTable.name, keyword), ilike(categoriesTable.description, keyword)) : undefined);

      const countStatement = db.$count(categoriesTable, whereCondition);

      const categoriesQuery = db
        .select({
          id: categoriesTable.id,
          name: categoriesTable.name,
          description: categoriesTable.description,
          slugId: categoriesTable.slugId,
          slug: categoriesTable.slug,
          parentId: categoriesTable.parentId,
          parentName: parentCategory.name,
          createdAt: categoriesTable.createdAt,
          updatedAt: categoriesTable.updatedAt,
        })
        .from(categoriesTable)
        .leftJoin(parentCategory, eq(parentCategory.id, categoriesTable.parentId))
        .where(whereCondition)
        .limit(limit)
        .offset(offset);

      let categoriesStatement;

      switch (orderBy) {
        case "id":
          categoriesStatement = categoriesQuery.orderBy(orderFn(categoriesTable.id));
          break;
        case "name":
          categoriesStatement = categoriesQuery.orderBy(orderFn(categoriesTable.name));
          break;
        case "slug":
          categoriesStatement = categoriesQuery.orderBy(orderFn(categoriesTable.slug));
          break;
        case "updated_at":
          categoriesStatement = categoriesQuery.orderBy(orderFn(categoriesTable.updatedAt));
          break;
        case "created_at":
        default:
          categoriesStatement = categoriesQuery.orderBy(orderFn(categoriesTable.createdAt));
          break;
      }

      const [countResult, categories] = await Promise.all([countStatement, categoriesStatement]);

      return {
        categories,
        total: countResult,
      };
    } catch (error) {
      logger.error({ error }, "Failed to query categories");
      throw error;
    }
  }

  async getCategory(request: GetCategoryRequest): Promise<QueryCategories | null> {
    try {
      const [category] = await db
        .select({
          id: categoriesTable.id,
          name: categoriesTable.name,
          description: categoriesTable.description,
          slugId: categoriesTable.slugId,
          slug: categoriesTable.slug,
          parentId: categoriesTable.parentId,
          parentName: parentCategory.name,
          createdAt: categoriesTable.createdAt,
          updatedAt: categoriesTable.updatedAt,
        })
        .from(categoriesTable)
        .leftJoin(parentCategory, eq(parentCategory.id, categoriesTable.parentId))
        .where(eq(categoriesTable.id, request.id))
        .limit(1);

        // TODO: Need to handle error in a better way than throw error
      if (!category) {
        throw new Error("Category not found");
      }
     
      return category;
    } catch (error) {
      logger.error({ error }, "Failed to get category");
      throw error;
    }
  }

  async updateCategory(updateCategory: UpdateCategory) {
    try {
      return await db.update(categoriesTable).set(updateCategory).where(eq(categoriesTable.id, updateCategory.id));
    } catch (error) {
      logger.error({ error }, "Failed to update category");
      throw error;
    }
  }

  async deleteCategory(deleteCategory: DeleteCategory) {
    try {
      return await db.delete(categoriesTable).where(eq(categoriesTable.id, deleteCategory.id));
    } catch (error) {
      logger.error({ error }, "Failed to delete category");
      throw error;
    }
  }

  async listCategories(request: ListCategoriesRequest): Promise<{ categories: ListCategories[]; total: number }> {
    try {
      const { page, limit, parentId, search, orderBy, order } = request;
      const offset = (page - 1) * limit;
      const keyword = search ? `%${search}%` : null;
      const orderFn = order === "asc" ? asc : desc;

      const whereCondition = and(parentId ? eq(categoriesTable.parentId, parentId) : isNull(categoriesTable.parentId), keyword ? or(ilike(categoriesTable.name, keyword), ilike(categoriesTable.description, keyword)) : undefined);

      // Count categories
      const countStatement = db.$count(categoriesTable, whereCondition);

      // Query categories
      const categoriesQuery = db
        .select({
          id: categoriesTable.id,
          name: categoriesTable.name,
          slug: categoriesTable.slug,
        })
        .from(categoriesTable)
        .where(whereCondition)
        .limit(limit)
        .offset(offset);

      let categoriesStatement;

      switch (orderBy) {
        case "id":
          categoriesStatement = categoriesQuery.orderBy(orderFn(categoriesTable.id));
          break;
        case "name":
          categoriesStatement = categoriesQuery.orderBy(orderFn(categoriesTable.name));
          break;
        case "slug":
          categoriesStatement = categoriesQuery.orderBy(orderFn(categoriesTable.slug));
          break;
        case "updated_at":
          categoriesStatement = categoriesQuery.orderBy(orderFn(categoriesTable.updatedAt));
          break;
        case "created_at":
        default:
          categoriesStatement = categoriesQuery.orderBy(orderFn(categoriesTable.createdAt));
          break;
      }

      const [countResult, categories] = await Promise.all([countStatement, categoriesStatement]);

      return {
        categories,
        total: countResult,
      };
    } catch (error) {
      logger.error({ err: error, request }, "CategoryRepository:listCategories:query categories failed");

      throw new Error("CategoryRepository:listCategories:query categories failed", {
        cause: error,
      });
    }
  }
}

export const categoryRepository = new CategoryRepository();
