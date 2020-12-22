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
    COMMENT_FAILE: "COMMENT_FAILE",
    SEARCH_SUCCESS: "SEARCH_SUCCESS",
    SEARCH_ERROR: "SEARCH_ERROR",
    GET_PRODUCTS_CATEGORY_SUCCESS: "GET_PRODUCTS_CATEGORY_SUCCESS",
    GET_PRODUCTS_CATEGORY_ERROR: "GET_PRODUCTS_CATEGORY_ERROR",
    GET_COMMENT_SUCCESS: "GET_COMMENT_SUCCESS",
    GET_COMMENT_ERROR: "GET_COMMENT_ERROR",
    CHECK_ORDER_SUCCESS: "CHECK_ORDER_SUCCESS",
    CHECK_ORDER_ERROR: "CHECK_ORDER_ERROR",
    GET_COLOR_SUCCESS: "GET_COLOR_SUCCESS",
    GET_COLOR_ERROR: "GET_COLOR_ERROR"
}

export const getListProducts = (param) => {
    return {
        url: `${ep.enpoint}/api/products/shops?${param}`,
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
export const search = (search) => {
    return {
        url: `${ep.enpoint}/api/products/search?${search}`,
        method: 'get',
        onSuccess: types.SEARCH_SUCCESS,
        onError: types.SEARCH_ERROR,
    };
};
export const getProductCategory = (id, params) => {
    return {
        url: `${ep.enpoint}/api/products/products-category/${id}?${params}`,
        method: 'get',
        onSuccess: types.GET_PRODUCTS_CATEGORY_SUCCESS,
        onError: types.GET_PRODUCTS_CATEGORY_ERROR,
    };
};
export const getComment = (id) => {
    return {
        url: `${ep.enpoint}/api/products/comment/${id}`,
        method: 'get',
        onSuccess: types.GET_COMMENT_SUCCESS,
        onError: types.GET_COMMENT_ERROR,
    };
};
export const checkOrder = (id, userId) => {
    return {
        url: `${ep.enpoint}/api/products/check/${id}/${userId}`,
        method: 'get',
        onSuccess: types.CHECK_ORDER_SUCCESS,
        onError: types.CHECK_ORDER_ERROR,
    };
};
export const getColor = () => {
    return {
        url: `${ep.enpoint}/api/colors/all`,
        method: 'get',
        onSuccess: types.GET_COLOR_SUCCESS,
        onError: types.GET_COLOR_ERROR,
    };
};