import React from 'react';
import { Breadcrumb, BreadcrumbItem, Card, CardBody, CardImg, CardText, CardTitle, Media } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Fade, Stagger } from 'react-animation-components';
import { Loading } from './LoadingComponent';

function RenderStaff({staff}) {
    if (staff != null) {
        return(
            <div className='col-sm-4 col-md-3' key={staff.id}>
                <Card>
                    <CardImg top width="100%" src={staff.image} alt={staff.name}/>
                </Card>
            </div>
        );
    }
    else
        return(
          	<div></div>
        );
}

function formatDate(dateStr) {
    var part = dateStr.split("-");
    return(part[2].substring(0, 2) + '/' + part[1] + '/' + part[0]);
}

function RenderInfo({staff, department}) {

    if (staff != null) {
        return(
            <div className='col-sm-8 col-md-9' key={staff.id}>
                <Card>
                <CardBody>
                        <CardTitle><strong>Họ và tên: {staff.name}</strong></CardTitle>
                        <CardText>
                            <p>Ngày sinh: {formatDate(staff.doB)}</p>
                            <p>Ngày vào công ty: {formatDate(staff.startDate)}</p>
                            <p>Phòng ban: {department.name}</p>
                            <p>Số ngày nghỉ còn lại: {staff.annualLeave}</p>
                            <p>Số ngày đã làm thêm: {staff.overTime}</p>
                        </CardText> 
                    </CardBody>
                </Card>
            </div>
        );
    }
    else
        return(
          	<div></div>
        );
}

function StaffList({staffs, department}) {
    console.log(staffs);
    const departmentstaffs = staffs.map((staff) => {
        return (
            <Fade in key={staff.id}>
            <div className="row" >
                <RenderStaff staff={staff} />
                <RenderInfo staff={staff} department={department}/>
            </div>
            </Fade>
        );
    });
    if (staffs.isLoading) {
        return(
                <Loading />
        );
    }
    else if (staffs.errMess) {
        return(
            <div className="col-12"> 
                <h4>{staffs.staffs.errMess}</h4>
            </div>
        );
    }
    else {
        return (
            <Media list>
                <Stagger in>
                    {departmentstaffs}
                </Stagger>
            </Media>
        );
    }
}

const DepartmentDetail = (props) => {
    if (props.errMess) {
        return(
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }
    else if (props.staffs != null && props.department != null)  {
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to={`/staffs`}>Nhân Viên</Link></BreadcrumbItem>
                        <BreadcrumbItem active><Link to={`/departments`}>Phòng Ban</Link></BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.department.name}</h3>
                        <hr />
                    </div>
                </div>
                <div>
                    <StaffList staffs={props.staffs} department={props.department}/>
                </div>
                
            </div>
        );
    }
    else
        return(
            <div></div>
        );
}

export default DepartmentDetail;