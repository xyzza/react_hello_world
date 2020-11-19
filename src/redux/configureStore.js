import { createStore, combineReducers, applyMiddleware } from 'redux';
import {Comments} from "./comments";
import {Promotions} from "./promotions";
import {Leaders} from "./leaders";
import {Dishes} from './dishes'
import thunk from 'redux-thunk';
import logger from 'redux-logger';

export const configureStore = () => {
    return createStore(
        combineReducers({
            dishes: Dishes,
            comments: Comments,
            promotions: Promotions,
            leaders: Leaders
        }),
        applyMiddleware(thunk, logger)
    );
};