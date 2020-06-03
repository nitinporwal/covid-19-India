import React, { Component } from 'react';

class States extends Component {
    render(props) {
        console.log(this.props.location.state)
        return (
            <div>
                {this.props.location.state.region.ca.state}
            </div>
        )
    }
}

export default States;