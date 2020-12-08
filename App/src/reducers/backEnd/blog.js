import { types } from "./../../actions/backEnd/blog";

const initState = {
    blogs: null,
};

export default (state = initState, action) => {
    let index = -1;
    switch (action.type) {
        case types.GET_NEWS_SUCCESS:
            state.blogs = action.data.data;
            return {
                ...state,
            };
        case types.CREATE_NEWS_SUCCESS:
            if (state.blogs) {
                state.blogs.items = [action.data.data, ...state.blogs.items]
            }
            return {
                ...state,
            };
        case types.DELETE_NEWS_SUCCESS:
            state.blogs.items = state.blogs.items.filter(item => item.id != action.data.data.id);
            return {
                ...state,
            };
        case types.EDIT_NEWS_SUCCESS:
            index = state.blogs.items.findIndex(item => item.id == action.data.data.id);
            if (index != -1) {
                state.blogs.items[index] = action.data.data;
            }
            return {
                ...state,
            };
        default:
            return state;
    }


};
