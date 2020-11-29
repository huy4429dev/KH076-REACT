import * as ep from './../../constants/enpoint';
export const types = {
    REGISTER_HOME_SUCCESS: 'REGISTER_HOME_SUCCESS',
    REGISTER_HOME_ERROR: "REGISTER_HOME_ERROR",
    LOGIN_HOME_ERROR: "LOGIN_HOME_ERROR",
    LOGIN_HOME_SUCCESS: "LOGIN_HOME_SUCCESS",
    GET_USER_HOME_SUCCESS: "GET_USER_HOME_SUCCESS",
    GET_USER_HOME_ERROR: "GET_USER_HOME_ERROR",
    LOGOUT_HOME: "LOGOUT_HOME"
}


export const register = (params) => {
    return {
        url: `${ep.enpoint}/api/users/register`,
        method: 'post',
        data: params,
        onSuccess: types.REGISTER_HOME_SUCCESS,
        onError: types.REGISTER_HOME_ERROR,
    };

};
export const login = (params) => {
    return {
        url: `${ep.enpoint}/api/users/login`,
        method: 'post',
        data: params,
        onSuccess: types.LOGIN_HOME_SUCCESS,
        onError: types.LOGIN_HOME_ERROR,
    };
};
export const account = (id) => {
    return {
        url: `${ep.enpoint}/api/users/${id}`,
        method: 'get',
        onSuccess: types.GET_USER_HOME_SUCCESS,
        onError: types.GET_USER_HOME_ERROR,
    };
};
export const logout = () => {
    return {
        type: types.LOGOUT_HOME
    };
};