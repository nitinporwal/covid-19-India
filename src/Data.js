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
            console.log(res.data.statewise);
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
                        <div>
                            Confirmed: {stats.confirmed}
                        </div>
                        <div>
                            Active: {stats.active}
                        </div>
                        <div>
                            Deaths: {stats.deaths}
                        </div>
                        <div>
                            Recovered: {stats.recovered}
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