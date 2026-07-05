import { customAlphabet } from "nanoid";
import slugify from "slugify";
import { validate } from "uuid";

const alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const defaultIdSize = 7;
const defaultIdGenerator = customAlphabet(alphabet, defaultIdSize);

// A utility function to format time in Vietnam's timezone with a plus sign and a colon after the hour
const vietnamTimeFormatter = new Intl.DateTimeFormat("vi-VN", {
  timeZone: "Asia/Ho_Chi_Minh",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});

export const timeNow = () => `${vietnamTimeFormatter.format(new Date()).replace(" ", "T")}+07:00`;

// A utility function to create a pagination object
export interface Pagination {
  limit: number;
  page: number;
  total_pages: number;
  has_next_page: boolean;
  prev_page: boolean;
}

export const createPagination = (total: number, limit: number, page: number): Pagination => {
  const totalPages = limit > 0 ? Math.ceil(total / limit) : 0;

  return {
    limit,
    page,
    total_pages: totalPages,
    has_next_page: page < totalPages,
    prev_page: page > 1,
  };
};

export const generateId = (size: number = defaultIdSize) => {
  if (size === defaultIdSize) {
    return defaultIdGenerator();
  }

  return customAlphabet(alphabet, size)();
};

// A utility function to create a slug from a string
export const createSlug = (value: string): string => {
  const slug = slugify(value, {
    lower: true,
    strict: true,
    locale: "vi",
    trim: true,
  });

  return slug;
};

export const validateUUID = (value: string): boolean => {
  return validate(value);
};
