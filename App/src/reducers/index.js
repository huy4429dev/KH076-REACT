import { combineReducers } from 'redux';
import { REHYDRATE, PURGE, persistCombineReducers, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // or whatever storage you are using

import category from './backEnd/category';
import user from './backEnd/user';
import uploads from './backEnd/uploads';
import shop from './backEnd/shop';
import productAdmin from './backEnd/product';
import productHome from './frontEnd/product';
import loginAdmin from './backEnd/login';
import loginHome from './frontEnd/login';
import cart from './frontEnd/cart';
import blogAdmin from './backEnd/blog';

const config = {
    key: 'doremon',
    blacklist: [],
    storage
};
const rootReducer = combineReducers({
    category,
    user,
    uploads,
    shop,
    productAdmin,
    productHome,
    loginAdmin,
    loginHome,
    cart,
    blogAdmin
});

export default persistReducer(config, rootReducer);