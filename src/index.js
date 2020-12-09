import React from 'react';
import ReactDom from 'react-dom';
import { Provider, useDispatch } from 'react-redux';
import { injectSaga, useInjectSaga } from 'redux-injectors';
import { takeLatest } from 'redux-saga/effects';

import configureStore from './store/configureStore';

function* saga() {
    yield takeLatest('app/test', function* (action) {
        yield console.log(action);
    });
}

// 1.- App
const App = () => {
    useInjectSaga({ key: 'app', saga });
    const dispatch = useDispatch();

    const sagaHandler = React.useCallback(()=>{
        dispatch({ type: 'app/test', payload: Math.random() });
    }, [dispatch]);

    return (
        <div>
            <button onClick={sagaHandler}>call saga</button>
            <h1>Hola mundo 2</h1>
        </div>
    );
}

// 3.- Create store

const initialState = {};
const store = configureStore(initialState);
const mount_node = document.getElementById('app');


const ConnectApp = ({Component}) =>
    <Provider store={store}>
        <Component></Component>
    </Provider>

const render = (Component) =>
    ReactDom.render(
        <ConnectApp Component={Component}></ConnectApp>, mount_node
    );
// 2.- Render
render(App);