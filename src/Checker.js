import React, { Component } from 'react';

class Checker extends Component {
    render() {
        return (
            <div class="container">
                <h2>Covid-19 Symptoms Checker</h2>
                <br/>
                <div>
                    <a name="Skip">
                    </a>
                </div>
                <ul>
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
                <div>
                    <div style={{backgroundColor: "white", border: "3px solid lightgray", margin: "4% 20% 4% 0%"}}>
                        <iframe id="checker-iframe" title="Coronavirus (COVID-19) Self-Checker" src="https://jhmcoronavirusselfchecker.azurewebsites.net/" style={{border: "0", height: "700px", width: "100%"}} >
                        </iframe>
                    </div>
                </div>
            </div>
        )
    }
};

export default Checker;