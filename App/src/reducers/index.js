import { combineReducers } from 'redux';
import { REHYDRATE, PURGE, persistCombineReducers, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // or whatever storage you are using

const config = {
    key: 'xxx',
    blacklist: [],
    storage
};
const rootReducer = combineReducers({

});

export default persistReducer(config, rootReducer);