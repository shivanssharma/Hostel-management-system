import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Snackbar,
  Autocomplete,
} from '@mui/material';
import axios from "axios";
import './adailment.css';
import AdminHorizontalNav from "../navbars/HorizontalNav/Admin_hnav";
import StaffHorizontalNavUser from "../navbars/HorizontalNav/StaffhorizontalNav";

function AdminAilment() {
  const [ailmentData, setAilmentData] = useState({
    ailmentname: "",
    description: "",
    selectedMedicine: null,
  });
 
  
  const [ailment, setAilment] = useState([]);
  const [medicines, setMedicines] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const textFieldStyle = {
    width: '75%',
    marginBottom: '15px',
  };

  const handleInputChange = (fieldName) => (event, value) => {
    setAilmentData({
      ...ailmentData,
      [fieldName]: value ? value : event.target.value,
    });
  };

  const handleAddAilment = async () => {
    try {
      const csrftoken = getCookie('csrftoken');

      if (!ailmentData.selectedMedicine) {
        setSnackbarMessage("Please select a medicine.");
        setSnackbarOpen(true);
        return;
      }

      const medicineId = ailmentData.selectedMedicine.MedicineID;

      await axios.post(
        'http://127.0.0.1:8000/api/ailment/',
        {
          AilmentName: ailmentData.ailmentname,
          AilmentDescription: ailmentData.description,
          MedicineID: medicineId,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken,
          },
        }
      );

      setSnackbarMessage("Ailment added successfully!");
      setSnackbarOpen(true);

      setAilmentData({
        ailmentname: "",
        description: "",
        selectedMedicine: null,
      });

      fetchAilments();
    } catch (error) {
      console.error(error);
      setSnackbarMessage("Error adding Ailment. Please try again.");
      setSnackbarOpen(true);
    }
  };

  const handleDeleteAilment = async (AilmentName) => {
    try {
      const csrftoken = getCookie('csrftoken');
      await axios.delete(`http://127.0.0.1:8000/api/ailment/${encodeURIComponent(AilmentName)}/`, {
        headers: {
          'X-CSRFToken': csrftoken,
        },
      });
  
      // Remove the deleted ailment from the local state
      setAilment((prevAilments) =>
        prevAilments.filter((ailment) => ailment.AilmentName !== AilmentName)
      );
  
      setSnackbarMessage("Ailment deleted successfully!");
      setSnackbarOpen(true);
    } catch (error) {
      console.error(error);
      console.error("Response data:", error.response.data); // Log the response data
      setSnackbarMessage("Error deleting Ailment. Please try again.");
      setSnackbarOpen(true);
    }
  };
  
  
  
  

  const fetchAilments = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/ailment/');
      setAilment(response.data);
    } catch (error) {
      console.error(error);
      setSnackbarMessage("Error fetching ailment. Please try again.");
      setSnackbarOpen(true);
    }
  };

  const fetchMedicines = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/medicine/');
      setMedicines(response.data);
    } catch (error) {
      console.error(error);
      setSnackbarMessage("Error fetching medicines. Please try again.");
      setSnackbarOpen(true);
    }
  };

  useEffect(() => {
    fetchAilments();
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
    <header>
    {/* <AdminHorizontalNav /> */}
    {/* {isAdminHomePage && <AdminHorizontalNav />}
    {isStaffHomePage && <StaffHorizontalNavUser />} */}
    {isAdminPage ? <AdminHorizontalNav /> : <StaffHorizontalNavUser />}
      <div id="Style_four">
        <div>
          <h2>Enter Ailment</h2>
          <TextField
            label="Name"
            variant="outlined"
            value={ailmentData.ailmentname}
            onChange={handleInputChange("ailmentname")}
            style={textFieldStyle}
          />
          <br />
          <br />
          <TextField
            label="Description"
            variant="outlined"
            value={ailmentData.description}
            onChange={handleInputChange("description")}
            style={textFieldStyle}
          />
          <br />
          <br />
          <Autocomplete
            options={medicines}
            getOptionLabel={(option) => option.MedicineName}
            onChange={(event, value) => handleInputChange("selectedMedicine")(event, value)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Medicine"
                variant="outlined"
                style={textFieldStyle}
              />
            )}
          />
        </div>

        <br />

        <div className="button-container">
          <Button className="one" variant="outlined" onClick={handleAddAilment}>
            Add
          </Button>
          <Button className="two" variant="outlined" onClick={fetchAilments}>
            View All
          </Button>
        </div>

        <br />
        <hr />        
        {handleDeleteAilment && <div>
          <h2>Ailments</h2>
          <div style={{ maxHeight: '300px', overflow: 'auto' }}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  {/* <TableCell>ID</TableCell> */}
                  <TableCell>Name</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.values(ailment).map((ailment) => (
                  <TableRow key={ailment.AilmentID}>
                    {/* <TableCell>{ailment.AilmentID}</TableCell> */}
                    <TableCell>{ailment.AilmentName}</TableCell>
                    <TableCell>{ailment.AilmentDescription}</TableCell>
                    <TableCell>
                      <Button variant="outlined" onClick={() => handleDeleteAilment(ailment.AilmentName)}>
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          </div>
        </div>}

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          message={snackbarMessage}
        />
      </div>
    </header>
  );
}

export default AdminAilment;
