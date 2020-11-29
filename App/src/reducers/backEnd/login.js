
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
            state.token = action.data.token
            localStorage.setItem('access_token', action.data.token);
            return {
                ...state,
            }
        default:
            return state;
    }
}
