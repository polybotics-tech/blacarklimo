import constants from "@/src/libs/constants";
import { PaginationMetaType } from "@/src/utils/db/types";

export function generateSessionToken() {
  return crypto.randomUUID();
}

export function generateDbOffset(page: number) {
  if (typeof page != "number" || page < constants.db.defaultPage) {
    page = constants.db.defaultPage;
  }

  return (page - 1) * constants.db.limit;
}

export function generatePaginationMeta(
  page: number,
  totalCount = 0,
): PaginationMetaType {
  const totalPage = Math.round(totalCount / constants.db.limit) || 1;
  const hasNextPage = Boolean(page < totalPage);
  const hasPrevPage = Boolean(page > 1);

  return {
    totalCount,
    page,
    totalPage,
    hasNextPage,
    hasPrevPage,
  };
}

export function generateRandomPromoCodes(min = 6, max = 8) {
  const length = Math.floor(Math.random() * (max - min + 1)) + min;
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
}
