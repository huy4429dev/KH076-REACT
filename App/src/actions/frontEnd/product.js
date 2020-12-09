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

export const getListProducts = () => {
    return {
        url: `${ep.enpoint}/api/products/shops`,
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
export const getTopProducts = () => {
    return {
        url: `${ep.enpoint}/api/products/top-product`,
        method: 'get',
        onSuccess: types.GET_TOP_PRODUCTS_SUCCESS,
        onError: types.GET_TOP_PRODUCTS_ERROR,
    };
};
export const getBestSaleMen = () => {
    return {
        url: `${ep.enpoint}/api/products/sale-men`,
        method: 'get',
        onSuccess: types.GET_TOP_SALE_MEN_SUCCESS,
        onError: types.GET_TOP_SALE_MEN_ERROR,
    };
};
export const getBestSaleWomen = () => {
    return {
        url: `${ep.enpoint}/api/products/sale-women`,
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