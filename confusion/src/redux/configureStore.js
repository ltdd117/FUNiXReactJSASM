import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Staffs } from './staffs';
import { Departments } from './departments';
import { Leaders } from './leaders';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

export const ConfigureStore = () => {
    return createStore(
        combineReducers({
            staffs: Staffs,
            departments: Departments,
            leaders: Leaders
        }),
        applyMiddleware(thunk, logger)
    );
}