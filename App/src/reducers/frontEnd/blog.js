import { types } from "./../../actions/frontEnd/blog";

const initState = {
    items: [],
    recent: [],
    detail: null
};

export default (state = initState, action) => {
    let index = -1;
    switch (action.type) {
        case types.GET_NEWS_HOME_SUCCESS:
            state.items = action.data.data;
            return {
                ...state,
            };
        case types.GET_NEWS_RECENT_HOME_SUCCESS:
            state.recent = action.data.data;
            return {
                ...state,
            };
        case types.GET_NEWS_DETAIL_HOME_SUCCESS:
            state.detail = action.data.data;
            return {
                ...state,
            };
        default:
            return state;
    }


};
