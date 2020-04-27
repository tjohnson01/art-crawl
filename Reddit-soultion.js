--- New App.js ---

import React, { Component } from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import './App.css';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Intro from './components/Intro'
import Artist from './components/Artist'
import db from './config';

class App extends Component {
	state = {
			artists: [],
			studios: [],
	}

	//Run studio data through function to update state with array of studio objects
	studioObj = (name, address) => {
			this.setState(previousState => ({
					studios: [...previousState.studios, {
							name: name,
							address: address
					}]
			})) 
	} 

	//Loop through studio state and see if artist studio matches to get studio address
	artistObj = (name, url, studio, state) => {
			let artistAddress;
			state.forEach(stateItem => {
					if (studio === stateItem.name) {
							artistAddress = stateItem.address;
							return artistAddress;          
					}
			});

			this.setState(previousState => ({
					artists: [...previousState.artists, {
							name: name,
							url: url,
							studio: studio,
							address: artistAddress,
					}],
			}))

	}

	componentWillMount() {
			const artistDB = db.ref('artist');
			const studioDB = db.ref('studio');
			if(this.state.artists.length === 0 && this.state.studios.length === 0){
				//Get studio data from Firebase
				studioDB.on("value", (snapshot) => {
						snapshot.forEach((childSnapshot) => {
								let studioName = childSnapshot.key;
								let studioAddress = childSnapshot.val().address;
								this.studioObj(studioName, studioAddress)
						});
				})

				//Get artist data from Firebase
				artistDB.on("value", (snapshot) => {
						let studioState = this.state.studios;
						
						snapshot.forEach((childSnapshot) => {
								let artistName = childSnapshot.key;
								let artistURL = childSnapshot.val().url;
								let artistStudio = childSnapshot.val().studio;
								//Run artist data through function to update state with array of artist objects
								this.artistObj(artistName, artistURL, artistStudio, studioState)
						});
				})
		}
	}
	render() {

		return (
			<BrowserRouter>
				<div className="App">
					<Navbar bg="warning" variant="light">
						<Navbar.Brand><Link to="/">Houston Art Crawl</Link></Navbar.Brand>
						<Nav className="ml-auto">
							<Link to="/artist">Artist</Link>
						</Nav>
					</Navbar>
					<div className="main">
						<Switch>
							<Route exact path="/">
								<Intro/>
							</Route>
							<Route path="/artist">
								<Artist artists={this.state.artists}/>
							</Route>
						</Switch>
					</div>
				</div>
			</BrowserRouter>
		);
	}
}

export default App;


---- New Artist.js ---

import React, { Component } from 'react';
import ArtCard from './ArtCard'

class Artist extends Component {
  render() {
    return (
      <div className="cards">
        {   
          this.props.artists.map((artist, index) =>
              <ArtCard
                  key={index}
                  name={artist.name} 
                  location={artist.studio}
                  address={artist.address}
                  url={artist.url}
              />  
          )
        }
      </div>       
    )
  }
}

export default Artist;
