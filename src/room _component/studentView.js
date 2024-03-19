import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import axios from "axios";
import StudentHorizontalNav2 from "../navbars/HorizontalNav/StudenthNav2";

function StudentView() {
  const [name, setName] = useState('');
  const [floorNumber, setFloorNumber] = useState('');
  const [roomNumber, setRoomNumber] = useState('');
  const [list, setList] = useState([]);
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    // Retrieve username from localStorage
    const username = localStorage.getItem('username');
    setName(username);

    // Fetch floor number and room number from backend
    axios
      .get(`http://127.0.0.1:8000/api/get_floor_and_room_numbers/?username=${username}`)
      .then((response) => {
        const { floorNumber, roomNumber } = response.data;
        setFloorNumber(floorNumber);
        setRoomNumber(roomNumber);
        setFlag(true);

        // Fetch student list based on floor number and room number
        axios
          .get(`http://127.0.0.1:8000/api/student_pannel/${floorNumber}/${roomNumber}/`)
          .then((response) => {
            setList(response.data);
            console.log("hello world, we got list data: ");
            console.log(response.data);
          })
          .catch((error) => {
            console.error("Error fetching Room list:", error);
          });
      })
      .catch((error) => {
        console.error("Error fetching floor and room numbers:", error);
      });
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts

  return (
    <header>
      <StudentHorizontalNav2 />
      <div className="style">
        <h2>Hello {name}, Your Floor is {floorNumber} and Room Number is {roomNumber} </h2>
        <h2>Your Room Members Are</h2>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Course</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {flag ? (
                list.length > 0 ? (
                  list.map((student, index) => (
                    <TableRow key={index}>
                      <TableCell>{`${student.FirstName} ${student.LastName}`}</TableCell>
                      <TableCell>{student.CourseName}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={2}>You are the only one in this room for now.</TableCell>
                  </TableRow>
                )
              ) : (
                <TableRow>
                  <TableCell colSpan={2}>Error!! Server Not Responding</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </header>
  );
}

export default StudentView;
