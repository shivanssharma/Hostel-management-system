import React from "react";
// import HealthNav from "../navbars/navbarHealth";
import Layout from "./Home";
import './homepage.css';
import StaffuserNavbar from "../sidenavbar/staff";
const StaffHome = () => {
    return (
      <div className="layout">
        {/* Home component */}
        <div className="left-content">
          <Layout />
        </div>
        {/* App1 (Sidenavbar) component */}
        <div className="right-content">
          <StaffuserNavbar />
        </div>
      </div>
    );
  };


  export default StaffHome;