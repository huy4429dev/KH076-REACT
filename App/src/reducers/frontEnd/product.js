
import { types } from './../../actions/frontEnd/product';

const initState = {
    items: [],
    newProduct: [],
    manProduct: [],
    womenProduct: [],
    detailt: null,
    listProduct: null,
    topProduct: [],
    saleMen: [],
    saleWomen: [],
    productCategory: null,
    comment: null,
    colors: null
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
        case types.GET_TOP_PRODUCTS_SUCCESS:
            state.topProduct = action.data.data.items;
            return {
                ...state
            }
        case types.GET_TOP_SALE_MEN_SUCCESS:
            state.saleMen = action.data.data.items;
            return {
                ...state
            }
        case types.GET_TOP_SALE_WOMEN_SUCCESS:
            state.saleWomen = action.data.data.items;
            return {
                ...state
            }
        case types.GET_PRODUCTS_CATEGORY_SUCCESS:
            state.productCategory = action.data.data;
            return {
                ...state
            }
        case types.GET_COMMENT_SUCCESS:
            state.comment = action.data.data;
            return {
                ...state
            }
        case types.COMMENT_SUCCESS:
            state.comment.items = [action.data.data, ...state.comment.items];
            return {
                ...state
            }
        case types.GET_COLOR_SUCCESS:
            state.colors = action.data.data.items;
            return {
                ...state
            }
        default:
            return state;
    }
}
