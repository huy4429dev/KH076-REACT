import * as ep from './../../constants/enpoint';
export const types = {
    REGISTER_HOME_SUCCESS: 'REGISTER_HOME_SUCCESS',
    REGISTER_HOME_ERROR: "REGISTER_HOME_ERROR",
    LOGIN_HOME_ERROR: "LOGIN_HOME_ERROR",
    LOGIN_HOME_SUCCESS: "LOGIN_HOME_SUCCESS",
    GET_USER_HOME_SUCCESS: "GET_USER_HOME_SUCCESS",
    GET_USER_HOME_ERROR: "GET_USER_HOME_ERROR",
    LOGOUT_HOME: "LOGOUT_HOME",
    LOGIN_FACEBOOK_SUCCESS: "LOGIN_FACEBOOK_SUCCESS",
    LOGIN_FACEBOOK_ERROR: "LOGIN_FACEBOOK_ERROR",
    GET_PROFILE_SUCCESS: "GET_PROFILE_SUCCESS",
    GET_PROFILE_ERROR: "GET_PROFILE_ERROR",
    UPDATE_AVATAR_SUCCESS: "UPDATE_AVATAR_SUCCESS",
    UPDATE_AVATAR_ERROR: "UPDATE_AVATAR_ERROR",
    UPDATE_PROFILE_SUCCESS: "UPDATE_PROFILE_SUCCESS",
    UPDATE_PROFILE_ERROR: "UPDATE_PROFILE_ERROR"
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
export const loginFacebook = (data) => {
    return {
        url: `${ep.enpoint}/api/users/facebook`,
        method: 'post',
        data: data,
        onSuccess: types.LOGIN_FACEBOOK_SUCCESS,
        onError: types.LOGIN_FACEBOOK_ERROR,
    };
};
export const getProfile = (id) => {
    return {
        url: `${ep.enpoint}/api/users/profile/${id}`,
        method: 'get',
        onSuccess: types.GET_PROFILE_SUCCESS,
        onError: types.GET_PROFILE_ERROR,
    };
};
export const updateAvatar = (url, id) => {
    return {
        url: `${ep.enpoint}/api/users/avatar/${id}`,
        method: 'PUT',
        data: url,
        onSuccess: types.UPDATE_AVATAR_SUCCESS,
        onError: types.UPDATE_AVATAR_ERROR,
    };
};
export const updateProfile = (data, id) => {
    return {
        url: `${ep.enpoint}/api/users/profile/${id}`,
        method: 'PUT',
        data: data,
        onSuccess: types.UPDATE_PROFILE_SUCCESS,
        onError: types.UPDATE_PROFILE_ERROR,
    };
};