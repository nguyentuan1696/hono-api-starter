import { Context } from "hono";
import { baseController } from "@common/api";
import { errorCode } from "@common/error.code";
import { logger } from "@common/logger";
import { parseCreateCategoryRequest, parseDeleteCategoryRequest, parseGetCategoryRequest, parseListCategoriesRequest, parseQueryCategoriesRequest, parseUpdateCategoryRequest } from "@modules/categories/category.dto";
import { categoryService } from "@modules/categories/category.service";
import { validateCreateCategoryRequest, validateDeleteCategoryRequest, validateGetCategoryRequest, validateListCategoriesRequest, validateQueryCategoriesRequest, validateUpdateCategoryRequest } from "@modules/categories/category.validator";

export class CategoryController {
  static async createCategory(c: Context) {
    const request = parseCreateCategoryRequest(await c.req.json());

    const errors = validateCreateCategoryRequest(request);
    if (errors.length > 0) {
      const response = baseController.badRequest(c, errorCode.INVALID_REQUEST, "invalid request body", errors);
      logger.logRequestError(c, errors, "CategoryController:createCategory:validate create category request failed", response);
      return response;
    }

    try {
      await categoryService.createCategory(request);
      return baseController.success(c, errorCode.OK, null, null, "create category success");
    } catch (error) {
      const response = baseController.internalError(c, errorCode.INTERNAL_SERVER_ERROR, "create category failed");
      logger.logRequestError(c, error, "CategoryController:createCategory:create category failed", response);
      return response;
    }
  }

  static async queryCategories(c: Context) {
    const request = parseQueryCategoriesRequest(c.req.query());

    const errors = validateQueryCategoriesRequest(request);
    if (errors.length > 0) {
      const response = baseController.badRequest(c, errorCode.INVALID_REQUEST, "invalid request params", errors);
      logger.logRequestError(c, errors, "CategoryController:queryCategories:validate query categories request failed", response);
      return response;
    }

    try {
      const { categories, pagination } = await categoryService.queryCategories(request);
      return baseController.success(c, errorCode.OK, categories, pagination, "query categories success");
    } catch (error) {
      const response = baseController.internalError(c, errorCode.INTERNAL_SERVER_ERROR, "query categories failed");
      logger.logRequestError(c, error, "CategoryController:queryCategories:query categories failed", response);
      return response;
    }
  }

  static async getCategory(c: Context) {
    const request = parseGetCategoryRequest(c.req.param("id"));

    const errors = validateGetCategoryRequest(request);
    if (errors.length > 0) {
      const response = baseController.badRequest(c, errorCode.INVALID_REQUEST, "invalid request params", errors);
      logger.logRequestError(c, errors, "CategoryController:getCategory:validate get category request failed", response);
      return response;
    }

    try {
      const category = await categoryService.getCategory(request);
      return baseController.success(c, errorCode.OK, category, null, "get category success");
    } catch (error) {
      const response = baseController.internalError(c, errorCode.INTERNAL_SERVER_ERROR, "get category failed");
      logger.logRequestError(c, error, "CategoryController:getCategory:get category failed", response);
      return response;
    }
  }

  static async updateCategory(c: Context) {
    const request = parseUpdateCategoryRequest(c.req.param("id"), await c.req.json());

    const errors = validateUpdateCategoryRequest(request);
    if (errors.length > 0) {
      const response = baseController.badRequest(c, errorCode.INVALID_REQUEST, "invalid request body", errors);
      logger.logRequestError(c, errors, "CategoryController:updateCategory:validate update category request failed", response);
      return response;
    }

    try {
      await categoryService.updateCategory(request);
      return baseController.success(c, errorCode.OK, null, null, "update category success");
    } catch (error) {
      const response = baseController.internalError(c, errorCode.INTERNAL_SERVER_ERROR, "update category failed");
      logger.logRequestError(c, error, "CategoryController:updateCategory:update category failed", response);
      return response;
    }
  }

  static async deleteCategory(c: Context) {
    const request = parseDeleteCategoryRequest(c.req.param("id"));
    const errors = validateDeleteCategoryRequest(request);
    if (errors.length > 0) {
      const response = baseController.badRequest(c, errorCode.INVALID_REQUEST, "invalid request params", errors);
      logger.logRequestError(c, errors, "CategoryController:deleteCategory:validate delete category request failed", response);
      return response;
    }

    try {
      await categoryService.deleteCategory(request);
      return baseController.success(c, errorCode.OK, null, null, "delete category success");
    } catch (error) {
      const response = baseController.internalError(c, errorCode.INTERNAL_SERVER_ERROR, "delete category failed");
      logger.logRequestError(c, error, "CategoryController:deleteCategory:delete category failed", response);
      return response;
    }
  }

  static async listCategories(c: Context) {
    const request = parseListCategoriesRequest(c.req.query());

    const errors = validateListCategoriesRequest(request);
    if (errors.length > 0) {
      const response = baseController.badRequest(c, errorCode.INVALID_REQUEST, "invalid request params", errors);
      logger.logRequestError(c, errors, "CategoryController:listCategories:validate list categories request failed", response);
      return response;
    }

    try {
      const { categories, pagination } = await categoryService.listCategories(request);
      return baseController.success(c, errorCode.OK, categories, pagination, "list categories success");
    } catch (error) {
      const response = baseController.internalError(c, errorCode.INTERNAL_SERVER_ERROR, "list categories failed");
      logger.logRequestError(c, error, "CategoryController:listCategories:list categories failed", response);
      return response;
    }
  }
}
