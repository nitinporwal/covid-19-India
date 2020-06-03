import React from "react";
import { SVGMap } from "react-svg-map";
import world from "@svg-maps/india";
import './App.css';
import Data from "./Data";
 
class HoverMap extends React.Component {
    constructor(props) {
		super(props);

		this.state = {
			pointedLocation: null,
			tooltipStyle: {
				display: 'none'
			},
			focusedLocation: null,
			clickedLocation: null
		};

		this.handleLocationMouseOver = this.handleLocationMouseOver.bind(this);
		this.handleLocationMouseOut = this.handleLocationMouseOut.bind(this);
		this.handleLocationMouseMove = this.handleLocationMouseMove.bind(this);
		this.handleLocationClick = this.handleLocationClick.bind(this);
		this.handleLocationFocus = this.handleLocationFocus.bind(this);
		this.handleLocationBlur = this.handleLocationBlur.bind(this);
	}
    getLocationSelected(event) {
        return event.target.attributes['aria-checked'].value === 'true';
    }
    getLocationName(event) {
        return event.target.attributes.name.value;
    }
    getLocationId(event) {
        return event.target.id;
    }
	handleLocationMouseOver(event) {
        const pointedLocation = this.getLocationName(event);
		this.setState({ pointedLocation });
	}

	handleLocationMouseOut() {
		this.setState({ pointedLocation: null, tooltipStyle: { display: 'none' } });
	}

    handleLocationClick(event) {
		const clickedLocation = this.getLocationName(event);
		const clickedLocationId = this.getLocationId(event);
        this.setState({ clickedLocation: clickedLocation });
        console.log(clickedLocationId);
        
    }
    
	handleLocationFocus(event) {
		const focusedLocation = this.getLocationName(event);
		this.setState({ focusedLocation: focusedLocation });
	}

	handleLocationBlur() {
		this.setState({ focusedLocation: null });
	}

	handleLocationMouseMove(event) {
		const tooltipStyle = {
			display: 'block',
			top: event.clientY + 10,
			left: event.clientX - 100
		};
		this.setState({ tooltipStyle });
	}

	getLocationClassName(location, index) {
		// Generate random heat map
		return `svg-map__location svg-map__location--heat${index % 4}`;
	}

	render() {
		return (
			<article className="examples__block">
				<h2 className="examples__block__title">
					India SVG heat map with tooltips
				</h2>
                <div className="examples__block__info">
					<div className="examples__block__info__item">
						Pointed location: {this.state.pointedLocation}
					</div>
					<div className="examples__block__info__item">
						Clicked location: {this.state.clickedLocation}
					</div>
				</div>
				<div className="examples__block__map examples__block__map--usa">
					<SVGMap
						map={world}
						locationClassName={this.getLocationClassName}
						onLocationMouseOver={this.handleLocationMouseOver}
						onLocationMouseOut={this.handleLocationMouseOut}
						onLocationClick={this.handleLocationClick}
						onLocationFocus={this.handleLocationFocus}
						onLocationBlur={this.handleLocationBlur}
						onLocationMouseMove={this.handleLocationMouseMove} />
					<div className="examples__block__map__tooltip" style={this.state.tooltipStyle}>
						<div className="ui header">
                            {this.state.pointedLocation}
                        </div>
                        <Data code={this.state.pointedLocation} />
					</div>
				</div>
			</article>
		);
	}
}

export default HoverMap;