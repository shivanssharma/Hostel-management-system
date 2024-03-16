import React from "react";
import HealthNav from "../navbars/navbarHealth";
import Layout from "./Home";
import './homepage.css';
const Home = () => {
    return (
      <div className="layout">
        {/* Home component */}
        <div className="left-content">
          <Layout />
        </div>
        {/* App1 (Sidenavbar) component */}
        <div className="right-content">
          <HealthNav />
        </div>
      </div>
    );
  };


  export default Home;