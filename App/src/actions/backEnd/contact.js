import * as ep from './../../constants/enpoint';
export const types = {
    GET_CONTACT_SUCCESS: "GET_CONTACT_SUCCESS",
    GET_CONTACT_ERROR: "GET_CONTACT_ERROR",
    DELETE_CONTACT_ERROR: "DELETE_CONTACT_ERROR",
    DELETE_CONTACT_SUCCESS: "DELETE_CONTACT_SUCCESS",
}


export const getList = (param) => {
    return {
        url: `${ep.enpoint}/api/contact?${param}`,
        method: 'get',
        onSuccess: types.GET_CONTACT_SUCCESS,
        onError: types.GET_CONTACT_ERROR
    };
};
export const remove = (id) => {
    return {
        url: `${ep.enpoint}/api/contact/${id}`,
        method: 'delete',
        onSuccess: types.DELETE_CONTACT_SUCCESS,
        onError: types.DELETE_CONTACT_ERROR
    };
};

