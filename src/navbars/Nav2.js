//MainPage.js
import React from "react";
import { Link, Outlet } from 'react-router-dom';
import { Button } from '@mui/material';
import { AiFillHome, AiFillBell } from "react-icons/ai";

function Nav2() {
    return (
        <nav style={{ position: 'relative' }}>
            <div>
                <h1 className='HealthHome'>HOSTEL MANAGEMENT SYSTEM</h1>
                <hr/>
            </div>
            <div className="navbar">

                <Link to="/home"><Button variant="text"><AiFillHome/></Button></Link>

                <Link to="/register"><Button variant="text">Enrolment</Button></Link>
                <Link to="/stores"><Button variant="text">Store</Button></Link>

                <Link to="/notification"><Button variant="text"><AiFillBell/></Button></Link>
            </div>
            <Outlet />
            <p style={{
                position: 'absolute',
                top: 0,
                right: 0,
                margin: '70px', 
                color:'white',
            }}>Welcome! to SSSIHL</p>
            
        </nav>
    );
}

export default Nav2;
