import React from "react";
// import HealthNav from "../navbars/navbarHealth";
import Layout from "./Home";
import './homepage.css';
import SuperuserNavbar from "../sidenavbar/admin";
const AdminHome = ({username}) => {
  console.log('in admin home:',username)
    return (
      <div className="layout">
        {/* Home component */}
        <div className="left-content">
          <Layout />
        </div>
        {/* App1 (Sidenavbar) component */}
        <div className="right-content">
          <SuperuserNavbar username={username}/>
        </div>
      </div>
    );
  };


  export default AdminHome;