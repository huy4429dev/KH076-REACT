
import { types } from './../../actions/backEnd/login';

const initState = {
    login: false,
    user: null,
    token: null,
}

export default (state = initState, action) => {
    let index;
    switch (action.type) {
        case types.ADMIN_LOGIN_SUCCESS:
            state.login = true;
            state.token = action.data.token;
            state.user = action.data.user;
            localStorage.setItem('access_token', action.data.token);
            return {
                ...state,
            }
        case types.ADMIN_LOGOUT_SUCCESS:
            state.login = false;
            state.token = null;
            state.user = null;
            localStorage.removeItem('access_token');
            return {
                ...state,
            }
        case types.GET_USER_ADMIN_SUCCESS:
            state.user = action.data.data;
            return {
                ...state,
            }
        case types.GET_USER_ADMIN_ERROR:
            state.user = null;
            return {
                ...state,
            }
        default:
            return state;
    }
}
