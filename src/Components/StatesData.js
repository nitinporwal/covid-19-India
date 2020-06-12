import React, { Component } from 'react';
import {covid} from '../api/covid';
import '../App.css';

class StatesData extends Component {
    state= {
        data: []
    }
    componentDidMount = () => {
        covid.get('/data.json').then(res => {
            let cas=res.data.statewise;
            let c=cas.map(ca => {
                return {...ca,
                    deltaactive: (ca.deltaconfirmed-ca.deltadeaths-ca.deltarecovered).toString()
                }
            })
            this.setState({
                data: c
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
                    <div className="row">
                        <div className="card text-white bg-red col-md-3 state_confirmed_card">
                            <div className="card-body">
                                <h5 className="card-title">Confirmed: </h5>
                                <p className="card-text">{stats.confirmed} <sup>{(parseInt(stats.deltaconfirmed)>=0) ? `+${stats.deltaconfirmed}` : stats.deltaconfirmed}</sup></p>
                            </div>
                        </div>
                        <div className="card text-white bg-red col-md-3 state_active_card">
                            <div className="card-body">
                                <h5 className="card-title">Active: </h5>
                                <p className="card-text">{stats.active} <sup>{(parseInt(stats.deltaactive)>=0) ? `+${stats.deltaactive}` : stats.deltaactive}</sup></p>
                            </div>
                        </div>
                        <div className="card text-white bg-red col-md-3 state_recovered_card">
                            <div className="card-body">
                                <h5 className="card-title">Recovered: </h5>
                                <p className="card-text">{stats.recovered} <sup>{(parseInt(stats.deltarecovered)>=0) ? `+${stats.deltarecovered}` : stats.deltarecovered}</sup></p>
                            </div>
                        </div>
                        <div className="card text-white bg-red col-md-3 state_deaths_card">
                            <div className="card-body">
                                <h5 className="card-title">Deaths: </h5>
                                <p className="card-text">{stats.deaths} <sup>{(parseInt(stats.deltadeaths)>=0) ? `+${stats.deltadeaths}` : stats.deltadeaths}</sup></p>
                            </div>
                        </div>
                    </div>
                )
            }
        }
        return (
            <div className="state_card_container">
                {toolpick}
            </div>
        )
    }
}

export default StatesData;