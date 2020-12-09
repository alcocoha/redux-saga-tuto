import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { createInjectorsEnhancer } from 'redux-injectors'
import createSagaMiddleware from 'redux-saga';
import createReducer from './reducers';

// configureAppStore :: InitialState -> NewState
export default function configureAppStore(initialState = {}){
    const reduxSagaMonitorOptions = {};
    const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);
    const { run: runSaga } = sagaMiddleware;

    const middlewares = [sagaMiddleware];

    const enhancers = [
        createInjectorsEnhancer({
            createReducer,
            runSaga
        })
    ];

    const store = configureStore({
        reducer: createReducer(),
        middleware: [...getDefaultMiddleware(), ...middlewares],
        enhancers
    });

    return store;
}