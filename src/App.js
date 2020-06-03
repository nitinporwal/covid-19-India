import React from "react";
import './App.css';
import { BrowserRouter, Route} from 'react-router-dom';
import HoverMap from "./HoverMap";
import States from "./States";
 
class App extends React.Component {
    render() {
        return (
            <div className="ui container">
                <BrowserRouter>
                    <Route path="/" exact component={HoverMap} />
                    <Route 
                        path="/state/"
                        render={(routeProps) => (
                            <States {...routeProps} />
                        )}
                    />
                </BrowserRouter>
            </div>
        )
    }
}

export default App;