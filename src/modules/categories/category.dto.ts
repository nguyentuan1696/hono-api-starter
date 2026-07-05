import { constant } from "@common/constant";
import type { Pagination } from "@common/lib";

// CreateCategoryRequest a utility function to parse create category request
export interface CreateCategoryRequest {
  name: string;
  description: string;
  parent_id?: string | null;
}

export const parseCreateCategoryRequest = (body: Record<string, string>): CreateCategoryRequest => ({
  name: body.name?.trim(),
  description: body.description?.trim(),
  parent_id: body.parent_id?.trim() ?? null,
});

// QueryCategoriesRequest a utility function to parse query categories request
export interface QueryCategoriesRequest {
  page: number;
  limit: number;
  parentId?: string | null;
  search?: string;
  orderBy?: "id" | "name" | "slug" | "created_at" | "updated_at";
  order?: "asc" | "desc";
}

export interface QueryCategoriesResponse {
  id: string;
  name: string;
  description: string;
  slug_id: string;
  slug: string;
  parent_id: string | null;
  parent_name: string | null;
  created_at: Date | null;
  updated_at: Date | null;
}

export interface QueryCategoriesResult {
  categories: QueryCategoriesResponse[];
  pagination: Pagination;
}

// GetCategoryRequest a utility function to parse get category request
export interface GetCategoryRequest {
  id: string;
}

// GetCategoryResponse a utility function to parse get category response
export interface GetCategoryResponse {
  id: string;
  name: string;
  description: string;
  slug_id: string;
  slug: string;
  parent_id: string | null;
  parent_name: string | null;
  created_at: Date | null;
  updated_at: Date | null;
}

export const parseGetCategoryRequest = (id: string | undefined): GetCategoryRequest => ({
  id: id?.trim() ?? "",
});

// UpdateCategoryRequest a utility function to parse update category request
export interface UpdateCategoryRequest {
  id: string;
  name: string;
  description?: string;
}

export interface UpdateCategoryResponse {
  id: string;
  name: string;
  description?: string;
  slug: string;
  created_at: string;
  updated_at: string;
}

export const parseUpdateCategoryRequest = (id: string | undefined, body: Record<string, string>): UpdateCategoryRequest => ({
  id: id?.trim() ?? "",
  name: body.name?.trim(),
  description: body.description?.trim(),
});

// DeleteCategoryRequest a utility function to parse delete category request
export interface DeleteCategoryRequest {
  id: string;
}

export const parseDeleteCategoryRequest = (id: string | undefined): DeleteCategoryRequest => ({
  id: id?.trim() ?? "",
});

// ListCategoriesRequest a utility function to parse list categories request
export interface ListCategoriesRequest {
  page: number;
  limit: number;
  parentId?: string | null;
  search?: string;
  orderBy?: "id" | "name" | "slug" | "created_at" | "updated_at";
  order?: "asc" | "desc";
}

export interface ListCategoriesResponse {
  id: string;
  name: string;
  slug: string;
}

export interface ListCategoriesResult {
  categories: ListCategoriesResponse[];
  pagination: Pagination;
}

export const parseQueryCategoriesRequest = (query: Record<string, string | undefined>): QueryCategoriesRequest => ({
  page: query.page ? Number(query.page) : constant.DEFAULT_PAGE,
  limit: query.limit ? Number(query.limit) : constant.DEFAULT_PAGE_SIZE,
  parentId: query.parentId ?? null,
  search: query.search?.trim(),
  orderBy: (query.orderBy as QueryCategoriesRequest["orderBy"]) ?? constant.DEFAULT_ORDER_BY,
  order: (query.order as QueryCategoriesRequest["order"]) ?? constant.DEFAULT_ORDER,
});

export const parseListCategoriesRequest = (query: Record<string, string | undefined>): ListCategoriesRequest => ({
  page: query.page ? Number(query.page) : constant.DEFAULT_PAGE,
  limit: query.limit ? Number(query.limit) : constant.DEFAULT_PAGE_SIZE,
  parentId: query.parentId ?? null,
  search: query.search?.trim(),
  orderBy: (query.orderBy as ListCategoriesRequest["orderBy"]) ?? constant.DEFAULT_ORDER_BY,
  order: (query.order as ListCategoriesRequest["order"]) ?? constant.DEFAULT_ORDER,
});
