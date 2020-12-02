import { types } from "./../../actions/backEnd/blog";

const initState = {
    items: [],
};

export default (state = initState, action) => {

    switch (action.type) {

        // case types.GET_CATEGORIES_SUCCESS:

        //     return {
        //         ...state,
        //         items: [...action.data.data.items],
        //     };
        default:
            return state;
    }


};
