import React, { Component } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, BarChart } from 'recharts';

class Graph extends Component {
    render(props) {
        let card=(
            <div className="card" style={{margin: "1% 2% 8% 15%", padding: "1% 3% 1% 1%", width: "100%", borderRadius: "2%", boxShadow: `${this.props.shadow}`}}>
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
        )
        if(this.props.type==="line") {
            card=(
                <div className="card" style={{margin: "1% 2% 8% 15%", padding: "1% 3% 1% 1%", width: "100%", borderRadius: "2%", boxShadow: `${this.props.shadow}`}}>
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
            )
        }
        return (
            <>
                {card}
            </>
        )
    }
}

export default Graph;