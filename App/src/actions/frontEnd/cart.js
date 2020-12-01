import * as ep from './../../constants/enpoint';
export const types = {
    ADD_CART: 'ADD_CART',
    REMOVE_CART: "REMOVE_CART",
    REMOVE_ONE_ITEM_CART: "REMOVE_ONE_ITEM_CART",
    ADD_ONE_ITEM_CART: "ADD_ONE_ITEM_CART"
}

export const addCart = (item, quantity) => {
    return {
        item,
        quantity,
        type: types.ADD_CART
    };
};
export const removeCart = (item) => {
    return {
        item,
        type: types.REMOVE_CART
    };
};
export const addOneItemCart = (id) => {
    return {
        id,
        type: types.ADD_ONE_ITEM_CART
    };
};
export const removeOneItemCart = (id) => {
    return {
        id,
        type: types.REMOVE_ONE_ITEM_CART
    };
}; 