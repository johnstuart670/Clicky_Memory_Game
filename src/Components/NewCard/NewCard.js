import React from 'react';
import Card from 'mdbreact';
import "./NewCard.css"

const NewCard = props => {
	return (
		<React.Fragment>
			<Card
				onClick={() => { props.onClick() }}
				className="col-3 mx-auto"
			>
				<img src={props.img} alt='' />
			</Card>
		</React.Fragment>
	)
};
export default NewCard;