import { API_PHOTOS_ENDPOINT } from "../../config/config";
import { setFilter } from "../../utils/filters";
import axiosInstance from "../axiosInstance";

export const list = async filter => {
  try {
    const response = await axiosInstance.get(API_PHOTOS_ENDPOINT, { params: setFilter(filter) });
    return response;
  } catch (error) {
    if (error.error.message) {
      throw new Error(error.error.message);
    }
  }
};


export const rotate = async filter => {
  try {
    const response = await axiosInstance.get("rotate.php", { params: setFilter(filter) });
    return response;
  } catch (error) {
    if (error.error.message) {
      throw new Error(error.error.message);
    }
  }
};
