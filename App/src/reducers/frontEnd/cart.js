
import { types } from './../../actions/frontEnd/cart';

const initState = {
    items: []
}

export default (state = initState, action) => {
    let index = -1;
    switch (action.type) {
        case types.ADD_CART:
            index = state.items.findIndex(item => item.product.id == action.item.id);
            if (index != -1) {
                state.items[index].quantity += action.quantity;
            } else {
                state.items = [
                    {
                        product: action.item,
                        quantity: 1
                    }
                    , ...state.items
                ];
            }
            return {
                ...state,
            }
        case types.REMOVE_CART:
            state.items = state.items.filter(item => item.product.id != action.item.product.id);
            return {
                ...state,
            }
        default:
            return state;
    }
}
