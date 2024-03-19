import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, IconButton, Typography, useMediaQuery } from '@mui/material';
import { CottageRounded, HealthAndSafetyRounded, LogoutRounded, RoomPreferencesRounded } from '@mui/icons-material';

import '../HomePage/homepage.css';
import "../asset/sharedCss.css"
import "../asset/sharedAnimation.css"
import { server, serverPort } from '../utils/Constants';

const StaffuserNavbar = (props) => {
  const location = useLocation();
  const navigate= useNavigate()
  const username = location.state && location.state.username || localStorage.getItem('username');
  const links= [
    {"title": "Home", "link": "/staff-home", icon: <CottageRounded />},
    {"title": "Health care", "link": "/ailment", icon: <HealthAndSafetyRounded />},
    {"title": "Room Allotment", "link": "/room-allotment", icon : <RoomPreferencesRounded />},
  ]
  const [activeNav, setActiveNav] = useState(0); 
  const isSmallScreen = useMediaQuery(theme => theme.breakpoints.down('sm')); // Change 'sm' to other breakpoints as needed

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('is_authenticated');
    if (isAuthenticated !== 'true') {
      // Redirect to login page or perform any other action if user is not authenticated
      navigate('/');
    }
  }, [navigate]);

  function selectItem(index){
    if (activeNav === index)
      return
    setActiveNav(index)
    navigate(links[index].link)
    if (isSmallScreen)
      props.callback(false)
  }

  const handleLogout = () => {
    axios.post(server+':'+serverPort+'/api/logout/') // Assuming this is the endpoint for logout in your backend
      .then(response => {
        // Handle successful logout response
        console.log(response.data.message);
        localStorage.setItem('is_authenticated', false);
        // Redirect to the index page or perform any other action as needed
        navigate('/'); // Redirect to index page after logout
      })
      .catch(error => {
        // Handle error
        console.error('Logout failed:', error);
      });
  };

  return(
  <nav className="sidebar">
    <Box className='image hide'>
      <img src="images\sssihl_logo.png" alt='SSSIHL'></img>
    </Box>
    
    <Box className="link-container">
      <Typography variant='h4' className="greeting floatRightIn">Hello, <br/>
        <span className="username BrasikaFont">{username}</span>
      </Typography>
      {
        links.map((data, index) => (
          <Box key={index} className={`floatRightIn ${index === activeNav ? "activeLink" : "link"}`} onClick={() => selectItem(index)}>
            <IconButton className="linkIcon">
              {data.icon}
            </IconButton>
            <Link className="LinkText" to={data.link} >{data.title}</Link>
          </Box>
        ))
      }
      <Box className={`floatRightIn link `} onClick={handleLogout}>
        <IconButton className="linkIcon">
          <LogoutRounded />
        </IconButton>
        <Link className="LinkText" >Logout</Link>
      </Box>
      {/* <Link id='link' to="/staff-home">Home</Link> <br />
      <Link id='link' to="/ailment">Health care</Link> <br />
      <Link id='link' to="/room-allotment">Room Allotment</Link> <br /> */}
    </Box>
    { /* Add other staffuser-specific links as needed */ }

  </nav>
);
  }
export default StaffuserNavbar;
