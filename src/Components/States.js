import React, { Component } from 'react';
import { covid } from '../api/covid';
import moment from 'moment';
import StatesData from './StatesData';
import GraphStates from './GraphStates';
import '../App.css';

class States extends Component {
    constructor(props) {
		super(props);
        this.v = [];
        this.state = {
            isDaily: false,
            daily: [],
            active: [],
            confirmed: [],
            recovered: [],
            death: [],
            activeDaily: [],
            confirmedDaily: [],
            recoveredDaily: [],
            deathDaily: [],
            lastUpdatedTime: [],
            type: "line"
        }
        this.classes = {
            class1: "active focus",
            class2: "",
            class3: "active focus",
            class4: "",
            class5: "",
            class6: "active focus",
            class7: ""
        }
    }
    componentDidMount = () => {
        covid.get('/states_daily.json').then(res => {
            console.log(res);
            return this.setState({daily: res.data.states_daily})
        }).then(() => {
            this.fetchMonth();
        })
        covid.get('/data.json').then((res) => {
            let ar=[];
            ar=res.data.statewise.map((st) => {
                return {
                    state: st.state, 
                    lastUpdated: st.lastupdatedtime
                }
            })
            console.log(ar);
            this.setState({lastUpdatedTime: ar});
            return ar;
        })
    }
    getDateDiff = (name) => {
        let x=this.state.lastUpdatedTime.filter((c) => {
            return c.state===name
        })
        console.log(x);
        let date1;
        let a="";
        if(x[0]) {
            date1 = x[0].lastUpdated;
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
    fetchOverall = () => {
        let c=this.props.match.params.code.toString().toLowerCase();
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
                actDaily.push({date: d.date, cases: parseInt(confDaily[confDaily.length-1].cases)-parseInt(d[`${c}`])-parseInt(recDaily[recDaily.length-1].cases)});
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
        let c=this.props.match.params.code.toString().toLowerCase();
        let res=new Date();
        let res2=new Date();
        res2.setDate(res.getDate()-31);
        let conf=[], act=[], dec=[], rec=[];
        let confDaily=[], actDaily=[], decDaily=[], recDaily=[];
        let x=0, y=0, z=0, a=0;
        this.state.daily.filter(d => {
            // console.log(d);
            if(d.status==='Confirmed') {
                x=parseInt(parseInt(x)+parseInt(d[`${c}`]));
                if(new Date(d.date)>=res2) {
                    conf.push({date: d.date, cases: x});
                    confDaily.push({date: d.date, cases: parseInt(d[`${c}`])});
                }
            }
            else if(d.status==='Deceased') {
                z=parseInt(parseInt(z)+parseInt(d[`${c}`]));
                y=x-z-a;
                if(new Date(d.date)>=res2) {
                    dec.push({date: d.date, cases: z});
                    decDaily.push({date: d.date, cases: parseInt(d[`${c}`])});
                    act.push({date: d.date, cases: y});
                    actDaily.push({date: d.date, cases: parseInt(confDaily[confDaily.length-1].cases)-parseInt(d[`${c}`])-parseInt(recDaily[recDaily.length-1].cases)});
                }
            }
            else if(d.status==='Recovered') {
                a=parseInt(parseInt(a)+parseInt(d[`${c}`]));
                if(new Date(d.date)>=res2) {
                    rec.push({date: d.date, cases: a});
                    recDaily.push({date: d.date, cases: parseInt(d[`${c}`])});
                }
            }
            return null;
        })
        
        let dail=this.state.isDaily;
        this.setState({isDaily: !dail});
        this.setState({isDaily: dail});
        this.setState({confirmed: conf, active: act, death: dec, recovered: rec, confirmedDaily: confDaily, activeDaily: actDaily, deathDaily: decDaily, recoveredDaily: recDaily});
        if(this.state.type==="line") {
            this.setState({type: "bar"});
            this.setState({type: "line"});
        }
    }
    fetchHalf = () => {
        let c=this.props.match.params.code.toString().toLowerCase();
        let res=new Date();
        let res2=new Date();
        res2.setDate(res.getDate()-15);
        let conf=[], act=[], dec=[], rec=[];
        let confDaily=[], actDaily=[], decDaily=[], recDaily=[];
        let x=0, y=0, z=0, a=0;
        this.state.daily.filter(d => {
            if(d.status==='Confirmed') {
                x=parseInt(parseInt(x)+parseInt(d[`${c}`]));
                if(new Date(d.date)>=res2) {
                    conf.push({date: d.date, cases: x});
                    confDaily.push({date: d.date, cases: parseInt(d[`${c}`])});
                }
            }
            else if(d.status==='Deceased') {
                z=parseInt(parseInt(z)+parseInt(d[`${c}`]));
                y=x-z-a;
                if(new Date(d.date)>=res2) {
                    dec.push({date: d.date, cases: z});
                    decDaily.push({date: d.date, cases: parseInt(d[`${c}`])});
                    act.push({date: d.date, cases: y});
                    actDaily.push({date: d.date, cases: parseInt(confDaily[confDaily.length-1].cases)-parseInt(d[`${c}`])-parseInt(recDaily[recDaily.length-1].cases)});
                }
            }
            else if(d.status==='Recovered') {
                a=parseInt(parseInt(a)+parseInt(d[`${c}`]));
                if(new Date(d.date)>=res2) {
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
    render(props) {
        let daily = (
            <div className='ui grid'>
                <div className="col-md-6">
                    <GraphStates type={this.state.type} data={this.state.confirmedDaily} heading="Confirmed cases:" color="rgb(139, 0, 139)" lastUpdate={this.getDateDiff(this.props.match.params.name)} shadow="4px 0 #7900fa"/>
                </div>
                <div className="col-md-6">
                    <GraphStates type={this.state.type} data={this.state.activeDaily} heading="Active cases:" color="rgb(255, 0, 0)" lastUpdate={this.getDateDiff(this.props.match.params.name)} shadow="4px 0 #fc030f"/>
                </div>
                <div className="col-md-6">
                    <GraphStates type={this.state.type} data={this.state.recoveredDaily} heading="Recovered" color="rgb(0, 102, 0)" lastUpdate={this.getDateDiff(this.props.match.params.name)} shadow="4px 0 #03fc45"/>
                </div>
                <div className="col-md-6">
                    <GraphStates type={this.state.type} data={this.state.deathDaily} heading="Deaths" color="rgb(64, 74, 66)" lastUpdate={this.getDateDiff(this.props.match.params.name)} shadow="4px 0 #949ea8"/>
                </div>
            </div>
        )
        console.log(this.props)
        if(this.props.match.params) {
            if(!this.state.isDaily) {
                daily= (
                    <div className='ui grid'>
                        <div className="col-md-6">
                            <GraphStates type={this.state.type} data={this.state.confirmed} heading="Confirmed cases:" color="rgb(139, 0, 139)" lastUpdate={this.getDateDiff(this.props.match.params.name)} shadow="4px 0 #7900fa"/>
                        </div>
                        <div className="col-md-6">
                            <GraphStates type={this.state.type} data={this.state.active} heading="Active cases:" color="rgb(255, 0, 0)" lastUpdate={this.getDateDiff(this.props.match.params.name)} shadow="4px 0 #fc030f"/>
                        </div>
                        <div className="col-md-6">
                            <GraphStates type={this.state.type} data={this.state.recovered} heading="Recovered:" color="rgb(0, 102, 0)" lastUpdate={this.getDateDiff(this.props.match.params.name)} shadow="4px 0 #03fc45"/>
                        </div>
                        <div className="col-md-6">
                            <GraphStates type={this.state.type} data={this.state.death} heading="Deaths:" color="rgb(64, 74, 66)" lastUpdate={this.getDateDiff(this.props.match.params.name)} shadow="4px 0 #949ea8"/>
                        </div>
                    </div>
                )
            }
        }
        console.log(this.state);
        return (
            <div className="container">
                <h2 className="resp_center">
                    {this.props.match.params.name}
                </h2>
                <StatesData code={this.props.match.params.name} />
                <div className="btn-group btn-group-toggle states_radio_daily" data-toggle="buttons">
                    <label onClick={this.toggleChartsTotal} className={`btn btn-primary ${this.classes.class1}`}>
                        <input type="radio" name="options" id="option1" autoComplete="off" /> Total
                    </label>
                    <label onClick={this.toggleChartsDaily} className={`btn btn-primary ${this.classes.class2}`}>
                        <input type="radio" name="options" id="option2" autoComplete="off" /> Daily
                    </label>
                </div>
                <div className="btn-group btn-group-toggle states_radio" data-toggle="buttons">
                    <label onClick={this.handleBegining} className={`btn btn-primary ${this.classes.class4}`}>
                        <input type="radio" name="options" id="option1" autoComplete="off" /> Begining
                    </label>
                    <label onClick={this.handleMonth} className={`btn btn-primary ${this.classes.class3}`}>
                        <input type="radio" name="options" id="option2" autoComplete="off" /> One Month
                    </label>
                    <label onClick={this.handleTwoWeeks} className={`btn btn-primary ${this.classes.class5}`}>
                        <input type="radio" name="options" id="option2" autoComplete="off" /> Two Weeks
                    </label>
                </div>
                <div className="btn-group btn-group-toggle states_radio_line" data-toggle="buttons">
                    <label onClick={this.toggleLine} className={`btn btn-primary ${this.classes.class6}`}>
                        <input type="radio" name="options" id="option1" autoComplete="off" /> Line
                    </label>
                    <label onClick={this.toggleBar} className={`btn btn-primary ${this.classes.class7}`}>
                        <input type="radio" name="options" id="option2" autoComplete="off" /> Bar
                    </label>
                </div>
                {daily}
            </div>
        );
    }
}
export default States;