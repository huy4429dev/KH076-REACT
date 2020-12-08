import * as ep from "./../../constants/enpoint";
export const types = {
  GET_CUSTOMERS_SUCCESS: "GET_CUSTOMERS_SUCCESS",
  GET_CUSTOMERS_ERROR: "GET_CUSTOMERS_ERROR",
  CREATE_CUSTOMER_SUCCESS: "CREATE_CUSTOMER_SUCCESS",
  CREATE_CUSTOMER_ERROR: "CREATE_CUSTOMER_ERROR",
  UPDATE_CUSTOMER_SUCCESS: "UPDATE_CUSTOMER_SUCCESS",
  UPDATE_CUSTOMER_ERROR: "UPDATE_CUSTOMER_ERROR",
  DELETE_CUSTOMER_SUCCESS: "DELETE_CUSTOMER_SUCCESS",
  DELETE_CUSTOMER_ERROR: "DELETE_CUSTOMER_ERROR",
  GET_CUSTOMER_SUCCESS: "GET_CUSTOMER_SUCCESS",
  GET_CUSTOMER_ERROR: "GET_CUSTOMER_ERROR",
  CREATE_CUSTOMER_CHILDREN_SUCCESS: "CREATE_CUSTOMER_CHILDREN_SUCCESS",
  CREATE_CUSTOMER_CHILDREN_ERROR: "CREATE_CUSTOMER_CHILDREN_ERROR",
};

export const getCustomers = (filter = '', page = 1) => {
  return {
    url: `${ep.enpoint}/api/customers?page=${page}&${filter}`,
    method: "get",
    onSuccess: types.GET_CUSTOMERS_SUCCESS,
    onError: types.GET_CUSTOMERS_ERROR,
  };
};

export const filterCustomers = (filter) => {
  return {
    url: `${ep.enpoint}/api/customers`,
    method: "get",
    onSuccess: types.GET_CUSTOMERS_SUCCESS,
    onError: types.GET_CUSTOMERS_ERROR,
  };
};

export const createCategory = (data) => {
  return {
    url: `${ep.enpoint}/api/customers`,
    method: "post",
    data: { ...data },
    onSuccess: types.CREATE_CUSTOMER_SUCCESS,
    onError: types.CREATE_CUSTOMER_ERROR,
  };
};

export const updateCategory = (data) => {
  return {
    url: `${ep.enpoint}/api/customers/${data.id}`,
    method: "put",
    data: { ...data },
    onSuccess: types.UPDATE_CUSTOMER_SUCCESS,
    onError: types.UPDATE_CUSTOMER_ERROR,
  };
};

export const deleteCategory = (id) => {
  return {
    url: `${ep.enpoint}/api/customers/${id}`,
    method: "delete",
    onSuccess: types.DELETE_CUSTOMER_SUCCESS,
    onError: types.DELETE_CUSTOMER_ERROR,
  };
};

export const getCategory = (id) => {
  return {
    url: `${ep.enpoint}/api/customers/${id}`,
    method: "get",
    onSuccess: types.GET_CUSTOMER_SUCCESS,
    onError: types.GET_CUSTOMER_ERROR,
  };
};
