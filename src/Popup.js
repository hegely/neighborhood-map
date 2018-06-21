import React, { Component } from 'react';
import Dragg from 'react-draggable';

export default class Popup extends Component {
	render() {
		var { place } = this.props;
	
		return (
		<Dragg>
			<article className = 'popup' tabIndex='1'>
				<h2 className = 'popup-heading' >{place.name}</h2>
				<p onClick = { () => {this.props.hidePopup()}} className = 'popup-close' >close</p>
				<p className = 'popup-rat'>Rating: {place.rating} ({place.likes.summary})</p>
				<p className = 'popup-cat'>{place.categories[0].name}</p>
				<p className = 'popup-city'>{place.location.city}</p>	
				<p className = 'popup-address'>{place.location.address}</p>			
				{place.bestPhoto && (
				<img
					arial-label={place.name}
					alt={place.name}
					src={`${place.bestPhoto.prefix}320x240${place.bestPhoto.suffix}`}
					onDragStart={event => event.preventDefault()}></img>
				)}
				<p className='credentials'>
				Data provided by <a target='_blank' rel="noopener noreferrer" href='https://foursquare.com'>Foursquare</a>
				</p>
			</article>
		</Dragg>
		)
	}
}