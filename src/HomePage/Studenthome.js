import React from "react";
// import HealthNav from "../navbars/navbarHealth";
import Layout from "./Home";
import './homepage.css';
import ActiveuserNavbar from "../sidenavbar/student";
import { Box } from "@mui/material";
const StudentHome = () => {
  // const [open, setOpen]
    return (
      <Box className="layout">
        {/* Home component */}
        <Box className="" sx={{ width: '100%'}}>
          <Layout />
        </Box>
        {/* App1 (Sidenavbar) component */}
        {/* <Box className="" sx={{border: '2px solid black'}}>
          <ActiveuserNavbar />
        </Box> */}
      </Box>
    );
  };


  export default StudentHome;