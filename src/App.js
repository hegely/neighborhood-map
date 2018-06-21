import React, { Component } from 'react';
import Map from './Map';
import Nav from './Nav';
import Popup from './Popup';
import './App.css';

var FoursqareVar = require('react-foursquare')({
	clientID: 'PCWECQNZACAS0QSMRNL2VYQ4C0CTPQZQSNF5QEJAR2DRHQY1',
	clientSecret: '13O0PGJD03W3LGTALRGEZFFETQNHGD4MZGQOHWE40EQW5M2L'
});

export default class App extends Component {
	state = {
		places: [],
		selectedPlace: null
	}

	handleSetMarkers = (places) => {
		this.setState({ places });
	}

	handleMarkerClick = (marker) => {
    
		var places = this.state.places.map((p, index) => {
			if (index === marker) {
				p.clicked = true;
			} else {
				p.clicked = false;
			}
			return p;
		});

    this.getInfo(this.state.places[marker])
		.then(fsResponse => {
	
			this.setState({
			places: places,
			selectedPlace: fsResponse.response.venue
			});
	
			document.querySelector('.popup').focus();
		})
		.catch(error => {
			this.showError();
			console.log(error);
		});
	}

	handleHidingPopup = () => {

		var places = this.state.places.map((p, index) => {
		p.clicked = false;
		return p;
		});
	
		this.setState({ places: places, selectedPlace: null });
	}

	getInfo = (place) => {
		return FoursqareVar.venues.getVenue({
		'venue_id': place.id
		})
	}

	showError = () => {
		var block = document.querySelector('.error');
		block.style.opacity = 1;
		setTimeout(() => {
		block.style.opacity = 0;
		}, 3000);
	}

	render() {
		var placesInfo = this.state.places.map(v => {
		return { lat: v.location.lat, lng: v.location.lng, clicked: v.clicked }
		});
	
		return (
		<div className='conApp'>
			<Nav
				foursquare={FoursqareVar}
				setMarkers={this.handleSetMarkers}
				onPlaceClick={this.handleMarkerClick} />
			<Map
				places={placesInfo}
				hidePopup={this.handleHidingPopup}
				onMarkerClick={this.handleMarkerClick}
				onError={this.showError}
			/>
			{
				this.state.selectedPlace && (<Popup
				place={this.state.selectedPlace}
				foursquare={FoursqareVar}
				hidePopup={this.handleHidingPopup} />)
			}
			<div
				style={{ opacity: 0 }}
				className='error'>Error loading Foursquare data...</div>
		</div>
		);
	}
}
