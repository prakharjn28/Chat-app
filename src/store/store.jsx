import { configureStore } from '@reduxjs/toolkit';
import appReducer from './reducer';
import logger from 'redux-logger';
// Configure Store
const store = configureStore({
    reducer: appReducer,
    // middleware: [thunk, logger],
});

export default store;
