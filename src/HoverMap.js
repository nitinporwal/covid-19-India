import React from "react";
import { SVGMap } from "react-svg-map";
import world from "@svg-maps/india";
import './App.css';
import Data from "./Data";
import { covid } from "./api/covid";
import { Link} from "react-router-dom";

 
class HoverMap extends React.Component {
    constructor(props) {
		super(props);
        this.links = {
		};

		this.state = {
			pointedLocation: "Total",
			tooltipStyle: {
				display: 'none'
			},
			// focusedLocation: null,
            clickedLocation: null,
            clickedLocationCode: null,
            cases: [],
            totalCases: []
		};

		this.handleLocationMouseOver = this.handleLocationMouseOver.bind(this);
		this.handleLocationMouseOut = this.handleLocationMouseOut.bind(this);
		this.handleLocationMouseMove = this.handleLocationMouseMove.bind(this);
		this.handleLocationClick = this.handleLocationClick.bind(this);
		// this.handleLocationFocus = this.handleLocationFocus.bind(this);
		// this.handleLocationBlur = this.handleLocationBlur.bind(this);
    }
    componentDidMount = () => {
        covid.get('/data.json').then(res => {
            // console.log(res.data.cases_time_series)
            let cas=res.data.cases_time_series;
            let c=cas.map(ca => {
                return {...ca,
                    totalactive: (ca.totalconfirmed-ca.totaldeceased-ca.totalrecovered).toString(),
                    dailyactive: (ca.dailyconfirmed-ca.dailydeceased-ca.dailyrecovered).toString()
                }
            })
            // console.log(c);
            this.setState({cases: res.data.statewise, totalCases: c});
        })
        // .then(() => this.fetchTotal())
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
		this.setState({ pointedLocation: "Total", tooltipStyle: { display: 'none' } });
	}
    handleLocationClick = (event) => {
		const clickedLocation = this.getLocationName(event);
		const clickedLocationId = this.getLocationId(event);
        this.setState({ clickedLocation: clickedLocation });
        console.log(clickedLocationId);
        let r=this.state.cases.filter(c=> {
            return c.state===clickedLocation
        })
        console.log(r);
		// window.open(this.links[clickedLocationId]);
        this.setState({clickedLocationCode: clickedLocationId});
        console.log(this.state);
        const { history } = this.props;
        console.log(history);
        if(history) history.push({
            pathname: `/state/${clickedLocationId}`,
            state: {
                region: {ca: r[0]}
            }
        });

    }
    
	// handleLocationFocus(event) {
	// 	const focusedLocation = this.getLocationName(event);
    //     this.setState({ focusedLocation: focusedLocation });
	// }

	// handleLocationBlur() {
	// 	this.setState({ focusedLocation: null });
	// }

