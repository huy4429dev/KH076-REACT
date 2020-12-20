import * as ep from './../constants/enpoint';
export const types = {
    GET_PROVINCE_SUCCESS: "GET_PROVINCE_SUCCESS",
    GET_PROVINCE_ERROR: "GET_PROVINCE_ERROR",
    GET_DISTRICT_SUCCESS: "GET_DISTRICT_SUCCESS",
    GET_DISTRICT_ERROR: "GET_DISTRICT_ERROR",
    GET_WARD_SUCCESS: "GET_WARD_SUCCESS",
    GET_WARD_ERROR: "GET_WARD_ERROR",
    GET_NEWS_RECENT_HOME_SUCCESS: "GET_NEWS_RECENT_HOME_SUCCESS",
    GET_NEWS_RECENT_HOME_ERROR: "GET_NEWS_RECENT_HOME_ERROR",
    GET_NEWS_DETAIL_HOME_SUCCESS: "GET_NEWS_DETAIL_HOME_SUCCESS",
    GET_NEWS_DETAIL_HOME_ERROR: "GET_NEWS_DETAIL_HOME_ERROR"
}


export const getProvince = () => {
    return {
        url: `${ep.enpoint}/api/address/province`,
        method: 'get',
        onSuccess: types.GET_PROVINCE_SUCCESS,
        onError: types.GET_PROVINCE_ERROR
    };
};
export const getDistrict = (id) => {
    return {
        url: `${ep.enpoint}/api/address/district/${id}`,
        method: 'get',
        onSuccess: types.GET_DISTRICT_SUCCESS,
        onError: types.GET_DISTRICT_ERROR
    };
};
export const getWard = (id) => {
    return {
        url: `${ep.enpoint}/api/address/ward/${id}`,
        method: 'get',
        onSuccess: types.GET_WARD_SUCCESS,
        onError: types.GET_WARD_ERROR
    };
};
export const getRecent = () => {
    return {
        url: `${ep.enpoint}/api/blogs/recent`,
        method: 'get',
        onSuccess: types.GET_NEWS_RECENT_HOME_SUCCESS,
        onError: types.GET_NEWS_RECENT_HOME_ERROR
    };
};
export const getDetailBlog = (id) => {
    return {
        url: `${ep.enpoint}/api/blogs/${id}`,
        method: 'get',
        onSuccess: types.GET_NEWS_DETAIL_HOME_SUCCESS,
        onError: types.GET_NEWS_DETAIL_HOME_ERROR
    };
};