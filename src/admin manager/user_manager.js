import React,{useEffect,useState} from "react";
import {Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper, Typography,} from "@mui/material";
import axios from "axios";
import { Button } from "@mui/material";
// import ChangePasswordForm from "./change_password";
import { Link } from "react-router-dom";
import './adminmanager.css';
import "../asset/sharedCss.css"
import "../asset/sharedAnimation.css"

import { server, serverPort } from "../utils/Constants";
function Manage(){
    const [usernames, setUsernames] = useState([]);
    // const [selectedUsername, setSelectedUsername] = useState(null);

    useEffect(() => {
        async function fetchUsernames() {
            try {
                const response = await axios.get(server+':'+serverPort+'/api/usernames/');
                setUsernames(response.data.usernames);
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

    // const handlePasswordChangeClick = (username) => {
    //     setSelectedUsername(username);
    //   };

    return(
      <header>
        {/* <AdminHorizontalNavUser /> */}
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
                  <TableCell class="BrasikaFont">Sr No.</TableCell>
                  <TableCell class="BrasikaFont">Name</TableCell>
                  <TableCell class="BrasikaFont">Change password</TableCell>
                  <TableCell class="BrasikaFont">Status</TableCell>
                  <TableCell class="BrasikaFont">Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {usernames.map((username, index) => (
                    <TableRow key={index} id="row">
                        <TableCell className="cell">{index + 1}</TableCell>
                        <TableCell className="cell">{username}</TableCell>
                        <TableCell className="cell">
                          <Link to={`/forgot-password/${username}`} sx={{textAlign: 'left'}}>
                            <Button 
                              className="UM-btn"
                              variant="outlined" 
                              sx={{width: 'fit-content', alignItems: 'left'}}
                            >
                              Forgot password
                            </Button>
                          </Link>
                        </TableCell>
                        <TableCell className="cell"> Status </TableCell>
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