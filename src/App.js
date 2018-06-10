import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import galaxies from './Collections/galaxies'
import { Container, Row, Col, Mask, Fa, View, Button } from 'mdbreact';
import Card from './Components/Card'

class App extends Component {

	// add the state so we can track it across everything.
	state = {
		//tracks if the game is still going
		stillPlaying: true,
		// tracks the values of the divs that have been clicked
		clickedArr: [],
		// how many clicks the user has made correctly on the images without repeating their choice
		clicks: 0
	};
// place all the cards on the page
	placeCards = inputArr => {
		// update map a new array with all of the inputs
		inputArr.map(input => (
			// return a new Card and pass in the object properties
			<Card
				image={input.img}
				clickEvent={this.clickCard}
				id = {input.id}
			/>
		))
	};

	//fn that will allow us to check if the id of the galaxy being clicked is is prsent in the state array for previously selected IDs.
	clickCard = event => {
	//check if the playstate is still truthy
		if (this.state.stillPlaying){
					//Make sure we are working with a number
		const intVal = parseInt(event.target.id);
		//check if the file is in the ClickedArr and then route
		return this.state.clickedArr.indexOf(intVal) ? this.keepGoing(intVal) : this.gameOver() ;
		}
		else {
			return null;
		}

		//can we write as:
		// this.state.stillPlaying ? checkPlace(cardVal) : null;
	};

	//if the the value wasn't present then we will push the parseInt'd version of the card's value to the array and then keep going
	keepGoing = (intVal) => {
		 this.state.clickedArr.push(intVal);
		 this.state.clicks += 1
	};

	//gameOver function that will reset all the values and highlight
	gameOver = () => {
		alert(`You lost!  You clicked on ${this.state.clicks} unique pictures.`);
		this.state.clicks = 0;
		this.state.clickedArr = [];
	};

	render() {
		return (
			<div className="App">
				<header className="App-header">
					<h1 className="App-title">Clicky Game</h1>
					<h2>A Galactic Memory Game App by John Stuart</h2>
				</header>
				<p className="App-intro">
					The game is simple: <ul>
						<li>Don't click the same picture twice.
					</li>
						<li>Points awarded for each picture you haven't previously clicked</li>
						<li>You lose if you click a picture that you have previously clickedß</li>
					</ul>
				</p>
			</div>

			<Container className = "mx-auto">
				{placeCards(galaxiesList)}
			</Container>

    );
	}
}

export default App;
