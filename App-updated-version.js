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
 }
/*
  The strategy here is to retreive and massage data first using temporary objects, then set state only once.
  This will reduce the number of re-renders react has to perform since calling setState will trigger a re-render
*/
 componentDidMount() {
   const artistDB = db.ref('artist');
   const studioDB = db.ref('studio');
   const studioArr = [] // temporary array to hold studio values
   const artistArr = [] // temporary array to hold artist values
   
    //Get studio data from Firebase using the .once() method
    //  .once() returns a promise
    studioDB.once("value", (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        let studioName = childSnapshot.key;
        let studioAddress = childSnapshot.val().address;
        // push studio onto studio array
        studioArr.push({name: studioName, address: studioAddress })
      });
    }).then( () => {
       //Now that all studios are loaded, proceed to load artists
       // Get artist data from Firebase, again using .once()
       artistDB.once("value", (snapshot) => {
       
       snapshot.forEach((childSnapshot) => {
         let artistName = childSnapshot.key;
         let artistURL = childSnapshot.val().url;
         let artistStudio = childSnapshot.val().studio;
         
         let artistObj ={
           name: artistName,
           url: artistURL,
           studio: artistStudio,
           address: studioArr.find( (studio) => studio.name === artistStudio).address //set correct address
         }
         
         //push this object onto artist array
         artistArr.push(artistObj)
       })
     }).then( () => {
       //Now that all data is retreived and artist objects with studio address are correctly created,
       // set state.artists to that array.  
       this.setState({
         artists: artistArr 
       })
     })
    })
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
