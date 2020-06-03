import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
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
        return (
            <div className="ui container">
                <h2>
                    {this.props.location.state.region.ca.state}
                </h2>
                <div className='ui grid'>
                    <div className="eight wide column">
                        <LineChart width={600} height={200} data={this.state.confirmed} syncId="anyId"
                            margin={{top: 30, right: 30, left: 0, bottom: 0}}>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="date"/>
                        <YAxis dataKey="" />
                        <Tooltip/>
                        {/* {console.log(`${this.props.location.state.region.ca.statecode.toString().toLowerCase()}`)} */}
                        <Line type='monotone' dataKey="cases" stroke='#fc030f' fill='#fc030f' />
                        </LineChart>
                    </div>
                    <div className="eight wide column">
                        <LineChart width={600} height={200} data={this.state.active} syncId="anyId"
                            margin={{top: 30, right: 30, left: 0, bottom: 0}}>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="date"/>
                        <YAxis/>
                        <Tooltip/>
                        <Line type='monotone' dataKey="cases" stroke='#7900fa' fill='#7900fa' />
                        </LineChart>
                    </div>
                    <div className="eight wide column">
                        <LineChart width={600} height={200} data={this.state.recovered} syncId="anyId"
                            margin={{top: 30, right: 30, left: 0, bottom: 0}}>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="date"/>
                        <YAxis/>
                        <Tooltip/>
                        <Line type='monotone' dataKey="cases" stroke='#9dfc03' fill='#9dfc03' />
                        </LineChart>
                    </div>
                    <div className="eight wide column">
                        <LineChart width={600} height={200} data={this.state.death} syncId="anyId"
                            margin={{top: 30, right: 30, left: 0, bottom: 0}}>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="date"/>
                        <YAxis/>
                        <Tooltip/>
                        <Line type='monotone' dataKey="cases" stroke='#949ea8' fill='#949ea8' />
                        </LineChart>
                    </div>
                </div>
            </div>
        );
    }
}
export default States;