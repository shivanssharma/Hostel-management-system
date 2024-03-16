import React from 'react';
import { Link ,useLocation} from 'react-router-dom';
import '../HomePage/homepage.css'
const ActiveuserNavbar = () =>{
  const location = useLocation();
  const username = location.state && location.state.username;
  return(
  <nav className="sidebar">
    <div id='image'>
      <img src="images\sssihl_logo.png" alt='SSSIHL'></img>
    </div>
    <hr style={{color:'white'}}/>
    <div className="username-container">
      <h3 className="greeting">Hello, <span className="username">{username}</span></h3>
    </div>
    <Link id='link' to="/studenthome">Home</Link> <br />
    <Link id='link' to="/register">Enrolment</Link> <br />
    <Link id='link' to="/studentailment">Health Care</Link> <br />
    <Link id='link' to="/studentviewroom">Check Room</Link> <br />
    <Link id='link' to="/studentnotifications"> Notifications</Link> <br />
    { /* Add other activeuser-specific links as needed */ }
  </nav>
);
}
export default ActiveuserNavbar;
