
import { types } from './../../actions/backEnd/shop';

const initState = {
    shops: null
}

export default (state = initState, action) => {
    let index;
    switch (action.type) {
        case types.GET_SHOP_SUCCESS:
            return {
                ...state,
                shops: action.data.data,
            }
        case types.DELETE_SHOP_SUCCESS:
            state.shops.items = state.shops.items.filter(item => item.id != action.data.data.id);
            return {
                ...state,
            }
        case types.ADD_SHOP_SUCCESS:
            state.shops.items = [...action.data.data, state.shops.items];
            return {
                ...state,
            }
        case types.EDIT_SHOP_SUCCESS:
            index = state.shops.items.findIndex(item => item.id == action.data.data.id);
            if (index >= 0) {
                state.shops.items[index] = action.data.data;
            }
            return {
                ...state,
            }
        default:
            return state;
    }
}
