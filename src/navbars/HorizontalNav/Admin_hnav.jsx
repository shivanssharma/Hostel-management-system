import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import LogoImage from './Bright_Colorful_Playful_Funny_Donuts_Food_Circle_Logo-removebg-preview.png'; // Import your logo image here
import './nav_health.css';
import "../../asset/sharedAnimation.css"
import { CoronavirusRounded, CottageRounded, HomeRepairServiceRounded, LocalHospitalRounded, VaccinesRounded, WidgetsRounded } from "@mui/icons-material";
// import { HospitalRounded,EventAvailableRounded } from '@material-ui/icons';
import { Box, IconButton } from "@mui/material";
function AdminHorizontalNav() {
    const navigate= useNavigate()
    const links= [
        {"title": "Home", "link": "/admin-home", icon: <CottageRounded />},
        {"title": "Ailment", "link": "/ailment", icon: <CoronavirusRounded />},
        {"title": "Medicine", "link": "/medicine", icon: <VaccinesRounded />},
        {"title": "Hostel Assets", "link": "/asset", icon: <WidgetsRounded />},
        {"title": "Hospital visit", "link": "/admin-hospital-visit", icon: <LocalHospitalRounded />},
        {"title": "Asset Bookings", "link": "/admin-asset-view", icon: <HomeRepairServiceRounded />},
    ]
    return (
        <Box className="TN-container">
            <img src={LogoImage} alt="Logo" className="TN-logo hide" />
            {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
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
                {/* <Link to="/admin-home" className="nav-link">Home</Link>
                <Link to="/ailment" className="nav-link">Ailment</Link>
                <Link to="/medicine" className="nav-link">Medicine</Link>
                <Link to="/asset" className="nav-link">Hostel Assets</Link>
                <p></p> */}
            </Box>
            {/* <Outlet /> */}
        </Box>
    );
}

export default AdminHorizontalNav;




