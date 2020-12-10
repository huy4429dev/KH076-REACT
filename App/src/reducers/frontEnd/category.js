
import { types } from './../../actions/backEnd/category';

const initState = {
    items: []
}

export default (state = initState, action) => {
    let index;
    switch (action.type) {
        case types.GET_CATEGORY_SUCCESS:
            state.items = action.data.data.items;
            return {
                ...state,
            }
        default:
            return state;
    }
}
