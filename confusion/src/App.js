import './App.css';
import { Navbar, NavbarBrand } from 'reactstrap';
import StaffList from './components/StaffListComponent';
import React, { Component } from 'react';
import { STAFFS } from './shared/staffs';
class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      staffs: STAFFS
    };
  }

  render() {
    return (
      <div className='background'>
        <Navbar dark color='primary'>
          <div className='container middle'>
            <NavbarBrand href='/'>Ứng dụng quản lý nhân sự v1.0</NavbarBrand>
          </div>
        </Navbar>
        <br></br>
        <StaffList staffs={this.state.staffs} />
      </div>
    );
  }
}

export default App;
