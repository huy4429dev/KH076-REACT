export const types = {
    "REGISTER_SUCCESS": 'REGISTER_ADMIN_SUCCESS',
}
const enpoint = "http://127.0.0.1:8000";

export const register = (params) => {
    return {
        url: `${enpoint}/api/users/register`,
        method: 'post',
        data: params,
        types: {
            success: types.REGISTER_SUCCESS,
        }
    };

};
