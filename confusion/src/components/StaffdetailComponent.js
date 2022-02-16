import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle,
    Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import dateFormat from "dateformat";


function RenderStaff({staff}) {
    if (staff != null) {
        return(
            <div className='col-sm-4 col-md-3 m-1' key={staff.id}>
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

function RenderInfo({staff}) {
    if (staff != null) {
        return(
            <div className='col-sm-8 col-md-9 m-1' key={staff.id}>
                <Card>
                <CardBody>
                        <CardTitle><strong>Họ và tên: {staff.name}</strong></CardTitle>
                        <CardText>
                            <p>Ngày sinh: {dateFormat(staff.doB, "dd/mm/yyyy")}</p>
                            <p>Ngày vào công ty: {dateFormat(staff.startDate, "dd/mm/yyyy")}</p>
                            <p>Phòng ban: {staff.department.name}</p>
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


const StaffDetail = (props) => {
    if (props.errMess) {
        return(
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }
    else if (props.staff != null)        
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to={`/staffs`}>Nhân Viên</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.staff.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.staff.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <RenderStaff staff={props.staff} />
                    <RenderInfo staff={props.staff} />
                </div>
                
            </div>
        );
    else
        return(
            <div></div>
        );
}

export default StaffDetail;