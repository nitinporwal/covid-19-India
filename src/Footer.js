import React from "react";

const Footer = () => {
  return (
    <div style={{backgroundColor: "blue", color: "white", border: "3px solid blue"}}>
        <div>
            <div className="row" style={{backgroundColor: "blue", color: "white", padding: "3% 2% 0 2%"}}>
                <div className="col-lg-6" style={{padding: "0 0 0 5%"}}>
                    <h3 className="text-uppercase mb-4 mt-3">Covid-19 India</h3>
                    <p style={{fontSize: "16px"}}>
                        Data is collected from various sources & It changes rapidly.
                        This data changes rapidly, so what’s shown may be out of date. Table values may not always be 100% accurate. Information about reported cases is also available on the <a href="https://www.who.int/" style={{textDecoration: "none", color: "white"}}>World Health Organization</a>  & <a href="https://www.worldometers.info/" style={{textDecoration: "none", color: "white"}}>worldoMeters.info</a>
                    </p>
                </div>
                <hr style={{color: "black", borderTop: "1px solid magenta"}} />
                <div className="col-lg-6" style={{padding: "0 0 0 5%"}}>
                    <h3 className="text-uppercase mb-4 mt-3">
                        Important Links:
                    </h3>
                    <ul className="list-unstyled" style={{fontSize: "16px"}}>
                        <li>
                            Download the Aarogya Setu App  <img src={process.env.PUBLIC_URL + '/arogya.png'} alt="logo" style={{width: "25px"}} /> For 
                            <a href="https://web2.eu5.org/awarness_material/awarness_eng_hind.pdf" style={{textDecoration: "none", color: "white"}}> Android <img src={process.env.PUBLIC_URL + '/android.png'} alt="logo" style={{width: "25px"}} /> </a>  For <a href="https://web2.eu5.org/awarness_material/awarness_eng_hind.pdf" style={{textDecoration: "none", color: "white"}}>iPhone <img src={process.env.PUBLIC_URL + '/apple.png'} alt="logo"  style={{width: "25px", height: "25px"}}/></a>
                        </li>
                        <li>
                            <a href="https://web2.eu5.org/awarness_material/awarness_eng_hind.pdf" style={{textDecoration: "none", color: "white"}}>Guidelines for Reducing the Risk of Novel Coronavirus COVID-19 </a>
                        </li>
                        <li>
                            <a href="https://www.youtube.com/watch?v=ykZJ-jcE-Do&feature=youtu.be" style={{textDecoration: "none", color: "white"}}>Video on Covid-19 awareness for community, Hindi</a>
                        </li>
                        <li>
                            <a href="https://web2.eu5.org/pass.php" style={{textDecoration: "none", color: "white"}}>Apply for Movement Pass During Covid-19 Lockdown</a>
                        </li>
                        <li>
                            <a href="https://prixest.com/app/login.php" style={{textDecoration: "none", color: "white"}}>Covid_19 (Coronavirus) Awarness Quiz</a>
                        </li>
                    </ul>
                </div>
            </div>
            <hr style={{color: "black", borderTop: "1px solid magenta"}} />
            <div className="text-center">
                <ul className="list-unstyled list-inline">
                    <li className="list-inline-item">
                        <a href="https://www.facebook.com/nitin.porwal.5209">
                            <img src="https://img.icons8.com/fluent/48/000000/facebook-new.png"/>
                        </a>
                    </li>
                    <li className="list-inline-item">
                        <a href="https://www.linkedin.com/in/nitin-porwal-9162a612a">
                            <img src="https://img.icons8.com/color/48/000000/linkedin.png"/>
                        </a>
                    </li>
                    <li className="list-inline-item">
                        <a href="https://github.com/nitinporwal/covid-19-India">
                            <img src="https://img.icons8.com/ios-glyphs/48/000000/github.png"/>
                        </a>
                    </li>
                    <li className="list-inline-item">
                        <a href="https://myaccount.google.com/profile">
                            <img src="https://img.icons8.com/fluent/48/000000/google-plus.png"/>
                        </a>
                    </li>
                </ul>
            </div>
            <hr style={{color: "black", borderTop: "1px solid magenta"}} />
        </div>
        <div style={{marginLeft: "42%", color: "white"}}>
            &copy; {new Date().getFullYear()} Copyright: <a href="https://www.linkedin.com/in/nitin-porwal-9162a612a" style={{textDecoration: "none", color: "white"}}>Nitin Porwal</a>
        </div>
    </div>
  );
}

export default Footer;