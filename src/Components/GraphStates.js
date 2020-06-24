import React, { Component } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, BarChart } from 'recharts';
import '../App.css';

class GraphStates extends Component {
    render(props) {
        let card=(
            <div>
                <div className="card graph_state1" style={{boxShadow: `${this.props.shadow}`}}>
                    <div className="card-body">
                        <div className="ui header">
                            {this.props.heading}
                            <p className="card-text"><small className="text-muted">Last updated {this.props.lastUpdate}</small></p>
                        </div>
                    </div>
                    <BarChart width={500} height={200} data={this.props.data} syncId="anyId"
                        margin={{top: 0, right: 30, left: 0, bottom: 0}}>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="date"/>
                    <YAxis/>
                    <Tooltip/>
                    <Legend />
                    <Bar type='monotone' dataKey="cases" stroke={this.props.color} fill={this.props.color} />
                    </BarChart>
                </div>
                <div className="card graph_state2" style={{boxShadow: `${this.props.shadow}`}}>
                    <div className="card-body">
                        <div className="ui header">
                            {this.props.heading}
                            <p className="card-text"><small className="text-muted">Last updated {this.props.lastUpdate}</small></p>
                        </div>
                    </div>
                    <BarChart width={300} height={150} data={this.props.data} syncId="anyId"
                        margin={{top: 0, right: 30, left: 0, bottom: 0}}>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="date"/>
                    <YAxis/>
                    <Tooltip/>
                    <Legend />
                    <Bar type='monotone' dataKey="cases" stroke={this.props.color} fill={this.props.color} />
                    </BarChart>
                </div>
            </div>
        )
        if(this.props.type==="line") {
            card=(
                <div>
                    <div className="card graph_state1" style={{boxShadow: `${this.props.shadow}`}}>
                        <div className="card-body">
                            <div className="ui header">
                                {this.props.heading}
                                <p className="card-text"><small className="text-muted">Last updated {this.props.lastUpdate}</small></p>
                            </div>
                        </div>
                        <LineChart width={500} height={200} data={this.props.data} syncId="anyId"
                            margin={{top: 0, right: 30, left: 0, bottom: 0}}>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="date"/>
                        <YAxis/>
                        <Tooltip/>
                        <Legend />
                        <Line type='monotone' dataKey="cases" stroke={this.props.color} fill={this.props.color} />
                        </LineChart>
                    </div>
                    <div className="card graph_state2" style={{boxShadow: `${this.props.shadow}`}}>
                        <div className="card-body">
                            <div className="ui header">
                                {this.props.heading}
                                <p className="card-text"><small className="text-muted">Last updated {this.props.lastUpdate}</small></p>
                            </div>
                        </div>
                        <LineChart width={300} height={150} data={this.props.data} syncId="anyId"
                            margin={{top: 0, right: 30, left: 0, bottom: 0}}>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="date"/>
                        <YAxis/>
                        <Tooltip/>
                        <Legend />
                        <Line type='monotone' dataKey="cases" stroke={this.props.color} fill={this.props.color} />
                        </LineChart>
                    </div>
                </div>
            )
        }
        return (
            <>
                {card}
            </>
        )
    }
}

export default GraphStates;