import { SHOW_ITEMS_PER_PAGE } from "../config/config";
import { getState } from "./storeState";
export const setFilter = (filter = {}) => {
  const search = getState("search");
  let filters = {
    limit: filter.limit || SHOW_ITEMS_PER_PAGE,
    page: filter.page || 1,
    sort: filter.sort || "desc",
  };

  if (typeof search !== "undefined" && typeof search.text !== "undefined" && search.text !== "") {
    filters.search = search.text;
  }

  if (typeof filter.exclude !== "undefined") {
    filters.exclude = filter.exclude;
  }

  if (typeof filter.active !== "undefined") {
    filters.active = filter.active;
  }

  if (typeof search !== "undefined" && typeof search.filters !== "undefined" && Object.keys(search.filters).length > 0) {
    const tmpStore = { ...filters, ...search.filters };
    filters = tmpStore;
  }

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
