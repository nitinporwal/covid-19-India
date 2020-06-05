import React from "react";
import { SVGMap } from "react-svg-map";
import world from "@svg-maps/india";
import './App.css';
import Data from "./Data";
import { covid } from "./api/covid";
import { Link} from "react-router-dom";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, BarChart } from 'recharts';

 
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
            totalCases: [],
            sortConfig: {
                key: "confirmed",
                direction: "desc"
            },
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
        let cases, max;
        this.state.cases.filter(c=> {
            if(c.statecode==='TT') {
                max=c.confirmed;
            }
            if(c.state===location.name) {
                cases=c.confirmed;
            }
            return c.state===location.name
        })
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
    fetchOverall = () => {
        let c=this.props.location.state.region.ca.statecode.toString().toLowerCase();
        let conf=[], act=[], dec=[], rec=[];
        let confDaily=[], actDaily=[], decDaily=[], recDaily=[];
        let x=0, y=0, z=0, a=0;
        this.state.daily.map(d => {
            if(d.status==='Confirmed') {
                x=parseInt(parseInt(x)+parseInt(d[`${c}`]));
                conf.push({date: d.date, cases: x});
                confDaily.push({date: d.date, cases: parseInt(d[`${c}`])});
            }
            else if(d.status==='Deceased') {
                z=parseInt(parseInt(z)+parseInt(d[`${c}`]));
                dec.push({date: d.date, cases: z});
                decDaily.push({date: d.date, cases: parseInt(d[`${c}`])});
                y=x-z-a;
                act.push({date: d.date, cases: y});
                actDaily.push({date: d.date, cases: parseInt(d[`${c}`])});
            }
            else if(d.status==='Recovered') {
                a=parseInt(parseInt(a)+parseInt(d[`${c}`]));
                rec.push({date: d.date, cases: a});
                recDaily.push({date: d.date, cases: parseInt(d[`${c}`])});
            }
            return null;
        })
        this.setState({confirmed: conf, active: act, death: dec, recovered: rec, confirmedDaily: confDaily, activeDaily: actDaily, deathDaily: decDaily, recoveredDaily: recDaily});
        
        let dail=this.state.isDaily;
        this.setState({isDaily: !dail});
        this.setState({isDaily: dail});    
    }
    fetchMonth = () => {
        let c=this.props.location.state.region.ca.statecode.toString().toLowerCase();
        let res=new Date();
        let res2=new Date();
        res2.setDate(res.getDate()-31);
        let conf=[], act=[], dec=[], rec=[];
        let confDaily=[], actDaily=[], decDaily=[], recDaily=[];
        let x=0, y=0, z=0, a=0;
        this.state.daily.filter(d => {
            if(new Date(d.date)>=res2) {
                if(d.status==='Confirmed') {
                    x=parseInt(parseInt(x)+parseInt(d[`${c}`]));
                    conf.push({date: d.date, cases: x});
                    confDaily.push({date: d.date, cases: parseInt(d[`${c}`])});
                }
                else if(d.status==='Deceased') {
                    z=parseInt(parseInt(z)+parseInt(d[`${c}`]));
                    dec.push({date: d.date, cases: z});
                    decDaily.push({date: d.date, cases: parseInt(d[`${c}`])});
                    y=x-z-a;
                    act.push({date: d.date, cases: y});
                    actDaily.push({date: d.date, cases: parseInt(d[`${c}`])});
                }
                else if(d.status==='Recovered') {
                    a=parseInt(parseInt(a)+parseInt(d[`${c}`]));
                    rec.push({date: d.date, cases: a});
                    recDaily.push({date: d.date, cases: parseInt(d[`${c}`])});
                }

            }
            return null;
        })
        this.setState({confirmed: conf, active: act, death: dec, recovered: rec, confirmedDaily: confDaily, activeDaily: actDaily, deathDaily: decDaily, recoveredDaily: recDaily});
    
        let dail=this.state.isDaily;
        this.setState({isDaily: !dail});
        this.setState({isDaily: dail});
    }
    fetchHalf = () => {
        let c=this.props.location.state.region.ca.statecode.toString().toLowerCase();
        let res=new Date();
        let res2=new Date();
        res2.setDate(res.getDate()-14);
        let conf=[], act=[], dec=[], rec=[];
        let confDaily=[], actDaily=[], decDaily=[], recDaily=[];
        let x=0, y=0, z=0, a=0;
        this.state.daily.filter(d => {
            if(new Date(d.date)>=res2) {
                if(d.status==='Confirmed') {
                    x=parseInt(parseInt(x)+parseInt(d[`${c}`]));
                    conf.push({date: d.date, cases: x});
                    confDaily.push({date: d.date, cases: parseInt(d[`${c}`])});
                }
                else if(d.status==='Deceased') {
                    z=parseInt(parseInt(z)+parseInt(d[`${c}`]));
                    dec.push({date: d.date, cases: z});
                    decDaily.push({date: d.date, cases: parseInt(d[`${c}`])});
                    y=x-z-a;
                    act.push({date: d.date, cases: y});
                    actDaily.push({date: d.date, cases: parseInt(d[`${c}`])});
                }
                else if(d.status==='Recovered') {
                    a=parseInt(parseInt(a)+parseInt(d[`${c}`]));
                    rec.push({date: d.date, cases: a});
                    recDaily.push({date: d.date, cases: parseInt(d[`${c}`])});
                }

            }
            return null;
        })
        this.setState({confirmed: conf, active: act, death: dec, recovered: rec, confirmedDaily: confDaily, activeDaily: actDaily, deathDaily: decDaily, recoveredDaily: recDaily});
        
        let dail=this.state.isDaily;
        this.setState({isDaily: !dail});
        this.setState({isDaily: dail});
    }
    toggleChartsDaily = () => {
        if(this.classes.class2!=="active focus") {
            this.classes.class1="";
            this.classes.class2="active focus";
            this.setState({isDaily: true});
        }
    }
    toggleChartsTotal = () => {
        if(this.classes.class1!=="active focus") {
            this.classes.class1="active focus";
            this.classes.class2="";
            this.setState({isDaily: false});
        }
    }
    handleBegining = () => {
        if(this.classes.class4!=="active focus") {
            this.classes.class3="";
            this.classes.class4="active focus";
            this.classes.class5="";
            this.fetchOverall();
        }
    }
    handleMonth = () => {
        if(this.classes.class3!=="active focus") {
            this.classes.class3="active focus";
            this.classes.class4="";
            this.classes.class5="";
            this.fetchMonth();
        }
    }
    handleTwoWeeks = () => {
        if(this.classes.class5!=="active focus") {
            this.classes.class3="";
            this.classes.class4="";
            this.classes.class5="active focus";
            this.fetchHalf();
        }
    }
    dynamicsort = (key, direction) => {
        return (a, b) => {
            if(key==="state") {
                if (a[key] < b[key]) {
                    return direction === 'asc' ? -1 : 1;
                  }
                  if (a[key] > b[key]) {
                    return direction === 'asc' ? 1 : -1;
                  }
                  return 0;
            }
            if (parseInt(a[key]) < parseInt(b[key])) {
                return direction === 'asc' ? -1 : 1;
              }
              if (parseInt(a[key]) > parseInt(b[key])) {
                return direction === 'asc' ? 1 : -1;
              }
              return 0;
        }
    }
    sortData = (key) => {
        let direction = 'desc';
        if (this.state.sortConfig && this.state.sortConfig.key === key && this.state.sortConfig.direction === 'desc') {
            direction = 'asc';
        }
        this.setState({sortConfig: {key: key, direction: direction}});
        let x=this.state.cases;
        console.log(key, direction)
        x.sort(this.dynamicsort(key, direction));
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
                            style={{height: "1px"}}
                            >
                            <td style={{padding: "0.2em 0.7em"}}>
                                <Link to={{
                                    pathname: `/state/${ca.statecode}`,
                                    state: {
                                        region: {ca}
                                    }
                                }} style={{textDecoration: "none"}}>
                                    {ca.state}
                                </Link>
                            </td>
                            <td style={{padding: "0.2em 0.7em"}}>
                                <Link to={{
                                    pathname: `/state/${ca.statecode}`,
                                    state: {
                                        region: {ca}
                                    }
                                }} style={{textDecoration: "none"}}>
                                    {ca.confirmed}
                                    {/* <br/>
                                    {q} */}
                                </Link>
                            </td>
                            <td style={{padding: "0.2em 0.7em"}}>
                                <Link to={{
                                    pathname: `/state/${ca.statecode}`,
                                    state: {
                                        region: {ca}
                                    }
                                }} style={{textDecoration: "none"}}>
                                    {ca.active}
                                    {/* <br/>
                                    {p} */}
                                </Link>
                            </td>
                            <td style={{padding: "0.2em 0.7em"}}>
                                <Link to={{
                                    pathname: `/state/${ca.statecode}`,
                                    state: {
                                        region: {ca}
                                    }
                                }} style={{textDecoration: "none"}}>
                                    {ca.recovered}
                                    {/* <br/>
                                    {r} */}
                                </Link>
                            </td>
                            <td style={{padding: "0.2em 0.7em"}}>
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
        let v="";
        if(this.state.sortConfig.direction==="desc") {
            v="🔽"
        }
        else {
            v="🔼"
        }
        if(!this.state.clickedLocation) {
            console.log(this.state)
            return (
                <article className="examples__block" style={{marginTop: "3%"}}>
                    <div className='ui grid' style={{fontSize: "0.95em"}}>
                        <div className="fifteen wide column jumbotron">
                            <div className="ui grid">
                                <div className="five wide column examples__block__info">
                                <div className="card text-white bg-primary mb-3" style={{maxWidth: "18rem", minWidth: "14rem"}}>
                                    <div className="card-header">
                                        <h5>
                                            Pointed location:
                                            <br/>
                                            {(this.state.pointedLocation!=="Total") ? 
                                            this.state.pointedLocation :
                                            "India"}
                                        </h5>
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
                            <div className='ui grid'>
                        <div className="eight wide column">
                            <div className="ui header centered">
                                Confirmed cases:
                            </div>
                            <BarChart width={350} height={250} data={this.state.totalCases} syncId="anyId"
                                margin={{top: 0, right: 30, left: 0, bottom: 0}}>
                            <CartesianGrid strokeDasharray="3 3"/>
                            <XAxis dataKey="date"/>
                            <YAxis dataKey="" />
                            <Tooltip/>
                            <Legend />
                            <Bar type='monotone' dataKey="totalconfirmed" stroke='#7900fa' fill='#7900fa' />
                            </BarChart>
                        </div>
                        <div className="eight wide column">
                            <div className="ui header centered">
                                Active cases:
                            </div>
                            <BarChart width={350} height={250} data={this.state.totalCases} syncId="anyId"
                                margin={{top: 0, right: 0, left: 30, bottom: 0}}>
                            <CartesianGrid strokeDasharray="3 3"/>
                            <XAxis dataKey="date"/>
                            <YAxis/>
                            <Tooltip/>
                            <Legend />
                            <Bar type='monotone' dataKey="totalactive" stroke='#fc030f' fill='#fc030f' />
                            </BarChart>
                        </div>
                        <div className="eight wide column">
                            <div className="ui header centered">
                                Recovered:
                            </div>
                            <BarChart width={350} height={250} data={this.state.totalCases} syncId="anyId"
                                margin={{top: 0, right: 30, left: 0, bottom: 0}}>
                            <CartesianGrid strokeDasharray="3 3"/>
                            <XAxis dataKey="date"/>
                            <YAxis/>
                            <Tooltip/>
                            <Legend />
                            <Bar type='monotone' dataKey="totalrecovered" stroke='#9dfc03' fill='#9dfc03' />
                            </BarChart>
                        </div>
                        <div className="eight wide column">
                            <div className="ui header centered">
                                Deaths:
                            </div>
                            <BarChart width={350} height={250} data={this.state.totalCases} syncId="anyId"
                                margin={{top: 0, right: 0, left: 30, bottom: 0}}>
                            <CartesianGrid strokeDasharray="3 3"/>
                            <XAxis dataKey="date"/>
                            <YAxis/>
                            <Tooltip/>
                            <Legend />
                            {/* <Brush /> */}
                            <Bar type='monotone' dataKey="totaldeceased" stroke='#949ea8' fill='#949ea8' />
                            </BarChart>
                        </div>
                    </div>
                        </div>
                        <div className="one wide column">
                            <table style={{borderCollapse: "seperated"}}>
                                <thead>
                                    <tr>
                                    <th onClick={() => this.sortData("state")} style={{cursor: "default"}}>
                                        State/UT
                                        <br/>
                                        {(this.state.sortConfig.key==="state") ? v : "⏹️"}
                                    </th>
                                    <th onClick={() => this.sortData("confirmed")} style={{cursor: "default"}}>
                                        Confirmed
                                        <br/>
                                        {(this.state.sortConfig.key==="confirmed") ? v : "⏹️"}
                                    </th>
                                    <th onClick={() => this.sortData("active")} style={{cursor: "default"}}>
                                        Active
                                        <br/>
                                        {(this.state.sortConfig.key==="active") ? v : "⏹️"}
                                    </th>
                                    <th onClick={() => this.sortData("recovered")} style={{cursor: "default"}}>
                                        Recovered
                                        <br/>
                                        {(this.state.sortConfig.key==="recovered") ? v : "⏹️"}
                                    </th>
                                    <th onClick={() => this.sortData("deaths")} style={{cursor: "default"}}>
                                        Deaths
                                        <br/>
                                        {(this.state.sortConfig.key==="deaths") ? v : "⏹️"}
                                    </th>
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