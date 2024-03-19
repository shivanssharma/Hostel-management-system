import React,{useEffect} from 'react';
import { Link ,useLocation,useNavigate} from 'react-router-dom';
import '../HomePage/homepage.css';
import axios from 'axios';

const ActiveuserNavbar = () =>{
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
    <Link id='link' to="/studenthome">Home</Link> <br />
    <Link id='link' to="/register">Enrolment</Link> <br />
    <Link id='link' to="/studentailment">Health Care</Link> <br />
    <Link id='link' to="/studentviewroom">Check Room</Link> <br />
    <Link id='link' to="/studentnotifications"> Notifications</Link> <br />
    { /* Add other activeuser-specific links as needed */ }

    <button onClick={handleLogout}>Logout</button>
  </nav>
);
}
export default ActiveuserNavbar;
