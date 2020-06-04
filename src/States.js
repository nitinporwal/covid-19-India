import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import React, { Component } from 'react';
import { covid } from './api/covid';

class States extends Component {
    constructor(props) {
		super(props);
        this.v = [];
        this.state = {
            daily: [],
            active: [],
            confirmed: [],
            recovered: [],
            death: []
        }
    }
    componentDidMount = () => {
        console.log(this.props)
        covid.get('/states_daily.json').then(res => {
            return this.setState({daily: res.data.states_daily})
        }).then(() => {
            this.fetchConfirmed();
        })
    }
    fetchConfirmed = () => {
        let c=this.props.location.state.region.ca.statecode.toString().toLowerCase();
        let arr=[], arrr=[], arrrr=[], arrrrr=[];
        let x=0, y=0, z=0, a=0;
        this.state.daily.map(d => {
            if(d.status==='Confirmed') {
                x=parseInt(parseInt(x)+parseInt(d[`${c}`]));
                arr.push({date: d.date, cases: x});
            }
            else if(d.status==='Deceased') {
                z=parseInt(parseInt(z)+parseInt(d[`${c}`]));
                arrrr.push({date: d.date, cases: z});
                y=x-z-a;
                arrr.push({date: d.date, cases: y});
            }
            else if(d.status==='Recovered') {
                a=parseInt(parseInt(a)+parseInt(d[`${c}`]));
                arrrrr.push({date: d.date, cases: a});
            }
        })
        this.setState({confirmed: arr, active: arrr, death: arrrr, recovered: arrrrr});
    }
    render(props) {
        if(this.props.location.state) {
        return (
                <div className="ui container">
                    <h2>
                        {this.props.location.state.region.ca.state}
                    </h2>
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
                            <Line type='monotone' dataKey="cases" stroke='#949ea8' fill='#949ea8' />
                            </LineChart>
                        </div>
                    </div>
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