	handleLocationMouseMove(event) {
		const tooltipStyle = {
			display: 'block',
			top: event.clientY + 10,
			left: event.clientX - 100
		};
		this.setState({ tooltipStyle });
    }
    // fetchTotal = () => {
    //     let a=[], b=[], c=[], d=[], x=0, y=0, z=0;
    //     this.state.totalCases.map(t => {
    //         let r=t.totalconfirmed-x, s=t.totalrecovered-y, u=t.totaldeceased-z;
    //         x=parseInt(t.totalconfirmed);
    //         y=parseInt(t.totalrecovered)
    //         z=parseInt(t.totaldeceased);
    //         a=this.state.totalConfirmed;
    //         a.push({date: t.date, cases: x, delta: r});
    //         b=this.state.totalRecovered;
    //         b.push({date: t.date, cases: y, delta: s});
    //         c=this.state.totalDeath;
    //         c.push({date: t.date, cases: z, delta: u});
    //         d=this.state.totalActive;
    //         d.push({date: t.date, cases: x-y-z, delat: r-s-u});
    //     })
    //     this.setState({totalActive: d, totalConfirmed: a, totalDeath: c, totalRecovered: b})
    // }
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
    handleHover = (ca) => {
        const pointedLocation = ca.state;
		this.setState({ pointedLocation });
    }
    handleOut = () => {
		this.setState({ pointedLocation: "Total", tooltipStyle: { display: 'none' } });
    }
    showStats = () => {
        // let p=0, q=0, r=0, s=0;
        return (
            <tbody>
                {this.state.cases.map(ca => {
                    // q=ca.confirmed-q;
                    // p=ca.active-p;
                    // r=ca.recovered-r;
                    // s=ca.deaths-s;
                    return (
                        <tr key={ca.statecode}
                            onMouseOver={() => this.handleHover(ca)}
                            onMouseOut={this.handleOut}
                            >
                            <td>
                                <Link to={{
                                    pathname: `/state/${ca.statecode}`,
                                    state: {
                                        region: {ca}
                                    }
                                }}>
                                    {ca.state}
                                </Link>
                            </td>
                            <td>
                                <Link to={{
                                    pathname: `/state/${ca.statecode}`,
                                    state: {
                                        region: {ca}
                                    }
                                }}>
                                    {ca.confirmed}
                                    {/* <br/>
                                    {q} */}
                                </Link>
                            </td>
                            <td>
                                <Link to={{
                                    pathname: `/state/${ca.statecode}`,
                                    state: {
                                        region: {ca}
                                    }
                                }}>
                                    {ca.active}
                                    {/* <br/>
                                    {p} */}
                                </Link>
                            </td>
                            <td>
                                <Link to={{
                                    pathname: `/state/${ca.statecode}`,
                                    state: {
                                        region: {ca}
                                    }
                                }}>
                                    {ca.recovered}
                                    {/* <br/>
                                    {r} */}
                                </Link>
                            </td>
                            <td>
                                <Link to={{
                                    pathname: `/state/${ca.statecode}`,
                                    state: {
                                        region: {ca}
                                    }
                                }}>
                                    {ca.deaths}
                                    {/* <br/>
                                    {s} */}
                                </Link>
                            </td>
                        </tr>
                    )
                    // p=ca.confirmed;
                    // q=ca.active
                    // r=ca.confirmed
                    // s=ca.deaths;
                })}
            </tbody>
        )
    }
	render() {
        if(!this.state.clickedLocation) {
            console.log(this.state)
            return (
                <article className="examples__block">
                    <div className='ui grid'>
                        <div className="fifteen wide column">
                            <div className="ui grid">
                                <div className="five wide column examples__block__info">
                                <div className="card text-white bg-primary mb-3" style={{maxWidth: "18rem", minWidth: "16rem"}}>
                                    <div className="card-header">
                                        <h4>
                                            Pointed location:
                                            <br/>
                                            {(this.state.pointedLocation!=="Total") ? 
                                            this.state.pointedLocation :
                                            "India"}
                                        </h4>
                                    </div>
                                    <div className="card-body">
                                        <Data code={this.state.pointedLocation} />
                                    </div>
                                    </div>
                                    {/* <div className="ui cards">
                                        <div className="card">
                                            <div className="content">
                                                <div className="header examples__block__info__item">
                                                    Pointed location:
                                                    <br/>
                                                    {(this.state.pointedLocation!=="Total") ? 
                                                    this.state.pointedLocation :
                                                    "India"}
                                                </div>
                                                <hr />
                                                <div className="description">
                                                    <Data code={this.state.pointedLocation} />
                                                </div>
                                            </div>
                                        </div>
                                    </div> */}
                                </div>
                                <div className="eleven wide column examples__block__map examples__block__map--usa">
                                    <SVGMap 
                                        map={world}
                                        onLocationMouseOver={this.handleLocationMouseOver}
                                        onLocationMouseOut={this.handleLocationMouseOut}
                                        onLocationClick={(event) => this.handleLocationClick(event)}
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
                        </div>
                        <div className="one wide column">
                            <table className="ui selectable striped table">
                                <thead>
                                    <tr>
                                    <th>State/UT</th>
                                    <th>Confirmed</th>
                                    <th>Active</th>
                                    <th>Recovered</th>
                                    <th>Deaths</th>
                                    </tr>
                                </thead>
                                {this.showStats()}
                            </table>
                        </div>
                    </div>
                </article>
            );
        }
        // else {
        //     return (
        //         <div>
        //             <Route to="/state" component={States} />
        //         </div>
        //     )
        // }
	}
}

export default HoverMap;