// PasswordResetForm.js

import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './adminmanager.css';
import { Input,Button } from '@mui/material';
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
      const response = await axios.post('http://127.0.0.1:8000/api/password-reset/', formData);
      setMessage(response.data.message);
    } catch (error) {
      setMessage('An error occurred while resetting the password.');
      console.error(error);
    }
  };

  return (
    <div className='style'>
      <h2>Password Reset</h2>
      <form onSubmit={handleSubmit}>
        <h3>Username is {username}</h3>
        <div>
          <label>New Password:</label>
          <Input
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            required
            style={{marginLeft:'75px'}}
          />
        </div>
        <br/>
        <div>
          <label>Confirm New Password:</label>
          <Input
            type="password"
            name="confirmNewPassword"
            value={formData.confirmNewPassword}
            onChange={handleChange}
            required
          />
        </div>
        <Button variant="outlined" type="submit">Reset Password</Button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default PasswordResetForm;




