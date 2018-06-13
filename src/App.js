import React, { Component } from 'react';
import './App.css';
import galaxies from './Collections/galaxies'
import { Container, Row } from 'mdbreact';
import NewCard from './Components/NewCard/index'

class App extends Component {
	// add the state so we can track it across everything.
	state = {
		//tracks if the game is still going
		stillPlaying: true,
		// tracks the values of the divs that have been clicked
		clickedArr: [],
		// how many clicks the user has made correctly on the images without repeating their choice
		clicks: 0,
		galaxies: galaxies
	};
	// place all the cards on the page
	placeCards = inputArr => {
		console.log("inputtArr", inputArr);
		// update map a new array with all of the inputs
		inputArr.map(input => (
			// return a new Card and pass in the object properties
			<NewCard
				key={input.id}
				src={input.img}
				setClicked={this.setClicked}
				id={input.id} />
		))
		console.log("It at least gets this far");
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
		// this.state.stillPlaying ? checkPlace(cardVal) : null;
	};

	//if the the value wasn't present then we will push the parseInt'd version of the card's value to the array, shuffle, and then keep going
	keepGoing = (intVal) => {
		const updatedArr = (this.state.clickedArr.concat(intVal));
		const newClicks = (this.state.clicks + 1);
		// this makes a new const that is a random sort of the old object
		const newGalaxies = (this.state.galaxies.sort(
			function () {
				return 0.5 - Math.random()
			}	));
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
				clicks: 0
			}
		)
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
					<ul>
						<li>Don't click the same picture twice.
					</li>
						<li>Points awarded for each picture you haven't previously clicked</li>
						<li>You lose if you click a picture that you have previously clicked</li>
					</ul>
					<Container >
						<Row className="mx-auto">
							{this.state.galaxies.map(galaxy => (
								<NewCard
									key={galaxy.id}
									src={galaxy.img}
									setClicked={this.setClicked}
									id={galaxy.id} />
							)
							)}
						</Row>
					</Container>
				</div>


			</React.Fragment>
		);
	}
}

export default App;
