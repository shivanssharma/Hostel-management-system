import React, { useState } from "react";
import { message } from 'antd';
import Space from 'antd/lib/space';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Popover,
  
} from "@mui/material";
import axios from "axios";
import { server, serverPort } from "../utils/Constants";

function Stores() {
  const [course, setCourse] = useState("");
  const [list, setList] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const getCookie = (name) => {
    const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return cookieValue ? cookieValue.pop() : '';
  };
  const csrftoken = getCookie('csrftoken');

  const handleDeleteStudent = (studentId) => {
    setLoading(true);
    axios
      .delete(`${server}:${serverPort}/api/delete-student/${studentId}/`, {
        // Include CSRF token if required by your Django backend
        headers: {
          'X-CSRFToken': csrftoken, // Replace 'csrfToken' with your token acquisition method
        },
      })
      .then((response) => {
        setLoading(false);
        // Handle successful deletion
        const updatedList = list.filter((student) => student.RegistrationNumber !== studentId);
        setList(updatedList);
        message.success("Student record deleted successfully!");
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error deleting student:", error);
        setError(error);
        message.error("An error occurred while deleting the student.");
      });
  };

  const handleCourseChange = (event) => {
    const course = event.target.value;
    setCourse(course);

    setLoading(true);
    axios
      .get(`${server}:${serverPort}/api/adminstore/${course}/`)
      .then((response) => {
        setLoading(false);
        setList(response.data);
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error fetching list:", error);
        setError(error);
      });
  };

  return (
    <div className="style">
      <div>
        <FormControl className="custom-form-control">
          <InputLabel id="label-id_1">CourseName</InputLabel>
          <Select
            labelId="select-id_1"
            id="id_1"
            value={course}
            onChange={handleCourseChange}
          >
            <MenuItem value="" disabled>
              Select Course
            </MenuItem>
            <MenuItem value="1ug">1 Ug</MenuItem>
            <MenuItem value="2ug">2 Ug</MenuItem>
            <MenuItem value="3ug">3 Ug</MenuItem>
            <MenuItem value="1msc">1 Msc</MenuItem>
            <MenuItem value="2msc">2 Msc</MenuItem>
          </Select>
        </FormControl>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Registration number</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Course</TableCell>
              <TableCell>Details</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5}>Loading...</TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell colSpan={5}>Error: {error.message}</TableCell>
              </TableRow>
            ) : list.length > 0 ? (
              list.map((student, index) => (
                <TableRow key={index}>
                  <TableCell>{student.RegistrationNumber}</TableCell>
                  <TableCell>{`${student.FirstName} ${student.LastName}`}</TableCell>
                  <TableCell>{student.CourseName}</TableCell>
                  <TableCell>
                    <Space wrap>
                      <Popover
                        content={
                          <div key={index}>
                            <p>Father Name: {student.FatherName}</p>
                            <p>Mother Name: {student.MotherName}</p>
                            <p>Date-of-Birth: {student.DateOfBirth}</p>
                            <p >Email Id: {student.EmailID}</p>
                            <p >Address: {student.Address}</p>
                            </div>
                        }
                         title="Details" trigger="click">
                        <Button>Details</Button>
                        </Popover>
                        </Space>
                    </TableCell> 
                    <TableCell>
                    <Button variant="text"  onClick={() => handleDeleteStudent(student.RegistrationNumber)}>Delete</Button>
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
        </div>
        
    );
}
export default Stores;