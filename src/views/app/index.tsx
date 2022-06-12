import AsyncStorage from '@react-native-async-storage/async-storage';
import {applyMiddleware, compose, createStore, Middleware} from 'redux';
import {persistReducer, persistStore} from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import allReducer from './redux/App.Reducer';
import allSagas from './redux/App.Saga';
export * from './redux/App.Types';
// persitsInit
const persistConfig = {
  key: 'managementCarApp',
  whitelist: ['TiepNhanXeReducer', 'PhieuSuaChuaReducer', 'CreatePSCReducer'],
  storage: AsyncStorage
};
const middleware: Middleware[] = [];
const reducer = persistReducer(persistConfig, allReducer);
const sagaMiddleware = createSagaMiddleware();
middleware.push(sagaMiddleware);

const store = createStore(reducer, compose(applyMiddleware(...middleware)));

sagaMiddleware.run(allSagas);

const persistor = persistStore(store);

export {persistor, store};
