import { validateUUID } from "@/common/lib";
import type { ValidatorError } from "@common/validator";
import type { CreateCategoryRequest, DeleteCategoryRequest, GetCategoryRequest, ListCategoriesRequest, QueryCategoriesRequest, UpdateCategoryRequest } from "@modules/categories/category.dto";

// validateCreateCategoryRequest a utility function to validate create category request
export function validateCreateCategoryRequest(request: CreateCategoryRequest): ValidatorError[] {
  const errors: ValidatorError[] = [];

  if (!request.name) {
    errors.push({ field: "name", message: "name is required" });
  }

  if (!request.description) {
    errors.push({ field: "description", message: "description is required" });
  }

  if (request.parent_id && !validateUUID(request.parent_id)) {
    errors.push({ field: "parent_id", message: "parent_id must be a valid UUID" });
  }

  return errors;
}

// validateQueryCategoriesRequest a utility function to validate query categories request
export function validateQueryCategoriesRequest(request: QueryCategoriesRequest): ValidatorError[] {
  const errors: ValidatorError[] = [];

  if (!Number.isFinite(request.page) || request.page <= 0) {
    errors.push({ field: "page", message: "page must be greater than 0" });
  }

  if (!Number.isFinite(request.limit) || request.limit <= 0) {
    errors.push({ field: "limit", message: "limit must be greater than 0" });
  }

  return errors;
}

// validateGetCategoryRequest a utility function to validate get category request
export function validateGetCategoryRequest(request: GetCategoryRequest): ValidatorError[] {
  const errors: ValidatorError[] = [];

  if (!request.id || request.id.trim() === "") {
    errors.push({ field: "id", message: "id is required" });
  }

  if (!validateUUID(request.id)) {
    errors.push({ field: "id", message: "id must be a valid UUID" });
  }

  return errors;
}

// validateUpdateCategoryRequest a utility function to validate update category request
export function validateUpdateCategoryRequest(request: UpdateCategoryRequest): ValidatorError[] {
  const errors: ValidatorError[] = [];

  if (!request.id) {
    errors.push({ field: "id", message: "id is required" });
  }

  if (!request.name) {
    errors.push({ field: "name", message: "name is required" });
  }

  if (!request.description) {
    errors.push({ field: "description", message: "description is required" });
  }

  return errors;
}

// validateDeleteCategoryRequest a utility function to validate delete category request
export function validateDeleteCategoryRequest(request: DeleteCategoryRequest): ValidatorError[] {
  const errors: ValidatorError[] = [];

  if (!request.id) {
    errors.push({ field: "id", message: "id is required" });
  }

  if (!validateUUID(request.id)) {
    errors.push({ field: "id", message: "id must be a valid UUID" });
  }

  return errors;
}

// validateListCategoriesRequest a utility function to validate list categories request
export function validateListCategoriesRequest(request: ListCategoriesRequest): ValidatorError[] {
  const errors: ValidatorError[] = [];

  if (!Number.isFinite(request.page) || request.page <= 0) {
    errors.push({ field: "page", message: "page must be greater than 0" });
  }

  if (!Number.isFinite(request.limit) || request.limit <= 0) {
    errors.push({ field: "limit", message: "limit must be greater than 0" });
  }

  return errors;
}
