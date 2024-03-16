import React from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import '../HomePage/homepage.css';
const SuperuserNavbar = () => {
  // console.log('usename in superusernav',username)
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
    <br/><br/>
    <Link id='link' to="/adminhome">Home</Link> <br />
    <Link id='link' to="/usermanagement">User Manager</Link> <br />
    <Link id='link' to="/ailment">Hospital</Link> <br />
    <Link id='link' to="/roomallotment">Room Allotment</Link> <br />
    
  </nav>
);
}
export default SuperuserNavbar;
