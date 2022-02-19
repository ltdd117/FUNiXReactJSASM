import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { Card, CardImg, CardTitle, Breadcrumb, BreadcrumbItem, Form, FormGroup, 
    Input, Label, Button, Col, ModalHeader, Modal, ModalBody, FormFeedback, Row } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';

function RenderStaffsItem ({staff}) {
	return (
		<Card >
			<Link to={`/staffs/${staff.id}`}>
			<CardImg src={staff.image} alt={staff.name} />
                <CardTitle className="justify-center name">{staff.name}</CardTitle>
			</Link>
		</Card>
	);
}

function changeNumOfColumn() {
    let elements = document.getElementsByClassName("column");

    if (parseInt(document.getElementById("quantity").value) === 1) {
        for (let value of elements) {
            value.className = "col-md-12 col-sm-12 col-xs-6 column";
        }
    }

    if (parseInt(document.getElementById("quantity").value) === 2) {
        for (let value of elements) {
            value.className = "col-md-6 col-sm-6 col-xs-6 column";
        }
    }

    if (parseInt(document.getElementById("quantity").value) === 3) {
        for (let value of elements) {
            value.className = "col-md-4 col-sm-4 col-xs-6 column";
        }
    }

    if (parseInt(document.getElementById("quantity").value) === 4) {
        for (let value of elements) {
            value.className = "col-md-3 col-sm-3 col-xs-6 column";
        }
    }

    if (parseInt(document.getElementById("quantity").value) === 6) {
        for (let value of elements) {
            value.className = "col-md-2 col-sm-2 col-xs-6 column";
        }
    }
}


const newStaff = {
    id: "",
    name: "",
    doB: "",
    startDate: "",
    department: {
        name: ""
    },
    salaryScale: "",
    annualLeave: "",
    overTime: "",
    image: '/assets/images/alberto.png',
}

class StaffList extends Component {

