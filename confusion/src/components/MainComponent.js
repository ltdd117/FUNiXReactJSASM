import React, { Component } from 'react';
import Payroll from './PayrollComponent';
import StaffList from './StaffListComponent';
import StaffDetail from './StaffdetailComponent';
import Departments from './DepartmentsComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import About from './AboutComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';


const mapStateToProps = state => {
    return {
        staffs: state.staffs,
        departments: state.departments,
        roles: state.roles,
        leaders: state.leaders
    }
}
class Main extends Component {

    constructor (props) {
        super(props);
    }
    
    render() {

        const StaffWithId = ({match}) => {
            return(
                <StaffDetail staff={this.props.staffs.filter((staff) => staff.id === parseInt(match.params.staffId,10))[0]} />
            );
        }

        return (
            <div>
                <Header />
                <Switch>
                    <Route exact path="/staffs" component={() => <StaffList staffs={this.props.staffs} />} />
                    <Route exact path='/about' component={() => <About leaders={this.props.leaders} />} />
                    <Route exact path='/payroll' component={() => <Payroll staffs={this.props.staffs} />} /> 
                    <Route exact path='/departments' component={() => <Departments departments={this.props.departments} />} />
                    <Route path='/staffs/:staffId' component={StaffWithId} />
                    <Redirect to="/staffs" />
                </Switch>
                <Footer />

            </div>
    );
    }
}

export default withRouter(connect(mapStateToProps)(Main));