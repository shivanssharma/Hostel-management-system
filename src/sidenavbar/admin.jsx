import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import '../HomePage/homepage.css';
import "../asset/sharedCss.css";
import "../asset/sharedAnimation.css";
import { AccountCircleRounded, CottageRounded, HealthAndSafetyRounded, RoomPreferencesRounded } from '@mui/icons-material';
import { Box, IconButton, Typography, useMediaQuery } from '@mui/material';

const SuperuserNavbar = (props) => {
  // console.log('usename in superusernav',username)
  const location = useLocation();
  const navigate= useNavigate();
  const username = location.state && location.state.username || localStorage.getItem('username');
  const links= [
    {"title": "Home", "link": "/admin-home", icon: <CottageRounded />},
    {"title": "User Manager", "link": "/user-management", icon: <AccountCircleRounded />},
    {"title": "Hospital", "link": "/ailment", icon: <HealthAndSafetyRounded />},
    {"title": "Room Allotment", "link": "/room-allotment", icon : <RoomPreferencesRounded />},
  ]
  const isSmallScreen = useMediaQuery(theme => theme.breakpoints.down('sm')); // Change 'sm' to other breakpoints as needed

  function selectItem(index){
    if (activeNav === index)
      return
    setActiveNav(index)
    navigate(links[index].link)
    if (isSmallScreen)
      props.callback(false)
  }
  
  const [activeNav, setActiveNav] = useState(0);
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
      {/* <Link id='link' to="/admin-home">Home</Link> <br />
      <Link id='link' to="/user-management">User Manager</Link> <br />
      <Link id='link' to="/ailment">Hospital</Link> <br />
      <Link id='link' to="/room-allotment">Room Allotment</Link> <br /> */}
    </Box>
    
  </nav>
);
}
export default SuperuserNavbar;
