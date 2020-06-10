import React, { Component } from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

class SimpleBackdrop extends Component {
  state = {
    open: false
  }
  handleClose = () => {
    this.setState({open: false})
  }
  handleToggle = () => {
    let x=this.state.open;
    this.setState({open: !x});
  }
  render() {
    return (
      <div>
        <Button variant="outlined" color="primary" onClick={this.handleToggle}>
          Show Covid-19 Symptoms Checker
        </Button>
        <Backdrop open={this.state.open} onClick={this.handleClose} style={{zIndex: "100", color: "white"}}>
          <div style={{backgroundColor: "#98fa9a", border: "3px solid lightgray", margin: "4% 20% 4% 20%"}}>
            <h2 style={{color: "black"}}>Covid-19 Symptoms Checker</h2>
              <ul style={{color: "black"}}>
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
                  </h5>
              </ul>
              <iframe id="checker-iframe" title="Coronavirus (COVID-19) Self-Checker" src="https://jhmcoronavirusselfchecker.azurewebsites.net/" style={{border: "0", height: "430px", width: "60vw", minWidth: "300px", border: "3px solid black", margin: "2% 2% 0% 0%", backgroundColor: "#7aabfa"}} >
              </iframe>
          </div>
        </Backdrop>
      </div>
    );
  }
  // const classes = useStyles();
}

export default SimpleBackdrop;
