import { setFilter } from "../../utils/filters";
import axiosInstance from "../axiosInstance";

export const list = async filter => {
  try {
    const response = await axiosInstance.get("/userrole", { params: setFilter(filter) });
    return response;
  } catch (error) {
    if (error.error.message) {
      throw new Error(error.error.message);
    }
  }
};

export const create = async data => {
  try {
    const response = await axiosInstance.post("/userrole", data);
    return response;
  } catch (error) {
    if (error.error.message) {
      throw new Error(error.error.message);
    }
  }
};

export const get = async recordId => {
  try {
    const response = await axiosInstance.get(`/userrole/${recordId}`);
    return response;
  } catch (error) {
    if (error.error.message) {
      throw new Error(error.error.message);
    }
  }
};

export const update = async (recordId, data) => {
  try {
    const response = await axiosInstance.put(`/userrole/${recordId}`, data);
    return response;
  } catch (error) {
    if (error.error.message) {
      throw new Error(error.error.message);
    }
  }
};

export const permission = async (recordId, data) => {
  try {
    const response = await axiosInstance.patch(`/userrole/${recordId}`, data);
    return response;
  } catch (error) {
    if (error.error.message) {
      throw new Error(error.error.message);
    }
  }
};

export const remove = async recordId => {
  try {
    const response = await axiosInstance.delete(`/userrole/${recordId}`);
    return response;
  } catch (error) {
    if (error.error.message) {
      throw new Error(error.error.message);
    }
  }
};

export const status = async (recordId, data) => {
  try {
    const response = await axiosInstance.patch(`/userrole/${recordId}/status`, data);
    return response;
  } catch (error) {
    if (error.error.message) {
      throw new Error(error.error.message);
    }
  }
};

export const accessList = async filter => {
  try {
    const response = await axiosInstance.get("/userrole/permissions", { params: setFilter(filter) });
    return response;
  } catch (error) {
    if (error.error.message) {
      throw new Error(error.error.message);
    }
  }
};
