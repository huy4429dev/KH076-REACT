import * as ep from './../../constants/enpoint';
export const types = {
    GET_CATEGORY_SUCCESS: "GET_CATEGORY_SUCCESS",
    GET_CATEGORY_ERROR: "GET_CATEGORY_ERROR",
}


export const getList = () => {
    return {
        url: `${ep.enpoint}/api/categories/list`,
        method: 'get',
        onSuccess: types.GET_CATEGORY_SUCCESS,
        onError: types.GET_CATEGORY_ERROR
    };
};
;