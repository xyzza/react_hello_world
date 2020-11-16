import { createStore } from 'redux';
import {Reducer, initialState} from "./reducer";

export const configureStore = () => {
    return createStore(
        Reducer, initialState
    );
};