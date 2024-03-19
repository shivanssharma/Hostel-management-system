import React, { useState,useEffect } from 'react';
import { useNavigate,Link } from 'react-router-dom';                     
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
//import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { ThemeProvider,createTheme } from '@mui/material/styles';
// import AdminHome from '../HomePage/AdminHome';
import './login.css';
//import axios from 'axios';
const defaultTheme=createTheme();


export default function SignInSide() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState(null);
  const navigate = useNavigate();

  const getCsrfToken = () => {
    const csrfCookie = document.cookie
      .split('; ')
      .find((cookie) => cookie.startsWith('csrftoken='));
    return csrfCookie ? csrfCookie.split('=')[1] : '';
  };
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('is_authenticated');
    if (isAuthenticated !== 'false') {
      // Redirect to login page or perform any other action if user is not authenticated
      navigate('/');
    }
  }, [navigate]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("hello")
    try {
      // Save username to local storage
      localStorage.setItem('username', formData.username);
      
      const response = await fetch('http://127.0.0.1:8000/api/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCsrfToken(),
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password
        })
      });
  
      if (!response.ok) {
        // If response is not successful, throw an error
        throw new Error('Failed to login');
      }
      
      const responseData = await response.json();
      localStorage.setItem('token', responseData.token); // Store token securely
      localStorage.setItem('is_authenticated', true);
      localStorage.setItem('is_superuser', responseData.is_superuser);
      localStorage.setItem('is_staff', responseData.is_staff);
      localStorage.setItem('is_active', responseData.is_active);
      
      // Save username to local storage
      localStorage.setItem('username', formData.username);
      // Navigate to home page after successful login
      if (responseData.is_superuser) {
        navigate('/adminhome', { state: { username: formData.username } });
      } 
      else if (responseData.is_staff) {
        navigate('/adminhome',{ state: { username: formData.username } });
      } 
      else {
        navigate('/studenthome',{ state: { username: formData.username } });
      }
      console.log("Successful login");
    } catch (error) {
      console.error('Login failed:', error);
      setLoginError('Invalid username or password');
      // Display a user-friendly error message (e.g., "Invalid username or password")
    }
  };

  const handleUsernameChange = (event) => {
    setFormData({ ...formData, username: event.target.value });
  };

  const handlePasswordChange = (event) => {
    setFormData({ ...formData, password: event.target.value });
  };
  
  
  return (
    <ThemeProvider theme={defaultTheme}>
    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
      <div className='grid-item'>
        <Grid />
      </div>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={formData.username}
              onChange={handleUsernameChange}
              // required // Indicate required field
              helperText={!formData.username && 'Username is required'} // Set error text
            />
            <TextField
              margin="normal"
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handlePasswordChange}
              helperText={!formData.password && 'Password is required'}
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 4, mb: 2 }}>
              Sign In
            </Button>
            {loginError && <p style={{ color: 'red' }}>{loginError}</p>}
            <Grid container>
              <Grid item xs>
                {/* <Link href="#" variant="body2">
                  Forgot password?
                </Link> */}
              </Grid>
              <Grid item>
                <Link component={Link} to="/signup" variant="body2">
                  Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
    {/* <AdminHome username={formData.username} /> */}
    </ThemeProvider>
  );
}


