import React from "react";

const Footer = () => {
  return (
    <div style={{backgroundColor: "#003366", color: "white", border: "5px solid #003366"}}>
        <div>
            <div className="row" style={{backgroundColor: "#003366", color: "white", padding: "3% 2% 0 2%"}}>
                <div className="col-lg-6" style={{padding: "0 0 0 5%"}}>
                    <h3 className="text-uppercase mb-4 mt-3">Covid-19 India</h3>
                    <p style={{fontSize: "16px"}}>
                        Data is collected from various sources & It changes rapidly.
                        This data changes rapidly, so what’s shown may be out of date. Table values may not always be 100% accurate. Information about reported cases is also available on the <a href="https://www.who.int/" style={{textDecoration: "none", color: "white"}}>World Health Organization</a>  & <a href="https://www.worldometers.info/" style={{textDecoration: "none", color: "white"}}>worldoMeters.info</a>
                    </p>
                </div>
                <hr style={{color: "black", borderTop: "1px solid gray"}} />
                <div className="col-lg-6" style={{padding: "0 0 0 5%"}}>
                    <h3 className="text-uppercase mb-4 mt-3">
                        Important Links:
                    </h3>
                    <ul style={{fontSize: "16px"}}>
                        <li>
                            Download the Aarogya Setu App  <img src={process.env.PUBLIC_URL + '/arogya.png'} alt="logo" style={{width: "25px"}} /> For 
                            <a href="https://play.google.com/store/apps/details?id=nic.goi.aarogyasetu&hl=en_GB" style={{textDecoration: "none", color: "yellow"}}> Android <img src={process.env.PUBLIC_URL + '/android.png'} alt="logo" style={{width: "25px"}} /> </a>  For <a href="https://apps.apple.com/in/app/aarogyasetu/id1505825357" style={{textDecoration: "none", color: "yellow"}}>iPhone <img src={process.env.PUBLIC_URL + '/apple.png'} alt="logo"  style={{width: "25px", height: "25px"}}/></a>
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
            <hr style={{color: "black", borderTop: "1px solid gray"}} />
            <div className="text-center">
                <ul className="list-unstyled list-inline">
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
                </ul>
            </div>
            <hr style={{color: "black", borderTop: "1px solid gray"}} />
        </div>
        <div style={{marginLeft: "47%", color: "white"}}>
            &copy; {new Date().getFullYear()} Copyright
        </div>
    </div>
  );
}

export default Footer;