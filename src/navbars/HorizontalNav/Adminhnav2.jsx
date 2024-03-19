import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import LogoImage from './Bright_Colorful_Playful_Funny_Donuts_Food_Circle_Logo-removebg-preview.png'; // Import your logo image here
import './nav_health.css';
import "../../asset/sharedAnimation.css"
import { ChairRounded, CottageRounded, RoomPreferencesRounded } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
function AdminHorizontalNav2() {
    const navigate= useNavigate()
    const links= [
        {"title": "Home", "link": "/admin-home", icon: <CottageRounded />},
        {"title": "Allocate Room", "link": "/room-allotment", icon: <RoomPreferencesRounded />},
        {"title": "View Room", "link": "/viewroom", icon: <ChairRounded />},
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
                {/* <Link to="/admin-home" className="nav-link">Home</Link>
                <Link to="/room-allotment" className="nav-link">Allocate Room</Link>
                <Link to="/viewroom" className="nav-link">View Room</Link> */}
            </Box>
        </Box>
    );
}

export default AdminHorizontalNav2;




