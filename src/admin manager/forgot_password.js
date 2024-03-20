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
      
      <form style={{width: '80%'}} onSubmit={handleSubmit}>
        <h3 className="BrasikaFont floatRightIn grayFont" >Username:  {username}</h3>
        <Box className="FP-FormContainer">
          <Box sx={{m: '2%'}} className="FP-FormGroup">
            <div>
              <label className="BrasikaFont floatRightIn grayFont">New Password:</label>
              <Input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                required
                style={{marginLeft: '3%'}}
              />
            </div>
          </Box>
          <Box sx={{m: '2%'}} className="FP-FormGroup">
            <div>
              <label className="BrasikaFont floatRightIn grayFont">Confirm New Password:</label>
              <Input
                type="password"
                name="confirmNewPassword"
                value={formData.confirmNewPassword}
                onChange={handleChange}
                required
                style={{marginLeft: '3%'}}
              />
            </div>
          </Box>
      </Box>
      <Button className="floatRightIn" sx={{width: '20%', p: '1.5%'}} variant="outlined" type="submit">Reset Password</Button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default PasswordResetForm;




