import { combineReducers } from 'redux';
import { REHYDRATE, PURGE, persistCombineReducers, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // or whatever storage you are using

import category from './backEnd/category';
import user from './backEnd/user';
import uploads from './backEnd/uploads';
import shop from './backEnd/shop';
import product from './backEnd/product';
import loginAdmin from './backEnd/login';
import loginHome from './frontEnd/login';

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
    loginAdmin,
    loginHome
});

export default persistReducer(config, rootReducer);