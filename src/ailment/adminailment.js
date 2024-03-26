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
  Box,
  Typography,
} from '@mui/material';
import axios from "axios";
import './adailment.css';
import "../asset/sharedAnimation.css"
import "../asset/sharedCss.css"
import AdminHorizontalNav from "../navbars/HorizontalNav/Admin_hnav";
import { server, serverPort } from "../utils/Constants";

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
    width: '100%',
    marginBottom: '5%',
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
        server+':'+serverPort+'/api/ailment/',
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
      await axios.delete(`${server}:${serverPort}/api/ailment/${encodeURIComponent(AilmentName)}/`, {
        headers: {
          'X-CSRFToken': csrftoken,
        },
      });
  
      // Remove the deleted ailment from the local state
      // setAilment((prevAilments) =>
      //   prevAilments.filter((ailment) => ailment.AilmentName !== AilmentName)
      // );
      // setAilmentData(ailment.filter((ailments)=>ailments !==AilmentName ));
      setAilment(prevAilments => prevAilments.filter(ailment => ailment.AilmentName !== AilmentName));
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
      const response = await axios.get(server+':'+serverPort+'/api/ailment/');
      setAilment(response.data);
    } catch (error) {
      console.error(error);
      setSnackbarMessage("Error fetching ailment. Please try again.");
      setSnackbarOpen(true);
    }
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
    // fetchAilments();
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
      <Box className="Style_four">
        <Box sx={{ p: '2%' }}>
          <Typography 
            variant="h3" className="grayFont" 
            sx={{display: 'flex', justifyContent: 'flex-start', paddingBottom: '5%'}}
          >
            <text className="BrasikaFont floatRightIn">
            Enter Ailment
            </text>
          </Typography>
          <TextField
            className="floatUpIn"
            label="Name"
            variant="outlined"
            value={ailmentData.ailmentname}
            onChange={handleInputChange("ailmentname")}
            style={textFieldStyle}
          />

          <TextField
            className="floatUpIn"
            label="Description"
            variant="outlined"
            value={ailmentData.description}
            onChange={handleInputChange("description")}
            style={textFieldStyle}
          />

          <Autocomplete
            className="floatUpIn"
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
          <Box className="button-container floatUpIn">
            <Button className="AdA-Btn" variant="outlined" onClick={handleAddAilment}>
              Add
            </Button>
            <Button className="AdA-Btn" variant="outlined" onClick={fetchAilments}>
              View All
            </Button>
          </Box>
        </Box>

        <hr style={{margin: '4% 5% 4% 5%'}}/>       

        {handleDeleteAilment && 
          <Box className="AdAil-Listcontainer" sx={{flex: 1, p: '2% 0% 2% 0%'}}>
            <Typography 
              variant="h3" className="grayFont" 
              sx={{display: 'flex', justifyContent: 'flex-start', paddingBottom: '5%'}}
            >
              <text className="BrasikaFont floatRightIn">
                Ailments
              </text>
            </Typography>
            <Box >
              <TableContainer component={Paper} style={{width: '100%'}}>
                <Table className="floatUpIn" style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
                  <TableHead>
                    <TableRow>
                      {/* <TableCell>ID</TableCell> */}
                      <TableCell class="BrasikaFont">Name</TableCell>
                      <TableCell class="BrasikaFont">Description</TableCell>
                      <TableCell class="BrasikaFont">Action</TableCell>
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
            </Box>
          </Box>
        }

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          message={snackbarMessage}
        />
      </Box>
    </Box>
  );
}

export default AdminAilment;
