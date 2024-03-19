// import React from "react";
// import { TextField, InputAdornment,Button } from "@mui/material";
// // import App1 from "../Navbar_Health/MainPage";
// import './admed.css';
// function App4() {

//   const textFieldStyle = {
//     width: '75%', // Adjust as needed for your design
//     marginBottom: '15px', // Adjust the margin for spacing between text fields
    
//   }; 

//   return (
//     <header>
//       {/* <App1/> */}
//     <div className="Style">
//       <h1>Medicine Details</h1>
//       <hr/> <br/>
//       <div> 
//         <TextField id="outlined-basic" label="Medicine-name" variant="outlined"  style={textFieldStyle} />   <br />   
//         <TextField id="outlined-basic" label="Usage" variant="outlined"  style={textFieldStyle} /> <br />
//         <TextField id="outlined-basic" label="Dosage" variant="outlined"  style={textFieldStyle} /> <br />
//       </div>
//       <TextField
//         id="outlined-start-adornment"
//         sx={{ m: 1, width: '25ch' }}
//         InputProps={{
//           startAdornment: <InputAdornment position="start">Quantity:</InputAdornment>,
//         }}
//         style={textFieldStyle}
//       /><br /> <br />
//       <div>
//         <Button id ='one' variant="outlined" className="button-container">Add</Button>
//         <Button id='one' variant="outlined" className="button-container">Delete</Button>
//         <Button id='two' variant="outlined" className="button-container">Viewall</Button>
//       </div>
//     </div>
//     </header>
//   );
// }

// export default App4;





// try code 2
import React, { useState, useEffect } from "react";
import { TextField, Button, Snackbar, Box, Typography } from "@mui/material";
import axios from "axios";
import './admed.css';
import "../../asset/sharedAnimation.css"
// import HealthNav from "../../navbars/navbarHealth";
import AdminHorizontalNav from "../../navbars/HorizontalNav/Admin_hnav";
import { server, serverPort } from "../../utils/Constants";



