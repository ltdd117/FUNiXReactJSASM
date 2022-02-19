import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { Card, CardImg, CardTitle, Breadcrumb, BreadcrumbItem, Form, FormGroup, 
    Input, Label, Button, Col, ModalHeader, Modal, ModalBody, FormFeedback } from 'reactstrap';

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
            id: this.props.staffs.length,
            searchTerm: "",
            sortType: "asc",
            isModalOpen: false,
            username: "",
            dob: "",
            startDate: "",
            department: "",
            salaryScale: "",
            annualLeave: "",
            overTime: "",
            touched: {
                username: false,
                dob: false,
                startDate: false
            }
        }

        this.toggleModal = this.toggleModal.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
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

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'check-box' ? target.checked : target.value;
        const name = target.name;
        this.setState({
          [name]: value
        });
    }

    handleSubmit({event}) {
        this.addNewStaff();
        this.toggleModal();
        this.props.staffs.push(newStaff);
        console.log('Current State is: ' + JSON.stringify(this.state));
    }

    handleBlur = (field) => (evt) => {
        this.setState({
            touched: { ...this.state.touched, [field]: true }
        });
    }

    addNewStaff() {
        newStaff.id = this.state.id;
        newStaff.name = this.state.username;
        newStaff.doB = this.state.dob;
        newStaff.department.name = this.state.department;
        newStaff.startDate = this.state.startDate;
        newStaff.salaryScale = this.state.salaryScale;
        newStaff.annualLeave = this.state.annualLeave;
        newStaff.overTime = this.state.overTime;
        if (newStaff.department.name === "")
            newStaff.department.name = 'Sale';
    }

    validate(username, dob, startDate, department) {
        const errors = {
            username: '',
            dob: '',
            startDate: '',
            department: ''
        };

        if (this.state.touched.username && username.length < 3)
            errors.username = 'Yêu cầu nhiều hơn 2 ký tự';
        else if (this.state.touched.username && username.length > 30)
            errors.username = 'Yêu cầu ít hơn 30 ký tự';

        if (this.state.touched.dob && dob.length < 1)
            errors.dob = 'Yêu cầu nhập';

        if (this.state.touched.startDate && startDate.length < 1)
            errors.startDate = 'Yêu cầu nhập';

        if (this.state.touched.department && department.length < 1)
            errors.department = 'Yêu cầu nhập';

        return errors;
    }
    render() {
        const errors = this.validate(this.state.username, this.state.dob, this.state.startDate, this.state.department);

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
                        <FormGroup row>
                            <Col md={12}>
                            <Input type="text" id="search" name="search" placeholder="Search"
                                innerRef={(input) => this.search = input} />
                            </Col>
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
                    <Form>
                        <FormGroup>
                            <Label htmlFor="username">Tên</Label>
                            <Input type="text" id="username" name="username"
                                value={this.state.username}
                                valid={errors.username === ''}
                                invalid={errors.username !== ''}
                                onBlur={this.handleBlur('username')}
                                onChange={this.handleInputChange} />
                            <FormFeedback>{errors.username}</FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="dob">Ngày sinh</Label>
                            <Input type="date" id="dob" name="dob"
                                value={this.state.dob}
                                valid={errors.dob === ''}
                                invalid={errors.dob !== ''}
                                onBlur={this.handleBlur('dob')}
                                onChange={this.handleInputChange} />
                            <FormFeedback>{errors.dob}</FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="startDate">Ngày vào công ty</Label>
                            <Input type="date" id="startDate" name="startDate"
                                value={this.state.startDate}
                                valid={errors.startDate === ''}
                                invalid={errors.startDate !== ''}
                                onBlur={this.handleBlur('startDate')}
                                onChange={this.handleInputChange} />
                            <FormFeedback>{errors.startDate}</FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="department">Phòng ban</Label>
                            <Input type="select" id="department" name="department"
                                value={this.state.department}
                                onChange={this.handleInputChange}>
                                <option value='Sale' selected>Sale</option>
                                <option value='Marketing'>Marketing</option>
                                <option value='Finance'>Finance</option>
                                <option value='HR'>HR</option>
                                <option value='IT'>IT</option>
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="salaryScale">Hệ số lương</Label>
                            <Input type="text" id="salaryScale" name="salaryScale"
                                value={this.state.salaryScale}
                                placeholder='1.0 - 3.0'
                                onChange={this.handleInputChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="annualLeave">Số ngày nghỉ còn lại</Label>
                            <Input type="text" id="annualLeave" name="annualLeave"
                                value={this.state.annualLeave}
                                placeholder='1.0'
                                onChange={this.handleInputChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="overTime">Số ngày đã làm thêm</Label>
                            <Input type="text" name="overTime" id="overTime"
                                value={this.state.overTime}
                                placeholder='1.0'
                                onChange={this.handleInputChange} />
                        </FormGroup>
                        <Button type="button" value="submit" color="primary" onClick={this.handleSubmit}>Thêm</Button>
                    </Form>
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