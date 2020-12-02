
import { types } from './../../actions/frontEnd/product';

const initState = {
    items: [],
    newProduct: [],
    manProduct: [],
    womenProduct: [],
    detailt: null,
    listProduct: null
}

export default (state = initState, action) => {
    let index;
    switch (action.type) {
        case types.GET_LIST_PRODUCTS_SUCCESS:
            state.listProduct = action.data.data;
            return {
                ...state
            }
        case types.GET_NEW_PRODUCTS_SUCCESS:
            state.newProduct = action.data.data.items;
            return {
                ...state
            }
        case types.GET_MAN_PRODUCTS_SUCCESS:
            state.manProduct = action.data.data.items;
            return {
                ...state
            }
        case types.GET_WOMEN_PRODUCTS_SUCCESS:
            state.womenProduct = action.data.data.items;
            return {
                ...state
            }
        case types.GET_DETAILT_PRODUCTS_SUCCESS:
            state.detailt = action.data.data;
            return {
                ...state
            }
        default:
            return state;
    }
}
