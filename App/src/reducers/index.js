import { combineReducers } from 'redux';
import { REHYDRATE, PURGE, persistCombineReducers, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // or whatever storage you are using

import category from './backEnd/category';
import user from './backEnd/user';
import uploads from './backEnd/uploads';
import shop from './backEnd/shop';
import product from './backEnd/product';
import login from './backEnd/login';

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
    product,
    login
});

export default persistReducer(config, rootReducer);