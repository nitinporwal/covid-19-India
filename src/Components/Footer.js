import React from "react";
import '../App.css'
const Footer = () => {
  return (
    <div className="footer_container">
        <div>
            <div className="row footer_row">
                <div className="col-lg-6 footer_col">
                    <h3 className="text-uppercase mb-4 mt-3">Covid-19 India</h3>
                    <p className="footer_ul">
                        Data is collected from various sources & It changes rapidly.
                        This data changes rapidly, so what’s shown may be out of date. Table values may not always be 100% accurate. Information about reported cases is also available on the <a className="footer_a_who" href="https://www.who.int/">World Health Organization</a>  & <a className="footer_a_who" href="https://www.worldometers.info/">worldoMeters.info</a>
                    </p>
                </div>
                <hr className="hline" />
                <div className="col-lg-6 footer_col">
                    <h3 className="text-uppercase mb-4 mt-3">
                        Important Links:
                    </h3>
                    <ul className="footer_ul">
                        <li>
                            Download the Aarogya Setu App  <img className="footer_arogya_img" src={process.env.PUBLIC_URL + '/arogya.png'} alt="aarogya setu" /> For 
                            <a className="footer_arogya_a" href="https://play.google.com/store/apps/details?id=nic.goi.aarogyasetu&hl=en_GB"> Android <img className="footer_arogya_img" src={process.env.PUBLIC_URL + '/android.png'} alt="android" /> </a>  For <a className="footer_arogya_a" href="https://apps.apple.com/in/app/aarogyasetu/id1505825357">iPhone <img className="footer_arogya_img" src={process.env.PUBLIC_URL + '/apple.png'} alt="apple" /></a>
                        </li>
                        <li>
                            <a className="footer_a" href="https://web2.eu5.org/awarness_material/awarness_eng_hind.pdf">Guidelines for Reducing the Risk of Novel Coronavirus COVID-19 </a>
                        </li>
                        <li>
                            <a className="footer_a" href="https://www.youtube.com/watch?v=ykZJ-jcE-Do&feature=youtu.be">Video on Covid-19 awareness for community, Hindi</a>
                        </li>
                        <li>
                            <a className="footer_a" href="https://web2.eu5.org/pass.php">Apply for Movement Pass During Covid-19 Lockdown</a>
                        </li>
                        <li>
                            <a className="footer_a" href="https://prixest.com/app/login.php">Covid_19 (Coronavirus) Awarness Quiz</a>
                        </li>
                    </ul>
                </div>
            </div>
            <hr className="hline"/>
            <div className="text-center">
                <ul className="list-unstyled list-inline">
                    <li className="list-inline-item">
                        <a href="https://www.linkedin.com/in/nitin-porwal-9162a612a">
                            <img src="https://img.icons8.com/color/48/000000/linkedin.png" alt="linkedin"/>
                        </a>
                    </li>
                    <li className="list-inline-item">
                        <a href="https://github.com/nitinporwal/covid-19-India">
                            <img src="https://img.icons8.com/ios-glyphs/48/000000/github.png" alt="github"/>
                        </a>
                    </li>
                </ul>
            </div>
            <hr className="hline"/>
        </div>
        <div className="copyright">
            Made with <img className="footer_arogya_img" src={process.env.PUBLIC_URL + '/heart.png'} alt="love" /> by <a className="footer_a_who" href="https://www.linkedin.com/in/nitin-porwal-9162a612a" >Nitin Porwal</a>
            <br/>
            Database: <a className="footer_a_who" href="https://api.covid19india.org/">COVID19-India API</a>
            <br/>
            &copy; {new Date().getFullYear()} Copyright
        </div>
    </div>
  );
}

export default Footer;