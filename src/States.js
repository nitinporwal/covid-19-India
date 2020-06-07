import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, BarChart } from 'recharts';
import React, { Component } from 'react';
import { covid } from './api/covid';

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
            deathDaily: []
        }
        this.classes = {
            class1: "active focus",
            class2: "",
            class3: "active focus",
            class4: "",
            class5: ""
        }
    }
    componentDidMount = () => {
        covid.get('/states_daily.json').then(res => {
            console.log(res);
            return this.setState({daily: res.data.states_daily})
        }).then(() => {
            this.fetchMonth();
        })
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
                    actDaily.push({date: d.date, cases: parseInt(d[`${c}`])});
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
    fetchHalf = () => {
        let c=this.props.match.params.code.toString().toLowerCase();
        let res=new Date();
        let res2=new Date();
        res2.setDate(res.getDate()-15);
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
                    actDaily.push({date: d.date, cases: parseInt(d[`${c}`])});
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
                <div className="nine wide column">
                    <div className="ui header centered">
                        Confirmed cases:
                    </div>
                    <BarChart width={600} height={250} data={this.state.confirmedDaily} syncId="anyId"
                        margin={{top: 0, right: 30, left: 0, bottom: 0}}>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="date"/>
                    <YAxis dataKey="" />
                    <Tooltip/>
                    <Legend />
                    <Bar type='monotone' dataKey="cases" stroke='#7900fa' fill='#7900fa' />
                    </BarChart>
                </div>
                <div className="seven wide column">
                    <div className="ui header centered">
                        Active cases:
                    </div>
                    <BarChart width={600} height={250} data={this.state.activeDaily} syncId="anyId"
                        margin={{top: 0, right: 0, left: 30, bottom: 0}}>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="date"/>
                    <YAxis/>
                    <Tooltip/>
                    <Legend />
                    <Bar type='monotone' dataKey="cases" stroke='#fc030f' fill='#fc030f' />
                    </BarChart>
                </div>
                <div className="nine wide column">
                    <div className="ui header centered">
                        Recovered:
                    </div>
                    <BarChart width={600} height={250} data={this.state.recoveredDaily} syncId="anyId"
                        margin={{top: 0, right: 30, left: 0, bottom: 0}}>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="date"/>
                    <YAxis/>
                    <Tooltip/>
                    <Legend />
                    <Bar type='monotone' dataKey="cases" stroke='#03fc45' fill='#03fc45' />
                    </BarChart>
                </div>
                <div className="seven wide column">
                    <div className="ui header centered">
                        Deaths:
                    </div>
                    <BarChart width={600} height={250} data={this.state.deathDaily} syncId="anyId"
                        margin={{top: 0, right: 0, left: 30, bottom: 0}}>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="date"/>
                    <YAxis/>
                    <Tooltip/>
                    <Legend />
                    {/* <Brush /> */}
                    <Bar type='monotone' dataKey="cases" stroke='#949ea8' fill='#949ea8' />
                    </BarChart>
                </div>
            </div>
        )
        console.log(this.props)
        if(this.props.match.params) {
            if(!this.state.isDaily) {
                daily= (
                    <div className='ui grid'>
                        <div className="nine wide column">
                            <div className="ui header centered">
                                Confirmed cases:
                            </div>
                            <LineChart width={600} height={250} data={this.state.confirmed} syncId="anyId"
                                margin={{top: 0, right: 30, left: 0, bottom: 0}}>
                            <CartesianGrid strokeDasharray="3 3"/>
                            <XAxis dataKey="date"/>
                            <YAxis dataKey="" />
                            <Tooltip/>
                            <Legend />
                            <Line type='monotone' dataKey="cases" stroke='#7900fa' fill='#7900fa' />
                            </LineChart>
                        </div>
                        <div className="seven wide column">
                            <div className="ui header centered">
                                Active cases:
                            </div>
                            <LineChart width={600} height={250} data={this.state.active} syncId="anyId"
                                margin={{top: 0, right: 0, left: 30, bottom: 0}}>
                            <CartesianGrid strokeDasharray="3 3"/>
                            <XAxis dataKey="date"/>
                            <YAxis/>
                            <Tooltip/>
                            <Legend />
                            <Line type='monotone' dataKey="cases" stroke='#fc030f' fill='#fc030f' />
                            </LineChart>
                        </div>
                        <div className="nine wide column">
                            <div className="ui header centered">
                                Recovered:
                            </div>
                            <LineChart width={600} height={250} data={this.state.recovered} syncId="anyId"
                                margin={{top: 0, right: 30, left: 0, bottom: 0}}>
                            <CartesianGrid strokeDasharray="3 3"/>
                            <XAxis dataKey="date"/>
                            <YAxis/>
                            <Tooltip/>
                            <Legend />
                            <Line type='monotone' dataKey="cases" stroke='#03fc45' fill='#03fc45' />
                            </LineChart>
                        </div>
                        <div className="seven wide column">
                            <div className="ui header centered">
                                Deaths:
                            </div>
                            <LineChart width={600} height={250} data={this.state.death} syncId="anyId"
                                margin={{top: 0, right: 0, left: 30, bottom: 0}}>
                            <CartesianGrid strokeDasharray="3 3"/>
                            <XAxis dataKey="date"/>
                            <YAxis/>
                            <Tooltip/>
                            <Legend />
                            {/* <Brush /> */}
                            <Line type='monotone' dataKey="cases" stroke='#949ea8' fill='#949ea8' />
                            </LineChart>
                        </div>
                    </div>
                )
            }
        return (
                <div className="ui container">
                    <h2>
                        {this.props.match.params.name}
                    </h2>
                    <div className="btn-group btn-group-toggle" style={{marginLeft: "20%", marginBottom: "2%", marginTop: "1%"}} data-toggle="buttons">
                        <label onClick={this.toggleChartsTotal} className={`btn btn-primary ${this.classes.class1}`}>
                            <input type="radio" name="options" id="option1" autoComplete="off" /> Total
                        </label>
                        <label onClick={this.toggleChartsDaily} className={`btn btn-primary ${this.classes.class2}`}>
                            <input type="radio" name="options" id="option2" autoComplete="off" /> Daily
                        </label>
                    </div>
                    <div className="btn-group btn-group-toggle" style={{marginLeft: "40%", marginBottom: "2%", marginTop: "1%"}} data-toggle="buttons">
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
                    {daily}
                </div>
            );
        }
    }
}
export default States;