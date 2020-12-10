
import { types } from './../../actions/frontEnd/login';

const initState = {
    login: false,
    user: null,
    token: null,
    profile: null
}

export default (state = initState, action) => {
    let index;
    switch (action.type) {
        case types.LOGIN_HOME_SUCCESS:
            state.login = true;
            state.token = action.data.token;
            state.user = action.data.user;
            state.role = action.data.role;
            
            localStorage.setItem('access_token', action.data.token);
            return {
                ...state,
            }
        case types.GET_USER_HOME_ERROR:
            state.login = false;
            state.token = null;
            state.user = null;
            localStorage.removeItem('access_token');
            return {
                ...state,
            }
        case types.LOGOUT_HOME:
            state.login = false;
            state.token = null;
            state.user = null;
            localStorage.removeItem('access_token');
            return {
                ...state,
            }
        case types.GET_USER_HOME_SUCCESS:
            state.user = action.data.data;
            return {
                ...state,
            }
        case types.LOGIN_FACEBOOK_SUCCESS:
            state.login = true;
            state.token = action.data.token;
            state.user = action.data.user;
            localStorage.setItem('access_token', action.data.token);
            return {
                ...state,
            }
        case types.UPDATE_AVATAR_SUCCESS:
            state.user = action.data.data;
            return {
                ...state,
            }
        default:
            return state;
    }
}
