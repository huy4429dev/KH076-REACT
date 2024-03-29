import * as ep from './../../constants/enpoint';
export const types = {
    REGISTER_SUCCESS: 'REGISTER_ADMIN_SUCCESS',
    REGISTER_ERROR: "REGISTER_ERROR",
    ADMIN_LOGIN_FAILE: "ADMIN_LOGIN_FAILE",
    ADMIN_LOGIN_SUCCESS: "ADMIN_LOGIN_SUCCESS",
    ADMIN_LOGOUT_SUCCESS: "ADMIN_LOGOUT_SUCCESS",
    GET_USER_ADMIN_SUCCESS: "GET_USER_ADMIN_SUCCESS",
    GET_USER_ADMIN_ERROR: "GET_USER_ADMIN_ERROR"
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
export const login = (params) => {
    return {  
        url: `${ep.enpoint}/api/users/login`,
        method: 'post',
        data: params,
        onSuccess: types.ADMIN_LOGIN_SUCCESS,
        onError: types.ADMIN_LOGIN_FAILE,
    };
};
export const logout = () => {
    return {
        type: types.ADMIN_LOGOUT_SUCCESS
    };
};
export const account = (id) => {
    return {
        url: `${ep.enpoint}/api/users/${id}`,
        method: 'get',
        onSuccess: types.GET_USER_ADMIN_SUCCESS,
        onError: types.GET_USER_ADMIN_ERROR,
    };
};
