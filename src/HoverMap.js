import React from "react";
import { SVGMap } from "react-svg-map";
import world from "@svg-maps/india";
import './App.css';
import Data from "./Data";
import { covid } from "./api/covid";
import { Link} from "react-router-dom";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, BarChart } from 'recharts';
import Loader from 'react-loader-spinner';
import { trackPromise } from 'react-promise-tracker';
import moment from 'moment'
 
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
            active: [],
            confirmed: [],
            recovered: [],
            death: [],
            activeDaily: [],
            confirmedDaily: [],
            recoveredDaily: [],
            deathDaily: [],
            sortConfig: {
                key: "confirmed",
                direction: "desc"
            },
            isDaily: false,
            whichClicked: "confirmed",
            type: "line",
            delayed: true
        };
        
        this.classes = {
            class1: "active focus",
            class2: "",
            class3: "",
            class4: "active focus",
            class5: "",
            class6: "active focus"
        }
		this.handleLocationMouseOver = this.handleLocationMouseOver.bind(this);
		this.handleLocationMouseOut = this.handleLocationMouseOut.bind(this);
		// this.handleLocationMouseMove = this.handleLocationMouseMove.bind(this);
		this.handleLocationClick = this.handleLocationClick.bind(this);
		// this.handleLocationFocus = this.handleLocationFocus.bind(this);
		// this.handleLocationBlur = this.handleLocationBlur.bind(this);
    }
    componentDidMount = () => {
        trackPromise(
        covid.get('/data.json').then(res => {
            // console.log(res.data.cases_time_series)
            let cas=res.data.cases_time_series;
            let c=cas.map(ca => {
                let x={...ca};
                x.date+="20";
                ca=x;
                return {...ca,
                    totalactive: (ca.totalconfirmed-ca.totaldeceased-ca.totalrecovered).toString(),
                    dailyactive: (ca.dailyconfirmed-ca.dailydeceased-ca.dailyrecovered).toString()
                }
            })
            let caes=res.data.statewise;
            let cc=caes.filter(ca => {
                return ca.statecode!=="UN"
            })
            this.setState({cases: cc, totalCases: c});
        }).then(() => {
            this.fetchMonth()
        }))
    }
    getDateDiff = (name) => {
        let x=this.state.cases.filter((c) => {
            return c.state===name
        })
        let date1;
        let a="";
        if(x[0]) {
            date1 = x[0].lastupdatedtime;
            a+=(date1.charAt(3));
            a+=(date1.charAt(4));
            a+=(date1.charAt(2));
            a+=(date1.charAt(0));
            a+=(date1.charAt(1));
            for(let x=5; x<date1.length; x++) {
                a+=(date1.charAt(x));
            }
        }
        return (moment(a).fromNow());
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
        if(this.state.pointedLocation!==pointedLocation) {
            this.setState({ pointedLocation });
        }
	}
	handleLocationMouseOut() {
		this.setState({ pointedLocation: "Total", tooltipStyle: { display: 'none' } });
	}
    handleLocationClick = (event) => {
		const clickedLocation = this.getLocationName(event);
		const clickedLocationId = this.getLocationId(event);
        this.setState({ clickedLocation: clickedLocation });
        // console.log(clickedLocationId);
        let r=this.state.cases.filter(c=> {
            return c.state===clickedLocation
        })
        // console.log(r);
		// window.open(this.links[clickedLocationId]);
        this.setState({clickedLocationCode: clickedLocationId});
        // console.log(this.state);
        const { history } = this.props;
        // console.log(history);
        if(history) history.push({
            pathname: `/state/${clickedLocationId}/${clickedLocation}`,
            state: {
                region: {ca: r[0]}
            }
        });

    }
    showLoader = () => {
        setTimeout(() => 
            { 
                return (
                    this.setState({delayed: false})
                )
            }
            , 2000
        );
        return (
            <div>
                <Loader type="ThreeDots" color="#0278f5" height="100" width="100" style={{margin:"0 0 0 40%"}} />

            </div>
        )
    }
	// handleLocationFocus(event) {
	// 	const focusedLocation = this.getLocationName(event);
    //     this.setState({ focusedLocation: focusedLocation });
	// }

	// handleLocationBlur() {
	// 	this.setState({ focusedLocation: null });
	// }

	// handleLocationMouseMove(event) {
	// 	const tooltipStyle = {
	// 		display: 'block',
	// 		top: event.clientY + 10,
	// 		left: event.clientX - 100
	// 	};
	// 	this.setState({ tooltipStyle });
    // }
	getLocationClassName = (location, index) => {
        // console.log(location, index)
        // console.log(this.state)
        let cases, max, wh=this.state.whichClicked;
        // console.log(wh.which)
        this.state.cases.filter(c=> {
            // console.log(c.wh);
            // console.log(c);
            if(c.statecode==='TT') {
                max=c[wh];
            }
            if(c.state===location.name) {
                cases=c[wh];
            }
            return c.state===location.name
        })
        // Generate random heat map
        if(cases<2*(max)/100) {
            return `svg-map__location svg-map__location--heat_${wh}4`;
        }
        else if(cases<4*(max)/100) {
            return `svg-map__location svg-map__location--heat_${wh}3`;
        }
        else if(cases<8*(max)/100) {
            return `svg-map__location svg-map__location--heat_${wh}2`;
        }
        else if(cases<16*(max)/100) {
            return `svg-map__location svg-map__location--heat_${wh}1`;
        }
        else if(cases<32*(max)/100) {
            return `svg-map__location svg-map__location--heat_${wh}0`;
        }
        else {
            return `svg-map__location svg-map__location--heat_${wh}0`;
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
        let conf=[], act=[], dec=[], rec=[];
        let confDaily=[], actDaily=[], decDaily=[], recDaily=[];
        this.state.totalCases.map(d => {
            conf.push({date: d.date, cases: parseInt(d.totalconfirmed)});
            confDaily.push({date: d.date, cases: parseInt(d.dailyconfirmed)});
            dec.push({date: d.date, cases: parseInt(d.totaldeceased)});
            decDaily.push({date: d.date, cases: parseInt(d.dailydeceased)});
            act.push({date: d.date, cases: parseInt(d.totalactive)});
            actDaily.push({date: d.date, cases: parseInt(d.dailyactive)});
            rec.push({date: d.date, cases: parseInt(d.totalrecovered)});
            recDaily.push({date: d.date, cases: parseInt(d.dailyrecovered)});
            return null;
        })
        this.setState({confirmed: conf, active: act, death: dec, recovered: rec, confirmedDaily: confDaily, activeDaily: actDaily, deathDaily: decDaily, recoveredDaily: recDaily});
        
        let dail=this.state.isDaily;
        this.setState({isDaily: !dail});
        this.setState({isDaily: dail});    
    }
    fetchMonth = () => {
        let res=new Date();
        let res2=new Date();
        res2.setDate(res.getDate()-31);
        // console.log(res, res2);
        let conf=[], act=[], dec=[], rec=[];
        let confDaily=[], actDaily=[], decDaily=[], recDaily=[];
        this.state.totalCases.filter(d => {
            if(new Date(d.date)>=res2) {
                conf.push({date: d.date, cases: parseInt(d.totalconfirmed)});
                confDaily.push({date: d.date, cases: parseInt(d.dailyconfirmed)});
                dec.push({date: d.date, cases: parseInt(d.totaldeceased)});
                decDaily.push({date: d.date, cases: parseInt(d.dailydeceased)});
                act.push({date: d.date, cases: parseInt(d.totalactive)});
                actDaily.push({date: d.date, cases: parseInt(d.dailyactive)});
                rec.push({date: d.date, cases: parseInt(d.totalrecovered)});
                recDaily.push({date: d.date, cases: parseInt(d.dailyrecovered)});
            }
            return null;
        })
        this.setState({confirmed: conf, active: act, death: dec, recovered: rec, confirmedDaily: confDaily, activeDaily: actDaily, deathDaily: decDaily, recoveredDaily: recDaily});
    
        let dail=this.state.isDaily;
        this.setState({isDaily: !dail});
        this.setState({isDaily: dail});
    }
    fetchHalf = () => {
        let res=new Date();
        let res2=new Date();
        res2.setDate(res.getDate()-15);
        let conf=[], act=[], dec=[], rec=[];
        let confDaily=[], actDaily=[], decDaily=[], recDaily=[];
        this.state.totalCases.filter(d => {
            if(new Date(d.date)>=res2) {
                conf.push({date: d.date, cases: parseInt(d.totalconfirmed)});
                confDaily.push({date: d.date, cases: parseInt(d.dailyconfirmed)});
                dec.push({date: d.date, cases: parseInt(d.totaldeceased)});
                decDaily.push({date: d.date, cases: parseInt(d.dailydeceased)});
                act.push({date: d.date, cases: parseInt(d.totalactive)});
                actDaily.push({date: d.date, cases: parseInt(d.dailyactive)});
                rec.push({date: d.date, cases: parseInt(d.totalrecovered)});
                recDaily.push({date: d.date, cases: parseInt(d.dailyrecovered)});
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
    toggleLine = () => {
        if(this.classes.class6!=="active focus") {
            this.classes.class6="active focus";
            this.classes.class7="";
            this.setState({type: "line"});
        }
    }
    toggleBar = () => {
        if(this.classes.class7!=="active focus") {
            this.classes.class7="active focus";
            this.classes.class6="";
            this.setState({type: "bar"});
        }
    }
    handleBegining = () => {
        if(this.classes.class3!=="active focus") {
            this.classes.class3="active focus";
            this.classes.class4="";
            this.classes.class5="";
            this.fetchOverall();
        }
    }
    handleMonth = () => {
        if(this.classes.class4!=="active focus") {
            this.classes.class3="";
            this.classes.class4="active focus";
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
            if(a.statecode==="TT") {
                // console.log("YES");
                return direction === 'asc' ? -1 : -1;
            }
            else if(b.statecode==="TT") {
                return direction === 'asc' ? 1: 1;
            }
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
        // console.log(key, direction)
        x.sort(this.dynamicsort(key, direction));
    }
    getWhichClicked= (which) => {
        // console.log(which);
        this.setState({whichClicked: which});
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
                    // console.log(ca)
                    return (
                        <tr key={ca.statecode}
                            onMouseOver={() => this.handleHover(ca)}
                            onMouseOut={this.handleOut}
                            style={{height: "1px"}}
                            >
                            <td style={{padding: "0.2em 0.7em"}}>
                                <Link to={{
                                    pathname: `/state/${ca.statecode}/${ca.state}`,
                                    state: {
                                        region: {ca}
                                    }
                                }} style={{textDecoration: "none"}}>
                                    {ca.state}
                                </Link>
                            </td>
                            <td style={{padding: "0.2em 0.7em"}}>
                                <Link to={{
                                    pathname: `/state/${ca.statecode}/${ca.state}`,
                                    state: {
                                        region: {ca}
                                    }
                                }} style={{textDecoration: "none"}}>
                                    {ca.confirmed}
                                    <sup style={{color: "green"}}>
                                        {`+${ca.deltaconfirmed}`}
                                    </sup>
                                    {/* <br/>
                                    {q} */}
                                </Link>
                            </td>
                            <td style={{padding: "0.2em 0.7em"}}>
                                <Link to={{
                                    pathname: `/state/${ca.statecode}/${ca.state}`,
                                    state: {
                                        region: {ca}
                                    }
                                }} style={{textDecoration: "none"}}>
                                    {ca.active}
                                    {(parseInt(ca.deltaactive)>=0) ? `+${ca.deltaactive}` : ca.deltaactive}
                                    {/* <br/>
                                    {p} */}
                                </Link>
                            </td>
                            <td style={{padding: "0.2em 0.7em"}}>
                                <Link to={{
                                    pathname: `/state/${ca.statecode}/${ca.state}`,
                                    state: {
                                        region: {ca}
                                    }
                                }} style={{textDecoration: "none"}}>
                                    {ca.recovered}
                                    <sup style={{color: "green"}}>
                                        {`+${ca.deltarecovered}`}
                                    </sup>
                                    {/* <br/>
                                    {r} */}
                                </Link>
                            </td>
                            <td style={{padding: "0.2em 0.7em"}}>
                                <Link to={{
                                    pathname: `/state/${ca.statecode}/${ca.state}`,
                                    state: {
                                        region: {ca}
                                    }
                                }}>
                                    {ca.deaths}
                                    <sup style={{color: "green"}}>
                                        {`+${ca.deltadeaths}`}
                                    </sup>
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
            v=" 🔽"
        }
        else {
            v=" 🔼"
        }
        let daily;
        if(this.state.type==="bar") {
            daily = (
                <div>
                    <div className="card" style={{margin: "3% 18% 3% 5%", padding: "1% 7% 1% 1%", minWidth: "90%", maxWidth: "200%", borderRadius: "2%", boxShadow: "4px 0 #7900fa"}}>
                        <div className="card-body">
                            <div className="ui header">
                                Confirmed cases:
                                <p className="card-text"><small className="text-muted">Last updated {this.getDateDiff("Total")}</small></p>
                            </div>
                        </div>
                        <BarChart width={500} height={200} data={this.state.confirmedDaily} syncId="anyId"
                            margin={{top: 0, right: 0, left: 0, bottom: 0}} style={{marginRight: "35px"}}>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="date"/>
                        <YAxis dataKey="" />
                        <Tooltip/>
                        <Legend />
                        <Bar type='monotone' dataKey="cases" stroke='rgb(139, 0, 139)' fill='rgb(139, 0, 139)' />
                        </BarChart>
                    </div>
                    <div className="card" style={{margin: "3% 18% 3% 5%", padding: "1% 7% 1% 1%", minWidth: "90%", maxWidth: "200%", borderRadius: "2%", boxShadow: "4px 0 #fc030f"}}>
                        <div className="card-body">
                            <div className="ui header">
                                Active cases:
                                <p className="card-text"><small className="text-muted">Last updated {this.getDateDiff("Total")}</small></p>
                            </div>
                        </div>
                        <BarChart width={500} height={200} data={this.state.activeDaily} syncId="anyId"
                            margin={{top: 0, right: 0, left: 0, bottom: 0}} style={{marginRight: "35px"}}>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="date"/>
                        <YAxis/>
                        <Tooltip/>
                        <Legend />
                        <Bar type='monotone' dataKey="cases" stroke='rgb(255, 0, 0)' fill='rgb(255, 0, 0)' />
                        </BarChart>
                        
                    </div>
                    <div className="card" style={{margin: "3% 18% 3% 5%", padding: "1% 7% 1% 1%", minWidth: "90%", maxWidth: "200%", borderRadius: "2%", boxShadow: "4px 0 #03fc45"}}>
                        <div className="card-body">
                            <div className="ui header">
                                Recovered:
                                <p className="card-text"><small className="text-muted">Last updated {this.getDateDiff("Total")}</small></p>
                            </div>
                        </div>
                        <BarChart width={500} height={200} data={this.state.recoveredDaily} syncId="anyId"
                            margin={{top: 0, right: 0, left: 0, bottom: 0}} style={{marginRight: "35px"}}>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="date"/>
                        <YAxis/>
                        <Tooltip/>
                        <Legend />
                        <Bar type='monotone' dataKey="cases" stroke='rgb(0, 102, 0)' fill='rgb(0, 102, 0)' />
                        </BarChart>
                        
                    </div>
                    <div className="card" style={{margin: "3% 18% 3% 5%", padding: "1% 7% 1% 1%", minWidth: "90%", maxWidth: "200%", borderRadius: "2%", boxShadow: "4px 0 #949ea8"}}>
                        <div className="card-body">
                            <div className="ui header">
                                Deaths:
                                <p className="card-text"><small className="text-muted">Last updated {this.getDateDiff("Total")}</small></p>
                            </div>
                        </div>
                        <BarChart width={500} height={200} data={this.state.deathDaily} syncId="anyId"
                            margin={{top: 0, right: 0, left: 0, bottom: 0}} style={{marginRight: "35px"}}>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="date"/>
                        <YAxis/>
                        <Tooltip/>
                        <Legend />
                        {/* <Brush /> */}
                        <Bar type='monotone' dataKey="cases" stroke='rgb(64, 74, 66)' fill='rgb(64, 74, 66)' />
                        </BarChart>
                        
                    </div>
                </div>
            )
        }
        else if(this.state.type==="line") {
            daily = (
                <div>
                    <div className="card" style={{margin: "3% 18% 3% 5%", padding: "1% 7% 1% 1%", minWidth: "90%", maxWidth: "200%", borderRadius: "2%", boxShadow: "4px 0 #7900fa"}}>
                        <div className="card-body">
                            <div className="ui header">
                                Confirmed cases:
                                <p className="card-text"><small className="text-muted">Last updated {this.getDateDiff("Total")}</small></p>
                            </div>
                        </div>
                        <LineChart width={500} height={200} data={this.state.confirmedDaily} syncId="anyId"
                            margin={{top: 0, right: 0, left: 0, bottom: 0}} style={{marginRight: "35px"}}>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="date"/>
                        <YAxis dataKey="" />
                        <Tooltip/>
                        <Legend />
                        <Line type='monotone' dataKey="cases" stroke='rgb(139, 0, 139)' fill='rgb(139, 0, 139)' />
                        </LineChart>
                    </div>
                    <div className="card" style={{margin: "3% 18% 3% 5%", padding: "1% 7% 1% 1%", minWidth: "90%", maxWidth: "200%", borderRadius: "2%", boxShadow: "4px 0 #fc030f"}}>
                        <div className="card-body">
                            <div className="ui header">
                                Active cases:
                                <p className="card-text"><small className="text-muted">Last updated {this.getDateDiff("Total")}</small></p>
                            </div>
                        </div>
                        <LineChart width={500} height={200} data={this.state.activeDaily} syncId="anyId"
                            margin={{top: 0, right: 0, left: 0, bottom: 0}} style={{marginRight: "35px"}}>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="date"/>
                        <YAxis/>
                        <Tooltip/>
                        <Legend />
                        <Line type='monotone' dataKey="cases" stroke='rgb(255, 0, 0)' fill='rgb(255, 0, 0)' />
                        </LineChart>
                        
                    </div>
                    <div className="card" style={{margin: "3% 18% 3% 5%", padding: "1% 7% 1% 1%", minWidth: "90%", maxWidth: "200%", borderRadius: "2%", boxShadow: "4px 0 #03fc45"}}>
                        <div className="card-body">
                            <div className="ui header">
                                Recovered:
                                <p className="card-text"><small className="text-muted">Last updated {this.getDateDiff("Total")}</small></p>
                            </div>
                        </div>
                        <LineChart width={500} height={200} data={this.state.recoveredDaily} syncId="anyId"
                            margin={{top: 0, right: 0, left: 0, bottom: 0}} style={{marginRight: "35px"}}>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="date"/>
                        <YAxis/>
                        <Tooltip/>
                        <Legend />
                        <Line type='monotone' dataKey="cases" stroke='rgb(0, 102, 0)' fill='rgb(0, 102, 0)' />
                        </LineChart>
                        
                    </div>
                    <div className="card" style={{margin: "3% 18% 3% 5%", padding: "1% 7% 1% 1%", minWidth: "90%", maxWidth: "200%", borderRadius: "2%", boxShadow: "4px 0 #949ea8"}}>
                        <div className="card-body">
                            <div className="ui header">
                                Deaths:
                                <p className="card-text"><small className="text-muted">Last updated {this.getDateDiff("Total")}</small></p>
                            </div>
                        </div>
                        <LineChart width={500} height={200} data={this.state.deathDaily} syncId="anyId"
                            margin={{top: 0, right: 0, left: 0, bottom: 0}} style={{marginRight: "35px"}}>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="date"/>
                        <YAxis/>
                        <Tooltip/>
                        <Legend />
                        {/* <Brush /> */}
                        <Line type='monotone' dataKey="cases" stroke='rgb(64, 74, 66)' fill='rgb(64, 74, 66)' />
                        </LineChart>
                        
                    </div>
                </div>
            )
        }
        if(!this.state.clickedLocation) {
            console.log(this.state)
            if(!this.state.isDaily) {
                if(this.state.type==="line") {
                    daily = (
                        <div>
                            <div className="card" style={{margin: "3% 18% 3% 5%", padding: "1% 7% 1% 1%", minWidth: "90%", maxWidth: "200%", borderRadius: "2%", boxShadow: "4px 0 #7900fa"}}>
                                <div className="card-body">
                                    <div className="ui header">
                                        Confirmed cases:
                                        <p className="card-text"><small className="text-muted">Last updated {this.getDateDiff("Total")}</small></p>
                                    </div>
                                </div>
                                <LineChart width={500} height={200} data={this.state.confirmed} syncId="anyId"
                                    margin={{top: 0, right: 0, left: 0, bottom: 0}} style={{marginRight: "35px"}}>
                                <CartesianGrid strokeDasharray="3 3"/>
                                <XAxis dataKey="date"/>
                                <YAxis dataKey="" />
                                <Tooltip/>
                                <Legend />
                                <Line type='monotone' dataKey="cases" stroke='rgb(139, 0, 139)' fill='rgb(139, 0, 139)' />
                                </LineChart>
                                
                            </div>
                            <div className="card" style={{margin: "3% 18% 3% 5%", padding: "1% 7% 1% 1%", minWidth: "90%", maxWidth: "200%", borderRadius: "2%", boxShadow: "4px 0 #fc030f"}}>
                                <div className="card-body">
                                    <div className="ui header">
                                        Active cases:
                                        <p className="card-text"><small className="text-muted">Last updated {this.getDateDiff("Total")}</small></p>
                                    </div>
                                </div>
                                <LineChart width={500} height={200} data={this.state.active} syncId="anyId"
                                    margin={{top: 0, right: 0, left: 0, bottom: 0}} style={{marginRight: "35px"}}>
                                <CartesianGrid strokeDasharray="3 3"/>
                                <XAxis dataKey="date"/>
                                <YAxis/>
                                <Tooltip/>
                                <Legend />
                                <Line type='monotone' dataKey="cases" stroke='rgb(255, 0, 0)' fill='rgb(255, 0, 0)' />
                                </LineChart>
                                
                            </div>
                            <div className="card" style={{margin: "3% 18% 3% 5%", padding: "1% 7% 1% 1%", minWidth: "90%", maxWidth: "200%", borderRadius: "2%", boxShadow: "4px 0 #03fc45"}}>
                                <div className="card-body">
                                    <div className="ui header">
                                        Recovered:
                                        <p className="card-text"><small className="text-muted">Last updated {this.getDateDiff("Total")}</small></p>
                                    </div>
                                </div>
                                <LineChart width={500} height={200} data={this.state.recovered} syncId="anyId"
                                    margin={{top: 0, right: 0, left: 0, bottom: 0}} style={{marginRight: "35px"}}>
                                <CartesianGrid strokeDasharray="3 3"/>
                                <XAxis dataKey="date"/>
                                <YAxis/>
                                <Tooltip/>
                                <Legend />
                                <Line type='monotone' dataKey="cases" stroke='rgb(0, 102, 0)' fill='rgb(0, 102, 0)' />
                                </LineChart>
                                
                            </div>
                            <div className="card" style={{margin: "3% 18% 3% 5%", padding: "1% 7% 1% 1%", minWidth: "90%", maxWidth: "200%", borderRadius: "2%", boxShadow: "4px 0 #949ea8"}}>
                                <div className="card-body">
                                    <div className="ui header">
                                        Deaths:
                                        <p className="card-text"><small className="text-muted">Last updated {this.getDateDiff("Total")}</small></p>
                                    </div>
                                </div>
                                <LineChart width={500} height={200} data={this.state.death} syncId="anyId"
                                    margin={{top: 0, right: 0, left: 0, bottom: 0}} style={{marginRight: "35px"}}>
                                <CartesianGrid strokeDasharray="3 3"/>
                                <XAxis dataKey="date"/>
                                <YAxis/>
                                <Tooltip/>
                                <Legend />
                                {/* <Brush /> */}
                                <Line type='monotone' dataKey="cases" stroke='rgb(64, 74, 66)' fill='rgb(64, 74, 66)' />
                                </LineChart>
                            </div>
                        </div>
                    )
                }
                else if(this.state.type==="bar") {
                    daily = (
                        <div>
                            <div className="card" style={{margin: "3% 18% 3% 5%", padding: "1% 7% 1% 1%", minWidth: "90%", maxWidth: "200%", borderRadius: "2%", boxShadow: "4px 0 #7900fa"}}>
                                <div className="card-body">
                                    <div className="ui header">
                                        Confirmed cases:
                                        <p className="card-text"><small className="text-muted">Last updated {this.getDateDiff("Total")}</small></p>
                                    </div>
                                </div>
                                <BarChart width={500} height={200} data={this.state.confirmed} syncId="anyId"
                                    margin={{top: 0, right: 0, left: 0, bottom: 0}} style={{marginRight: "35px"}}>
                                <CartesianGrid strokeDasharray="3 3"/>
                                <XAxis dataKey="date"/>
                                <YAxis dataKey="" />
                                <Tooltip/>
                                <Legend />
                                <Bar type='monotone' dataKey="cases" stroke='rgb(139, 0, 139)' fill='rgb(139, 0, 139)' />
                                </BarChart>
                                
                            </div>
                            <div className="card" style={{margin: "3% 18% 3% 5%", padding: "1% 7% 1% 1%", minWidth: "90%", maxWidth: "200%", borderRadius: "2%", boxShadow: "4px 0 #fc030f"}}>
                                <div className="card-body">
                                    <div className="ui header">
                                        Active cases:
                                        <p className="card-text"><small className="text-muted">Last updated {this.getDateDiff("Total")}</small></p>
                                    </div>
                                </div>
                                <BarChart width={500} height={200} data={this.state.active} syncId="anyId"
                                    margin={{top: 0, right: 0, left: 0, bottom: 0}} style={{marginRight: "35px"}}>
                                <CartesianGrid strokeDasharray="3 3"/>
                                <XAxis dataKey="date"/>
                                <YAxis/>
                                <Tooltip/>
                                <Legend />
                                <Bar type='monotone' dataKey="cases" stroke='rgb(255, 0, 0)' fill='rgb(255, 0, 0)' />
                                </BarChart>
                                
                            </div>
                            <div className="card" style={{margin: "3% 18% 3% 5%", padding: "1% 7% 1% 1%", minWidth: "90%", maxWidth: "200%", borderRadius: "2%", boxShadow: "4px 0 #03fc45"}}>
                                <div className="card-body">
                                    <div className="ui header">
                                        Recovered:
                                        <p className="card-text"><small className="text-muted">Last updated {this.getDateDiff("Total")}</small></p>
                                    </div>
                                </div>
                                <BarChart width={500} height={200} data={this.state.recovered} syncId="anyId"
                                    margin={{top: 0, right: 0, left: 0, bottom: 0}} style={{marginRight: "35px"}}>
                                <CartesianGrid strokeDasharray="3 3"/>
                                <XAxis dataKey="date"/>
                                <YAxis/>
                                <Tooltip/>
                                <Legend />
                                <Bar type='monotone' dataKey="cases" stroke='rgb(0, 102, 0)' fill='rgb(0, 102, 0)' />
                                </BarChart>
                                
                            </div>
                            <div className="card" style={{margin: "3% 18% 3% 5%", padding: "1% 7% 1% 1%", minWidth: "90%", maxWidth: "200%", borderRadius: "2%", boxShadow: "4px 0 #949ea8"}}>
                                <div className="card-body">
                                    <div className="ui header">
                                        Deaths:
                                        <p className="card-text"><small className="text-muted">Last updated {this.getDateDiff("Total")}</small></p>
                                    </div>
                                </div>
                                <BarChart width={500} height={200} data={this.state.death} syncId="anyId"
                                    margin={{top: 0, right: 0, left: 0, bottom: 0}} style={{marginRight: "35px"}}>
                                <CartesianGrid strokeDasharray="3 3"/>
                                <XAxis dataKey="date"/>
                                <YAxis/>
                                <Tooltip/>
                                <Legend />
                                {/* <Brush /> */}
                                <Bar type='monotone' dataKey="cases" stroke='rgb(64, 74, 66)' fill='rgb(64, 74, 66)' />
                                </BarChart>
                            </div>
                        </div>
                    )
                }
            }
            return (
                // (this.state.delayed) ?
                //     this.showLoader()
                //     :
                //     (
                <article className="examples__block" style={{marginTop: "3%", marginLeft:"5%"}}>
                    <div className="row">
                        <div className="examples__block__info" style={{marginLeft:"49%", minHeight: "187px"}}>
                            <div className="card bg-light mb-3" style={{maxWidth: "80rem", minWidth: "40rem", margin: "-2% 0 0 12%"}}>
                                <div className="card-header">
                                    <h5>
                                        Pointed State:
                                        <br/>
                                        {(this.state.pointedLocation!=="Total") ? 
                                        this.state.pointedLocation :
                                        "India"}
                                    </h5>
                                    <p>
                                        Last Updated: {this.getDateDiff(this.state.pointedLocation)}
                                    </p>
                                </div>
                                <div className="row no-gutters">
                                    <div className="card-body" style={{minHeight: "123px"}}>
                                        {(this.state.delayed) ?
                                        this.showLoader() :
                                        <Data onClick={(which) => this.getWhichClicked(which)} code={this.state.pointedLocation} />}
                                    </div>
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
                    </div>
                    <div className='row'>
                        <div className="col-lg-6 col-md-8 cd-sm-8 jumbotron" style={{marginTop:"-17.5%"}}>
                            <div className="row">
                                <h3 style={{margin:"-4% 0 1% 40%"}}>
                                    Map of India
                                </h3>
                            </div>
                            <div className="row">
                                <div className="examples__block__map examples__block__map--usa">
                                    <SVGMap 
                                        map={world}
                                        onLocationMouseOver={this.handleLocationMouseOver}
                                        onLocationMouseOut={this.handleLocationMouseOut}
                                        onLocationClick={(event) => this.handleLocationClick(event)}
                                        onLocationFocus={this.handleLocationFocus}
                                        onLocationBlur={this.handleLocationBlur}
                                        locationClassName={(location, index) =>this.getLocationClassName(location, index)}
                                        // onLocationMouseMove={this.handleLocationMouseMove}
                                        />
                                    {/* <div className="examples__block__map__tooltip" style={this.state.tooltipStyle}>
                                        <div className="ui header">
                                            {this.state.pointedLocation}
                                        </div>
                                        <Data code={this.state.pointedLocation} />
                                    </div> */}
                                </div>
                            </div>
                            <div className='row'>

                                <div className="btn-group btn-group-toggle" style={{marginLeft: "9%", marginBottom: "2%", marginTop: "2%"}} data-toggle="buttons">
                                    <label onClick={this.toggleChartsTotal} className={`btn btn-primary ${this.classes.class1}`}>
                                        <input type="radio" name="options" id="option1" autoComplete="off" /> Total
                                    </label>
                                    <label onClick={this.toggleChartsDaily} className={`btn btn-primary ${this.classes.class2}`}>
                                        <input type="radio" name="options" id="option2" autoComplete="off" /> Daily
                                    </label>
                                </div>
                                <div className="btn-group btn-group-toggle" style={{marginLeft: "5%", marginBottom: "2%", marginTop: "2%"}} data-toggle="buttons">
                                    <label onClick={this.handleBegining} className={`btn btn-primary ${this.classes.class3}`}>
                                        <input type="radio" name="options" id="option1" autoComplete="off" /> Begining
                                    </label>
                                    <label onClick={this.handleMonth} className={`btn btn-primary ${this.classes.class4}`}>
                                        <input type="radio" name="options" id="option2" autoComplete="off" /> One Month
                                    </label>
                                    <label onClick={this.handleTwoWeeks} className={`btn btn-primary ${this.classes.class5}`}>
                                        <input type="radio" name="options" id="option2" autoComplete="off" /> Two Weeks
                                    </label>
                                </div>
                                <div className="btn-group btn-group-toggle" style={{marginLeft: "5%", marginBottom: "2%", marginTop: "2%"}} data-toggle="buttons">
                                    <label onClick={this.toggleLine} className={`btn btn-primary ${this.classes.class6}`}>
                                        <input type="radio" name="options" id="option1" autoComplete="off" /> Line
                                    </label>
                                    <label onClick={this.toggleBar} className={`btn btn-primary ${this.classes.class7}`}>
                                        <input type="radio" name="options" id="option2" autoComplete="off" /> Bar
                                    </label>
                                </div>
                            </div>
                            <div>
                                {
                                    (this.state.delayed) ?
                                    this.showLoader() :
                                    daily
                                }
                            </div>
                        </div>
                        <div className="col-lg-5 col-md-12" style={{marginLeft:"4%"}}>
                            <table style={{borderCollapse: "seperated"}}>
                                <thead>
                                    <tr>
                                        <th onClick={() => this.sortData("state")} style={{cursor: "default", paddingBottom: "10px", paddingTop: "10px"}}>
                                            State/UT
                                            {(this.state.sortConfig.key==="state") ? v : ""}
                                        </th>
                                        <th onClick={() => this.sortData("confirmed")} style={{cursor: "default", paddingBottom: "10px", paddingTop: "10px"}}>
                                            Confirmed
                                            {(this.state.sortConfig.key==="confirmed") ? v : ""}
                                        </th>
                                        <th onClick={() => this.sortData("active")} style={{cursor: "default", paddingBottom: "10px", paddingTop: "10px"}}>
                                            Active
                                            {(this.state.sortConfig.key==="active") ? v : ""}
                                        </th>
                                        <th onClick={() => this.sortData("recovered")} style={{cursor: "default", paddingBottom: "10px", paddingTop: "10px"}}>
                                            Recovered
                                            {(this.state.sortConfig.key==="recovered") ? v : ""}
                                        </th>
                                        <th onClick={() => this.sortData("deaths")} style={{cursor: "default", paddingBottom: "10px", paddingTop: "10px"}}>
                                            Deaths
                                            {(this.state.sortConfig.key==="deaths") ? v : ""}
                                        </th>
                                    </tr>
                                </thead>

                                {
                                    (this.state.delayed) ?
                                    this.showLoader() :
                                    this.showStats()
                                }
                            </table>
                        </div>
                    </div>
                </article>
            // )
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