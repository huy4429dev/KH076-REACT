import * as ep from './../../constants/enpoint';
export const types = {
    GET_NEWS: 'GET_NEWS',
    CREATE_NEWS_SUCCESS: 'CREATE_NEWS_SUCCESS',
    CREATE_NEWS_ERROR: 'CREATE_NEWS_ERROR',
    GET_NEWS_SUCCESS: "GET_NEWS_SUCCESS",
    GET_NEWS_ERROR: "GET_NEWS_ERROR",
    DELETE_NEWS_SUCCESS: "DELETE_NEWS_SUCCESS",
    DELETE_NEWS_ERROR: "DELETE_NEWS_ERROR",
    EDIT_NEWS_SUCCESS: "EDIT_NEWS_SUCCESS",
    EDIT_NEWS_ERROR: "EDIT_NEWS_ERROR",
}


export const add = (data) => {
    return {
        url: `${ep.enpoint}/api/blogs`,
        data: data,
        method: 'POST',
        onSuccess: types.CREATE_NEWS_SUCCESS,
        onError: types.CREATE_NEWS_ERROR
    };
};
export const getList = (param) => {
    return {
        url: `${ep.enpoint}/api/blogs?${param}`,
        method: 'get',
        onSuccess: types.GET_NEWS_SUCCESS,
        onError: types.GET_NEWS_ERROR
    };
};
export const remove = (id) => {
    return {
        url: `${ep.enpoint}/api/blogs/${id}`,
        method: 'delete',
        onSuccess: types.DELETE_NEWS_SUCCESS,
        onError: types.DELETE_NEWS_ERROR
    };
};
export const edit = (data, id) => {
    return {
        url: `${ep.enpoint}/api/blogs/${id}`,
        method: 'put',
        data,
        onSuccess: types.EDIT_NEWS_SUCCESS,
        onError: types.EDIT_NEWS_ERROR
    };
};
