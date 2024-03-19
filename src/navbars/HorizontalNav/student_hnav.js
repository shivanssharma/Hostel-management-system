import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import LogoImage from './Bright_Colorful_Playful_Funny_Donuts_Food_Circle_Logo-removebg-preview.png'; // Import your logo image here
import './nav_health.css';
import "../../asset/sharedAnimation.css"
import { CoronavirusRounded, CottageRounded, LocalHospitalRounded, WidgetsRounded } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
function StudentHorizontalNav() {
    const navigate= useNavigate()
    const links= [
        {"title": "Home", "link": "/student-home", icon: <CottageRounded />},
        {"title": "Ailment", "link": "/student-ailment", icon: <CoronavirusRounded />},
        {"title": "Hospital Visit", "link": "/hospital-visit", icon: <LocalHospitalRounded />},
        {"title": "Hostel Assets", "link": "/student-asset", icon: <WidgetsRounded />},
      ]
    return (
        <Box className="TN-container">
            <img src={LogoImage} alt="Logo" className="TN-logo hide" />
            <Box className="TN-MenuContainer">
                {
                    links.map((item, index)=>(
                        <Box className="TN-links floatRightIn" key={index} onClick={() => navigate(item.link)}>
                            {item.icon  ?
                                <IconButton className="TN-icons">
                                    {item.icon}
                                </IconButton>
                                : null
                            }
                            <Link to={item.link} className="linkText" >{item.title}</Link>
                        </Box>
                    ))
                }
                {/* <Link to="/student-home" className="nav-link">Home</Link>
                <Link to="/student-asset" className="nav-link">Hostel Assets</Link>
                <Link to="/student-ailment" className="nav-link">Ailment</Link>
                <Link to="/hospital-visit" className="nav-link">Hospital Visit</Link> */}
            </Box>
        </Box>
    );
}

export default StudentHorizontalNav;








