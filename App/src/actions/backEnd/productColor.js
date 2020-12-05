import * as ep from "./../../constants/enpoint";
export const types = {
  GET_COLORS_SUCCESS: "GET_COLORS_SUCCESS",
  GET_COLORS_ERROR: "GET_COLORS_ERROR",
  CREATE_COLOR_SUCCESS: "CREATE_COLOR_SUCCESS",
  CREATE_COLOR_ERROR: "CREATE_COLOR_ERROR",
  UPDATE_COLOR_SUCCESS: "UPDATE_COLOR_SUCCESS",
  UPDATE_COLOR_ERROR: "UPDATE_COLOR_ERROR",
  DELETE_COLOR_SUCCESS: "DELETE_COLOR_SUCCESS",
  DELETE_COLOR_ERROR: "DELETE_COLOR_ERROR",
  GET_COLOR_SUCCESS: "GET_COLOR_SUCCESS",
  GET_COLOR_ERROR: "GET_COLOR_ERROR",
  CREATE_COLOR_CHILDREN_SUCCESS: "CREATE_COLOR_CHILDREN_SUCCESS",
  CREATE_COLOR_CHILDREN_ERROR: "CREATE_COLOR_CHILDREN_ERROR",
};

export const getColors = (page = 1) => {
  return {
    url: `${ep.enpoint}/api/colors?page=${page}`,
    method: "get",
    onSuccess: types.GET_COLORS_SUCCESS,
    onError: types.GET_COLORS_ERROR,
  };
};

export const getColor = (id) => {
  return {
    url: `${ep.enpoint}/api/colors/${id}`,
    method: "get",
    onSuccess: types.GET_COLOR_SUCCESS,
    onError: types.GET_COLOR_ERROR,
  };
};

export const createColor = (data) => {
  return {
    url: `${ep.enpoint}/api/colors`,
    method: "post",
    data: { ...data },
    onSuccess: types.CREATE_COLOR_SUCCESS,
    onError: types.CREATE_COLOR_ERROR,
  };
};

export const updateColor = (data) => {
  return {
    url: `${ep.enpoint}/api/colors/${data.id}`,
    method: "put",
    data: { ...data },
    onSuccess: types.UPDATE_COLOR_SUCCESS,
    onError: types.UPDATE_COLOR_ERROR,
  };
};

export const deleteColor = (id) => {
  return {
    url: `${ep.enpoint}/api/colors/${id}`,
    method: "delete",
    onSuccess: types.DELETE_COLOR_SUCCESS,
    onError: types.DELETE_COLOR_SUCCESS,
  };
};
