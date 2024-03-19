import React, { useState } from 'react';
import { Link ,useLocation, useNavigate} from 'react-router-dom';
import '../HomePage/homepage.css'
import "../asset/sharedAnimation.css"
import { Box, IconButton, Typography, useMediaQuery } from '@mui/material';
import { AccountCircleRounded, CottageRounded, HealthAndSafetyRounded, NotificationsActiveRounded, RoomPreferencesRounded } from '@mui/icons-material';

const ActiveuserNavbar = (props) =>{
  const location = useLocation();
  const navigate= useNavigate()
  const username = (location.state && location.state.username || localStorage.getItem('username'));
  const links= [
    {"title": "Home", "link": "/student-home", icon: <CottageRounded />},
    {"title": "Enrollment", "link": "/register", icon: <AccountCircleRounded />},
    {"title": "Health Care", "link": "/student-ailment", icon: <HealthAndSafetyRounded />},
    {"title": "Check Room", "link": "/student-viewroom", icon : <RoomPreferencesRounded />},
    {"title": "Notifications", "link": "/studentnotifications", icon: <NotificationsActiveRounded />},
  ]
  const [activeNav, setActiveNav] = useState(0);
  const isSmallScreen = useMediaQuery(theme => theme.breakpoints.down('sm')); // Change 'sm' to other breakpoints as needed

  function selectItem(index){
    if (activeNav === index)
      return
    setActiveNav(index)
    navigate(links[index].link)
    if(isSmallScreen)
      props.callback(false)
  }

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
      {/* <Link className='link' to="/student-home">Home</Link> <br />
      <Link className='link' to="/register">Enrolment</Link> <br />
      <Link className='link' to="/student-ailment">Health Care</Link> <br />
      <Link className='link' to="/student-viewroom">Check Room</Link> <br />
      <Link className='link' to="/studentnotifications">Notifications</Link> <br /> */}
    </Box>
    { /* Add other activeuser-specific links as needed */ }
  </nav>
);
}
export default ActiveuserNavbar;
