import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

export const fetchStaffs = () => (dispatch) => {
    dispatch(staffsLoading(true));

    return fetch(baseUrl + 'staffs')
    .then(response => {
        if (response.ok) {
            return response;
        } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(staffs => dispatch(addStaffs(staffs)))
    .catch(error => dispatch(staffsFailed(error.message)));
};

export const staffsLoading = () => ({
    type: ActionTypes.STAFFS_LOADING
});

export const staffsFailed = (errmess) => ({
    type: ActionTypes.STAFFS_FAILED,
    payload: errmess
});

export const addStaffs = (staffs) => ({
    type: ActionTypes.ADD_STAFFS,
    payload: staffs
});

export const fetchDepartments = () => (dispatch) => {
    dispatch(departmentsLoading(true));

    return fetch(baseUrl + 'departments')
    .then(response => {
        if (response.ok) {
            return response;
        } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(departments => dispatch(addDepartments(departments)))
    .catch(error => dispatch(departmentsFailed(error.message)));
};

export const departmentsLoading = () => ({
    type: ActionTypes.DEPARTMENTS_LOADING
});

export const departmentsFailed = (errmess) => ({
    type: ActionTypes.DEPARTMENTS_FAILED,
    payload: errmess
});

export const addDepartments = (departments) => ({
    type: ActionTypes.ADD_DEPARTMENTS,
    payload: departments
});

export const fetchDepartmentStaffs = (departmentId) => (dispatch) => {
    dispatch(departmentStaffsLoading(true));

    return fetch(baseUrl + 'departments/' + departmentId)
    .then(response => {
        if (response.ok) {
            return response;
        } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(staffsDepartment => dispatch(addDepartmentStaffs(staffsDepartment)))
    .catch(error => dispatch(departmentStaffsFailed(error.message + baseUrl + 'departments/' + departmentId)));
};

export const departmentStaffsLoading = () => ({
    type: ActionTypes.DEPARTMENTSTAFFS_LOADING
});

export const departmentStaffsFailed = (errmess) => ({
    type: ActionTypes.DEPARTMENTSTAFFS_FAILED,
    payload: errmess
});

export const addDepartmentStaffs = (staffsDepartment) => ({
    type: ActionTypes.ADD_DEPARTMENTSTAFFS,
    payload: staffsDepartment
});

export const fetchStaffsSalary = () => (dispatch) => {
    dispatch(staffsSalaryLoading(true));

    return fetch(baseUrl + 'staffsSalary')
    .then(response => {
        if (response.ok) {
            return response;
        } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(staffsSalary => dispatch(addStaffsSalary(staffsSalary)))
    .catch(error => dispatch(staffsSalaryFailed(error.message)));
};

export const staffsSalaryLoading = () => ({
    type: ActionTypes.SALARIES_LOADING
});

export const staffsSalaryFailed = (errmess) => ({
    type: ActionTypes.SALARIES_FAILED,
    payload: errmess
});

export const addStaffsSalary = (staffsSalary) => ({
    type: ActionTypes.ADD_SALARIES,
    payload: staffsSalary
});

export const postStaff = (staff) => (dispatch) => {

    return fetch(baseUrl + 'staffs', {
        method: "POST",
        body: JSON.stringify(staff),
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "same-origin"
    })
    .then(response => {
        if (response.ok) {
            return response;
        } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        throw error;
    })
    .then(response => response.json())
    .then(response => { console.log('PostStaff', response); alert('Post a staff\n' + JSON.stringify(response)); })
    .catch(error => { console.log('PostStaff', error.message); alert('Post a staff error\n Error: ' + error.message); });
};

export const deleteStaff = (id) => (dispatch) => {

    return fetch(baseUrl + 'staffs/' + id, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "same-origin"
    })
    .then(response => {
        if (response.ok) {
            return response;
        } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        throw error;
    })
    .then(response => response.json())
    .then(response => { console.log('Delete Staff', response); alert('Delete a staff\n' + id); })
    .catch(error => { console.log('Staff delete error', error.message); alert('Delete a staff error\n Error: ' + error.message); });
};

export const updateStaff = (staff) => (dispatch) => {

    return fetch(baseUrl + 'staffs', {
        method: "PATCH",
        body: JSON.stringify(staff),
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "same-origin"
    })
    .then(response => {
        if (response.ok) {
            return response;
        } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        throw error;
    })
    .then(response => response.json())
    .then(response => { console.log('Update Staff', response); alert('Update a staff\n' + JSON.stringify(response)); })
    .catch(error => { console.log('Update Staff', error.message); alert('Update a staff error\n Error: ' + error.message); });
};