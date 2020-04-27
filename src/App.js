import React, { Component } from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import './App.css';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Intro from './components/Intro'
import Artist from './components/Artist'

class App extends Component {

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
								<Artist/>
							</Route>
						</Switch>
					</div>
				</div>
			</BrowserRouter>
		);
	}
}

export default App;