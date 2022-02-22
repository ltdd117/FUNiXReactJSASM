import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Staffs } from './staffs';
import { Departments } from './departments';
import { Leaders } from './leaders';
import { StaffsSalary } from './staffsSalary';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { StaffsDepartment } from './staffsDepartment';

export const ConfigureStore = () => {
    return createStore(
        combineReducers({
            staffs: Staffs,
            departments: Departments,
            leaders: Leaders,
            staffsSalary: StaffsSalary,
            staffsDepartment: StaffsDepartment
        }),
        applyMiddleware(thunk, logger)
    );
}