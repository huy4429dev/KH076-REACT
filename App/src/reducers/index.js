import { combineReducers } from 'redux';
import { REHYDRATE, PURGE, persistCombineReducers, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // or whatever storage you are using

import category from './backEnd/category';
import user from './backEnd/user';
import uploads from './backEnd/uploads';
import shop from './backEnd/shop';
import productAdmin from './backEnd/product';
import productHome from './frontEnd/product';
import login from './frontEnd/login';
import cart from './frontEnd/cart';
import blogAdmin from './backEnd/blog';
import blogHome from './frontEnd/blog';
import order from './backEnd/order';
import productColor from './backEnd/productColor';
import productSize from './backEnd/productSize';
import product from './backEnd/product';
import customer from './backEnd/customer';
import contact from './backEnd/contact';
import categoryHome from './frontEnd/category';

const config = {
    key: 'doremon',
    blacklist: [],
    storage
};
const rootReducer = combineReducers({
    category,
    categoryHome,
    user,
    uploads,
    shop,
    productAdmin,
    productHome,
    login,
    cart,
    blogHome,
    blogAdmin,
    order,
    productColor,
    productSize,
    product,
    customer,
    contact
});

export default persistReducer(config, rootReducer);