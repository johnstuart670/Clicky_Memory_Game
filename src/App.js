import React, { Component } from 'react';
import './App.css';
import galaxies from './Collections/galaxies'
import { Container, Row } from 'mdbreact';
import NewCard from './Components/NewCard/index';
import NewCardNoClick from './Components/NewCardNoClick/index';

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
		galaxies: galaxies
	};

	//fn that will allow us to check if the id of the galaxy being clicked is is prsent in the state array for previously selected IDs.
	setClicked = e => {

		console.log("The card was clicked", e);
		//check if the playstate is still truthy
		if (this.state.stillPlaying) {
			//Make sure we are working with a number
			const intVal = parseInt(e, 10);
			console.log("intval", intVal);
			//check if the file is in the ClickedArr and then route
			const result = this.state.clickedArr.indexOf(intVal) ? this.keepGoing(intVal) : this.gameOver();
			console.log('result', result);
			return result;
		}
		else {
			return null;
		}

		//can we write as:
		// this.state.stillPlaying ? keepGoing(cardVal) : null;
		// 
	};

	//if the the value wasn't present then we will push the parseInt'd version of the card's value to the array, shuffle, and then keep going
	keepGoing = (intVal) => {
		const updatedArr = (this.state.clickedArr.concat(intVal));
		const newClicks = (this.state.clicks + 1);
		// this makes a new const that is a random sort of the old object
		const newGalaxies = (this.state.galaxies
			.sort(function () {
				return 0.5 - Math.random()
			}));
		console.log("this is the updated consts", updatedArr, newClicks);
		this.setState(
			{
				clickedArr: updatedArr,
				clicks: newClicks,
				galaxies: newGalaxies
			});
	};

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
	 return	stateEval ? this.newCardClick(inputArr) : this.newCardNoClick(inputArr);
	};

	newCardClick = inputArr => {
		return (
			inputArr.map(input => {
				return (<NewCard
					key={input.key}
					src={input.img}
					setClicked={this.setClicked}
					id={input.id} />
				)
			}))
	};
	newCardNoClick = inputArr => {
		return (
			inputArr.map(input => {
				return (<NewCardNoClick
					key={input.key}
					src={input.img}
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
					</Container>
				</div>


			</React.Fragment>
		);
	}
}

export default App;
