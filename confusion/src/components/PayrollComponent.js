import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, Breadcrumb, BreadcrumbItem, CardHeader, CardBody } from 'reactstrap';
import { FadeTransform } from 'react-animation-components';

function RenderItem ({staff}) {

	const basicSalary = 3000000;

	const overTimeSalary = 200000;

	const salary = parseInt(staff.salaryScale* basicSalary, 10) + (staff.overTime* overTimeSalary);

	return (
		<FadeTransform in transformProps={{ exitTransform: 'scale(0.5) translateY(-50%)' }}>
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
		</FadeTransform>
	);
}


class Payroll extends Component {

	constructor(props) {
		super(props);

		this.state = {
            searchTerm: "",
            sortType: "asc"
        }
	}

	onSort = (type) => {
		this.setState({ sortType : type});
	}

	render() {
		const sorted = this.props.staffsSalary.staffsSalary.sort( (a, b) => {
	
			const isReversed = (this.state.sortType === "asc" || this.state.sortType === "tang") ? 1 : -1;
			if (this.state.sortType === "asc" || this.state.sortType === "desc") {
				return isReversed * (a.salary - b.salary);
			} else 
				return isReversed * (a.id - b.id);
		});
	
		const payroll = sorted.filter((val) => {
			if (this.state.searchTerm === "") {
				return val
			} else if (val.name.toLowerCase().includes(this.state.searchTerm.toLowerCase())) {
				return val;
			}
		}).map((staff) => {
			return (

				<div className="col-sm-6 col-md-4" key={staff.id}>

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
					<button className='button' onClick={() => this.onSort("asc")}>Thấp - Cao</button>
					<button className='button' onClick={() => this.onSort("desc")}>Cao - Thấp</button>
					<form className="right">
                        <input type="text" name="search" id="search" placeholder="Search" onChange={(event) => {this.setState({ searchTerm: event.target.value});}}></input>
                    </form>
					<label>Sắp xếp theo mã nhân viên: </label>
					<button className='button' onClick={() => this.onSort("tang")}>Tăng</button>
					<button className='button' onClick={() => this.onSort("giam")}>Giảm</button>
					<hr />
				</div>
			</div>
			<div className='row'>
				{payroll}
			</div>
		</div>
	);
	}		

}


export default Payroll;