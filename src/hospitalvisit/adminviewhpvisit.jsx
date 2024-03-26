// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import './hpvisit.css';
// function AdminHospitalVisits() {
//   const [hospitalVisits, setHospitalVisits] = useState([]);

//   useEffect(() => {
//     // Fetch hospital visit requests from the backend
//     axios.get(server+':'+serverPort+"/api/hospital-visits/")
//       .then((response) => {
//         console.log("Hospital visits data:", response.data); // Debugging line
//         setHospitalVisits(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching hospital visits:", error);
//       });
//   }, []);

//   return (
//     <div className="Style">
//       <h1>Admin Hospital Visits</h1>
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Registration Number</TableCell>
//               <TableCell>Hospital Name</TableCell>
//               <TableCell>Department</TableCell>
//               <TableCell>Purpose</TableCell>
              
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {hospitalVisits.map((visit, index) => (
//               <TableRow key={index}>
//                 <TableCell>{visit.RegistrationNumber}</TableCell>
//                 <TableCell>{visit.HospitalName}</TableCell>
//                 <TableCell>{visit.Department}</TableCell>
//                 <TableCell>{visit.Purpose}</TableCell>
                
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </div>
//   );
// }

// export default AdminHospitalVisits;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";

function AdminHospitalVisits() {
  const [hospitalVisits, setHospitalVisits] = useState([]);
  const [isClearing, setIsClearing] = useState(false);
  useEffect(() => {
    // Fetch hospital visit requests from the backend
    axios.get(server+":"+serverPort+"/api/hospital-visits/")
      .then((response) => {
        console.log("Hospital visits data:", response.data); // Debugging line
        const storedClearedRows = JSON.parse(localStorage.getItem("clearedRows")) || [];
        const updatedHospitalVisits = response.data.filter((visit) => !storedClearedRows.includes(visit.VisitID));
        setHospitalVisits(updatedHospitalVisits);
      })
      .catch((error) => {
        console.error("Error fetching hospital visits:", error);
      });
  }, []);

  const clearRow = (visitID) => {
    const updatedHospitalVisits = hospitalVisits.filter((visit) => visit.VisitID !== visitID);
    setHospitalVisits(updatedHospitalVisits);
    const storedClearedRows = JSON.parse(localStorage.getItem("clearedRows")) || [];
    localStorage.setItem("clearedRows", JSON.stringify([...storedClearedRows, visitID]));
  };

  const clearRowAfterTime = (visitID) => {
    setIsClearing(true);
    setTimeout(() => {
      clearRow(visitID);
      setIsClearing(false);
    }, 10000); // Clear row after 10 seconds
  };

  return (
    <div className="Style">
      <h1>Admin Hospital Visits</h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell class="BrasikaFont floatRightIn grayFont" style={{padding: '2%'}}>Registration Number</TableCell>
              <TableCell class="BrasikaFont floatRightIn grayFont">Hospital Name</TableCell>
              <TableCell class="BrasikaFont floatRightIn grayFont">Department</TableCell>
              <TableCell class="BrasikaFont floatRightIn grayFont">Purpose</TableCell>
              <TableCell class="BrasikaFont floatRightIn grayFont">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {hospitalVisits && hospitalVisits.length === 0 
            ?
              <TableRow >
                <TableCell colspan={5} class="BrasikaFont floatRightIn grayFont" style={{padding: '3%'}}>
                  <h3> Currently there are no data to display </h3>
                </TableCell>
              </TableRow>
            :
            hospitalVisits.map((visit) => (
              <TableRow key={visit.VisitID}>
                <TableCell class="floatRightIn" style={{padding: '2%'}}>{visit.RegistrationNumber}</TableCell>
                <TableCell class="floatRightIn">{visit.HospitalName}</TableCell>
                <TableCell class="floatRightIn">{visit.Department}</TableCell>
                <TableCell class="floatRightIn">{visit.Purpose}</TableCell>
                <TableCell class="floatRightIn">
                  <Button variant="outlined" onClick={() => clearRowAfterTime(visit.VisitID)} disabled={isClearing}>
                    {isClearing ? "Clearing..." : "Done"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default AdminHospitalVisits;


