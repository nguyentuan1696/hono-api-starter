import { createPagination, createSlug, generateId } from "@common/lib";
import { logger } from "@common/logger";
import { toCreateCategory, toListCategoriesResponse, toQueryCategoriesResponse, toUpdateCategory } from "@modules/categories/category.mapper";
import { categoryRepository } from "@modules/categories/category.repository";
import type { CreateCategoryRequest, DeleteCategoryRequest, GetCategoryRequest, ListCategoriesRequest, ListCategoriesResult, QueryCategoriesRequest, QueryCategoriesResult, UpdateCategoryRequest } from "@modules/categories/category.dto";

class CategoryService {
  async createCategory(createCategoryRequest: CreateCategoryRequest) {
    try {
      const slugId = generateId();
      const slug = createSlug(createCategoryRequest.name);
      const createCategory = toCreateCategory(createCategoryRequest, slugId, slug);
      return await categoryRepository.createCategory(createCategory);
    } catch (error) {
      logger.error({ err: error, createCategoryRequest }, "CategoryService:createCategory:create category failed");
      throw new Error("CategoryService:createCategory:create category failed", {
        cause: error,
      });
    }
  }

  async queryCategories(request: QueryCategoriesRequest): Promise<QueryCategoriesResult> {
    try {
      const { categories, total } = await categoryRepository.queryCategories(request);

      if (!categories || categories.length === 0) {
        return {
          categories: [],
          pagination: createPagination(total, request.limit, request.page),
        };
      }

      const categoriesResponse = toQueryCategoriesResponse(categories);
      const pagination = createPagination(total, request.limit, request.page);

      return {
        categories: categoriesResponse,
        pagination,
      };
    } catch (error) {
      logger.error({ err: error, request }, "CategoryService:queryCategories:query categories failed");
      throw new Error("CategoryService:queryCategories:query categories failed", {
        cause: error,
      });
    }
  }

  async getCategory(getCategoryRequest: GetCategoryRequest) {
    try {
      const category = await categoryRepository.getCategory(getCategoryRequest);
      return category;
    } catch (error) {
      logger.error({ err: error, getCategoryRequest }, "CategoryService:getCategory:get category failed");
      throw new Error("CategoryService:getCategory:get category failed", {
        cause: error,
      });
    }
  }

  async updateCategory(updateCategoryRequest: UpdateCategoryRequest) {
    try {
      const slug = createSlug(updateCategoryRequest.name);
      const updateCategory = toUpdateCategory(updateCategoryRequest, slug);
      return await categoryRepository.updateCategory(updateCategory);
    } catch (error) {
      logger.error({ err: error, updateCategoryRequest }, "CategoryService:updateCategory:update category failed");
      throw new Error("CategoryService:updateCategory:update category failed", {
        cause: error,
      });
    }
  }

  async deleteCategory(deleteCategoryRequest: DeleteCategoryRequest) {
    try {
      return await categoryRepository.deleteCategory(deleteCategoryRequest);
    } catch (error) {
      logger.error({ err: error, deleteCategoryRequest }, "CategoryService:deleteCategory:delete category failed");
      throw new Error("CategoryService:deleteCategory:delete category failed", {
        cause: error,
      });
    }
  }

  async listCategories(request: ListCategoriesRequest): Promise<ListCategoriesResult> {
    try {
      const { categories, total } = await categoryRepository.listCategories(request);

      if (!categories || categories.length === 0) {
        return {
          categories: [],
          pagination: createPagination(total, request.limit, request.page),
        };
      }

      const categoriesResponse = toListCategoriesResponse(categories);
      const pagination = createPagination(total, request.limit, request.page);

      return {
        categories: categoriesResponse,
        pagination,
      };
    } catch (error) {
      logger.error({ err: error, request }, "CategoryService:listCategories:list categories failed");
      throw new Error("CategoryService:listCategories:list categories failed", {
        cause: error,
      });
    }
  }
}

export const categoryService = new CategoryService();
