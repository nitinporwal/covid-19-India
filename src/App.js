import React from "react";
import './App.css';
import { BrowserRouter, Route} from 'react-router-dom';
import HoverMap from "./Components/Dashboard";
import States from "./Components/States";
import Navbar from "./Components/Navbar";
import Preventions from "./Components/Preventions";
import Symptoms from "./Components/Symptoms";
import About from "./Components/About";
import FAQs from "./Components/FAQs";
import Footer from "./Components/Footer";
 
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
                    <div style={{maxWidth: "95%"}}>
                        <Route path="/" exact component={HoverMap} />
                        <Route 
                            path="/state/:code/:name" exact
                            render={(routeProps) => (
                                <States {...routeProps} />
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
                    </div>
                    <div style={{backgroundColor: "#003366"}}>
                        <div style={{width: "95%"}}>
                            <Footer />
                        </div>
                    </div>
                </BrowserRouter>
            </div>
            </>
        )
    }
}

export default App;