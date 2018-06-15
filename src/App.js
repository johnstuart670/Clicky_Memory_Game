import React, { Component } from 'react';
import './App.css';
import galaxies from './Collections/galaxies'
import { Container, Row, Button } from 'mdbreact';
import NewCard from './Components/NewCard/index';

class App extends Component {
	// add the state so we can track it across everything.
	state = {
		//tracks if the game is still going
		stillPlaying: true,
		// tracks the values of the divs that have been clicked
		clickedArr: [],
		lastClicked: "",
		// how many clicks the user has made correctly on the images without repeating their choice
		clicks: 0,
		//import the galaxies item
		galaxies: galaxies
	};

	//fn that will allow us to check if the id of the galaxy being clicked is is prsent in the state array for previously selected IDs.
	setClicked = e => {
		//Make sure we are working with a number
		const intVal = parseInt(e, 10);
		//check if the value is in the ClickedArr and then route
		const intCheck = this.state.clickedArr.indexOf(intVal);
		return (intCheck === -1) ? this.keepGoing(intVal) : this.gameOver();
	};

	//if the the value wasn't present then we will push the parseInt'd version of the card's value to the array, shuffle, and then keep going
	keepGoing = (intVal) => {
		const updatedArr = (this.state.clickedArr.concat(intVal));
		const newClicks = updatedArr.length;
		// this makes a new const that is a random sort of the old object
		const newGalaxies = (this.state.galaxies
			.sort(function () {
				return 0.5 - Math.random()
			}));
		this.setState(
			{
				clickedArr: updatedArr,
				clicks: newClicks,
				galaxies: newGalaxies
			});
	};
	resetGame = () => {
		const newGalaxies = (this.state.galaxies
			.sort(function () {
				return 0.5 - Math.random()
			}));
		this.setState(
			{
				clickedArr: [],
				clicks: 0,
				galaxies: newGalaxies,
				stillPlaying: true
			});
	}
	

	//gameOver function that will reset all the values and highlight
	gameOver = () => {
		alert(`You lost!  You clicked on ${this.state.clicks} unique pictures.`);
		this.setState(
			{
				clickedArr: [],
				clicks: 0,
				stillPlaying: false
			}
		)
	};



	placeNewCards = (inputArr, stateEval) => {
		return (
			inputArr.map(input => {
				return (<NewCard
					key={input.key}
					src={input.img}
					setClicked= {stateEval ? this.setClicked : () => {return}}
					addlClass = {stateEval ? null : input.frameColor}
					id={input.id} />
				)
			}))
	};


	render() {
		return (
			<React.Fragment>
				<div className="App">
					<header className="App-header">
						<h1 className="App-title">Clicky Game</h1>
						<h2>A Galactic Memory Game App by John Stuart</h2>
					</header>
					<p className="App-intro">
						The game is simple:
					</p>
					<p>Don't click the same picture twice.</p>
					<p>Points awarded for each picture you haven't previously clicked</p>
					<p>You lose if you click a picture that you have previously clicked</p>
					<Container >
						<Row className="mx-auto">
							{this.placeNewCards(this.state.galaxies, this.state.stillPlaying)}
						</Row>
						<Row>
						<Button block
						onClick = {this.resetGame}>
						Click Here to reset the game
						</Button>
						</Row>
					</Container>
				</div>


			</React.Fragment>
		);
	}
}

export default App;
