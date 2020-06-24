import React from "react";
import { SVGMap } from "react-svg-map";
import india from "@svg-maps/india";
import '../App.css';
import Data from "./Data";
import { covid } from "../api/covid";
import { Link} from "react-router-dom";
import Loader from 'react-loader-spinner';
import moment from 'moment'
import GraphDash from "./GraphDash";
 
class Dashboard extends React.Component {
    constructor(props) {
		super(props);
        this.links = {
		};

		this.state = {
			pointedLocation: "Total",
			tooltipStyle: {
				display: 'none'
			},
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
            delayed: true,
            mhover: ""
        };
        
        this.classes = {
            class1: "active focus",
            class2: "",
            class3: "",
            class4: "active focus",
            class5: "",
            class6: "active focus",
            class7: "",
            class8: ""
        }
		this.handleLocationMouseOver = this.handleLocationMouseOver.bind(this);
		this.handleLocationMouseOut = this.handleLocationMouseOut.bind(this);
		this.handleLocationClick = this.handleLocationClick.bind(this);
    }
    componentDidMount = () => {
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
        })
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
        let r=this.state.cases.filter(c=> {
            return c.state===clickedLocation
        })
        this.setState({clickedLocationCode: clickedLocationId});
        const { history } = this.props;
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
            , 1000
        );
        return (
            <div>
                <Loader className="loader" type="ThreeDots" color="#0278f5" height="100" width="100" />
            </div>
        )
    }
	getLocationClassName = (location, index) => {
        let cases, max, wh=this.state.whichClicked;
        this.state.cases.filter(c=> {
            if(c.statecode==='TT') {
                max=c[wh];
            }
            if(c.state===location.name) {
                cases=c[wh];
            }
            return c.state===location.name
        })
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
        this.setState({ pointedLocation, mhover: `${ca.state}`});
        this.classes.class8="wider";
    }
    handleOut = () => {
		this.setState({ pointedLocation: "Total", tooltipStyle: { display: 'none' }, mhover: ""});
        this.classes.class8="";
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
        x.sort(this.dynamicsort(key, direction));
    }
    getWhichClicked= (which) => {
        this.setState({whichClicked: which});
    }
    showStats = () => {
        return (
            <tbody>
                {this.state.cases.map(ca => {
                    return (
                        (this.state.mhover===ca.state) ? (
                        <tr key={ca.statecode}
                            onMouseOver={() => this.handleHover(ca)}
                            onMouseOut={this.handleOut}
                            className="wider"
                        >
                            <td>
                                <Link to={{
                                    pathname: `/state/${ca.statecode}/${ca.state}`,
                                    state: {
                                        region: {ca}
                                    }
                                }} style={{textDecoration: "none"}}>
                                    {ca.state}
                                    <br/>
                                    <small className="text-muted">Last Updated: <br/> {this.getDateDiff(this.state.pointedLocation)}</small>
                                </Link>
                            </td>
                            <td>
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
                                </Link>
                            </td>
                            <td>
                                <Link to={{
                                    pathname: `/state/${ca.statecode}/${ca.state}`,
                                    state: {
                                        region: {ca}
                                    }
                                }} style={{textDecoration: "none"}}>
                                    {ca.active}
                                    {(parseInt(ca.deltaactive)>=0) ? <sup style={{color: "green"}}>{`+${ca.deltaactive}`}</sup> : <sup style={{color: "red"}} >{ca.deltaactive}</sup>}
                                </Link>
                            </td>
                            <td>
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
                                </Link>
                            </td>
                            <td>
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
                                </Link>
                            </td>
                        </tr>) :
                        (
                            <tr key={ca.statecode}
                            onMouseOver={() => this.handleHover(ca)}
                            onMouseOut={this.handleOut}
                        >
                            <td>
                                <Link to={{
                                    pathname: `/state/${ca.statecode}/${ca.state}`,
                                    state: {
                                        region: {ca}
                                    }
                                }} style={{textDecoration: "none"}}>
                                    {ca.state}
                                </Link>
                            </td>
                            <td>
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
                                </Link>
                            </td>
                            <td>
                                <Link to={{
                                    pathname: `/state/${ca.statecode}/${ca.state}`,
                                    state: {
                                        region: {ca}
                                    }
                                }} style={{textDecoration: "none"}}>
                                    {ca.active}
                                    {(parseInt(ca.deltaactive)>=0) ? <sup style={{color: "green"}}>{`+${ca.deltaactive}`}</sup> : <sup style={{color: "red"}} >{ca.deltaactive}</sup>}
                                </Link>
                            </td>
                            <td>
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
                                </Link>
                            </td>
                            <td>
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
                                </Link>
                            </td>
                        </tr>
                        )
                    )
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
        let daily = (
            <div>
                {/* <div className='ui grid'>
                    <div className="col-md-6">
                        <GraphDash wid="500" hei="200"  type={this.state.type} data={this.state.confirmedDaily} heading="Confirmed cases:" color="rgb(139, 0, 139)" lastUpdate={this.getDateDiff("Total")} shadow="4px 0 #7900fa" />
                    </div>
                    <div className="col-md-6">
                        <GraphDash wid="500" hei="200"  type={this.state.type} data={this.state.activeDaily} heading="Active cases:" color="rgb(255, 0, 0)" lastUpdate={this.getDateDiff("Total")} shadow="4px 0 #fc030f" />
                    </div>
                    <div className="col-md-6">
                        <GraphDash wid="500" hei="200"  type={this.state.type} data={this.state.recoveredDaily} heading="Recovered:" color="rgb(0, 102, 0)" lastUpdate={this.getDateDiff("Total")} shadow="4px 0 #03fc45" />
                    </div>
                    <div className="col-md-6">
                        <GraphDash wid="500" hei="200"  type={this.state.type} data={this.state.deathDaily} heading="Deaths:" color="rgb(64, 74, 66)" lastUpdate={this.getDateDiff("Total")} shadow="4px 0 #949ea8" />
                    </div>
                </div> */}
                <div>
                    <GraphDash wid="500" hei="200"  type={this.state.type} data={this.state.confirmedDaily} heading="Confirmed cases:" color="rgb(139, 0, 139)" lastUpdate={this.getDateDiff("Total")} shadow="4px 0 #7900fa" />
                    <GraphDash wid="500" hei="200"  type={this.state.type} data={this.state.activeDaily} heading="Active cases:" color="rgb(255, 0, 0)" lastUpdate={this.getDateDiff("Total")} shadow="4px 0 #fc030f" />
                    <GraphDash wid="500" hei="200"  type={this.state.type} data={this.state.recoveredDaily} heading="Recovered:" color="rgb(0, 102, 0)" lastUpdate={this.getDateDiff("Total")} shadow="4px 0 #03fc45" />
                    <GraphDash wid="500" hei="200"  type={this.state.type} data={this.state.deathDaily} heading="Deaths:" color="rgb(64, 74, 66)" lastUpdate={this.getDateDiff("Total")} shadow="4px 0 #949ea8" />
                </div>
            </div>
        )
        if(!this.state.clickedLocation) {
            console.log(this.state)
            if(!this.state.isDaily) {
                daily = (
                    <div>
                        {/* <div className='ui grid'>
                            <div className="col-md-6">
                                <GraphDash wid="500" hei="200"  type={this.state.type} data={this.state.confirmed} heading="Confirmed cases:" color="rgb(139, 0, 139)" lastUpdate={this.getDateDiff("Total")} shadow="4px 0 #7900fa" />
                            </div>
                            <div className="col-md-6">
                                <GraphDash wid="500" hei="200"  type={this.state.type} data={this.state.active} heading="Active cases:" color="rgb(255, 0, 0)" lastUpdate={this.getDateDiff("Total")} shadow="4px 0 #fc030f" />
                            </div>
                            <div className="col-md-6">
                                <GraphDash wid="500" hei="200"  type={this.state.type} data={this.state.recovered} heading="Recovered:" color="rgb(0, 102, 0)" lastUpdate={this.getDateDiff("Total")} shadow="4px 0 #03fc45" />
                            </div>
                            <div className="col-md-6">
                                <GraphDash wid="500" hei="200"  type={this.state.type} data={this.state.death} heading="Deaths:" color="rgb(64, 74, 66)" lastUpdate={this.getDateDiff("Total")} shadow="4px 0 #949ea8" />
                            </div>
                        </div> */}
                        <div>
                            <GraphDash wid="500" hei="200"  type={this.state.type} data={this.state.confirmed} heading="Confirmed cases:" color="rgb(139, 0, 139)" lastUpdate={this.getDateDiff("Total")} shadow="4px 0 #7900fa" />
                            <GraphDash wid="500" hei="200"  type={this.state.type} data={this.state.active} heading="Active cases:" color="rgb(255, 0, 0)" lastUpdate={this.getDateDiff("Total")} shadow="4px 0 #fc030f" />
                            <GraphDash wid="500" hei="200"  type={this.state.type} data={this.state.recovered} heading="Recovered:" color="rgb(0, 102, 0)" lastUpdate={this.getDateDiff("Total")} shadow="4px 0 #03fc45" />
                            <GraphDash wid="500" hei="200"  type={this.state.type} data={this.state.death} heading="Deaths:" color="rgb(64, 74, 66)" lastUpdate={this.getDateDiff("Total")} shadow="4px 0 #949ea8" />
                        </div>
                    </div>
                )
            }
            if(!this.state.cases[0]) {
                return (
                    <Loader className="loader" type="ThreeDots" color="#0278f5" height="100" width="100" />
                )
            }
            else {
                return (
                    <article>
                        <div className="dash_tag">
                            We will win the war against <span>Cor<img className="imageSpin" src={process.env.PUBLIC_URL + '/covid_logo.png'} alt="corona_logo" />na</span> Virus.
                        </div>
                        <div className="row">
                            <div className="examples__block__info">
                                <div className="card bg-light mb-3 dash_data">
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
                                        <div className="card-body dash_card">
                                            {(this.state.delayed) ?
                                            this.showLoader() :
                                            <Data onClick={(which) => this.getWhichClicked(which)} code={this.state.pointedLocation} />}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className="col-lg-6 col-md-12 jumbotron map_ind">
                                <div className="row">
                                    <h3 className="map_header3">
                                        Map of India
                                    </h3>
                                </div>
                                <div className="row">
                                    <div className="examples__block__map examples__block__map--usa">
                                        <SVGMap 
                                            map={india}
                                            onLocationMouseOver={this.handleLocationMouseOver}
                                            onLocationMouseOut={this.handleLocationMouseOut}
                                            onLocationClick={(event) => this.handleLocationClick(event)}
                                            onLocationFocus={this.handleLocationFocus}
                                            onLocationBlur={this.handleLocationBlur}
                                            locationClassName={(location, index) =>this.getLocationClassName(location, index)}
                                            />
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className="btn-group btn-group-toggle dash_radio_type" data-toggle="buttons">
                                        <label onClick={this.toggleChartsTotal} className={`btn btn-primary ${this.classes.class1}`}>
                                            <input type="radio" name="options" id="option1" autoComplete="off" /> Total
                                        </label>
                                        <label onClick={this.toggleChartsDaily} className={`btn btn-primary ${this.classes.class2}`}>
                                            <input type="radio" name="options" id="option2" autoComplete="off" /> Daily
                                        </label>
                                    </div>
                                    <div className="btn-group btn-group-toggle dash_radio" data-toggle="buttons">
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
                                    <div className="btn-group btn-group-toggle dash_radio_line" data-toggle="buttons">
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
                            <div className="col-lg-5 col-md-12 table_container">
                                <table>
                                    <thead>
                                        <tr>
                                            <th className="table_head" onClick={() => this.sortData("state")}>
                                                State/UT
                                                {(this.state.sortConfig.key==="state") ? v : ""}
                                            </th>
                                            <th className="table_head" onClick={() => this.sortData("confirmed")}>
                                                Confirmed
                                                {(this.state.sortConfig.key==="confirmed") ? v : ""}
                                            </th>
                                            <th className="table_head" onClick={() => this.sortData("active")}>
                                                Active
                                                {(this.state.sortConfig.key==="active") ? v : ""}
                                            </th>
                                            <th className="table_head" onClick={() => this.sortData("recovered")}>
                                                Recovered
                                                {(this.state.sortConfig.key==="recovered") ? v : ""}
                                            </th>
                                            <th className="table_head" onClick={() => this.sortData("deaths")}>
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
                );
            }
        }
	}
}

export default Dashboard;