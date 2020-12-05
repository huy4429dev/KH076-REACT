import * as ep from "./../../constants/enpoint";
export const types = {
  GET_PRODUCTS_SUCCESS: "GET_PRODUCTS_SUCCESS",
  GET_PRODUCTS_ERROR: "GET_PRODUCTS_ERROR",
  CREATE_PRODUCT_SUCCESS: "CREATE_PRODUCT_SUCCESS",
  CREATE_PRODUCT_ERROR: "CREATE_PRODUCT_ERROR",
  UPDATE_PRODUCT_SUCCESS: "UPDATE_PRODUCT_SUCCESS",
  UPDATE_PRODUCT_ERROR: "UPDATE_PRODUCT_ERROR",
  DELETE_PRODUCT_SUCCESS: "DELETE_PRODUCT_SUCCESS",
  DELETE_PRODUCT_ERROR: "DELETE_PRODUCT_ERROR",
  GET_PRODUCT_SUCCESS: "GET_PRODUCT_SUCCESS",
  GET_PRODUCT_ERROR: "GET_PRODUCT_ERROR",
  CREATE_PRODUCT_CHILDREN_SUCCESS: "CREATE_PRODUCT_CHILDREN_SUCCESS",
  CREATE_PRODUCT_CHILDREN_ERROR: "CREATE_PRODUCT_CHILDREN_ERROR",
};

export const getProducts = (page = 1) => {
  return {
    url: `${ep.enpoint}/api/products?page=${page}`,
    method: "get",
    onSuccess: types.GET_PRODUCTS_SUCCESS,
    onError: types.GET_PRODUCTS_ERROR,
  };
};

export const getProduct = (id) => {
  return {
    url: `${ep.enpoint}/api/products/${id}`,
    method: "get",
    onSuccess: types.GET_PRODUCT_SUCCESS,
    onError: types.GET_PRODUCT_ERROR,
  };
};

export const createProduct = (data) => {
  return {
    url: `${ep.enpoint}/api/products`,
    method: "post",
    data: { ...data },
    onSuccess: types.CREATE_PRODUCT_SUCCESS,
    onError: types.CREATE_PRODUCT_ERROR,
  };
};

export const updateProduct = (data) => {
  return {
    url: `${ep.enpoint}/api/products/${data.id}`,
    method: "put",
    data: { ...data },
    onSuccess: types.UPDATE_PRODUCT_SUCCESS,
    onError: types.UPDATE_PRODUCT_ERROR,
  };
};

export const deleteProduct = (id) => {
  return {
    url: `${ep.enpoint}/api/products/${id}`,
    method: "delete",
    onSuccess: types.DELETE_PRODUCT_SUCCESS,
    onError: types.DELETE_PRODUCT_SUCCESS,
  };
};
