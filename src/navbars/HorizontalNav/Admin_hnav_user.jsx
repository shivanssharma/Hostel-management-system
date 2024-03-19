import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import LogoImage from './Bright_Colorful_Playful_Funny_Donuts_Food_Circle_Logo-removebg-preview.png'; // Import your logo image here
import './nav_health.css';
import { CottageRounded } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
function AdminHorizontalNavUser() {
    const navigate= useNavigate()
    const links= [
        {"title": "Home", "link": "/admin-home", icon: <CottageRounded />}
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
        // <div>
        //     <Navbar expand="lg" className="bg-body-tertiary">
        //         <Container>
        //             <Navbar.Brand as={Link} to="/admin-home">
        //                 <img src={LogoImage} alt="Logo" className="logo hide" style={{width:'18.5%'}}/>
        //             </Navbar.Brand>
        //             <Navbar.Toggle aria-controls="basic-navbar-nav" />
        //             <Navbar.Collapse id="basic-navbar-nav">
        //                 <Nav className="me-auto">
        //                     <Link to="/admin-home" className="nav-link">Home</Link>
        //                 </Nav>
        //             </Navbar.Collapse>
        //         </Container>
        //     </Navbar>
        //     <Outlet />
        // </div>
    );
}

export default AdminHorizontalNavUser;




