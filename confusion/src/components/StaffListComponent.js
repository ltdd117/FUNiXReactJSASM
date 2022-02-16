import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { Card, CardImg, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';

function RenderStaffsItem ({staff}) {
	return (
		<Card >
			<Link to={`/staffs/${staff.id}`}>
			<CardImg src={staff.image} alt={staff.name} />
                <CardTitle className="left">&ensp;{staff.name}</CardTitle>
			</Link>
		</Card>
	);
}

function changeNumOfColumn() {
    let elements = document.getElementsByClassName("column");

    if (document.getElementById("quantity").value == 1) {
        for (let value of elements) {
            value.className = "col-md-12 col-sm-12 col-xs-6 column";
        }
    }

    if (document.getElementById("quantity").value == 2) {
        for (let value of elements) {
            value.className = "col-md-6 col-sm-6 col-xs-6 column";
        }
    }

    if (document.getElementById("quantity").value == 3) {
        for (let value of elements) {
            value.className = "col-md-4 col-sm-4 col-xs-6 column";
        }
    }

    if (document.getElementById("quantity").value == 4) {
        for (let value of elements) {
            value.className = "col-md-3 col-sm-3 col-xs-6 column";
        }
    }

    if (document.getElementById("quantity").value == 6) {
        for (let value of elements) {
            value.className = "col-md-2 col-sm-2 col-xs-6 column";
        }
    }
}

function StaffList (props) {

    const [searchTerm, setSearchTerm] = useState("");
    const [sortType, setSortType] = useState("asc");

	const onSort = (type) => {
		setSortType(type);
	}

	const sorted = props.staffs.sort( (a, b) => {
		const isReversed = (sortType === "asc") ? 1 : -1;
		return isReversed * a.name.localeCompare(b.name)
	});

    const staffList = sorted.filter((val) => {
        if (searchTerm == "") {
            return val
        } else if (val.name.toLowerCase().includes(searchTerm.toLowerCase())) {
            return val
        }
    }).map((staff) => {
        return (
            <div className="col-md-2 col-sm-4 col-xs-6 column" key={staff.id}>
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
                    <button className='button' onClick={() => onSort("asc")}>A-Z</button>
					<button className='button' onClick={() => onSort("desc")}>Z-A</button>
                    <form className="right">
                        <input type="text" name="search" id="search" placeholder="Search" onChange={(event) => {setSearchTerm(event.target.value);}}></input>
                        <button type="button" class="btn btn-search fa fa-search" ></button>
                    </form>
                    <hr />
                </div>
            </div>
            <div className="row">
                {staffList}
            </div>
            
            <div className="row">
                <em>*Bấm vào tên nhân viên để xem thông tin.</em>
                <form className="right">
                    <label for="quantity">Số cột hiển thị (1-6):</label>
                    <input type="number" id="quantity" name="quantity" min="1" max="6"></input>
                    <button type="button" onClick={changeNumOfColumn}>OK</button>
                </form>
            </div>
        </div>
    );
    
}

export default StaffList;