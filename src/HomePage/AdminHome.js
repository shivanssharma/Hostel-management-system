import React,{useEffect} from "react";
import { useNavigate } from "react-router-dom";
// import HealthNav from "../navbars/navbarHealth";
import Layout from "./Home";
import './homepage.css';


const AdminHome = ({username}) => {
  const navigate=useNavigate();
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('is_authenticated');
    if (isAuthenticated !== 'true') {
      // Redirect to login page or perform any other action if user is not authenticated
      navigate('/');
    }
  }, [navigate]);
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