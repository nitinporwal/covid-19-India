import React, { Component } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, BarChart } from 'recharts';
import '../App.css';

class GraphDash extends Component {
    render(props) {
        let card=(
            <div className="card graph_dash" style={{boxShadow: `${this.props.shadow}`}}>
                <div className="card-body">
                    <div className="ui header">
                        {this.props.heading}
                        <p className="card-text"><small className="text-muted">Last updated {this.props.lastUpdate}</small></p>
                    </div>
                </div>
                <BarChart width={500} height={200} data={this.props.data} syncId="anyId"
                    margin={{top: 0, right: 0, left: 0, bottom: 0}}>
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="date"/>
                <YAxis dataKey="" />
                <Tooltip/>
                <Legend />
                <Bar type='monotone' dataKey="cases" stroke={this.props.color} fill={this.props.color} />
                </BarChart>
            </div>
        )
        if(this.props.type==="line") {
            card=(
                <div className="card graph_dash" style={{boxShadow: `${this.props.shadow}`}}>
                    <div className="card-body">
                        <div className="ui header">
                            {this.props.heading}
                            <p className="card-text"><small className="text-muted">Last updated {this.props.lastUpdate}</small></p>
                        </div>
                    </div>
                    <LineChart width={500} height={200} data={this.props.data} syncId="anyId"
                        margin={{top: 0, right: 0, left: 0, bottom: 0}}>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="date"/>
                    <YAxis dataKey="" />
                    <Tooltip/>
                    <Legend />
                    <Line type='monotone' dataKey="cases" stroke={this.props.color} fill={this.props.color} />
                    </LineChart>
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