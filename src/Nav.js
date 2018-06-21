import React, { Component } from 'react';
import escapeRegExp from 'escape-string-regexp';
import Geocode from 'react-geocode';

Geocode.setApiKey('AIzaSyBYYOXLn470vIRm16kpC1o_2-bp7j-eKE0');

export default class Nav extends Component {
	state = {
		places: [],
		query: ''
	}

	componentDidMount() {
		Geocode.fromAddress("Nitra").then(
			geoResponse => {
				var { lat, lng } = geoResponse.results[0].geometry.location;
				this.props.foursquare.venues.getVenues({
					'll': `${lat},${lng}`,
					'categoryId': '4bf58dd8d48988d184941735'
				}).then(fsResponse => {
					var venues = fsResponse.response.venues;
					this.props.setMarkers(venues);
					this.setState({ places: venues });
				});
			}
		);
	}

	handleQueryUpdate = (query) => {
		this.setState({ query }, () => {
		var filtered = this.getFilteredPlaces();
		this.props.setMarkers(filtered);
		});
	}

	handleMenuexpClick = () => {
		var exp = document.querySelector('.menuexp');
		exp.innerHTML = exp.innerHTML === '+' ? '̶' : '+';
		
		var map = document.querySelector('.conMap');
		map.style.marginLeft = map.style.marginLeft === '250px' ? '0' : '250px';
	
		var menuexp = document.querySelector('.menuexp');
		menuexp.style.left = menuexp.style.left === '250px' ? '0' : '250px';
	}

	getFilteredPlaces() {
		var { query, places } = this.state;
	
		if (!query) {
		return places;
		}
	
		var match = new RegExp(escapeRegExp(query), 'i');
		return places.filter(p => match.test(p.name));
	}

	getInputField = () => {
		var { query } = this.state;
	
		return <input
		tabIndex={1}
		className='filter-places'
		type='text'
		value={query}
		onChange={event => this.handleQueryUpdate(event.target.value)}
		placeholder='Filter...' />
	}

	getPlaceNav = () => {
		let filteredPlaces = this.getFilteredPlaces();
	
		return (
		<ol className='places' role='listbox' aria-label='Nav of places'>
			{filteredPlaces.map((p, index) =>
			<li
				tabIndex={index + 2}
				role='option'
				aria-selected="false"
				key={index}
				className='place'
				onClick={() => {this.props.onPlaceClick(index)}}
				onKeyUp={event => {
				if (event.keyCode === 13) {
					this.props.onPlaceClick(index);
				}
				}}>
				{p.name}
			</li>
			)}
		</ol>
		)
	}

	render() {
		return (
		<div>
			<div className='sidebar'>
			<div className='heading' role='heading'>
				<h1 className='title'>
				My Stadiums
				</h1>
				{this.getInputField()}
			</div>
			<div className='place-nav' role='region'>
				{this.getPlaceNav()}
			</div>
			</div>
			<div
			tabIndex='-1'
			style={{left: '250px'}}
			className='menuexp'
			onClick={this.handleMenuexpClick}>
			‒
			</div>
		</div>
		);
	}
}
