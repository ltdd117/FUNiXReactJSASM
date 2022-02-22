import * as ActionTypes from './ActionTypes';

export const StaffsDepartment = (state = { isLoading: true, errMess: null, staffsDepartment:[]}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_DEPARTMENTSTAFFS:
            return {...state, isLoading: false, errMess: null, staffsDepartment: action.payload};

        case ActionTypes.DEPARTMENTSTAFFS_LOADING:
            return {...state, isLoading: true, errMess: null, staffsDepartment: []}

        case ActionTypes.DEPARTMENTSTAFFS_FAILED:
            return {...state, isLoading: false, errMess: action.payload, staffsDepartment: action.payload};

        default:
            return state;
    }
};