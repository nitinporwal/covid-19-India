import React from "react";
import './App.css';
import HoverMap from "./HoverMap";
import Data from "./Data";
 
class App extends React.Component {
    render() {
        return (
            <div className="container">
                <HoverMap />
                <Data />
            </div>
        )
    }
}

export default App;