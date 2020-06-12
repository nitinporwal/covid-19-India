import React from "react";
import './App.css';
import { BrowserRouter, Route} from 'react-router-dom';
import HoverMap from "./Dashboard";
import States from "./States";
import Navbar from "./Navbar";
import District from './District';
import Preventions from "./Preventions";
import Symptoms from "./Symptoms";
import About from "./About";
import FAQs from "./FAQs";
import Footer from "./Footer";
 
class App extends React.Component {
    render() {
        return (
            <>
            <div>
                <BrowserRouter>
                    <Route 
                        path="/"
                        render={(routeProps) => (
                            <Navbar {...routeProps} />
                        )}
                    />
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
                    <Route path="/symptoms" exact
                        render={(routeProps) => (
                            <Symptoms {...routeProps} />
                        )}
                    />
                    <Route path="/preventions" exact
                        render={(routeProps) => (
                            <Preventions {...routeProps} />
                        )}
                    />
                    <Route path="/about" exact
                        render={(routeProps) => (
                            <About {...routeProps} />
                        )}
                    />
                    <Route path="/faqs" exact
                        render={(routeProps) => (
                            <FAQs {...routeProps} />
                        )}
                    />
                </BrowserRouter>
                <Footer />
            </div>
            </>
        )
    }
}

export default App;