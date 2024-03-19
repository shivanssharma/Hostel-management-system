import React, { useState, useEffect } from "react";
import {FormControl,InputLabel,Select,MenuItem,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,} from "@mui/material";
import axios from "axios";
import {Button} from "@mui/material";
import './style_room.css';
import AdminHorizontalNav2 from "../navbars/HorizontalNav/Adminhnav2";

function AdminView() {
  const [selectedFloor, setSelectedFloor] = useState("");
  const [selectedRoom, setSelectedRoom] = useState("");
  const [list, setStudentList] = useState([]);
  const [flag, setFlag] = useState(false)
  // const [usernames, setUsernames] = useState([]);
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
    if (selectedFloor !== "" && selectedRoom !== "" ) {
      axios
        .get(`http://127.0.0.1:8000/api/list/${selectedFloor}/${selectedRoom}/`)
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
  const handleDeleteStudentRoom = (FirstName) => {
    // Send a request to backend API to delete the student from the room
    axios.delete(`http://127.0.0.1:8000/api/remove_student/${FirstName}`)
      .then((response) => {
        setStudentList(list.filter((name) => name !== FirstName));
        setFlag(false);
        // Reload the student list after deletion
        setFlag(true);
      })
      .catch((error) => {
        console.error("Error deleting student from room:", error);
      });
  };
  const handleSubmit = () => {
    setFlag(true); // Set flag to true to trigger useEffect
  };
  // }, [selectedFloor, selectedRoom]);
   console.log(selectedFloor);
   console.log(selectedRoom);

  return (
    <header>
    <AdminHorizontalNav2 />
     <div className="style">
     
     {list &&
     <div>
      <h2>Room list</h2>
      <div>
        <FormControl className="floor">
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
        <FormControl className="room" style={{paddingLeft:'45px'}}>
          <InputLabel id="label-id_2" style={{paddingLeft:'45px'}}>Room number</InputLabel>
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
      </div>
      <br/>
      <Button variant="outlined" onClick={handleSubmit} >Submit</Button>
      <br />
      {handleFloorChange && handleRoomChange && <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Course</TableCell>
              <TableCell>Remove</TableCell>
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
                  <TableCell>
                      <Button variant="outlined" onClick={() => handleDeleteStudentRoom(student.FirstName)}>
                        Delete
                      </Button>
                    </TableCell>
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
      </div>}
     </div>}
    </div>
  </header>
  );
}

export default AdminView;
