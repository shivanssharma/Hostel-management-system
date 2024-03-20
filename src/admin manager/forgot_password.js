// PasswordResetForm.js

import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './adminmanager.css';
import { Input,Button,Typography,Box } from '@mui/material';
import { server, serverPort } from '../utils/Constants';
const PasswordResetForm = () => {
  const { username } = useParams();
  const [formData, setFormData] = useState({
    username: username,
    newPassword: '',
    confirmNewPassword: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmNewPassword) {
      setMessage('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post(server+':'+serverPort+'/api/password-reset/', formData);
      setMessage(response.data.message);
    } catch (error) {
      setMessage('An error occurred while resetting the password.');
      console.error(error);
    }
  };

  return (
    <div className='FP-Style'>
      <Typography variant="h2" sx={{pb: '5%'}}>
          <text className="BrasikaFont floatRightIn grayFont">
            Password Reset
          </text>
      </Typography>
      
      <form onSubmit={handleSubmit}>
        <h3 className="BrasikaFont floatRightIn grayFont" >Username is {username}</h3>
        <Box className="CS-FormContainer">
          <Box sx={{m: '5%'}} className="CS-FormGroup">
            <div>
              <label className="BrasikaFont floatRightIn grayFont">New Password:</label>
              <Input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                required
                // style={{marginLeft:'75px'}}
              />
            </div>
          </Box>
          <Box sx={{m: '5%'}} className="CS-FormGroup">
            <div>
              <label className="BrasikaFont floatRightIn grayFont">Confirm New Password:</label>
              <Input
                type="password"
                name="confirmNewPassword"
                value={formData.confirmNewPassword}
                onChange={handleChange}
                required
              />
            </div>
          </Box>
      </Box>
        <Button className="floatRightIn" sx={{width: '50%', p: '3%'}} variant="outlined" type="submit">Reset Password</Button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default PasswordResetForm;




