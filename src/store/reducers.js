import { combineReducers } from '@reduxjs/toolkit';

const x = (state = 0) => state;

export default function createReducer( injectReducers = {}){
    const rootReducer = combineReducers({
        x,
        ...injectReducers
    });
    return rootReducer;
};