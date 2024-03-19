// PasswordResetForm.js

import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './adminmanager.css';
import { Input,Button } from '@mui/material';
const  UpdateUserStatus= () => {
  const { username } = useParams();
  const [isSuperuser, setIsSuperuser] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [message, setMessage] = useState('');
  const handleIsSuperuserChange = (event) => {
   setIsSuperuser(event.target.checked);
  }

  const handleIsActiveChange = (event) => {
    setIsActive(event.target.checked);
  } 
  

 

  const handleSubmit = async (event) => {
        event.preventDefault();
        try {
          const response = await axios.post('http://127.0.0.1:8000/api/update-user-status/', {
            username: username,
            is_superuser: isSuperuser,
            is_active: isActive
          });
          setMessage(response.data.message);
        } catch (error) {
          setMessage('An error occurred while updating user status');
        }
      }
    

  return (
    <div className='style'>
      <h2>Password Reset</h2>
      <form onSubmit={handleSubmit}>
        <h3>Username is {username}</h3>
        <div>
          <label>Super user :</label>
          <Input
            type="checkbox"
            name="Superuser"
            checked={isSuperuser}
            onChange={handleIsSuperuserChange}
           
            style={{marginLeft:'75px'}}
          />
        </div>
        <br/>
        <div>
          <label>Active</label>
          <Input
            type="checkbox"
            name="active"
            checked={isActive} 
            onChange={handleIsActiveChange}
          />
        </div>
        <Button variant="outlined" type="submit">Reset Password</Button>
      </form>
      {message && <p>{message}</p>}
    </div>
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
//       const response = await axios.post('http://127.0.0.1:8000/api/update-user-status/', {
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