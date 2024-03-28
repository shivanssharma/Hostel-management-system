import React, { useState, useEffect } from "react";
import axios from "axios";
import { Autocomplete, TextField, Switch, Button, Box, Typography,Snackbar } from "@mui/material";
import './studasset.css';
import "../asset/sharedAnimation.css"
// import HealthNav from "../navbars/navbarHealth";
import StudentHorizontalNav from "../navbars/HorizontalNav/student_hnav";
import MuiAlert from "@mui/material/Alert";
import { server, serverPort } from "../utils/Constants";
import { useNavigate } from "react-router-dom";
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
function StudentAsset() {
    const [hostelAssets, setHostelAssets] = useState([]);
    const [selectedAsset, setSelectedAsset] = useState(null);
    const [loading, setLoading] = useState(true);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    const navigate=useNavigate();
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        // Fetch data from the backend API
        axios
            .get(`${server}:${serverPort}/api/hostel_assets/`)
            .then((response) => {
                // Log the raw response data for inspection
                console.log("Raw response data:", response.data);

                // Format the data and set the state
                const formattedData = response.data.map((item) => ({
                    assetName: item.AssetName,
                    description: item.Description,
                    availabilityStatus: item.AvailabilityStatus,
                    assetID: item.AssetID,
                }));
                setHostelAssets(formattedData);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching hostel assets:", error);
                setLoading(false);
            });
    };

    const handleAssetSelect = (event, value) => {
        setSelectedAsset(value);
    };

    const handleBookAsset = () => {
        // Get CSRF token from cookies
        const csrftoken = getCookie("csrftoken");

        // Send a POST request to book the selected asset
        axios.post(`${server}:${serverPort}/api/book_asset/`, {
            username: localStorage.getItem('username'), // Get username from localStorage
            assetID: selectedAsset.assetID,           
        }, {
            headers: {
                "X-CSRFToken": csrftoken,
            }
        })
            .then((response) => {
                
                console.log("Asset booked successfully:", response.data);
                setSnackbarMessage("Asset booked successfully");
                setSnackbarSeverity("success");
                setSnackbarOpen(true);
                navigate('/student-home')
            })
            .catch((error) => {
                
                console.error("Error booking asset:", error);
                setSnackbarMessage("Error booking asset");
                setSnackbarSeverity("error");
                setSnackbarOpen(true);
            });
            
    };
    

    const handleSnackbarClose = () => {
        
        setSnackbarOpen(false);
    };

    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(";").shift();
    };
    return (
        <Box>
            {/* Styling div for better organization */}
            <StudentHorizontalNav />
            <div className="SAS-Style">
                <Typography variant="h3" className="AdA-title grayFont" sx={{display: 'flex', justifyContent: 'flex-start'}}>
                    <text className="BrasikaFont floatRightIn">
                        Book Assets for Yourself!!
                    </text>
                </Typography>

                <Box className="center-container">
                    {/* Autocomplete component for hostel assets */}
                    <Autocomplete
                        className="floatRightIn" 
                        disablePortal
                        id="combo-box-demo"
                        options={hostelAssets}
                        getOptionLabel={(option) => option.assetName}
                        getOptionSelected={(option, value) => option.assetID === value.assetID}
                        sx={{ width: 300 }}
                        onChange={handleAssetSelect}
                        renderInput={(params) => <TextField {...params} label="Hostel Assets" />}
                    />
                </Box>

                {/* Display selected asset's description */}
                {selectedAsset && (
                    <TextField
                        className="floatRightIn" 
                        id="outlined-multiline-static"
                        label="Description"
                        multiline
                        rows={4}
                        sx={{ width: 300 }}
                        value={selectedAsset.description}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                )}

                {/* Display availability status with a loading indicator */}
                <Box className="SAS-switchController">
                    <h2 class="BrasikaFont floatRightIn grayFont">Availability:</h2>
                    <Box className="SAS-switch">
                        <h4 class="BrasikaFont floatRightIn grayFont"> No </h4> 
                        {
                            loading 
                            ?   <p>Loading...</p>
                            :   <Switch
                                    className="floatRightIn"
                                    checked={selectedAsset ? selectedAsset.availabilityStatus : false}
                                    disabled={true}
                                    inputProps={{ "aria-label": "controlled" }}
                                />
                        }
                        <h4 class="BrasikaFont floatRightIn grayFont"> Yes </h4>
                    </Box>

                </Box>
                {/* Button for booking */}
                <Button variant="outlined" onClick={handleBookAsset}>Book</Button>
            </div>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
            >
                <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
}

export default StudentAsset;
