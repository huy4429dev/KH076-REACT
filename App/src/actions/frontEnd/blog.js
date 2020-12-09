import * as ep from './../../constants/enpoint';
export const types = {
    GET_NEWS_HOME_SUCCESS: "GET_NEWS_HOME_SUCCESS",
    GET_NEWS_HOME_ERROR: "GET_NEWS_HOME_ERROR",
    GET_NEWS_RECENT_HOME_SUCCESS: "GET_NEWS_RECENT_HOME_SUCCESS",
    GET_NEWS_RECENT_HOME_ERROR: "GET_NEWS_RECENT_HOME_ERROR",
    GET_NEWS_DETAIL_HOME_SUCCESS: "GET_NEWS_DETAIL_HOME_SUCCESS",
    GET_NEWS_DETAIL_HOME_ERROR: "GET_NEWS_DETAIL_HOME_ERROR"
}


export const getList = () => {
    return {
        url: `${ep.enpoint}/api/blogs/home`,
        method: 'get',
        onSuccess: types.GET_NEWS_HOME_SUCCESS,
        onError: types.GET_NEWS_HOME_ERROR
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