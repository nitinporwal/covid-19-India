import React, { Component } from 'react';
import './App.css';
// const hamburger = document.querySelector(".hamburger");
// console.log(hamburger);
// const navLinks = document.querySelector(".nav-links");
// const links = document.querySelectorAll(".nav-links li");

// hamburger.addEventListener("click", () => {
//   navLinks.classList.toggle("open");
//   links.forEach((link) => {
//     link.classList.toggle("fade");
//   });
// });
class Navbar extends Component {
    // state = {
    //     isClicked: false
    // }
    render() {
        // const handleClick = () => {
        //     let y=this.state.isClicked;
        //     this.setState({isClicked: !y});
        // }
        // console.log(this.state);
        // let x="", y="";
        // if(this.state.isClicked) {
        //     x="open";
        //     y="fade";
        // }
        // else {
        //     x="";
        //     y="";
        // }
        return (
            <div className="bd-example">
                <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                    <a className="navbar-brand" href="/">Covid19</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="/navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarColor02">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                        <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item">
                        <a className="nav-link" href="/">Features</a>
                        </li>
                        <li className="nav-item">
                        <a className="nav-link" href="/">About</a>
                        </li>
                    </ul>
                    <form className="form-inline">
                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-light my-2 my-sm-0" type="submit">Search</button>
                    </form>
                    </div>
                </nav>
                {/* <nav>
                <div className="hamburger" onClick={handleClick} >
                    <div className="line"></div>
                    <div className="line"></div>
                    <div className="line"></div>
                </div>
                <ul className={`nav-links ${x}`}>
                    {console.log(`nav-links ${y}`)}
                    <li><a href="/" className={`${y}`}>About</a></li>
                    <li><a href="/" className={`${y}`}>Contact</a></li>
                    <li><a href="/" className={`${y}`}>Projects</a></li>
                </ul>
                </nav> */}
            </div>
        )
    };
};

export default Navbar;