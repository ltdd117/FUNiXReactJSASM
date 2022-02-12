import React, { Component } from "react";
import { Card, CardImg, CardText, CardBody, CardTitle, Button } from 'reactstrap';
import dateFormat from "dateformat";
import '../App.css';


class StaffList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedStaff: null
        }
    }

    onStaffSelect(staff) {
        this.setState({ selectedStaff: staff });
    }

    renderStaff(staff) {
        if (staff != null)
            return (
                <Card>
                    <CardImg top src={staff.image} alt={staff.name}/>
                    <CardBody>
                        <CardTitle>Họ và tên: {staff.name}</CardTitle>
                        <CardText>
                            <p>Ngày sinh: {dateFormat(staff.doB, "dd/mm/yyyy")}</p>
                            <p>Ngày vào công ty: {dateFormat(staff.startDate, "dd/mm/yyyy")}</p>
                            <p>Phòng ban: {staff.department.name}</p>
                            <p>Số ngày nghỉ còn lại: {staff.annualLeave}</p>
                            <p>Số ngày đã làm thêm: {staff.overTime}</p>
                        </CardText> 
                    
                    </CardBody>
                </Card>
            );
        else
            return (
                <div></div>
            );
    }

    changeNumOfColumn() {
        let elements = document.getElementsByClassName("column");

        if (document.getElementById("quantity").value == 1) {
            for (let value of elements) {
                value.className = "col-md-12 col-lg-12 column";
            }
        }

        if (document.getElementById("quantity").value == 2) {
            for (let value of elements) {
                value.className = "col-md-6 col-lg-6 column";
            }
        }

        if (document.getElementById("quantity").value == 3) {
            for (let value of elements) {
                value.className = "col-md-4 col-lg-4 column";
            }
        }

        if (document.getElementById("quantity").value == 4) {
            for (let value of elements) {
                value.className = "col-md-3 col-lg-3 column";
            }
        }

        if (document.getElementById("quantity").value == 6) {
            for (let value of elements) {
                value.className = "col-md-2 col-lg-2 column";
            }
        }
    }

    render() {

        const staffList = this.props.staffs.map((staff) => {
            return (
                <div className="col-md-6 col-lg-4 column">
                    <Card key={staff.id} onClick={() => this.onStaffSelect(staff)}>
                        <CardTitle className="left">{staff.id}.&ensp;{staff.name}</CardTitle>
                    </Card>
                </div>
            );
        });

        return (
            <div className="container">
                <div className="row">
                    {staffList}
                </div>
                
                <div className="row">
                    <em>*Bấm vào tên nhân viên để xem thông tin.</em>
                    <form className="right">
                        <label for="quantity">Số cột hiển thị (1-6):</label>
                        <input type="number" id="quantity" name="quantity" min="1" max="6"></input>
                        <button type="button" onClick={this.changeNumOfColumn}>OK</button>
                    </form>
                </div>

                <div className='row'>
                    <div className="col-md-6 col-lg-4">
                        {this.renderStaff(this.state.selectedStaff)}
                    </div>
                </div>
            </div>
        );
    }
}

export default StaffList;