import * as ep from './../../constants/enpoint';
export const types = {
    "REGISTER_SUCCESS": 'REGISTER_ADMIN_SUCCESS',
    "REGISTER_ERROR": "REGISTER_ERROR",
    "A_SUCCESS": "A_SUCCESS",
    "A_ERROR": "A_ERROR"
}


export const register = (params) => {
    return {
        url: `${ep.enpoint}/api/users/register`,
        method: 'post',
        data: params,
        onSuccess: types.REGISTER_SUCCESS,
        onError: types.REGISTER_ERROR,
    };

};
export const test = (data) => {
    return {
        url: `${ep.enpoint}/api/users/register`,
        method: 'get',
        onSuccess: types.A_SUCCESS,
        onError: types.A_ERROR,
    };

};
