export const APP_NAME = process.env.REACT_APP_NAME || "Photo APP";
export const VERSION = process.env.REACT_APP_VERSION || "1.0.0";
export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "";
export const API_PHOTOS_ENDPOINT = process.env.REACT_APP_API_PHOTOS_ENDPOINT || "api.php";
export const API_TIMEOUT = process.env.REACT_APP_API_TIMEOUT || 5000;
export const SHOW_ITEMS_PER_PAGE = process.env.REACT_APP_SHOW_ITEMS_PER_PAGE || 10;
export const TOTAL_ITEMS_COUNT = 1800;
export const environment = process.env.NODE_ENV || "development";
export const isProduction = environment === "production";
export const isDevelopment = environment === "development";