import React,{useState,useEffect} from "react";
import {Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,} from "@mui/material";
import axios from "axios";
import App10 from "../navbars/navbarHealth";
import './style_room.css';
import { server, serverPort } from "../utils/Constants";
function StudentView(){
    const name='shivansh';
    const floorNumber='A';
    const roomNumber='1';
    const[list,setList]=useState([]);
    const[flag,setFlag]=useState(false)
    useEffect(() => {
          axios
            .get(`${server}:${serverPort}/api/student_pannel/${floorNumber}/${roomNumber}/`)
            .then((response) => {
              setList(response.data);
              setFlag(true)
              console.log("hello world, we got list data: ");
              console.log(response.data);
            })
            .catch((error) => {
              console.error("Error fetching Room list:", error);
            });
        },[]
    );
    return(
        <header>
            <App10 />
        <div className="AV-style">
            <h3 className="BrasikaFont floatRightIn grayFont" >Hello {name} Your Floor is {floorNumber} and RoomNumber is {roomNumber} </h3>
            <h3 className="BrasikaFont floatRightIn grayFont" >Your Room Members Are</h3>
        <TableContainer component={Paper}>
            <Table>
            <TableHead>
                <TableRow>
                <TableCell class="BrasikaFont grayFont" style={{padding: '2%'}} >Name</TableCell>
                <TableCell class="BrasikaFont grayFont" >Course</TableCell>
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
        </div>
        </header>
    );
}
export default StudentView;