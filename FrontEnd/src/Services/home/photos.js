import { setFilter } from "../../utils/filters";
import axiosInstance from "../axiosInstance";

export const list = async filter => {
  try {
    const response = await axiosInstance.get("/list", { params: setFilter(filter) });
    return response;
  } catch (error) {
    if (error.error.message) {
      throw new Error(error.error.message);
    }
  }
};
