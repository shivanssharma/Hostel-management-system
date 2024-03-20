import React from "react";
import { Link, useNavigate } from 'react-router-dom';
// import Container from 'react-bootstrap/Container';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
import LogoImage from './Bright_Colorful_Playful_Funny_Donuts_Food_Circle_Logo-removebg-preview.png'; // Import your logo image here
import './nav_health.css';
import { ChairRounded, CottageRounded } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
function StudentHorizontalNav2() {
    const navigate= useNavigate()
    const links= [
        {"title": "Home", "link": "/student-home", icon: <CottageRounded />},
        {"title": "Check Room", "link": "/student-viewroom", icon: <ChairRounded />},
    ]
    return (
        <Box className="TN-container">
            <img src={LogoImage} alt="Logo" className="TN-logo hide" />
            <Box className="TN-MenuContainer">
                {
                    links.map((item, index) => (
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
            </Box>
            {/* <Outlet /> */}
        </Box>
    );
}

export default StudentHorizontalNav2;
