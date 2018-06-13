import React from 'react';
import "./NewCardNoClick.css"

const NewCard = props => {
	return (
			<div
				className="card pt-0 NewCard"
			>
				<img 
				src = {props.src} 
				alt='' 
				className = "cardImg"
				/>
			</div>
	)
};
export default NewCard;