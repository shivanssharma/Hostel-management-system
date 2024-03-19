import React, { useState, useEffect } from "react";
import {FormControl,InputLabel,Select,MenuItem,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper, Box, Typography,} from "@mui/material";
import axios from "axios";
import {Button} from "@mui/material";
import './style_room.css';
import "../asset/sharedAnimation.css"
import AdminHorizontalNav2 from "../navbars/HorizontalNav/Adminhnav2";
import { server, serverPort } from "../utils/Constants";

function AdminView() {
  const [selectedFloor, setSelectedFloor] = useState("");
  const [selectedRoom, setSelectedRoom] = useState("");
  const [list, setStudentList] = useState([]);
  const [flag, setFlag] = useState(false)
  // console.log(list);
  const handleFloorChange = (event) => {
    const Floor = event.target.value;
    setSelectedFloor(Floor);
  };

  const handleRoomChange = (event) => {
    const Room = event.target.value;
    setSelectedRoom(Room);
  };
 
  useEffect(() => {
    if (selectedFloor !== "" && selectedRoom !== "" && !flag) {
      axios
        .get(`${server}:${serverPort}/api/list/${selectedFloor}/${selectedRoom}/`)
        .then((response) => {
          setStudentList(response.data);
          // setFlag(true)
          console.log("hello world, we got list data: ");
          console.log(response.data);
        })
        .catch((error) => {
          console.error("Error fetching Room list:", error);
        });
    }
  });
  const handleSubmit = () => {
    setFlag(true); // Set flag to true to trigger useEffect
  };
  // }, [selectedFloor, selectedRoom]);
   console.log(selectedFloor);
   console.log(selectedRoom);

  return (
    <Box>
      <AdminHorizontalNav2 />
      <Box className="AV-style">
        {list &&
          <Box sx={{width: '100%'}}>
            <Typography variant="h3" className="UM-title grayFont">
              <text className="BrasikaFont floatRightIn">
                Room list
              </text>
            </Typography>

            <Box className="AV-dualInput floatRightIn">
              <FormControl className="AV-floor">
                <InputLabel id="label-id_1">Floor</InputLabel>
                <Select
                  labelId="select-id_1"
                  id="id_1"
                  value={selectedFloor}
                  onChange={handleFloorChange}
                >
                  <MenuItem value="" disabled>
                    Select floor
                  </MenuItem>
                  <MenuItem value="a">a</MenuItem>
                  <MenuItem value="b">b</MenuItem>
                  <MenuItem value="c">c</MenuItem>
                </Select>
              </FormControl>

              <FormControl className="AV-room">
                <InputLabel id="label-id_2">Room number</InputLabel>
                <Select
                  labelId="select-id_2"
                  id="id_2"
                  value={selectedRoom}
                  onChange={handleRoomChange}
                >
                  <MenuItem value="">Select room number</MenuItem>
                  <MenuItem value="1">1</MenuItem>
                  <MenuItem value="2">2</MenuItem>
                  <MenuItem value="3">3</MenuItem>
                </Select>
              </FormControl>
            </Box>
            

            <Box className="AV-dualInput floatRightIn">
              <Button sx={{ padding: '2%'}} variant="outlined" onClick={handleSubmit} >Submit</Button>
            </Box>
          </Box>
          // </Box>
        }
        {
          handleFloorChange && handleRoomChange && 
          <Box sx={{width: '100%', marginTop: '5%'}} className="floatRightIn">
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow style={{ borderBottom: '1px solid rgb(242, 238, 238)'}}>
                    <TableCell class="BrasikaFont grayFont" style={{padding: '2%'}}>Name</TableCell>
                    <TableCell class="BrasikaFont grayFont">Course</TableCell>
                  </TableRow>
                </TableHead>
                {/* <TableBody>
                  {list.map((student, index) => (
                    <TableRow key={index}>
                      <TableCell>{student.FirstName}</TableCell>
                      <TableCell>{student.CourseName}</TableCell>
                    </TableRow>
                  ))}
                </TableBody> */}
                <TableBody>
                  {/* {Array.isArray(list) && list.length > 0 ? ( */}
                  { flag ? (
                    list.map((student, index) => (
                      <TableRow key={index}>
                        <TableCell>{`${student.FirstName} ${student.LastName}`}</TableCell>
                        <TableCell>{student.CourseName}</TableCell>
                      </TableRow>
                    ))
                    ) : (
                    <TableRow>
                      <TableCell colSpan={2}>No data available</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        }
      </Box>
  </Box>
  );
}

export default AdminView;
