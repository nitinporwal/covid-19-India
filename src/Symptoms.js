import React, { Component } from 'react';

class Symptoms extends Component {
    render() {
        let videoSrc="https://www.youtube.com/embed/7zzfdYShvQU";
        return (
            <div className="container">
                <h2>Covid-19 Symptoms</h2>
                <div className="row">
                    <div className="col-lg-9">
                        <div className="card header_container">
                                <h5 className="card-header header_details">
                                    People with COVID-19 have had a wide range of symptoms reported – ranging from mild symptoms to severe illness.
                                    Symptoms may appear 2-14 days after exposure to the virus. People with these symptoms may have COVID-19:
                                </h5>
                        </div>
                        <div className="row">
                            <div className="col-lg-3 img_container">
                                <img className="symptoms_img" src={process.env.PUBLIC_URL + '/cough.png'} alt="logo" />
                            </div>
                            <div className="col-lg-8 detail_container">
                                <h5 className="symptoms_header5" >
                                    Cough: 
                                </h5>
                                <p>
                                    A dry cough does not produce mucus.
                                    According to the United Kingdom’s National Health Service (NHS), if a person notices they are coughing a lot for over an hour, or they have three or more coughing episodes in a day, they may have coronavirus.
                                </p>
                            </div>
                            <div className="col-lg-3 img_container">
                                <img className="symptoms_img" src={process.env.PUBLIC_URL + '/sore.svg'} alt="logo" />
                            </div>
                            <div className="col-lg-8 detail_container">
                                <h5 className="symptoms_header5" >
                                    Sore Throat: 
                                </h5>
                                <p>
                                    A sore throat is a painful, dry, or scratchy feeling in the throat.
                                    It may hurt more when you swallow or talk. Your throat or tonsils might also look red.
                                    Sore throat is a very common and non-specific symptom.
                                </p>
                            </div>
                            <div className="col-lg-3 img_container">
                                <img className="symptoms_img" src={process.env.PUBLIC_URL + '/fever.png'} alt="logo" />
                            </div>
                            <div className="col-lg-8 detail_container">
                                <h5 className="symptoms_header5" >
                                    Fever: 
                                </h5>
                                <p>
                                    A short-term increase in body temperature can help your body fight off illness.
                                    Doctors consider a temperature of 100.4°F or higher to be a fever.
                                    A person with a fever will feel hot to touch on their back or chest.
                                </p>
                            </div>
                            
                            <div className="col-lg-3 img_container">
                                <img className="symptoms_img" src={process.env.PUBLIC_URL + '/chills.jpg'} alt="logo" />
                            </div>
                            <div className="col-lg-8 detail_container">
                                <h5 className="symptoms_header5" >
                                    Chills: 
                                </h5>
                                <p>
                                    The term “chills” refers to a feeling of being cold without an apparent cause. You get this feeling when your muscles repeatedly expand and contract and the vessels in your skin constrict. Chills can occur with a fever and cause shivering or shaking.
                                </p>
                            </div>
                            <div className="col-lg-3 img_container">
                                <img className="symptoms_img" src={process.env.PUBLIC_URL + '/short_breath.png'} alt="logo" />
                            </div>
                            <div className="col-lg-8 detail_container">
                                <h5 className="symptoms_header5" >
                                    Shortness of Breath or Difficulty breathing: </h5>
                                <p>
                                    Shortness of breath is a subjective feeling. However, those experiencing shortness of breath may describe it feeling as if they are suffocating, or unable to catch their breath.
                                </p>
                            </div>
                            <div className="col-lg-3 img_container">
                                <img className="symptoms_img" src={process.env.PUBLIC_URL + '/loss_taste.png'} alt="logo" />
                            </div>
                            <div className="col-lg-8 detail_container">
                                <h5 className="symptoms_header5" >
                                    New loss of taste or smell: 
                                </h5>
                                <p>
                                    Since the start of the COVID-19 pandemic, it's become clear that many people with the infection lose their sense of smell and taste. And doctors are concerned that some will never get back to normal.
                                </p>
                            </div>
                            <div className="col-lg-3 img_container">
                                <img className="symptoms_img" src={process.env.PUBLIC_URL + '/tired.png'} alt="logo" />
                            </div>
                            <div className="col-lg-8 detail_container">
                                <h5 className="symptoms_header5" >
                                    Tiredness: 
                                </h5>
                                <p>
                                    Fatigue is a term used to describe an overall feeling of tiredness or lack of energy. It isn’t the same as simply feeling drowsy or sleepy.A person with fatigue may feel drained, weak, or sluggish.
                                </p>
                            </div>
                            <div className="col-lg-3 img_container">
                                <img className="symptoms_img" src={process.env.PUBLIC_URL + '/muscel_pain.jpg'} alt="logo" />
                            </div>
                            <div className="col-lg-8 detail_container">
                                <h5 className="symptoms_header5" >
                                    Muscel Pain: 
                                </h5>
                                <p>
                                    Muscle pain—often caused by muscle inflammation (myositis)—isn't an uncommon symptom for a viral infection.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-sm-1">
                        <iframe width="350" height="330" allowFullScreen="allowFullScreen"
                            mozallowfullscreen="mozallowfullscreen" 
                            msallowfullscreen="msallowfullscreen" 
                            oallowfullscreen="oallowfullscreen" 
                            webkitallowfullscreen="webkitallowfullscreen" 
                            title="COVID-19 Stop the Spread of Germs"
                            src={videoSrc} 
                        />
                        
                        <img className="symptoms2_img" src={process.env.PUBLIC_URL + '/symptoms2.png'} alt="logo" />
                    </div>
                </div>
            </div>
        )
    }
}

export default Symptoms;