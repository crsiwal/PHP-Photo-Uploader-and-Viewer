import { handleJwtTokenError, setFilter } from "../../utils/filters";
import axiosInstance from "../axiosInstance";

export const getPermissions = async () => {
  try {
    const response = await axiosInstance.get(`/profile/permissions`);
    return response;
  } catch (error) {
    if (error.error.message) {
      handleJwtTokenError(error.error);
      throw new Error(error.error.message);
    }
  }
};
