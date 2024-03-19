import React from "react";
// import HealthNav from "../navbars/navbarHealth";
import Layout from "./Home";
import './homepage.css';

const AdminHome = ({username}) => {
  console.log('in admin home:',username)
    return (
      <div className="layout">
        <div className="" sx={{ width: '100%'}}>
          <Layout />
        </div>
      </div>
    );
  };


  export default AdminHome;