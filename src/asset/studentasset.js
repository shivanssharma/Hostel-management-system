import React, { useState, useEffect } from "react";
import axios from "axios";
import { Autocomplete, TextField, Switch, Button } from "@mui/material";
import './studasset.css';
// import HealthNav from "../navbars/navbarHealth";
import StudentHorizontalNav from "../navbars/HorizontalNav/student_hnav";

function StudentAsset() {
    const [hostelAssets, setHostelAssets] = useState([]);
    const [selectedAsset, setSelectedAsset] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        // Fetch data from the backend API
        axios
            .get("http://127.0.0.1:8000/api/hostel_assets/")
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

    return (
        <header>
            {/* Styling div for better organization */}
            <StudentHorizontalNav />
            <div className="Style">
              <h1>Book Assets for Yourself!!</h1>
              <hr/>
              <br/>
              <div className="center-container">
                    {/* Autocomplete component for hostel assets */}
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={hostelAssets}
                        getOptionLabel={(option) => option.assetName}
                        getOptionSelected={(option, value) => option.assetID === value.assetID}
                        sx={{ width: 300 }}
                        onChange={handleAssetSelect}
                        renderInput={(params) => <TextField {...params} label="Hostel Assets" />}
                    />
                </div>
                <br/>
                {/* Display selected asset's description */}
                {selectedAsset && (
                    <TextField
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
                <h2>Availability:</h2>
                No {loading ? (
                    <p>Loading...</p>
                ) : (
                    <Switch
                        checked={selectedAsset ? selectedAsset.availabilityStatus : false}
                        disabled={true}
                        inputProps={{ "aria-label": "controlled" }}
                    />
                )} Yes

                <br />
                <br />

                {/* Button for booking */}
                <Button variant="outlined">Book</Button>
            </div>
        </header>
    );
}

export default StudentAsset;
