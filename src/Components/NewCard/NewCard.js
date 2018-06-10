import React from 'react';
import "./NewCard.css"

const NewCard = props => (
	<div
		onClick={() => { props.onClick() }}
		className="card col-3 mx-auto"
		>
		<img src={props.img} />
			</div >
);
export default NewCard;