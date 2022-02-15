import React, { useState } from 'react';
import Menu from './MenuComponent';
import StaffList from './StaffListComponent';
import StaffDetail from './StaffdetailComponent';
import { DISHES } from '../shared/dishes';
import { STAFFS } from '../shared/staffs';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Contact from './ContactComponent';
import { Routes, Route, Navigate, useParams } from 'react-router-dom';

function Main (props) {

    const [dishes, setDishes] = useState(DISHES);
    const [staffs, setStaffs] = useState(STAFFS);

    
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
                <Route path="/staffs" element={<StaffList staffs={staffs}/>} />
                <Route path='/menu' element={<Menu dishes={dishes} />} /> 
                {/* <Route path="*" element={<Navigate to="/staffs" />} /> */}
                <Route path='/departments' element={<Contact />} />
                <Route path='/staffs/:staffId' element={<StaffWithId />} />
            </Routes>
            <Footer />

        </div>
    );

}

export default Main;