    constructor (props) {
        super(props);

        this.state = {
            searchTerm: "",
            sortType: "asc",
            isModalOpen: false,
        }

        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen,
        });
    }

	onSort = (type) => {
		this.setState({ sortType : type});
	}

    onSubmit = () => {
        this.setState({ searchTerm: this.search.value});
    }

    handleSubmit = (values) =>{
        this.addNewStaff(values);
        this.toggleModal();
        this.props.staffs.push(newStaff);
        console.log('Current State is: ' + JSON.stringify(values));
    }

    addNewStaff(values) {
        newStaff.id = 16;
        newStaff.name = values.username;
        newStaff.doB = values.dob;
        newStaff.department.name = values.department;
        newStaff.startDate = values.startDate;
        newStaff.salaryScale = values.salaryScale;
        newStaff.annualLeave = values.annualLeave;
        newStaff.overTime = values.overTime;
        if (!newStaff.department.name)
            newStaff.department.name = 'Sale';
    }

    render() {

        const required = (val) => val && val.length;
        const maxLength = (len) => (val) => !(val) || (val.length <= len);
        const minLength = (len) => (val) => val && (val.length >= len);

        const sorted = this.props.staffs.sort( (a, b) => {
            const isReversed = (this.state.sortType === "asc") ? 1 : -1;
            return isReversed * a.name.localeCompare(b.name)
        });

        const staffList = sorted.filter((val) => {
            if (this.state.searchTerm === "") {
                return val
            } else if (val.name.toLowerCase().includes(this.state.searchTerm.toLowerCase())) {
                return val;
            }
        }).map((staff) => {
            return (
                <div className="col-md-4 col-lg-2 col-6 column" key={staff.id}>
                    <RenderStaffsItem staff={staff}/>
                </div>
            );
        });

    return (
        <div className="container">
            <div className='row'>
                <Breadcrumb>
                    <BreadcrumbItem><Link to={`/staffs`}>Nhân Viên</Link></BreadcrumbItem>
                </Breadcrumb>
                <div className='col-12'>
                    <h3>Nhân Viên</h3>
                    <label>Sắp xếp theo tên: </label>
                    <button className='button' onClick={() => this.onSort("asc")}>A-Z</button>
					<button className='button' onClick={() => this.onSort("desc")}>Z-A</button>
                    <Button type="button" color='primary' className='btn btn-search fa fa-plus' onClick={this.toggleModal}></Button>
                    <Form className="right">
                        <FormGroup>
                            <Input type="text" id="search" name="search" placeholder="Search"
                                innerRef={(input) => this.search = input} />
                        </FormGroup>
                    <Button type="button" value="submit" color="primary" className="btn btn-search fa fa-search right" 
                        onClick={this.onSubmit}>Tìm</Button>
                    </Form>
                    <hr />
                </div>
            </div>
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal} backdrop='static'>
                <ModalHeader toggle={this.toggleModal}>Thêm nhân viên mới</ModalHeader>
                <ModalBody>
                    <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                        <Row className='form-group'>
                            <Label htmlFor="username" md={4}>Tên</Label>
                            <Col md={8} className='right'>
                                <Control.text model='.username' id="username" name="username"
                                    className="form-control"
                                    validators={{
                                        required, minLength: minLength(3), maxLength: maxLength(30)
                                    }}
                                    />
                                <Errors
                                    className="text-danger"
                                    model=".username"
                                    show="touched"
                                    messages={{
                                        required: 'Yêu cầu nhập vào ',
                                        minLength: 'Yêu cầu nhiều hơn 2 ký tự ',
                                        maxLength: 'Yêu cầu không hơn 30 ký tự '
                                    }}
                                    />
                            </Col>
                        </Row>
                        <Row className='form-group'>
                            <Label htmlFor="dob" md={4}>Ngày sinh</Label>
                            <Col md={8} className='right'>
                                <Control.input type="date" model='.dob' id="dob" name="dob"
                                    className="form-control"
                                    validators={{
                                        required
                                    }}
                                    />
                                <Errors
                                    className="text-danger"
                                    model=".dob"
                                    show="touched"
                                    messages={{
                                        required: 'Yêu cầu nhập vào'
                                    }}
                                    />
                            </Col>
                        </Row>
                        <Row className='form-group'>
                            <Label htmlFor="startDate" md={4}>Ngày vào công ty</Label>
                            <Col md={8} className='right'>
                                <Control.input type="date" model='.startDate' id="startDate" name="startDate"
                                    className="form-control"
                                    validators={{
                                        required
                                    }}
                                />
                                <Errors
                                    className="text-danger"
                                    model=".startDate"
                                    show="touched"
                                    messages={{
                                        required: 'Yêu cầu nhập vào'
                                    }}
                                />
                            </Col>
                        </Row>
                        <Row className='form-group'>
                            <Label htmlFor="department" md={4}>Phòng ban</Label>
                            <Col md={8} className='right'>
                            <Control.select model='.department' id="department" name="department" className='form-control'>
                                <option value='Sale' selected>Sale</option>
                                <option value='Marketing'>Marketing</option>
                                <option value='Finance'>Finance</option>
                                <option value='HR'>HR</option>
                                <option value='IT'>IT</option>
                            </Control.select>
                            </Col>
                        </Row>
                        <Row className='form-group'>
                            <Label htmlFor="salaryScale" md={4}>Hệ số lương</Label>
                            <Col md={8} className='right'>
                            <Control.text model='.salaryScale' id="salaryScale" name="salaryScale"
                                className="form-control"
                                 />
                            </Col>
                        </Row>
                        <Row className='form-group'>
                            <Label htmlFor="annualLeave" md={5}>Số ngày nghỉ còn lại</Label>
                            <Col md={7} className='right'>
                            <Control.text model='.annualLeave' id="annualLeave" name="annualLeave"
                                className="form-control"
                                 />
                            </Col>
                        </Row>
                        <Row className='form-group'>
                            <Label htmlFor="overTime" md={5}>Số ngày đã làm thêm</Label>
                            <Col md={7} className='right'>
                            <Control.text model='.overTime' id="overTime" name="overTime"
                                className="form-control"
                                 />
                            </Col>
                        </Row>
                        <Button type="submit" value="submit" color="primary">Thêm</Button>
                    </LocalForm>
                </ModalBody>
            </Modal>
            <div className="row">
                {staffList}
            </div>
            
            <div className="row ">
                <em>*Bấm vào tên nhân viên để xem thông tin.</em>
                <div className="col-12">
                <form className="right">
                    <label >Số cột hiển thị (1-6):</label>
                    <input type="number" id="quantity" name="quantity" min="1" max="6"></input>
                    <button type="button" onClick={changeNumOfColumn}>OK</button>
                </form>
                </div>
            </div>
        </div>
    );
    }
    
}

export default StaffList;