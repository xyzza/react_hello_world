import { createStore, combineReducers, applyMiddleware } from 'redux';
import {Comments} from "./comments";
import {Promotions} from "./promotions";
import {Leaders} from "./leaders";
import {Dishes} from './dishes'
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {createForms} from 'react-redux-form';
import {InitialFeedback} from './Forms'

export const configureStore = () => {
    return createStore(
        combineReducers({
            dishes: Dishes,
            comments: Comments,
            promotions: Promotions,
            leaders: Leaders,
            ...createForms({
                feedback: InitialFeedback
            })

        }),
        applyMiddleware(thunk, logger)
    );
};