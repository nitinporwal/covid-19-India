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
            toolpick=(
                <div>
                    <div>
                        confirmed: {stats.confirmed}
                    </div>
                    <div>
                        active: {stats.active}
                    </div>
                    <div>
                        deaths: {stats.deaths}
                    </div>
                    <div>
                        recovered: {stats.recovered}
                    </div>
                </div>
            )
        }
        return (
            <div>
                {toolpick}
            </div>
        )
    }
}

export default Data;