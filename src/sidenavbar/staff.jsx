import React from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import '../HomePage/homepage.css';

const StaffuserNavbar = () => {
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
    <Link id='link' to="/StaffHome">Home</Link> <br />
    <Link id='link' to="/ailment">Health care</Link> <br />
    <Link id='link' to="/roomallotment">Room Allotment</Link> <br />
    { /* Add other staffuser-specific links as needed */ }
  </nav>
);
  }
export default StaffuserNavbar;
