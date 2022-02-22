import React from 'react';
import { Breadcrumb, BreadcrumbItem, Media } from 'reactstrap';
import { Link } from 'react-router-dom';

function RenderDepartmentItem ({department}) {
	return (
		<div className=" item" key={department.id}>
            <Link to={`/departments/${department.id}`}>
            <Media top heading><h4><strong>{department.name}</strong></h4></Media>
            <Media body className='ml-5'>
                <Media>Số lượng nhân viên: {department.numberOfStaff}</Media>
            </Media>
            </Link>
		</div>
	);
}

function Departments(props) {

    const departmentsList = props.departments.departments.map((department) => {
        return (
            <div className='col-md-4 col-sm-6' key={department.id}>
            <RenderDepartmentItem department={department}/>
            </div>
        );
    });

    return(
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/staffs">Nhân Viên</Link></BreadcrumbItem>
                    <BreadcrumbItem active>Phòng Ban</BreadcrumbItem>
                </Breadcrumb>
            </div>
            <div className="col-12">
                    <h3>Phòng Ban</h3>
                    <hr />
            </div>   
            <div className="row ">
                {departmentsList}
            </div>
        </div>
    );
}

export default Departments;

