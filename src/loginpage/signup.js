import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import { useNavigate } from 'react-router-dom'

import "../asset/sharedAnimation.css"
import { server, serverPort } from '../utils/Constants';

export default function SignUpSide() {
  const [username, setUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState('');
  const navigate= useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Password matching validation
    if (newPassword !== confirmPassword) {
      console.error("Passwords don't match");
      setSnackBarMessage("Passwords don't match");
      setSnackbarOpen(true);

      return;
    }
  
    const formData = {
      username: username,
      newpassword: newPassword,
      confirmpassword: confirmPassword
    };
  
    try {
      const response = await fetch(server+':'+serverPort+'/api/signup/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        // Handle success, e.g., redirect user to login page
        setSnackBarMessage("SignUp successful");
        setSnackbarOpen(true);
        // Going back to Login Page to Login
        setTimeout(() => {
          setSnackBarMessage("Taking you to Login Page.");
          setSnackbarOpen(true);
          setTimeout(() => {
            navigate("/")
          }, 2000)
        }, 1000)
      } else {
        // Handle error
        console.error('Signup failed');
        setSnackBarMessage("SignUp failed");
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error('Error:', error);
      setSnackBarMessage("SignUp error");
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <Box>
    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
      <div className='grid-item fadeIn'>
      <Grid />
      </div>
        <Grid 
          sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: '2%' }} 
          item xs={12} sm={8} md={5} component={Paper} elevation={6} square
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar className='zoomIn' sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />                                     
            </Avatar> 
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}> 
              <TextField
                className="floatUpIn"
                margin="normal"
                fullWidth
                id="username"
                label="UserName"
                name="username"
                autoComplete="username"
                autoFocus
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                className="floatUpIn"
                margin="normal"
                fullWidth
                name="newpassword"
                label="New Password"
                type="password"
                id="newpassword"
                autoComplete="current-password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <TextField
                className="floatUpIn"
                margin="normal"
                fullWidth
                name="confirmpassword"
                label="Confirm Password"
                type="password"
                id="confirmpassword"
                autoComplete="current-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <Button
                className="floatUpIn"
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 4, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container>
                <Grid item xs>
                  <Snackbar 
                    open={snackbarOpen} 
                    autoHideDuration={3000} 
                    onClose={handleSnackbarClose} 
                    message={snackBarMessage}>
                  </Snackbar>
                </Grid>
                <Grid item className="floatUpIn">
                  <Link component={RouterLink} to="/" variant="body2">
                    {"Already have account? Sign In"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
     
    </Box>
  );
}



