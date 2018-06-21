import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";

function onMapLoaded() {
	window.isMapLoaded = true;
}

var CompMap = withScriptjs(withGoogleMap(props => {
    return <GoogleMap
		defaultZoom={11}
		defaultCenter={props.places.length > 0 ? props.places[0] : {lat: 48.2846124, lng: 18.0019421}}
		defaultOptions={{mapTypeControl: false}}
		onClick={props.hidePopup}
		>
		{props.isMarkerShown && (props.places.map((place, index) =>
		<Marker
			key={index}
			position={place}
			animation={place.clicked ?
			window.google.maps.Animation.BOUNCE : 0}
			onClick={() => {props.onMarkerClick(index)}} /> ))
		}
    </GoogleMap>
  }
))

export default class Map extends Component {
	
	componentDidMount() {

		window.isMapLoaded = false;
		window.onMapLoaded = onMapLoaded;

		setTimeout(() => {
			if (!window.isMapLoaded) {
				this.props.onError();
			}
		}, 10000);
	}

	render() {
		return <div
			role='region'
			aria-label='map'
			className='conMap'
			style={{marginLeft: '250px'}}>
			<CompMap
				isMarkerShown={this.props.places.length > 0}
				googleMapURL='https://maps.googleapis.com/maps/api/js?key=AIzaSyD0xNWU6EIpEoG3nTjM-AAXZ5oeUe1BK7A&v=3.exp&libraries=geometry,drawing,places&callback=onMapLoaded'
				loadingElement={<div style={{ height: `100%` }} />}
				containerElement={<div style={{ height: `100%` }} />}
				mapElement={<div style={{ height: `100%` }} />}
				places={this.props.places}
				hidePopup={this.props.hidePopup}
				onMarkerClick={this.props.onMarkerClick}
			/>
		</div>;
	}
}
