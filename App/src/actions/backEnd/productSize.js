import * as ep from "./../../constants/enpoint";
export const types = {
  GET_SIZES_SUCCESS: "GET_SIZES_SUCCESS",
  GET_SIZES_ERROR: "GET_SIZES_ERROR",
  CREATE_SIZE_SUCCESS: "CREATE_SIZE_SUCCESS",
  CREATE_SIZE_ERROR: "CREATE_SIZE_ERROR",
  UPDATE_SIZE_SUCCESS: "UPDATE_SIZE_SUCCESS",
  UPDATE_SIZE_ERROR: "UPDATE_SIZE_ERROR",
  DELETE_SIZE_SUCCESS: "DELETE_SIZE_SUCCESS",
  DELETE_SIZE_ERROR: "DELETE_SIZE_ERROR",
  GET_SIZE_SUCCESS: "GET_SIZE_SUCCESS",
  GET_SIZE_ERROR: "GET_SIZE_ERROR",
  CREATE_SIZE_CHILDREN_SUCCESS: "CREATE_SIZE_CHILDREN_SUCCESS",
  CREATE_SIZE_CHILDREN_ERROR: "CREATE_SIZE_CHILDREN_ERROR",
};

export const getSizes = (page = 1) => {
  return {
    url: `${ep.enpoint}/api/sizes?page=${page}`,
    method: "get",
    onSuccess: types.GET_SIZES_SUCCESS,
    onError: types.GET_SIZES_ERROR,
  };
};

export const getSize = (id) => {
  return {
    url: `${ep.enpoint}/api/sizes/${id}`,
    method: "get",
    onSuccess: types.GET_SIZE_SUCCESS,
    onError: types.GET_SIZE_ERROR,
  };
};

export const createSize = (data) => {
  return {
    url: `${ep.enpoint}/api/sizes`,
    method: "post",
    data: { ...data },
    onSuccess: types.CREATE_SIZE_SUCCESS,
    onError: types.CREATE_SIZE_ERROR,
  };
};

export const updateSize = (data) => {
  return {
    url: `${ep.enpoint}/api/sizes/${data.id}`,
    method: "put",
    data: { ...data },
    onSuccess: types.UPDATE_SIZE_SUCCESS,
    onError: types.UPDATE_SIZE_ERROR,
  };
};

export const deleteSize = (id) => {
  return {
    url: `${ep.enpoint}/api/sizes/${id}`,
    method: "delete",
    onSuccess: types.DELETE_SIZE_SUCCESS,
    onError: types.DELETE_SIZE_SUCCESS,
  };
};
