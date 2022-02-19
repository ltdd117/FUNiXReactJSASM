import { LEADERS } from '../shared/leaders';
import { STAFFS, DEPARTMENTS, ROLE } from '../shared/staffs';


export const initialState = {
    staffs: STAFFS,
    departments: DEPARTMENTS,
    roles: ROLE,
    leaders: LEADERS
};

export const Reducer = (state = initialState, action) => {
    return state;
};