import React, { Component } from 'react';
// import Elbow from '../public/elbow.png'

class Preventions extends Component {
    render() {
        let videoSrc="https://youtube.com/embed/W-zhhSQDD1U";
        return (
            <div className="container">
                <h2>Covid-19 Preventions and Advice</h2>
                <div className="row">
                    <div className="col-lg-9">
                        <div className="card header_container">
                                <h5 className="card-header header_details">
                                    It’s important to understand that even when people appear not to have symptoms of coronavirus (COVID-19), they may still be carrying the virus.
                                    The best way to prevent illness is to avoid being exposed to this virus as there is not vaccine to prevent. You can protect yourself and help prevent spreading the virus to others if you do as below instruction.
                                </h5>
                        </div>
                        <div className="row">
                            <div className="col-lg-3 img_container">
                                <img className="symptoms_img" src={process.env.PUBLIC_URL + '/washhands.png'} alt="wash hands" />
                            </div>
                            <div className="col-lg-8 detail_container" >
                                <h5 className="symptoms_header5">
                                    Wash your hands frequently: 
                                </h5>
                                <p>Wash your hands regularly with soap and water, or clean them with alcohol-based hand rub because washing your hands with soap and water or using alcohol-based hand rub kills viruses that may be on your hands.</p>
                            </div>
                            <div className="col-lg-3 img_container">
                                <img className="symptoms_img" src={process.env.PUBLIC_URL + '/donottouch.png'} alt="don't touch" />
                            </div>
                            <div className="col-lg-8 detail_container" >
                                <h5 className="symptoms_header5">
                                    Avoid touching your face: 
                                </h5>
                                <p>
                                    Do not touch your eyes, nose or mouth if your hands are not clean. Cover your mouth and nose when coughing or sneezing because hands touch many surfaces and can pick up viruses. Once contaminated, hands can transfer the virus to your eyes, nose or mouth. From there, the virus can enter your body and can make you sick.
                                </p>
                            </div>
                            <div className="col-lg-3 img_container">
                                <img className="symptoms_img" src={process.env.PUBLIC_URL + '/mask.png'} alt="wear mask" />
                            </div>
                            <div className="col-lg-8 detail_container" >
                                <h5 className="symptoms_header5">
                                    Wear Mask: 
                                </h5>
                                <p>
                                    It is necessary to wear masks in communities, during home care, and in health care settings in areas that have reported cases of COVID-19.
                                </p>
                            </div>
                            <div className="col-lg-3 img_container">
                                <img className="symptoms_img" src={process.env.PUBLIC_URL + '/social.png'} alt="keep distance" />
                            </div>
                            <div className="col-lg-8 detail_container" >
                                <h5 className="symptoms_header5">
                                    Keep distance: 
                                </h5>
                                <p>
                                    Practice physical distancing by avoiding unnecessary travel and staying away from large groups of people because social distancing is a non-pharmaceutical infection prevention and control intervention
                                    implemented to avoid/decrease contact between those who are infected with a disease causing
                                    pathogen.
                                </p>
                            </div>
                            <div className="col-lg-3 img_container">
                                <img className="symptoms_img" src={process.env.PUBLIC_URL + '/elbow.png'} alt="hygiene" />
                            </div>
                            <div className="col-lg-8 detail_container" >
                                <h5 className="symptoms_header5">
                                    Practice respiratory hygiene: </h5>
                                <p>
                                    Cover your nose and mouth with your bent elbow or a tissue when you cough or sneeze.
                                    Droplets spread virus. By following good respiratory hygiene you protect the people around you from viruses such as cold, flu and COVID-19.
                                </p>
                            </div>
                            <div className="col-lg-3 img_container">
                                <img className="symptoms_img" src={process.env.PUBLIC_URL + '/stayhome.jpg'} alt="stay home" />
                            </div>
                            <div className="col-lg-8 detail_container" >
                                <h5 className="symptoms_header5">
                                    Stay Home Stay Safe: 
                                </h5>
                                <p>
                                    Stay home if you feel unwell because you can lower the risks of transmission by reducing the number of people you come into close contact with.
                                </p>
                            </div>
                            <div className="col-lg-3 img_container">
                                <img className="symptoms_img" src={process.env.PUBLIC_URL + '/checkup.png'} alt="medical attention" />
                            </div>
                            <div className="col-lg-8 detail_container" >
                                <h5 className="symptoms_header5">
                                    Seek Medical Attention: 
                                </h5>
                                <p>
                                    If you have a fever, a cough and difficulty breathing, seek medical attention. Call in advance.
                                    Follow the directions of your local health authority.
                                </p>
                            </div>
                            <div className="col-lg-3 img_container">
                                <img className="symptoms_img" src={process.env.PUBLIC_URL + '/nosmoking.png'} alt="no smoking" />
                            </div>
                            <div className="col-lg-8 detail_container">
                                <h5 className="symptoms_header5">
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
                        <img className="prevention_img" src={process.env.PUBLIC_URL + '/who1.png'} alt="who1"/>
                        <img className="prevention_img" src={process.env.PUBLIC_URL + '/who2.png'} alt="who2"/>
                        <img className="prevention_img" src={process.env.PUBLIC_URL + '/who3.png'} alt="who3"/>
                        <img className="prevention_img" src={process.env.PUBLIC_URL + '/who4.png'} alt="who4"/>
                    </div>
                </div>
            </div>
        )
    }
};

export default Preventions;