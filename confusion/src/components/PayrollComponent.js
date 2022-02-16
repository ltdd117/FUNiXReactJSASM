import { func } from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Breadcrumb, BreadcrumbItem, CardHeader, CardBody } from 'reactstrap';

function RenderItem ({staff}) {

	const basicSalary = 3000000;

	const overTimeSalary = 200000;

	const salary = parseInt(staff.salaryScale* basicSalary) + (staff.overTime* overTimeSalary);

	return (
		<Card>
			<CardHeader className='name'>{staff.name}</CardHeader>
			<CardBody>
				<p>Mã nhân viên: {staff.id}</p>
				<p>Hệ số lương: {staff.salaryScale}</p>
				<p>Số giờ làm thêm: {staff.overTime}</p>
				<hr />
				<p className='salary'>Lương: {salary}</p>
				<hr />
			</CardBody>
		</Card>
	);
}


function Payroll (props) {

	const [searchTerm, setSearchTerm] = useState("");
	const [sortType, setSortType] = useState("asc");

	const onSort = (type) => {
		setSortType(type);
	}

	const sorted = props.staffs.sort( (a, b) => {
		const basicSalary = 3000000;
		const overTimeSalary = 200000;
		const salaryA = parseInt(a.salaryScale* basicSalary) + (a.overTime* overTimeSalary);
		const salaryB = parseInt(b.salaryScale* basicSalary) + (b.overTime* overTimeSalary);

		const isReversed = (sortType === "asc" || sortType === "tang") ? 1 : -1;
		if (sortType === "asc" || sortType === "desc") {
			return isReversed * (salaryA - salaryB);
		} else 
			return isReversed * (a.id - b.id);
	});

	const payroll = sorted.filter((val) => {
        if (searchTerm == "") {
            return val
        } else if (val.name.toLowerCase().includes(searchTerm.toLowerCase())) {
            return val
		}
    }).map((staff) => {
		return (
			<div className="col-sm-6 col-md-4 m-1" key={staff.id}>
				<RenderItem staff={staff} />
			</div>
		);
	});

	return (
		<div className="container">
			<div className='row'>
				<Breadcrumb>
					<BreadcrumbItem><Link to={`/staffs`}>Nhân Viên</Link></BreadcrumbItem>
					<BreadcrumbItem active>Bảng Lương</BreadcrumbItem>
				</Breadcrumb>
				<div className='col-12'>
					<h3>Bảng Lương</h3>
					<label>Sắp xếp theo mức lương: </label>
					<button className='button' onClick={() => onSort("asc")}>Thấp - Cao</button>
					<button className='button' onClick={() => onSort("desc")}>Cao - Thấp</button>
					<form className="right">
                        <input type="text" name="search" id="search" placeholder="Search" onChange={(event) => {setSearchTerm(event.target.value);}}></input>
                        <button type="button" class="btn btn-search fa fa-search" ></button>
                    </form>
					<label>Sắp xếp theo mã nhân viên: </label>
					<button className='button' onClick={() => onSort("tang")}>Tăng</button>
					<button className='button' onClick={() => onSort("giam")}>Giảm</button>
					<hr />
				</div>
			</div>
			<div className="row">
				{payroll}
			</div>
		</div>
	);
}


export default Payroll;