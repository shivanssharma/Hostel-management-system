import React,{useEffect,useState} from "react";
import {Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper, Typography,} from "@mui/material";
import axios from "axios";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import './adminmanager.css';
import "../asset/sharedCss.css"
import "../asset/sharedAnimation.css"
import AdminHorizontalNavUser from "../navbars/HorizontalNav/Admin_hnav_user";
import { server, serverPort } from "../utils/Constants";

function Manage() {
  const [usernames, setUsernames] = useState([]);

  useEffect(() => {
    async function fetchUsernames() {
      try {
        const response = await axios.get(server+':'+serverPort+'/api/usernames/');
        // Todo: what does this mean
        setUsernames(response.data.usernames); // Update this line
      } catch (error) {
        console.error('Error fetching usernames:', error);
      }
    }

    fetchUsernames();
  }, []);
  
  const handleDeleteUser = async (username) => {
    try {
      await axios.delete(`${server}:${serverPort}/api/delete-user/${username}/`);
      // If deletion is successful, update the usernames list to reflect the change
      setUsernames(usernames.filter((name) => name !== username));
      alert("User deleted successfully");
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user");
    }
  };

  return (
    <header>
      {/* Todo: Is this required */}
      <AdminHorizontalNavUser />
      <div className="mainContainer">
        <Typography variant="h3" className="UM-title grayFont">
          <text className="BrasikaFont floatRightIn">
            User manager
          </text>
        </Typography>
        <TableContainer className="floatRightIn" component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell class="BrasikaFont" style={{padding: '2%'}}>No.</TableCell>
                <TableCell class="BrasikaFont">Name</TableCell>
                <TableCell class="BrasikaFont">Change password</TableCell>
                <TableCell class="BrasikaFont">Status</TableCell>
                <TableCell class="BrasikaFont">Change Status</TableCell>
                <TableCell class="BrasikaFont">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {usernames.map((username, index) => (
                <TableRow key={index} id="row">
                  <TableCell className="cell">{index + 1}</TableCell>
                  {/* Todo: Check this */}
                  {/* <TableCell>{username.username}</TableCell> */}  
                  <TableCell className="cell">{username.username}</TableCell>
                  <TableCell className="cell">
                    {/* <Link to={`/forgot-password/${username.username}`} sx={{textAlign: 'left'}}> */}
                    {/* Todo: Check this */}
                    <Link to={`/forgot-password/${username.username}`} sx={{textAlign: 'left'}}>
                      <Button 
                        className="UM-btn"
                        variant="outlined" 
                        sx={{width: 'fit-content', alignItems: 'left'}}
                      >
                        Forgot password
                      </Button>
                    </Link>
                  </TableCell>
                  <TableCell className="cell">
                    {/* Todo: check the status */}
                    {username.is_superuser ? 'Admin' : 'Regular user'} - {username.is_active ? 'Active' : 'Inactive'}
                  </TableCell>
                  <TableCell className="cell">
                    <Link to={`/status/${username.username}`}>
                      <Button 
                        className="UM-btn"
                        variant="outlined" 
                        sx={{width: 'fit-content', alignItems: 'left'}}
                      >
                        Update Status
                      </Button>
                    </Link>
                  </TableCell>
                  <TableCell className="cell">
                    <Button
                      className="UM-btn"
                      variant="outlined"
                      onClick={() => handleDeleteUser(username)}
                    >
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