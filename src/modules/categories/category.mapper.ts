import type { CreateCategory, DeleteCategory, ListCategories, QueryCategories, UpdateCategory } from "@/modules/categories/category.model";
import type { CreateCategoryRequest, DeleteCategoryRequest, ListCategoriesResponse, QueryCategoriesResponse, UpdateCategoryRequest } from "@modules/categories/category.dto";

// toCreateCategory a utility function to map create category request to create category
export const toCreateCategory = (createCategoryRequest: CreateCategoryRequest, slugId: string, slug: string): CreateCategory => {
  if (!createCategoryRequest) {
    return {} as CreateCategory;
  }

  const createCategory: CreateCategory = {
    name: createCategoryRequest.name,
    description: createCategoryRequest.description,
    parentId: createCategoryRequest.parent_id ?? null,
    slugId,
    slug,
  };

  return createCategory;
};

// toQueryCategoriesResponse a utility function to map query categories to query categories response
export const toQueryCategoriesResponse = (queryCategories: QueryCategories[]): QueryCategoriesResponse[] => {
  if (!queryCategories) {
    return [];
  }

  const queryCategoriesResponse: QueryCategoriesResponse[] = queryCategories.map((queryCategory) => ({
    id: queryCategory.id,
    name: queryCategory.name,
    description: queryCategory.description,
    slug_id: queryCategory.slugId,
    slug: queryCategory.slug,
    parent_id: queryCategory.parentId,
    parent_name: queryCategory.parentName,
    created_at: queryCategory.createdAt,
    updated_at: queryCategory.updatedAt,
  }));

  return queryCategoriesResponse;
};

// toUpdateCategory a utility function to map update category request to update category
export const toUpdateCategory = (updateCategoryRequest: UpdateCategoryRequest, slug: string): UpdateCategory => {
  if (!updateCategoryRequest) {
    return {} as UpdateCategory;
  }

  const updateCategory: UpdateCategory = {
    id: updateCategoryRequest.id,
    name: updateCategoryRequest.name,
    description: updateCategoryRequest.description ?? "",
    slug,
  };

  return updateCategory;
};

// toDeleteCategory a utility function to map delete category request to delete category
export const toDeleteCategory = (deleteCategoryRequest: DeleteCategoryRequest): DeleteCategory => {
  if (!deleteCategoryRequest) {
    return {} as DeleteCategory;
  }

  const deleteCategory: DeleteCategory = {
    id: deleteCategoryRequest.id,
  };

  return deleteCategory;
};

// toListCategoriesResponse a utility function to map list categories to list categories response
export const toListCategoriesResponse = (listCategories: ListCategories[]): ListCategoriesResponse[] => {
  if (!listCategories) {
    return [];
  }

  const listCategoriesResponse: ListCategoriesResponse[] = listCategories.map((listCategory) => ({
    id: listCategory.id,
    name: listCategory.name,
    slug: listCategory.slug,
  }));

  return listCategoriesResponse;
};