function AdminMedicine() {
  const [medicineData, setMedicineData] = useState({
    medicineName: "",
    usage: "",
    sideEffects: "", 
    dosage: "",
  });
  const [medicines, setMedicines] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const textFieldStyle = {
    width: '100%',
    marginBottom: '5%',
  };

  const handleInputChange = (fieldName) => (event) => {
    setMedicineData({
      ...medicineData,
      [fieldName]: event.target.value,
    });
  };

  const handleAddMedicine = async () => {
    try {
      const csrftoken = getCookie('csrftoken');
      await axios.post(
        server+':'+serverPort+'/api/medicine/',
        {
          MedicineName: medicineData.medicineName,
          Uses: medicineData.usage,
          SideEffects: medicineData.sideEffects,
          Dosage: medicineData.dosage,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken,
          },
        }
      );

      setSnackbarMessage("Medicine added successfully!");
      setSnackbarOpen(true);

      setMedicineData({
        medicineName: "",
        usage: "",
        sideEffects: "",
        dosage: "",
      });

      fetchMedicines();
    } catch (error) {
      console.error(error);
      setSnackbarMessage("Error adding medicine. Please try again.");
      setSnackbarOpen(true);
    }
  };

  const handleDeleteMedicine = async (medicineId) => {
    try {
      const csrftoken = getCookie('csrftoken');
      await axios.delete(`${server}:${serverPort}/api/medicine/${medicineId}/`, {
        headers: {
          'X-CSRFToken': csrftoken,
        },
      });

      setSnackbarMessage("Medicine deleted successfully!");
      setSnackbarOpen(true);

      fetchMedicines();
    } catch (error) {
      console.error(error);
      setSnackbarMessage("Error deleting medicine. Please try again.");
      setSnackbarOpen(true);
    }
  };

  const handleViewAllMedicine = async () => {
    fetchMedicines();
  };

  const fetchMedicines = async () => {
    try {
      const response = await axios.get(server+':'+serverPort+'/api/medicine/');
      setMedicines(response.data);
    } catch (error) {
      console.error(error);
      setSnackbarMessage("Error fetching medicines. Please try again.");
      setSnackbarOpen(true);
    }
  };

  useEffect(() => {
    fetchMedicines();
  }, []);

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  };

  return (
    <Box>
      <AdminHorizontalNav />
      <Box className="Md-Style">
        <Box sx={{ width: '30%' }}>
          <Typography 
              variant="h3" className="grayFont" 
              sx={{display: 'flex', justifyContent: 'flex-start', paddingBottom: '5%'}}
          >
            <text className="BrasikaFont floatRightIn">
              Medicine Details
            </text>
          </Typography>

          <TextField
            className="floatUpIn"
            label="Medicine-name"
            variant="outlined"
            style={textFieldStyle}
            value={medicineData.medicineName}
            onChange={handleInputChange("medicineName")}
          />

          <TextField
            className="floatUpIn"
            label="Usage"
            variant="outlined"
            style={textFieldStyle}
            value={medicineData.usage}
            onChange={handleInputChange("usage")}
          />

          <TextField
            className="floatUpIn"
            label="Side Effects"  
            variant="outlined"
            style={textFieldStyle}
            value={medicineData.sideEffects}
            onChange={handleInputChange("sideEffects")}
          />

          <TextField
            className="floatUpIn"
            label="Dosage"
            variant="outlined"
            style={textFieldStyle}
            value={medicineData.dosage}
            onChange={handleInputChange("dosage")}
          />

          <Box className="floatUpIn">
            <Button
              className='Md-Btn'
              variant="outlined"
              onClick={handleAddMedicine}
            >
              Add
            </Button>            
            <Button
              sx={{marginLeft: '7%'}}
              className='Md-Btn'
              variant="outlined"
              onClick={handleViewAllMedicine}
            >
              Viewall
            </Button>
          </Box>
        </Box>

        {/* <hr style={{margin: '4% 7% 4% 7%'}}/>   */}
        <hr style={{margin: '2%'}} />

        <Box sx={{flex: 1}} className="Md-Listcontainer">
          <Typography 
            variant="h3" className="grayFont" 
            sx={{display: 'flex', justifyContent: 'flex-start', paddingBottom: '5%'}}
          >
            <text className="BrasikaFont floatRightIn">
              Medicine List
            </text>
          </Typography>
          <Box>
            <table className="floatUpIn" style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }} >
              <thead>
                <tr>
                  <th class="BrasikaFont" style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2', textAlign: 'left' }}>Medicine Name</th>
                  <th class="BrasikaFont" style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2', textAlign: 'left' }}>Uses</th>
                  <th class="BrasikaFont" style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2', textAlign: 'left' }}>Side Effects</th>  {/* Added Side Effects field */}
                  <th class="BrasikaFont" style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2', textAlign: 'left' }}>Dosage</th>
                  <th class="BrasikaFont" style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2', textAlign: 'center', cursor: 'pointer' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(medicines) && medicines.length > 0 ? (
                  medicines.map((medicine) => (
                    <tr key={medicine.MedicineID}>
                      <td class="MD-ListText" style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>{medicine.MedicineName}</td>
                      <td class="MD-ListText" style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>{medicine.Uses}</td>
                      <td class="MD-ListText" style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>{medicine.SideEffects}</td>
                      <td class="MD-ListText" style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>{medicine.Dosage}</td>
                      <td class="MD-ListText" style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>
                        <Button
                          variant="outlined"
                          style={{ border: '1px solid #ddd', width: '100%', padding: '8px', textAlign: 'center', cursor: 'pointer' }}
                          onClick={() => handleDeleteMedicine(medicine.MedicineID)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" style={{ padding: '8px', textAlign: 'center' }}>No medicines available</td>  {/* Updated colSpan */}
                  </tr>
                )}
              </tbody>
            </table>
          </Box>
        </Box>

      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
      />
    </Box>
  );
}

export default AdminMedicine;
