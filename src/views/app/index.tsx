import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import allReducers from './redux/App.Reducer';
import allSagas from './redux/App.Saga';
export * from './redux/App.Types';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(allReducers, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(allSagas);

export default store;
