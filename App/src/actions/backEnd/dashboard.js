import * as ep from './../../constants/enpoint';
export const types = {
    GET_DASHBOARD_SUCCESS: 'GET_DASHBOARD_SUCCESS',
    GET_DASHBOARD_ERROR: 'GET_DASHBOARD_ERROR',

}

export const getDataDashboard = () => {
    return {
        url: `${ep.enpoint}/api/report`,
        method: 'get',
        onSuccess: types.GET_DASHBOARD_SUCCESS,
        onError: types.GET_DASHBOARD_ERROR
    };

};

