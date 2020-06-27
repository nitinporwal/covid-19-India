import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Backdrop from '@material-ui/core/Backdrop';
import '../App.css';
class Navbar extends Component {
    state = {
        open: false,
        selected: "dash",
        coll: false,
        st: {display: "none", zIndex: "3000"}
    }
    componentDidMount = () => {
        if(this.props.location.pathname==="/" || this.props.location.state!==undefined) {
            this.setState({selected: "dash"})
        }
        else if(this.props.location.pathname==="/symptoms") {
            this.setState({selected: "sym"})
        }
        else if(this.props.location.pathname==="/preventions") {
            this.setState({selected: "pre"})
        }
        else if(this.props.location.pathname==="/faqs") {
            this.setState({selected: "faq"})
        }
        else if(this.props.location.pathname==="/about") {
            this.setState({selected: "abt"})
        }
    }
    handleClose = () => {
        this.setState({open: false})
    }
    handleToggle = () => {
        let x=this.state.open;
        this.setState({open: !x});
    }
    showDash = () => {
        const { history } = this.props;
        if(history) history.push({
            pathname: `/`
        });
        this.setState({selected: "dash", coll: false, st: {display: "none", zIndex: "3000"}})
    }
    showSym = () => {
        const { history } = this.props;
        if(history) history.push({
            pathname: `/symptoms`
        });
        this.handleToggleHam();
        this.setState({selected: "sym"})
    }
    showPre = () => {
        const { history } = this.props;
        if(history) history.push({
            pathname: `/preventions`
        });
        this.handleToggleHam();
        this.setState({selected: "pre"})
    }
    showFaqs = () => {
        const { history } = this.props;
        if(history) history.push({
            pathname: `/faqs`
        });
        this.handleToggleHam();
        this.setState({selected: "faq"})
    }
    showAbt = () => {
        const { history } = this.props;
        if(history) history.push({
            pathname: `/about`
        });
        this.handleToggleHam();
        this.setState({selected: "abt"})
    }
    handleToggleHam = () => {
        let colla=this.state.coll;
        if(colla) {
            this.setState({coll: !colla, st: {display: "none", zIndex: "3000"}});
        }
        else {
            this.setState({coll: !colla, st: {display: "block", zIndex: "3000", minHeight: "260px"}})
        }
    }
    render() {
        console.log(this.props)
        let styles={
            margin: "1% 0.5%", 
            padding: "1%", 
            minWidth: "9vw", 
            color: "white"
        }
        let color1 = "primary";
        let color2 = "secondary"
        return (
            <div className="bd-example" role="navigation">
                <nav className="navbar navbar-expand-lg bg-light">
                    <a style={{color: "blue"}} className="home_logo" onClick={this.showDash}><img src={process.env.PUBLIC_URL + '/corona2.png'} alt="corona_logo" style={{maxWidth: "24px", maxHeight: "24px"}} />Covid-19</a>
                    <button onClick={() => this.handleToggleHam()} class="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                        {/* click me */}
                    </button>
                    <div className="collapse navbar-collapse" style={this.state.st} id="navbarTogglerDemo02">
                        <ul className="navbar-nav mr-auto">
                            {(this.state.selected==="dash") ?
                                <Button variant="contained" color={color2} style={styles} onClick={this.showDash}>
                                    Dashboard
                                </Button>
                            :
                                <Button variant="contained" color={color1} style={styles} onClick={this.showDash}>
                                    Dashboard
                                </Button>
                            }
                            {(this.state.selected==="sym") ?
                                <Button variant="contained" color={color2} style={styles} onClick={this.showSym}>
                                    Symptoms
                                </Button>
                                :
                                <Button variant="contained" color={color1} style={styles} onClick={this.showSym}>
                                    Symptoms
                                </Button>
                            }
                            {(this.state.selected==="pre") ?
                                <Button variant="contained" color={color2} style={styles} onClick={this.showPre}>
                                    Preventions
                                </Button>
                                :
                                <Button variant="contained" color={color1} style={styles} onClick={this.showPre}>
                                    Preventions
                                </Button>
                            }
                            {(this.state.selected==="faq") ?
                                <Button variant="contained" color={color2} style={styles} onClick={this.showFaqs}>
                                    FAQs
                                </Button>
                                :
                                <Button variant="contained" color={color1} style={styles} onClick={this.showFaqs}>
                                    FAQs
                                </Button>
                            }
                            {(this.state.selected==="abt") ?
                                <Button variant="contained" color={color2} style={styles} onClick={this.showAbt}>
                                    About Us
                                </Button>
                                :
                                <Button variant="contained" color={color1} style={styles} onClick={this.showAbt}>
                                    About Us
                                </Button>
                            }
                            {(this.state.coll) ? 
                                <Button variant="contained" color="primary" style={styles} onClick={this.handleToggle}>
                                    Covid-19 Symptoms Checker
                                </Button>
                            :
                            <div>
                            </div>}
                            
                        </ul>
                        {(!this.state.coll) ? 
                            <form className="form-inline" style={{marginRight: "4%"}}>
                                <Button variant="contained" color="secondary" onClick={this.handleToggle}>
                                    Covid-19 Symptoms Checker
                                </Button>
                            </form>
                            :
                            <div>
                            </div>
                        }
                        {(this.state.open) ? 
                            <Backdrop open={this.state.open} onKeyDown={(e) => this.handleKey(e)} onClick={this.handleClose} style={{zIndex: "100"}}>
                                <div className="backdrop_data">
                                    <h2 >Covid-19 Symptoms checker: By Johns Hopkins Medicine</h2>
                                    <ul >
                                        <h5>
                                            <li>
                                                Check yourself for coronavirus symptoms.
                                            </li>
                                            <li>
                                                Learn how to protect yourself and others from COVID-19.
                                            </li>
                                            <li>
                                                Get coronavirus information important to parents and caregivers.
                                            </li>
                                            <li>
                                                Click on 'I accept' to continue.
                                            </li>
                                        </h5>
                                    </ul>
                                    <iframe className="checker_iframe" id="checker-iframe" title="Coronavirus (COVID-19) Self-Checker" src="https://jhmcoronavirusselfchecker.azurewebsites.net/" />
                                </div>
                            </Backdrop>
                            :
                            <div>
                            </div>
                        }
                    </div>
                </nav>
            </div>
        )
    };
};

export default Navbar;