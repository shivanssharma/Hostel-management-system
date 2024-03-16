import React from "react";
// import HealthNav from "../navbars/navbarHealth";
import Layout from "./Home";
import './homepage.css';
import ActiveuserNavbar from "../sidenavbar/student";
const StudentHome = () => {
    return (
      <div className="layout">
        {/* Home component */}
        <div className="left-content">
          <Layout />
        </div>
        {/* App1 (Sidenavbar) component */}
        <div className="right-content">
          <ActiveuserNavbar />
        </div>
      </div>
    );
  };


  export default StudentHome;