// PasswordResetForm.js

import React, { useState } from 'react';
import axios from 'axios';
import { useParams,useNavigate } from 'react-router-dom';
import './adminmanager.css';
import { Input,Button,Typography, Box } from '@mui/material';
import { server, serverPort } from '../utils/Constants';
import AdminHorizontalNavUser from '../navbars/HorizontalNav/Admin_hnav_user';

const  UpdateUserStatus= () => {
  const { username } = useParams();
  const [isSuperuser, setIsSuperuser] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isStaff, setIsStaff] = useState(false);
  const [message, setMessage] = useState('');
  const navigate=useNavigate();
  const handleIsSuperuserChange = (event) => {
   setIsSuperuser(event.target.checked);
  }

  const handleIsActiveChange = (event) => {
    setIsActive(event.target.checked);
  } 
  const handleIsStaffChange = (event) => {
    setIsStaff(event.target.checked);
  } 
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(server+":"+serverPort+'/api/update-user-status/', {
        username: username,
        is_superuser: isSuperuser,
        is_staff:isStaff,
        is_active: isActive
      });
      setMessage(response.data.message);
      navigate('/user-management');
    } catch (error) {
      setMessage('An error occurred while updating user status');
    }
  }
    

  return (
    <header>
    <AdminHorizontalNavUser/>
    <div className='CS-Style'>
      <Typography variant="h2" sx={{pb: '5%'}}>
          <text className="BrasikaFont floatRightIn grayFont">
            Status Reset
          </text>
      </Typography>
  
      <form onSubmit={handleSubmit}>
        <h3 className="BrasikaFont floatRightIn grayFont" >Username is {username}</h3>
        <Box className="CS-FormContainer">
          <Box sx={{m: '5%'}} className="CS-FormGroup">
            <label className="BrasikaFont floatRightIn grayFont" >Super user :</label>
            <Input
              type="checkbox"
              name="Superuser"
              checked={isSuperuser}
              onChange={handleIsSuperuserChange}
              // style={{marginLeft:'20%'}}
            />
          </Box>
          <Box sx={{m: '5%'}} className="CS-FormGroup">
            <label className="BrasikaFont floatRightIn grayFont" >Staff</label>
            <Input
              type="checkbox"
              name="staff"
              checked={isActive} 
              onChange={handleIsStaffChange}
              // style={{marginLeft:'20%'}}
            />
          </Box>
          <Box sx={{m: '5%'}} className="CS-FormGroup">
            <label className="BrasikaFont floatRightIn grayFont" >Active</label>
            <Input
              type="checkbox"
              name="active"
              checked={isActive} 
              onChange={handleIsActiveChange}
              // style={{marginLeft:'20%'}}
            />
          </Box>
        </Box>
        <Button className="floatRightIn" sx={{width: '50%', p: '3%'}} variant="outlined" type="submit">Reset Status</Button>
      </form>
      {message && <p>{message}</p>}
    </div>
    </header>
  );
};

export default UpdateUserStatus;





// import React, { useState } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';

// const UpdateUserStatus = () => {
//   const [isSuperuser, setIsSuperuser] = useState(false);
//   const [isActive, setIsActive] = useState(false);
//   const [message, setMessage] = useState('');
//   const { username } = useParams();
  

//   const handleIsSuperuserChange = (event) => {
//     setIsSuperuser(event.target.checked);
//   }

//   const handleIsActiveChange = (event) => {
//     setIsActive(event.target.checked);
//   }

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       const response = await axios.post(server+':'+serverPort+'/api/update-user-status/', {
//         username: username,
//         is_superuser: isSuperuser,
//         is_active: isActive
//       });
//       setMessage(response.data.message);
//     } catch (error) {
//       setMessage('An error occurred while updating user status');
//     }
//   }

//   return (
//     <div>
//       <h2>Update User Status</h2>
//       <form onSubmit={handleSubmit}>
//         <h3>Username :{username}</h3>
//         <div>
//           <label>
//             Is Superuser:
//             <input type="checkbox" checked={isSuperuser} onChange={handleIsSuperuserChange} />
//           </label>
//         </div>
//         <div>
//           <label>
//             Is Active:
//             <input type="checkbox" checked={isActive} onChange={handleIsActiveChange} />
//           </label>
//         </div>
//         <button type="submit">Update Status</button>
//       </form>
//       {message && <p>{message}</p>}
//     </div>
//   );
// }

// export default UpdateUserStatus;