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
    GET_LIST_PRODUCTS_ERROR: "GET_LIST_PRODUCTS_ERROR",
    GET_TOP_PRODUCTS_SUCCESS: "GET_TOP_PRODUCTS_SUCCESS",
    GET_TOP_PRODUCTS_ERROR: "GET_TOP_PRODUCTS_ERROR",
    GET_TOP_SALE_WOMEN_SUCCESS: "GET_TOP_SALE_WOMEN_SUCCESS",
    GET_TOP_SALE_WOMEN_ERROR: "GET_TOP_SALE_WOMEN_ERROR",
    GET_TOP_SALE_MEN_SUCCESS: "GET_TOP_SALE_MEN_SUCCESS",
    GET_TOP_SALE_MEN_ERROR: "GET_TOP_SALE_MEN_ERROR",
    COMMENT_SUCCESS: "COMMENT_SUCCESS",
    COMMENT_FAILE: "COMMENT_FAILE"
}

export const getListProducts = (shopId) => {
    return {
        url: `${ep.enpoint}/api/products/shops/${shopId}`,
        method: 'get',
        onSuccess: types.GET_LIST_PRODUCTS_SUCCESS,
        onError: types.GET_LIST_PRODUCTS_ERROR,
    };
};
export const getNewProducts = (shopId) => {
    return {
        url: `${ep.enpoint}/api/products/new-products/${shopId}`,
        method: 'get',
        onSuccess: types.GET_NEW_PRODUCTS_SUCCESS,
        onError: types.GET_NEW_PRODUCTS_ERROR,
    };
};
export const getManProducts = (shopId) => {
    return {
        url: `${ep.enpoint}/api/products/man-products/${shopId}`,
        method: 'get',
        onSuccess: types.GET_MAN_PRODUCTS_SUCCESS,
        onError: types.GET_MAN_PRODUCTS_ERROR,
    };
};
export const getWomenProducts = (shopId) => {
    return {
        url: `${ep.enpoint}/api/products/women-products/${shopId}`,
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
export const getTopProducts = (shopId) => {
    return {
        url: `${ep.enpoint}/api/products/top-product/${shopId}`,
        method: 'get',
        onSuccess: types.GET_TOP_PRODUCTS_SUCCESS,
        onError: types.GET_TOP_PRODUCTS_ERROR,
    };
};
export const getBestSaleMen = (shopId) => {
    return {
        url: `${ep.enpoint}/api/products/sale-men/${shopId}`,
        method: 'get',
        onSuccess: types.GET_TOP_SALE_MEN_SUCCESS,
        onError: types.GET_TOP_SALE_MEN_ERROR,
    };
};
export const getBestSaleWomen = (shopId) => {
    return {
        url: `${ep.enpoint}/api/products/sale-women/${shopId}`,
        method: 'get',
        onSuccess: types.GET_TOP_SALE_WOMEN_SUCCESS,
        onError: types.GET_TOP_SALE_WOMEN_ERROR,
    };
};
export const comment = (data) => {
    return {
        url: `${ep.enpoint}/api/products/comment`,
        method: 'post',
        data: data,
        onSuccess: types.COMMENT_SUCCESS,
        onError: types.COMMENT_FAILE,
    };
}; 