import React, { Component } from 'react';
import Payroll from './PayrollComponent';
import StaffList from './StaffListComponent';
import StaffDetail from './StaffdetailComponent';
import Departments from './DepartmentsComponent';
import DepartmentDetail from './Departmentdetail';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import About from './AboutComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { addStaffs, fetchStaffs, fetchDepartments, addDepartments, fetchDepartmentStaffs, addDepartmentStaffs, 
    fetchStaffsSalary, addStaffsSalary, postStaff, deleteStaff, updateStaff } from '../redux/ActionCreators';
import { connect } from 'react-redux';


const mapStateToProps = state => {
    return {
        staffs: state.staffs,
        departments: state.departments,
        roles: state.roles,
        leaders: state.leaders,
        staffsSalary: state.staffsSalary,
    }
}

const mapDispatchToProps = (dispatch) => ({
    fetchStaffs: () => { dispatch(fetchStaffs()) },
    fetchStaffsSalary: () => { dispatch(fetchStaffsSalary()) },
    addStaffsSalary: (staffsSalary) => dispatch(addStaffsSalary(staffsSalary)),
    addStaffs: (staffs) => dispatch(addStaffs(staffs)),
    addDepartments: (departments) => dispatch(addDepartments(departments)),
    addDepartmentStaffs: (departmentId) => dispatch(addDepartmentStaffs(departmentId)),
    fetchDepartments: () => { dispatch(fetchDepartments()) },
    fetchDepartmentStaffs: () => { dispatch(fetchDepartmentStaffs()) },
    postStaff: (staff) => dispatch(postStaff(staff)),
    deleteStaff: (id) => dispatch(deleteStaff(id)),
    updateStaff: (staff) => dispatch(updateStaff(staff))
});
class Main extends Component {

    constructor (props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchStaffs();
        this.props.fetchDepartments();
        this.props.fetchDepartmentStaffs();
        this.props.fetchStaffsSalary();
    }
    
    render() {

        const StaffWithId = ({match}) => {
            return(
                <StaffDetail staff={this.props.staffs.staffs.filter((staff) => staff.id === parseInt(match.params.staffId,10))[0]}
                    departments={this.props.departments.departments} />
            );
        }

        const DepartmentWithId = ({match}) => {
            return(
                <DepartmentDetail staffs={this.props.staffs.staffs.filter((staff) => staff.departmentId === match.params.departmentId)}
                    department={this.props.departments.departments.find((depart) => depart.id === match.params.departmentId)} />
            );
        }

        return (
            <div>
                <Header />
                <Switch>
                    <Route exact path="/staffs" component={() => <StaffList staffs={this.props.staffs} postStaff={this.props.postStaff}
                                                                    deleteStaff={this.props.deleteStaff} updateStaff={this.props.updateStaff} />} />
                    <Route exact path='/about' component={() => <About leaders={this.props.leaders} />} />
                    <Route exact path='/payroll' component={() => <Payroll staffsSalary={this.props.staffsSalary} />} /> 
                    <Route exact path='/departments' component={() => <Departments departments={this.props.departments} />} />
                    <Route path='/staffs/:staffId' component={StaffWithId} />
                    <Route path='/departments/:departmentId' component={DepartmentWithId} />
                    <Redirect to="/staffs" />
                </Switch>
                <Footer />

            </div>
    );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));