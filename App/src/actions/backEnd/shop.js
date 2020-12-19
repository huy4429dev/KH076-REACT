import * as ep from './../../constants/enpoint';
export const types = {
    GET_USER_SUCCESS: 'GET_USER_SHOP_SUCCESS',
    GET_USER_ERROR: 'GET_USER_SHOP_ERROR',
    ADD_SHOP_SUCCESS: 'ADD_SHOP_SUCCESS',
    ADD_SHOP_ERROR: 'ADD_SHOP_ERROR',
    GET_SHOP_SUCCESS: "GET_SHOP_SUCCESS",
    GET_SHOP_ERROR: "GET_SHOP_ERROR",
    DELETE_SHOP_SUCCESS: "DELETE_SHOP_SUCCESS",
    DELETE_SHOP_ERROR: "DELETE_SHOP_ERROR",
    EDIT_SHOP_SUCCESS: "EDIT_SHOP_SUCCESS",
    EDIT_SHOP_ERROR: "EDIT_SHOP_ERROR"
    // CREATE_NEWS_SUCCESS: 'CREATE_NEWS_SUCCESS',
    // CREATE_NEWS_ERROR: 'CREATE_NEWS_ERROR',
    // GET_NEWS_SUCCESS: "GET_NEWS_SUCCESS",
    // GET_NEWS_ERROR: "GET_NEWS_ERROR",
    // DELETE_NEWS_SUCCESS: "DELETE_NEWS_SUCCESS",
    // DELETE_NEWS_ERROR: "DELETE_NEWS_ERROR",
    // EDIT_NEWS_SUCCESS: "EDIT_NEWS_SUCCESS",
    // EDIT_NEWS_ERROR: "EDIT_NEWS_ERROR",
}


export const getUser = (data) => {
    return {
        url: `${ep.enpoint}/api/users/all`,
        method: 'get',
        onSuccess: types.GET_USER_SUCCESS,
        onError: types.GET_USER_ERROR
    };
};
export const add = (data) => {
    return {
        url: `${ep.enpoint}/api/shops`,
        method: 'post',
        data,
        onSuccess: types.ADD_SHOP_SUCCESS,
        onError: types.ADD_SHOP_ERROR
    };
};
export const getList = (params) => {
    return {
        url: `${ep.enpoint}/api/shops?${params}`,
        method: 'get',
        onSuccess: types.GET_SHOP_SUCCESS,
        onError: types.GET_SHOP_ERROR
    };
};
export const remove = (id, userId) => {
    return {
        url: `${ep.enpoint}/api/shops/${id}/${userId}`,
        method: 'delete',
        onSuccess: types.DELETE_SHOP_SUCCESS,
        onError: types.DELETE_SHOP_ERROR
    };
};
export const edit = (id, data) => {
    return {
        url: `${ep.enpoint}/api/shops/${id}`,
        method: 'put',
        data,
        onSuccess: types.EDIT_SHOP_SUCCESS,
        onError: types.EDIT_SHOP_ERROR
    };
};

