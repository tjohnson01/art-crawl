import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

class ArtCard extends Component {
    //Open artist websites in new window
	openWebSite = (e) => {
        e.preventDefault();
        console.log(e)
    }
    
    render() {
       
        return (
            <Card className="text-center">
                <Card.Header as="h3">{this.props.name}</Card.Header>
                <Card.Body>
                    <Card.Title>{this.props.location}</Card.Title>
                    <Card.Text>{this.props.address}</Card.Text>
                    <Button variant="primary" href={this.props.url} target="_blank">WEBSITE</Button>
                </Card.Body>
            </Card>
        )
    }
}

export default ArtCard;