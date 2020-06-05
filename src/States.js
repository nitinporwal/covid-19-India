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
    }
    componentDidMount = () => {
        covid.get('/states_daily.json').then(res => {
            return this.setState({daily: res.data.states_daily})
        }).then(() => {
            this.fetchConfirmed();
        })
    }
    fetchConfirmed = () => {
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
    }
    toggleChartsDaily = () => {
        this.setState({isDaily: false});
    }
    toggleChatsTotal = () => {
        this.setState({isDaily: true});
    }
    render(props) {
        let daily = (
            <div className='ui grid'>
                <div className="eight wide column">
                    <div className="ui header centered">
                        Confirmed cases:
                    </div>
                    <BarChart width={550} height={250} data={this.state.confirmedDaily} syncId="anyId"
                        margin={{top: 0, right: 30, left: 0, bottom: 0}}>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="date"/>
                    <YAxis dataKey="" />
                    <Tooltip/>
                    <Legend />
                    <Bar type='monotone' dataKey="cases" stroke='#7900fa' fill='#7900fa' />
                    {/* {console.log(`${this.props.location.state.region.ca.statecode.toString().toLowerCase()}`)} */}
                    </BarChart>
                </div>
                <div className="eight wide column">
                    <div className="ui header centered">
                        Active cases:
                    </div>
                    <BarChart width={550} height={250} data={this.state.activeDaily} syncId="anyId"
                        margin={{top: 0, right: 0, left: 30, bottom: 0}}>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="date"/>
                    <YAxis/>
                    <Tooltip/>
                    <Legend />
                    <Bar type='monotone' dataKey="cases" stroke='#fc030f' fill='#fc030f' />
                    </BarChart>
                </div>
                <div className="eight wide column">
                    <div className="ui header centered">
                        Recovered:
                    </div>
                    <BarChart width={550} height={250} data={this.state.recoveredDaily} syncId="anyId"
                        margin={{top: 0, right: 30, left: 0, bottom: 0}}>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="date"/>
                    <YAxis/>
                    <Tooltip/>
                    <Legend />
                    <Bar type='monotone' dataKey="cases" stroke='#9dfc03' fill='#9dfc03' />
                    </BarChart>
                </div>
                <div className="eight wide column">
                    <div className="ui header centered">
                        Deaths:
                    </div>
                    <BarChart width={550} height={250} data={this.state.deathDaily} syncId="anyId"
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
        console.log(this.state)
        if(this.props.location.state) {
            if(!this.state.isDaily) {
                daily= (
                    <div className='ui grid'>
                        <div className="eight wide column">
                            <div className="ui header centered">
                                Confirmed cases:
                            </div>
                            <LineChart width={550} height={250} data={this.state.confirmed} syncId="anyId"
                                margin={{top: 0, right: 30, left: 0, bottom: 0}}>
                            <CartesianGrid strokeDasharray="3 3"/>
                            <XAxis dataKey="date"/>
                            <YAxis dataKey="" />
                            <Tooltip/>
                            <Legend />
                            <Line type='monotone' dataKey="cases" stroke='#7900fa' fill='#7900fa' />
                            {/* {console.log(`${this.props.location.state.region.ca.statecode.toString().toLowerCase()}`)} */}
                            </LineChart>
                        </div>
                        <div className="eight wide column">
                            <div className="ui header centered">
                                Active cases:
                            </div>
                            <LineChart width={550} height={250} data={this.state.active} syncId="anyId"
                                margin={{top: 0, right: 0, left: 30, bottom: 0}}>
                            <CartesianGrid strokeDasharray="3 3"/>
                            <XAxis dataKey="date"/>
                            <YAxis/>
                            <Tooltip/>
                            <Legend />
                            <Line type='monotone' dataKey="cases" stroke='#fc030f' fill='#fc030f' />
                            </LineChart>
                        </div>
                        <div className="eight wide column">
                            <div className="ui header centered">
                                Recovered:
                            </div>
                            <LineChart width={550} height={250} data={this.state.recovered} syncId="anyId"
                                margin={{top: 0, right: 30, left: 0, bottom: 0}}>
                            <CartesianGrid strokeDasharray="3 3"/>
                            <XAxis dataKey="date"/>
                            <YAxis/>
                            <Tooltip/>
                            <Legend />
                            <Line type='monotone' dataKey="cases" stroke='#9dfc03' fill='#9dfc03' />
                            </LineChart>
                        </div>
                        <div className="eight wide column">
                            <div className="ui header centered">
                                Deaths:
                            </div>
                            <LineChart width={550} height={250} data={this.state.death} syncId="anyId"
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
                        {this.props.location.state.region.ca.state}
                    </h2>
                    <div className="btn-group btn-group-toggle" data-toggle="buttons">
                        <label onClick={this.toggleChartsDaily} className="btn btn-primary">
                            <input type="radio" name="options" id="option1" autocomplete="off" checked /> Total
                        </label>
                        <label onClick={this.toggleChatsTotal} className="btn btn-primary">
                            <input type="radio" name="options" id="option2" autocomplete="off" /> Daily
                        </label>
                    </div>
                    {daily}
                    
                </div>
            );
        }
        else {
            return (
                <div>
                    hi
                </div>
            )
        }
    }
}
export default States;