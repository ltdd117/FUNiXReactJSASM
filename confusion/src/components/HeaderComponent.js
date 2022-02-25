import React, { Component } from "react";
import { Nav, Navbar, NavbarBrand, NavbarToggler, Collapse, NavItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';

class Header extends Component {
    constructor(props) {
        super(props);

        this.toggleNav = this.toggleNav.bind(this);
        this.state = {
            isNavOpen: false
        };
    }

    toggleNav() {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    }

    render() {
        return(
            <React.Fragment>
                <Navbar dark expand="md" color="faded">
                    <div className="container">
                        <NavbarBrand className="mr-auto" href="/"><img src='assets/images/logo.png' height="30" width="41" alt='Ristorante Con Fusion' /></NavbarBrand>
                        <NavbarToggler onClick={this.toggleNav} className=''/>
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            <Nav navbar>
                            <NavItem className="box">
                                <NavLink className="nav-link"  to='/staffs'><span className="fa fa-users fa-lg"></span> Nhân Viên</NavLink>
                            </NavItem>
                            <NavItem className="box">
                                <NavLink className="nav-link" to='/departments'><span className="fa fa-id-card fa-lg"></span> Phòng Ban</NavLink>
                            </NavItem>
                            <NavItem className="box">
                                <NavLink className="nav-link"  to='/payroll'><span className="fa fa-heart fa-lg"></span> Bảng Lương</NavLink>
                            </NavItem>
                            
                            </Nav>
                        </Collapse>
                    </div>
                </Navbar>
                <div className="jumbo">
                    <div className="container">
                        <div className="row row-header">
                            <div className="col-12 col-sm-6 ">
                                <h1>Ứng dụng quản lý nhân sự v1.1</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Header;