import { SHOW_ITEMS_PER_PAGE } from "../config/config";
export const setFilter = (filter = {}) => {
  let filters = {
    limit: filter.limit || SHOW_ITEMS_PER_PAGE,
    page: filter.page || 1,
    sort: filter.sort || "desc",
  };
  return filters;
};

export const handleJwtTokenError = error => {
  if (error.code === 500) {
    if (error.message === "jwt expired") {
      // Logout User and send to login page
      window.location.href = "/logout";
    }
  }
};
