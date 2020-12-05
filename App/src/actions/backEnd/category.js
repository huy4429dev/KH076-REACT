import * as ep from "./../../constants/enpoint";
export const types = {
  GET_CATEGORIES_SUCCESS: "GET_CATEGORIES_SUCCESS",
  GET_CATEGORIES_ERROR: "GET_CATEGORIES_ERROR",
  CREATE_CATEGORY_SUCCESS: "CREATE_CATEGORY_SUCCESS",
  CREATE_CATEGORY_ERROR: "CREATE_CATEGORY_ERROR",
  UPDATE_CATEGORY_SUCCESS: "UPDATE_CATEGORY_SUCCESS",
  UPDATE_CATEGORY_ERROR: "UPDATE_CATEGORY_ERROR",
  DELETE_CATEGORY_SUCCESS: "DELETE_CATEGORY_SUCCESS",
  DELETE_CATEGORY_ERROR: "DELETE_CATEGORY_ERROR",
  GET_CATEGORY_SUCCESS: "GET_CATEGORY_SUCCESS",
  GET_CATEGORY_ERROR: "GET_CATEGORY_ERROR",
  CREATE_CATEGORY_CHILDREN_SUCCESS: "CREATE_CATEGORY_CHILDREN_SUCCESS",
  CREATE_CATEGORY_CHILDREN_ERROR: "CREATE_CATEGORY_CHILDREN_ERROR",
};

export const getCategories = (filter = '', page = 1) => {
  return {
    url: `${ep.enpoint}/api/categories?page=${page}&${filter}`,
    method: "get",
    onSuccess: types.GET_CATEGORIES_SUCCESS,
    onError: types.GET_CATEGORIES_ERROR,
  };
};

export const filterCategories = (filter) => {
  return {
    url: `${ep.enpoint}/api/categories`,
    method: "get",
    onSuccess: types.GET_CATEGORIES_SUCCESS,
    onError: types.GET_CATEGORIES_ERROR,
  };
};

export const createCategory = (data, parentId = 0) => {
  return {
    url: `${ep.enpoint}/api/categories?parentId=${parentId}`,
    method: "post",
    data: { ...data },
    onSuccess: types.CREATE_CATEGORY_SUCCESS,
    onError: types.CREATE_CATEGORY_ERROR,
  };
};

export const updateCategory = (data) => {
  return {
    url: `${ep.enpoint}/api/categories/${data.id}`,
    method: "put",
    data: { ...data },
    onSuccess: types.UPDATE_CATEGORY_SUCCESS,
    onError: types.UPDATE_CATEGORY_ERROR,
  };
};

export const deleteCategory = (id) => {
  return {
    url: `${ep.enpoint}/api/categories/${id}`,
    method: "delete",
    onSuccess: types.DELETE_CATEGORY_SUCCESS,
    onError: types.DELETE_CATEGORY_ERROR,
  };
};

export const getCategory = (id) => {
  return {
    url: `${ep.enpoint}/api/categories/${id}`,
    method: "get",
    onSuccess: types.GET_CATEGORY_SUCCESS,
    onError: types.GET_CATEGORY_ERROR,
  };
};

export const createCategoryChildren = (data, parentId) => {
  return {
    url: `${ep.enpoint}/api/categories?parentId=${parentId}`,
    method: "post",
    data: { ...data },
    onSuccess: types.CREATE_CATEGORY_CHILDREN_SUCCESS,
    onError: types.CREATE_CATEGORY_CHILDREN_ERROR,
  };
};
