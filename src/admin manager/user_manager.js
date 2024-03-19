import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import axios from "axios";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import './adminmanager.css';
import AdminHorizontalNavUser from "../navbars/HorizontalNav/Admin_hnav_user";

function Manage() {
  const [usernames, setUsernames] = useState([]);

  useEffect(() => {
    async function fetchUsernames() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/usernames/');
        setUsernames(response.data.users); // Update this line
      } catch (error) {
        console.error('Error fetching usernames:', error);
      }
    }

    fetchUsernames();
  }, []);

  const handleDeleteUser = async (username) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/delete-user/${username}/`);
      setUsernames(usernames.filter((name) => name !== username));
      alert("User deleted successfully");
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user");
    }
  };

  return (
    <header>
      <AdminHorizontalNavUser />
      <div className="style_three">
        <h1 style={{ justifyContent: 'center', display: 'flex' }}>User manager</h1>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Sr No.</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Change password</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>change Status</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {usernames.map((username, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{username.username}</TableCell>
                  <TableCell>
                    <Link to={`/forgotpassword/${username.username}`}>
                      <Button variant="text">Forgot password</Button>
                    </Link>
                  </TableCell>
                  <TableCell>
                    {username.is_superuser ? 'Admin' : 'Regular user'} - {username.is_active ? 'Active' : 'Inactive'}
                  </TableCell>
                  <TableCell>
                  <Link to={`/status/${username.username}`}>
                    <Button variant="text">Update Status</Button>
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Button variant="outlined" onClick={() => handleDeleteUser(username)}>
                      Delete
                    </Button>
                  </TableCell>
                  
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </header>
  );
}

export default Manage;


//------------------------------------------------------------------------
// import React,{useEffect,useState} from "react";
// import {Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,} from "@mui/material";
// import axios from "axios";
// import { Button } from "@mui/material";
// // import ChangePasswordForm from "./change_password";
// import { Link } from "react-router-dom";
// import './adminmanager.css';
// import AdminHorizontalNavUser from "../navbars/HorizontalNav/Admin_hnav_user";
// function Manage(){
//     const [usernames, setUsernames] = useState([]);
//     // const [selectedUsername, setSelectedUsername] = useState(null);

//     useEffect(() => {
//         async function fetchUsernames() {
//             try {
//                 const response = await axios.get('http://127.0.0.1:8000/api/usernames/');
//                 setUsernames(response.data.usernames);
//             } catch (error) {
//                 console.error('Error fetching usernames:', error);
//             }
//         }

//         fetchUsernames();
//     }, []);
//     const handleDeleteUser = async (username) => {
//         try {
//           await axios.delete(`http://127.0.0.1:8000/api/delete-user/${username}/`);
//           // If deletion is successful, update the usernames list to reflect the change
//           setUsernames(usernames.filter((name) => name !== username));
//           alert("User deleted successfully");
//         } catch (error) {
//           console.error("Error deleting user:", error);
//           alert("Failed to delete user");
//         }
//       };

//     // const handlePasswordChangeClick = (username) => {
//     //     setSelectedUsername(username);
//     //   };

//     return(
//       <header>
//         <AdminHorizontalNavUser />
//         <div className="style_three">
//         <h1 style={{justifyContent:'center',display:'flex'}}>User manager</h1>
//         <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Sr No.</TableCell>
//               <TableCell>Name</TableCell>
//               <TableCell>Change password</TableCell>
//               <TableCell>Status</TableCell>
//               <TableCell>Delete</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {usernames.map((username, index) => (
//                 <TableRow key={index}>
//                     <TableCell>{index + 1}</TableCell>
//                     <TableCell>{username.username}</TableCell>
//                     <TableCell><Link to={`/forgotpassword/${username}`}><Button variant="text" >
//                         Forgot password
//                     </Button></Link></TableCell>
//                     <TableCell>

//                     {username.is_superuser ? 'Superuser' : 'Regular user'} - {username.is_active ? 'Active' : 'Inactive'}
                  
//                     </TableCell>
//                     <br/>
//                     <Button
//                     variant="outlined"
//                     onClick={() => handleDeleteUser(username)}
//                     >
//                     Delete
//                   </Button>
//                 </TableRow>
//                 ))}         
//           </TableBody>
//         </Table>
//       </TableContainer>
      
//         </div>
//       </header>
//     );
// }
// export default Manage;