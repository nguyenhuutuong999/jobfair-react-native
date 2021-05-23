import {createStore, applyMiddleware} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import { persistStore } from 'redux-persist';
import reducers from './reducers';

const middleware = [thunkMiddleware];
const store = composeWithDevTools(applyMiddleware(...middleware))(createStore)(reducers);
const persistor = persistStore(store);

export {
  store,
  persistor,
};
