import React, { useState } from 'react';
import Payroll from './PayrollComponent';
import StaffList from './StaffListComponent';
import StaffDetail from './StaffdetailComponent';
import { STAFFS, DEPARTMENTS, ROLE } from '../shared/staffs';
import { LEADERS } from '../shared/leaders';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import About from './AboutComponent';
import Departments from './DepartmentsComponent';
import { Routes, Route, Navigate, useParams } from 'react-router-dom';

function Main (props) {

    const [staffs, setStaffs] = useState(STAFFS);
    const [departments, setDepartments] = useState(DEPARTMENTS);
    const [leaders, setLeaders] = useState(LEADERS);

    
    const StaffWithId = (props) => {
        const { staffId } = useParams();
        
        return(
            <StaffDetail staff={staffs.find((staff) => staff.id === Number(staffId))} />
        );
    };

    return (
        <div>
            <Header />
            <Routes>
                <Route path="/staffs" element={<StaffList staffs={staffs} />} />
                <Route path='/payroll' element={<Payroll staffs={staffs} />} /> 
                <Route path="*" element={<Navigate to="/staffs" />} />
                <Route path='/departments' element={<Departments departments={departments} />} />
                <Route path='/staffs/:staffId' element={<StaffWithId />} />
                <Route path='/about' element={<About leaders={leaders} />} />
            </Routes>
            <Footer />

        </div>
    );

}

export default Main;