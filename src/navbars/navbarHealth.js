import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import { Box, IconButton, Typography } from '@mui/material';
import { CoronavirusRounded, CottageRounded, LocalHospitalRounded, NotificationsActiveRounded, WidgetsRounded } from "@mui/icons-material";
import "./HorizontalNav/nav_health.css"

function HealthNav() {
    const navigate= useNavigate()
    const links= [
        {"title": "Home", "link": "/home", icon: <CottageRounded />},
        {"title": "Ailment", "link": "/ailment", icon: <CoronavirusRounded />},
        {"title": "Asset", "link": "/asset", icon: <WidgetsRounded />},
        {"title": "Hospital visit", "link": "/hospital-visit", icon: <LocalHospitalRounded />},
        {"title": "Notification", "link": "/notification", icon: <NotificationsActiveRounded />},
      ]
    return (
        <Box className="TN-container">
            <Box className="logoTitle">
                <Typography variant="h4">
                    <text className="BrasikaFont floatRightIn grayFont">
                        Hostel Management System
                    </text>
                </Typography>
            </Box>
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
            </Box>
            {/* <Outlet /> */}
        </Box>
    );
}

export default HealthNav;
