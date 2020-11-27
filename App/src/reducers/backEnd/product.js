
import { types } from './../../actions/backEnd/category';

const initState = {
    items: []
}

export default (state = initState, action) => {
    let index;
    switch (action.type) {
        // case types.GET_LIST_POST_SUCCESS:
        //     return {
        //         ...state,
        //         posts: action.data,
        //     }
        default:
            return state;
    }
}
