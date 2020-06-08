import React, { Component } from 'react';

class Checker extends Component {
    render() {
        return (
            <div class="article-content">
                <div>
                    <a name="Skip">
                    </a>
                </div>
                <p>Our interactive Coronavirus (COVID-19) Self-Checker helps you quickly find information about the new coronavirus and COVID-19, the disease it causes. Use our interactive tool to:</p>
                <ul>
                    <li>
                        Check yourself for coronavirus symptoms.
                    </li>
                    <li>
                        Learn how to protect yourself and others from COVID-19.
                    </li>
                    <li>
                        Get coronavirus information important to parents and caregivers.
                    </li>
                </ul>
                <div class="background-color--teal" id="checker-container">
                    <div style={{backgroundColor: "white", border: "3px solid lightgray", margin: "4% 0 4% 15%"}}>
                        <iframe id="checker-iframe" title="Coronavirus (COVID-19) Self-Checker" src="https://jhmcoronavirusselfchecker.azurewebsites.net/" style={{border: "0", height: "800px", width: "100%"}} >
                        </iframe>
                    </div>
                </div>
            </div>
        )
    }
};

export default Checker;