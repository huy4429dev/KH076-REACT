export const types = {
    "REGISTER_SUCCESS": 'REGISTER_ADMIN_SUCCESS',
}

export const register = (params) => {
    return {
        url: `/api/users/register`,
        method: 'post',
        data: params,
        types: {
            success: types.REGISTER_SUCCESS,
        }
    };

};
