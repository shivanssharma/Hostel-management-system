import React,{useEffect,useState} from "react";
import {Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper, Typography,Snackbar} from "@mui/material";
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
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  // const [flag, setFlag] = useState(false)

    async function fetchUsernames() {
     
      try {
        const response = await axios.get(`${server}:${serverPort}/api/usernames/`);
        // Todo: what does this mean
        setUsernames(response.data.users); // Update this line
        
      } catch (error) {
        console.error('Error fetching usernames:', error);
      }
      
    }
  
  const handleDeleteUser = async (username) => {
    
    try {
      await axios.delete(`${server}:${serverPort}/api/delete-user/${username}/`);
      console.log("Usernames before deletion:", usernames);
      // setUsernames(usernames.filter((name) => name !== username));
      fetchUsernames();
      
      
      
      console.log("Usernames after deletion:", usernames);
      setSnackbarMessage("User Deleted Successfully");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error deleting user:", error);
      // alert("");
      setSnackbarMessage("Failed to delete user");
        setSnackbarOpen(true);
    }
    
  };
  console.log(usernames)
  useEffect(() => {
    fetchUsernames();
  }, []);

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <header>
      {/* Todo: Is this required */}
      <AdminHorizontalNavUser />
      <div className="CS-Style">
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
                <TableCell class="BrasikaFont">Role</TableCell>
                <TableCell class="BrasikaFont">Change Role</TableCell>
                <TableCell class="BrasikaFont">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {usernames && usernames.map((user, index) => (
                <TableRow key={index} id="row">
                  <TableCell className="cell">{index + 1}</TableCell>
                  {/* Todo: Check this */}
                  {/* <TableCell>{username.username}</TableCell> */}  
                  <TableCell className="cell">{user.username}</TableCell>
                  <TableCell className="cell">
                    {/* <Link to={`/forgot-password/${username.username}`} sx={{textAlign: 'left'}}> */}
                    {/* Todo: Check this */}
                    <Link to={`/forgot-password/${user.username}`} sx={{textAlign: 'left'}}>
                      <Button 
                        className="UM-btn"
                        variant="outlined" 
                        sx={{width: 'fit-content', alignItems: 'left'}}
                      >
                        Change password
                      </Button>
                    </Link>
                  </TableCell>
                  <TableCell className="cell">
                    {/* Todo: check the status */}
                    {user.is_superuser ? 'Admin' : 'Regular user'}  - {user.is_staff ? 'Staff' : 'Non-Staff'}- {user.is_active ? 'Active' : 'Inactive'}
                  </TableCell>
                  <TableCell className="cell">
                    <Link to={`/status/${user.username}`}>
                      <Button 
                        className="UM-btn"
                        variant="outlined" 
                        sx={{width: 'fit-content', alignItems: 'left'}}
                      >
                        Update Role
                      </Button>
                    </Link>
                  </TableCell>
                  <TableCell className="cell">
                    <Button
                      className="UM-btn"
                      variant="outlined"
                      onClick={() => handleDeleteUser(user.username)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          message={snackbarMessage}
          severity="success"
        />
      </div>
    </header>
  );
}

export default Manage;
//---------------------------------------------------------------------
