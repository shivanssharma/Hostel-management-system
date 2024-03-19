import React,{useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import '../HomePage/homepage.css';
import axios from 'axios';

const SuperuserNavbar = () => {
  // console.log('usename in superusernav',username)
  const location = useLocation();
  const username = location.state && location.state.username;
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('is_authenticated');
    if (isAuthenticated !== 'true') {
      // Redirect to login page or perform any other action if user is not authenticated
      navigate('/');
    }
  }, [navigate]);

  const handleLogout = () => {
    axios.post('http://127.0.0.1:8000/api/logout/') // Assuming this is the endpoint for logout in your backend
      .then(response => {
        // Handle successful logout response
        console.log(response.data.message);
        localStorage.setItem('is_authenticated', false);
        // Redirect to the index page or perform any other action as needed
        navigate('/'); // Redirect to index page after logout
      })
      .catch(error => {
        // Handle error
        console.error('Logout failed:', error);
      });
  };
  return(
  <nav className="sidebar">
    <div id='image'>
      <img src="images\sssihl_logo.png" alt='SSSIHL'></img>
    </div>
    <hr style={{color:'white'}}/>
    <div className="username-container">
      <h3 className="greeting">Hello, <span className="username">{username}</span></h3>  
    </div>
    <br/><br/>
    <Link id='link' to="/adminhome">Home</Link> <br />
    <Link id='link' to="/usermanagement">User Manager</Link> <br />
    <Link id='link' to="/ailment">Hospital</Link> <br />
    <Link id='link' to="/roomallotment">Room Allotment</Link> <br />
    

    <button onClick={handleLogout}>Logout</button>
  </nav>
);
}
export default SuperuserNavbar;
