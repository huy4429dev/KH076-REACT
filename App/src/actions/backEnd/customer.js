import * as ep from './../../constants/enpoint';
export const types = {
    GET_LIST_SUCCESS: 'GET_LIST_ADMIN_SUCCESS',
    GET_LIST_FAILE: 'GET_LIST_ADMIN_SUCCESS',
}


export const getList = (params) => {
    return {
        url: `${ep.enpoint}/api/customer`,
        method: 'GET',
        onSuccess: types.GET_LIST_SUCCESS,
        onError: types.GET_LIST_FAILE,
    };

};
