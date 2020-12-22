import * as ep from "./../../constants/enpoint";
export const types = {
  GET_ORDERS_SUCCESS: "GET_ORDERS_SUCCESS",
  GET_ORDERS_ERROR: "GET_ORDERS_ERROR",
  CREATE_ORDER_SUCCESS: "CREATE_ORDER_SUCCESS",
  CREATE_ORDER_ERROR: "CREATE_ORDER_ERROR",
  UPDATE_ORDER_SUCCESS: "UPDATE_ORDER_SUCCESS",
  UPDATE_ORDER_ERROR: "UPDATE_ORDER_ERROR",
  DELETE_ORDER_SUCCESS: "DELETE_ORDER_SUCCESS",
  DELETE_ORDER_ERROR: "DELETE_ORDER_ERROR",
  GET_ORDER_SUCCESS: "GET_ORDER_SUCCESS",
  GET_ORDER_ERROR: "GET_ORDER_ERROR",
  CREATE_ORDER_CHILDREN_SUCCESS: "CREATE_ORDER_CHILDREN_SUCCESS",
  CREATE_ORDER_CHILDREN_ERROR: "CREATE_ORDER_CHILDREN_ERROR",
  PUT_STATUS_ORDER_SUCCESS: "PUT_STATUS_ORDER_SUCCESS",
  PUT_STATUS_ORDER_ERROR: "PUT_STATUS_ORDER_ERROR",
  EXPORT_ORDER_SUCCESS: "EXPORT_ORDER_SUCCESS",
  EXPORT_ORDER_ERROR: "EXPORT_ORDER_ERROR",
};

export const getOrders = (page = 1) => {
  return {
    url: `${ep.enpoint}/api/orders?page=${page}`,
    method: "get",
    onSuccess: types.GET_ORDERS_SUCCESS,
    onError: types.GET_ORDERS_ERROR,
  };
};

export const getCategory = (id) => {
  return {
    url: `${ep.enpoint}/api/orders/${id}`,
    method: "get",
    onSuccess: types.GET_ORDER_SUCCESS,
    onError: types.GET_ORDER_ERROR,
  };
};

export const createOrder = (data) => {
  return {
    url: `${ep.enpoint}/api/orders}`,
    method: "post",
    data: { ...data },
    onSuccess: types.CREATE_ORDER_SUCCESS,
    onError: types.CREATE_ORDER_ERROR,
  };
};

export const updateOrder = (data) => {
  return {
    url: `${ep.enpoint}/api/orders/${data.id}`,
    method: "put",
    data: { ...data },
    onSuccess: types.UPDATE_ORDER_SUCCESS,
    onError: types.UPDATE_ORDER_ERROR,
  };
};

export const deleteOrder = (id) => {
  return {
    url: `${ep.enpoint}/api/orders/${id}`,
    method: "delete",
    onSuccess: types.DELETE_ORDER_SUCCESS,
    onError: types.DELETE_ORDER_SUCCESS,
  };
};

export const handleChangeOrder = (id, status) => {
  return {
    url: `${ep.enpoint}/api/orders/status/${id}/${status}`,
    method: "put",
    onSuccess: types.PUT_STATUS_ORDER_SUCCESS,
    onError: types.PUT_STATUS_ORDER_ERROR,
  };
};

export const exportOrder = () => {
  return {
    url: `${ep.enpoint}/api/orders/export`,
    method: "get",
    onSuccess: types.EXPORT_ORDER_ERROR,
    onError: types.EXPORT_ORDER_ERROR,
  };
};
