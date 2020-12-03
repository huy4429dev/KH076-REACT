import * as ep from './../../constants/enpoint';
export const types = {
    GET_NEW_PRODUCTS_SUCCESS: 'GET_NEW_PRODUCTS_SUCCESS',
    GET_NEW_PRODUCTS_ERROR: 'GET_NEW_PRODUCTS_ERROR',
    GET_MAN_PRODUCTS_SUCCESS: "GET_MAN_PRODUCTS_SUCCESS",
    GET_MAN_PRODUCTS_ERROR: "GET_MAN_PRODUCTS_ERROR",
    GET_WOMEN_PRODUCTS_SUCCESS: "GET_WOMEN_PRODUCTS_SUCCESS",
    GET_WOMEN_PRODUCTS_ERROR: "GET_WOMEN_PRODUCTS_ERROR",
    GET_DETAILT_PRODUCTS_SUCCESS: "GET_DETAILT_PRODUCTS_SUCCESS",
    GET_DETAILT_PRODUCTS_ERROR: "GET_DETAILT_PRODUCTS_ERROR",
    GET_LIST_PRODUCTS_SUCCESS: "GET_LIST_PRODUCTS_SUCCESS",
    GET_LIST_PRODUCTS_ERROR: "GET_LIST_PRODUCTS_ERROR"
}

export const getListProducts = () => {
    return {
        url: `${ep.enpoint}/api/products`,
        method: 'get',
        onSuccess: types.GET_LIST_PRODUCTS_SUCCESS,
        onError: types.GET_LIST_PRODUCTS_ERROR,
    };
};
export const getNewProducts = () => {
    return {
        url: `${ep.enpoint}/api/products/new-products`,
        method: 'get',
        onSuccess: types.GET_NEW_PRODUCTS_SUCCESS,
        onError: types.GET_NEW_PRODUCTS_ERROR,
    };
};
export const getManProducts = () => {
    return {
        url: `${ep.enpoint}/api/products/man-products`,
        method: 'get',
        onSuccess: types.GET_MAN_PRODUCTS_SUCCESS,
        onError: types.GET_MAN_PRODUCTS_ERROR,
    };
};
export const getWomenProducts = () => {
    return {
        url: `${ep.enpoint}/api/products/women-products`,
        method: 'get',
        onSuccess: types.GET_WOMEN_PRODUCTS_SUCCESS,
        onError: types.GET_WOMEN_PRODUCTS_ERROR,
    };
};
export const getDetailtProduct = (id) => {
    return {
        url: `${ep.enpoint}/api/products/${id}`,
        method: 'get',
        onSuccess: types.GET_DETAILT_PRODUCTS_SUCCESS,
        onError: types.GET_DETAILT_PRODUCTS_ERROR,
    };
}; 