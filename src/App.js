import React from "react";
import { SVGMap } from "react-svg-map";
import world from "@svg-maps/india";
import './App.css';
import HoverMap from "./HoverMap";
 
class App extends React.Component {
    render() {
        return (
            <div className="container">
                <HoverMap />
            </div>
        )
    }
}

export default App;