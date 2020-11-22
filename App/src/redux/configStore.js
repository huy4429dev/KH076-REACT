import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from './../reducers/index';
import callAjax from './../lib/ajax';
import thunk from 'redux-thunk';

const composeEnhancer =
    process.env.NODE_ENV !== 'production' &&
        typeof window === 'object' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            shouldHotReload: false,
        })
        : compose;
const configStore = () => {
    const middlewares = [callAjax, thunk];
    const enhancers = [applyMiddleware(...middlewares)];
    const store = createStore(rootReducer, composeEnhancer(...enhancers));
    return store;
};

export default configStore;