//MainPage.js
import React from "react";
import { Link, useNavigate } from 'react-router-dom';

import { AssignmentIndRounded, CottageRounded,  StorefrontRounded } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";

import "./HorizontalNav/nav_health.css"
import "../asset/sharedAnimation.css"
function Nav2() {
    const navigate= useNavigate()
    const links= [
        {"title": "Home", "link": "/home", icon: <CottageRounded />},
        {"title": "Enrollment", "link": "/register", icon: <AssignmentIndRounded />},
        {"title": "Store", "link": "/stores", icon: <StorefrontRounded />},
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

    // return (
    //     <nav style={{ position: 'relative' }}>
    //         <div>
    //             <h1 className='HealthHome'>HOSTEL MANAGEMENT SYSTEM</h1>
    //             <hr/>
    //         </div>
    //         <div className="navbar">

    //             <Link to="/home"><Button variant="text"><AiFillHome/></Button></Link>

    //             <Link to="/register"><Button variant="text">Enrolment</Button></Link>
    //             <Link to="/stores"><Button variant="text">Store</Button></Link>

    //             <Link to="/notification"><Button variant="text"><AiFillBell/></Button></Link>
    //         </div>
    //         <Outlet />
    //         <p style={{
    //             position: 'absolute',
    //             top: 0,
    //             right: 0,
    //             margin: '70px', 
    //             color:'white',
    //         }}>Welcome! to SSSIHL</p>
            
    //     </nav>
    // );
}

export default Nav2;
