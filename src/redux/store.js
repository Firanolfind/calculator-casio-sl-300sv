import { createStore, applyMiddleware, compose } from 'redux';
import { persistReducer, persistStore, createTransform } from 'redux-persist';
import pLocalStorage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import { omit, escapeRegExp } from 'lodash';

/**
 * Root reducer of Application
 */
import root from './root';

const enhancers = [];

/**
 * Redux Dev Tools
 * would be removed in dev mode
 */
if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line no-underscore-dangle
  const devTools = window.__REDUX_DEVTOOLS_EXTENSION__;
  if (devTools) {
    enhancers.push(devTools());
  }
}

/**
 * Redux Persist Blacklist
 *
 * please use for loading statuses, dynamic data
 * or user sensitive information
 */
const BLACKLIST = [];

/**
 * Blacklist cleaner transformer
 */
const blackList = createTransform((inboundState, key) =>
  omit(inboundState, BLACKLIST.map((k) => k.replace(new RegExp(`^${escapeRegExp(key)}\\.`), ''))),
);

/**
 * Persisting Root reducer with Local storage
 * app key is app name
 * TODO: add version controling
 */
const persistedReducers = persistReducer(
  {
    key: 'calculator',
    storage: pLocalStorage,
    transforms: [blackList],
  },
  root,
);

/**
 * Redux Store
 * to be connected with Provider
 */
export const store = createStore(persistedReducers, compose(applyMiddleware(thunk), ...enhancers));

/**
 * Persistor
 * useful for firing global persist methods like - purge
 */
export const persistor = persistStore(store);
