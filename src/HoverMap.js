import React from "react";
import { SVGMap } from "react-svg-map";
import world from "@svg-maps/india";
import './App.css';
import Data from "./Data";
import { covid } from "./api/covid";
 
class HoverMap extends React.Component {
    constructor(props) {
		super(props);

		this.state = {
			pointedLocation: null,
			tooltipStyle: {
				display: 'none'
			},
			focusedLocation: null,
            clickedLocation: null,
            cases: []
		};

		this.handleLocationMouseOver = this.handleLocationMouseOver.bind(this);
		this.handleLocationMouseOut = this.handleLocationMouseOut.bind(this);
		this.handleLocationMouseMove = this.handleLocationMouseMove.bind(this);
		this.handleLocationClick = this.handleLocationClick.bind(this);
		this.handleLocationFocus = this.handleLocationFocus.bind(this);
		this.handleLocationBlur = this.handleLocationBlur.bind(this);
    }
    componentDidMount = () => {
        covid.get('/data.json').then(res => {
            // console.log(res.data.statewise)
            this.setState({cases: res.data.statewise});
        })
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
	getLocationClassName = (location, index) => {
        // console.log(location, index)
        // console.log(this.state)
        let r=this.state.cases.filter(c=> {
            return c.state===location.name
        })
        let cases, max;
        if(this.state.cases[0]) {
            cases=this.state.cases[0].confirmed;
            max=this.state.cases[0].confirmed;
        }
        if(r[0]) {
            cases=r[0].confirmed;
        }
        // Generate random heat map
        if(cases<2*(max)/100) {
            return `svg-map__location svg-map__location--heat4`;
        }
        else if(cases<4*(max)/100) {
            return `svg-map__location svg-map__location--heat3`;
        }
        else if(cases<8*(max)/100) {
            return `svg-map__location svg-map__location--heat2`;
        }
        else if(cases<16*(max)/100) {
            return `svg-map__location svg-map__location--heat1`;
        }
        else if(cases<32*(max)/100) {
            return `svg-map__location svg-map__location--heat0`;
        }
        else {
            return `svg-map__location svg-map__location--heat0`;
        }
	}

	render() {
		return (
			<article className="examples__block">
                <div className='ui grid'>
                    <div className="six wide column examples__block__info">
                        <div className="examples__block__info__item">
                            Pointed location: {this.state.pointedLocation}
                            <Data code={this.state.pointedLocation} />
                        </div>
                        <div className="examples__block__info__item">
                            Clicked location: {this.state.clickedLocation}
                        </div>
                    </div>
                    <div className="ten wide column examples__block__map examples__block__map--usa">
                        <SVGMap 
                            map={world}
                            onLocationMouseOver={this.handleLocationMouseOver}
                            onLocationMouseOut={this.handleLocationMouseOut}
                            onLocationClick={this.handleLocationClick}
                            onLocationFocus={this.handleLocationFocus}
                            onLocationBlur={this.handleLocationBlur}
                            locationClassName={(location, index) =>this.getLocationClassName(location, index)}
                            onLocationMouseMove={this.handleLocationMouseMove} />
                        <div className="examples__block__map__tooltip" style={this.state.tooltipStyle}>
                            <div className="ui header">
                                {this.state.pointedLocation}
                            </div>
                            <Data code={this.state.pointedLocation} />
                        </div>
                    </div>
                </div>
			</article>
		);
	}
}

export default HoverMap;