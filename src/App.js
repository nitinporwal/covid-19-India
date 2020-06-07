import React from "react";
import './App.css';
import { BrowserRouter, Route} from 'react-router-dom';
import HoverMap from "./HoverMap";
import States from "./States";
import Navbar from "./Navbar";
import District from './District';
import Preventions from "./Preventions";
// import SMap from './2019_Lok_Sabha_Election_Schedule.svg'
// import Data from "./Data";
// import { SVGMap } from "react-svg-map";
 
class App extends React.Component {
    render() {
        return (
            <>
            <Navbar />
            <div className="container">
                <BrowserRouter>
                    <Route path="/" exact component={HoverMap} />
                    <Route 
                        path="/state/:code/:name" exact
                        render={(routeProps) => (
                            <States {...routeProps} />
                        )}
                    />
                    <Route
                        path="/distict/:name" exact
                        render={(routeProps) => (
                            <District {...routeProps} />
                        )}
                    />
                    <Route path="/preventions" exact
                        render={(routeProps) => (
                            <Preventions {...routeProps} />
                        )}
                    />
                </BrowserRouter>
            </div>
            </>
        )
    }
}

export default App;