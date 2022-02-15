import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardImg, CardImgOverlay, CardTitle } from 'reactstrap';

function RenderMenuItem ({dish, onClick}) {
	return (
		<Card>
			<Link to={`/menu/${dish._id}`}>
			<CardImg width="100%" src={dish.image} alt={dish.name} />
			<CardImgOverlay>
				<CardTitle>{dish.name}</CardTitle>
			</CardImgOverlay>
			</Link>
		</Card>
	);
}


function Menu (props) {
	
	const menu = props.dishes.map((dish) => {
		return (
			<div key={dish._id} className="col-12 col-md-5 m-1" key={dish.id}>
				<RenderMenuItem dish={dish} />
			</div>
		);
	});

	return (
		<div className="container">
			<div className="row">
			{menu}
			</div>
		</div>
	);
}




export default Menu;