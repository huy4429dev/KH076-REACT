import * as ep from './../../constants/enpoint';
export const types = {
    ADD_CART: 'ADD_CART',
    REMOVE_CART: "REMOVE_CART"
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