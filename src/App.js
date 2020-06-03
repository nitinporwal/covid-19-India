import React from "react";
import './App.css';
import HoverMap from "./HoverMap";
 
class App extends React.Component {
    render() {
        return (
            <div className="ui container">
                <HoverMap />
            </div>
        )
    }
}

export default App;