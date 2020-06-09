import React, { Component } from 'react';
// import Elbow from '../public/elbow.png'

class Preventions extends Component {
    render() {
        let styles={
            width: "150px",
            height: "150px",
            border: "3px solid lightgray",
            borderRadius: "50%",
            margin: "4% 0 0 10%"
        }
        let styles2 = {
            width: "350px",
            height: "310px",
            border: "13px solid white",
            borderRadius: "7%"
        }
        let videoSrc="https://youtube.com/embed/W-zhhSQDD1U";
        return (
            <div className="container">
                <h2>Covid-19 Preventions and Advice</h2>
                <div className="row">
                    <div className="col-lg-9">
                        <div className="card" style={{maxWidth:"95%"}}>
                                <h5 className="card-header" style={{padding: "4%"}}>
                                    It’s important to understand that even when people appear not to have symptoms of coronavirus (COVID-19), they may still be carrying the virus.
                                    The best way to prevent illness is to avoid being exposed to this virus as there is not vaccine to prevent. You can protect yourself and help prevent spreading the virus to others if you do as below instruction.
                                </h5>
                        </div>
                        <h4 style={{margin: "1% 0"}}>
                            
                        </h4>
                        <div className="row">
                            <div className="col-lg-3" style={{margin: "1% 1%"}}>
                                <img src={process.env.PUBLIC_URL + '/washhands.png'} alt="logo" style={styles} />
                            </div>
                            <div className="col-lg-8" style={{padding: "3% 3% 0 0", fontSize: "1.2em"}}>
                                <h5 style={{fontWeight: "bold"}}>
                                    Wash your hands frequently: 
                                </h5>
                                <p>Wash your hands regularly with soap and water, or clean them with alcohol-based hand rub because washing your hands with soap and water or using alcohol-based hand rub kills viruses that may be on your hands.</p>
                            </div>
                            <div className="col-lg-3" style={{margin: "1% 1%"}}>
                                <img src={process.env.PUBLIC_URL + '/donottouch.png'} alt="logo" style={styles} />
                            </div>
                            <div className="col-lg-8" style={{padding: "3% 3% 0 0", fontSize: "1.2em"}}>
                                <h5 style={{fontWeight: "bold"}}>
                                    Avoid touching your face: 
                                </h5>
                                <p>
                                    Do not touch your eyes, nose or mouth if your hands are not clean. Cover your mouth and nose when coughing or sneezing because hands touch many surfaces and can pick up viruses. Once contaminated, hands can transfer the virus to your eyes, nose or mouth. From there, the virus can enter your body and can make you sick.
                                </p>
                            </div>
                            <div className="col-lg-3" style={{margin: "1% 1%"}}>
                                <img src={process.env.PUBLIC_URL + '/mask.png'} alt="logo" style={styles} />
                            </div>
                            <div className="col-lg-8" style={{padding: "3% 3% 0 0", fontSize: "1.2em"}}>
                                <h5 style={{fontWeight: "bold"}}>
                                    Wear Mask: 
                                </h5>
                                <p>
                                    It is necessary to wear masks in communities, during home care, and in health care settings in areas that have reported cases of COVID-19.
                                </p>
                            </div>
                            <div className="col-lg-3" style={{margin: "1% 1%"}}>
                                <img src={process.env.PUBLIC_URL + '/social.png'} alt="logo" style={styles} />
                            </div>
                            <div className="col-lg-8" style={{padding: "3% 3% 0 0", fontSize: "1.2em"}}>
                                <h5 style={{fontWeight: "bold"}}>
                                    Keep distance: 
                                </h5>
                                <p>
                                    Practice physical distancing by avoiding unnecessary travel and staying away from large groups of people because social distancing is a non-pharmaceutical infection prevention and control intervention
                                    implemented to avoid/decrease contact between those who are infected with a disease causing
                                    pathogen.
                                </p>
                            </div>
                            <div className="col-lg-3" style={{margin: "1% 1%"}}>
                                <img src={process.env.PUBLIC_URL + '/elbow.png'} alt="logo" style={styles} />
                            </div>
                            <div className="col-lg-8" style={{padding: "3% 3% 0 0", fontSize: "1.2em"}}>
                                <h5 style={{fontWeight: "bold"}}>
                                    Practice respiratory hygiene: </h5>
                                <p>
                                    Cover your nose and mouth with your bent elbow or a tissue when you cough or sneeze.
                                    Droplets spread virus. By following good respiratory hygiene you protect the people around you from viruses such as cold, flu and COVID-19.
                                </p>
                            </div>
                            <div className="col-lg-3" style={{margin: "1% 1%"}}>
                                <img src={process.env.PUBLIC_URL + '/stayhome.jpg'} alt="logo" style={styles} />
                            </div>
                            <div className="col-lg-8" style={{padding: "3% 3% 0 0", fontSize: "1.2em"}}>
                                <h5 style={{fontWeight: "bold"}}>
                                    Stay Home Stay Safe: 
                                </h5>
                                <p>
                                    Stay home if you feel unwell because you can lower the risks of transmission by reducing the number of people you come into close contact with.
                                </p>
                            </div>
                            <div className="col-lg-3" style={{margin: "1% 1%"}}>
                                <img src={process.env.PUBLIC_URL + '/checkup.png'} alt="logo" style={styles} />
                            </div>
                            <div className="col-lg-8" style={{padding: "3% 3% 0 0", fontSize: "1.2em"}}>
                                <h5 style={{fontWeight: "bold"}}>
                                    Seek Medical Attention: 
                                </h5>
                                <p>
                                    If you have a fever, a cough and difficulty breathing, seek medical attention. Call in advance.
                                    Follow the directions of your local health authority.
                                </p>
                            </div>
                            <div className="col-lg-3" style={{margin: "1% 1%"}}>
                                <img src={process.env.PUBLIC_URL + '/nosmoking.png'} alt="logo" style={styles} />
                            </div>
                            <div className="col-lg-8" style={{padding: "3% 3% 0 0", marginBottom:"5%", fontSize: "1.2em"}}>
                                <h5 style={{fontWeight: "bold"}}>
                                    Avoid Smoking: 
                                </h5>
                                <p>
                                    Refrain from smoking and other activities that weaken the lungs because Covid 19 primarily infects the lungs in the affected individuals and in severe cases causes’ death due to ARDS and pneumonia.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3">
                        <iframe width="340" height="310" allowFullScreen="allowFullScreen"
                            mozallowfullscreen="mozallowfullscreen" 
                            msallowfullscreen="msallowfullscreen" 
                            oallowfullscreen="oallowfullscreen" 
                            webkitallowfullscreen="webkitallowfullscreen" 
                            title="COVID-19 Stop the Spread of Germs"
                            src={videoSrc} 
                        />
                        <img src={process.env.PUBLIC_URL + '/who1.png'} alt="logo" style={styles2} />
                        <img src={process.env.PUBLIC_URL + '/who2.png'} alt="logo" style={styles2} />
                        <img src={process.env.PUBLIC_URL + '/who3.png'} alt="logo" style={styles2} />
                        <img src={process.env.PUBLIC_URL + '/who4.png'} alt="logo" style={styles2} />
                    </div>
                </div>
            </div>
        )
    }
};

export default Preventions;