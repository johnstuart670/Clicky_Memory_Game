import React from 'react';
import "./NewCard.css"

const NewCard = props => {
	return (
			<div
				className="card pt-0 NewCard"
				onClick = {() => {props.setClicked(props.id)}}
			>
				<img 
				src = {props.src} 
				alt='' 
				// onClick = { props.clickCard({props.id}) }
				value = {props.id}
				className = "cardImg"
				/>
			</div>
	)
};
export default NewCard;