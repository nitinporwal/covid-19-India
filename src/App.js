import React from "react";
import './App.css';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import HoverMap from "./HoverMap";
import States from "./States";
 
class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Route path="/" exact component={HoverMap} />
                <Route 
                    path="/state/jk" exact 
                    render={(routeProps) => (
                        <States {...routeProps} />
                    )}
                />
            </BrowserRouter>
        )
    }
}

export default App;