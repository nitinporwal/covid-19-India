import React, { Component } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, BarChart } from 'recharts';
import '../App.css';

class GraphDash extends Component {
    render(props) {
        let card=(
            <div>
                <div className="card graph_dash1" style={{boxShadow: `${this.props.shadow}`}}>
                    <div className="card-body">
                        <div className="ui header">
                            {this.props.heading}
                            <p className="card-text"><small className="text-muted">Last updated {this.props.lastUpdate}</small></p>
                        </div>
                    </div>
                    <BarChart width={parseInt(this.props.wid)} height={parseInt(this.props.hei)} data={this.props.data} syncId="anyId"
                        margin={{top: 0, right: 0, left: 0, bottom: 0}}>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="date"/>
                    <YAxis dataKey="" />
                    <Tooltip/>
                    <Legend />
                    <Bar type='monotone' dataKey="cases" stroke={this.props.color} fill={this.props.color} />
                    </BarChart>
                </div>
                <div className="card graph_dash2" style={{boxShadow: `${this.props.shadow}`}}>
                    <div className="card-body">
                        <div className="ui header">
                            {this.props.heading}
                            <p className="card-text"><small className="text-muted">Last updated {this.props.lastUpdate}</small></p>
                        </div>
                    </div>
                    <BarChart width={300} height={150} data={this.props.data} syncId="anyId"
                        margin={{top: 0, right: 0, left: 0, bottom: 0}}>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="date"/>
                    <YAxis dataKey="" />
                    <Tooltip/>
                    <Legend />
                    <Bar type='monotone' dataKey="cases" stroke={this.props.color} fill={this.props.color} />
                    </BarChart>
                </div>
                <div className="card graph_dash3" style={{boxShadow: `${this.props.shadow}`}}>
                    <div className="card-body">
                        <div className="ui header">
                            {this.props.heading}
                            <p className="card-text"><small className="text-muted">Last updated {this.props.lastUpdate}</small></p>
                        </div>
                    </div>
                    <BarChart width={540} height={275} data={this.props.data} syncId="anyId"
                        margin={{top: 0, right: 0, left: 0, bottom: 0}}>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="date"/>
                    <YAxis dataKey="" />
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
                    <div className="card graph_dash1" style={{boxShadow: `${this.props.shadow}`}}>
                        <div className="card-body">
                            <div className="ui header">
                                {this.props.heading}
                                <p className="card-text"><small className="text-muted">Last updated {this.props.lastUpdate}</small></p>
                            </div>
                        </div>
                        <LineChart width={parseInt(this.props.wid)} height={parseInt(this.props.hei)} data={this.props.data} syncId="anyId"
                            margin={{top: 0, right: 0, left: 0, bottom: 0}}>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="date"/>
                        <YAxis dataKey="" />
                        <Tooltip/>
                        <Legend />
                        <Line type='monotone' dataKey="cases" stroke={this.props.color} fill={this.props.color} />
                        </LineChart>
                    </div>
                    <div className="card graph_dash2" style={{boxShadow: `${this.props.shadow}`}}>
                        <div className="card-body">
                            <div className="ui header">
                                {this.props.heading}
                                <p className="card-text"><small className="text-muted">Last updated {this.props.lastUpdate}</small></p>
                            </div>
                        </div>
                        <LineChart width={300} height={150} data={this.props.data} syncId="anyId"
                            margin={{top: 0, right: 0, left: 0, bottom: 0}}>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="date"/>
                        <YAxis dataKey="" />
                        <Tooltip/>
                        <Legend />
                        <Line type='monotone' dataKey="cases" stroke={this.props.color} fill={this.props.color} />
                        </LineChart>
                    </div>
                    <div className="card graph_dash3" style={{boxShadow: `${this.props.shadow}`}}>
                        <div className="card-body">
                            <div className="ui header">
                                {this.props.heading}
                                <p className="card-text"><small className="text-muted">Last updated {this.props.lastUpdate}</small></p>
                            </div>
                        </div>
                        <LineChart width={540} height={275} data={this.props.data} syncId="anyId"
                            margin={{top: 0, right: 0, left: 0, bottom: 0}}>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="date"/>
                        <YAxis dataKey="" />
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

export default GraphDash;