import React, { Component } from 'react';
import {covid} from './api/covid';

class Data extends Component {
    state= {
        data: []
    }
    componentDidMount = () => {
        covid.get('/data.json').then(res => {
            this.setState({
                data: res.data.statewise
            })
        })
    }
    getStats = (code) => {
        let st=this.state.data.filter(s=> {
            return s.state===code;
        });
        return st[0];
    }
    render({code}=this.props) {
        let toolpick=null;
        if(code) {
            let stats=this.getStats(code);
            if(stats) {
                toolpick=(
                    <div>
                        <div className="card text-white bg-red" style={{margin: "2% 0", padding: "0", backgroundColor: "rgb(245, 210, 253)", }}>
                            <div className="card-body" style={{color: "rgb(139, 0, 139)"}} onClick={()=> this.props.onClick("confirmed")}>
                                <h5 className="card-title">Confirmed: </h5>
                                <p className="card-text">{stats.confirmed}</p>
                            </div>
                        </div>
                        <div className="card text-white bg-red" style={{margin: "2% 0", padding: "0", backgroundColor: "rgb(252, 200, 200)", }}>
                            <div className="card-body" style={{color: "rgb(255, 0, 0)"}} onClick={()=> this.props.onClick("active")}>
                                <h5 className="card-title">Active: </h5>
                                <p className="card-text">{stats.active}</p>
                            </div>
                        </div>
                        <div className="card text-white bg-red" style={{margin: "2% 0", padding: "0", backgroundColor: "rgb(197, 250, 197)", }}>
                            <div className="card-body" style={{color: "rgb(0, 102, 0)"}} onClick={()=> this.props.onClick("recovered")}>
                                <h5 className="card-title">Recovered: </h5>
                                <p className="card-text">{stats.recovered}</p>
                            </div>
                        </div>
                        <div className="card text-white bg-red" style={{margin: "2% 0", padding: "0", backgroundColor: "rgb(221, 221, 221)", }}>
                            <div className="card-body" style={{color: "rgb(64, 74, 66)"}} onClick={()=> this.props.onClick("deaths")}>
                                <h5 className="card-title">Deaths: </h5>
                                <p className="card-text">{stats.deaths}</p>
                            </div>
                        </div>
                    </div>
                )
            }
        }
        return (
            <div>
                {toolpick}
            </div>
        )
    }
}

export default Data;