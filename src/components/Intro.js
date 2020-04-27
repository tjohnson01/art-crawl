import React, { Component } from 'react';

class Intro extends Component {
    state = {
        hidden: false
    }
    
    render() {
        return (
            <div className="intro">
                <h2>ABOUT</h2>
                <p>Since 1992, the tradition of the artists "open studios" takes place on the Saturday before Thanksgiving. 
                Visitors have the opportunity to participate in the live/work/show spaces of these neighborhood "urban pioneers". 
                The mission of the art crawl is to assist the public in understanding contemporary art by directly involving visitors 
                in a dialogue with local artists throughout Houston.</p>
                <h2>DATE</h2>
                <p>11/23/2019</p>
                <h2>TIME</h2>
                <p>9:00 am - 9:00 pm</p>
                <h2>COST</h2>
                <p>FREE</p>
            </div>
        )
    }
}

export default Intro;