import React, { useState, useEffect } from "react";
import {
  Autocomplete,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Typography,
} from "@mui/material";
import axios from "axios";
import "./hpvisit.css"; // Update this with your CSS file name
import "../asset/sharedAnimation.css"
import StudentHorizontalNav from "../navbars/HorizontalNav/student_hnav";
import { server, serverPort } from "../utils/Constants";

function HospitalVisitForm() {
  
  const [hospitalList, setHospitalList] = useState([]);
  const [purpose, setPurpose] = useState("");
  const [visitDate, setVisitDate] = useState("");
  const [hospitalTypes, setHospitalTypes] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [selectedHospitalType, setSelectedHospitalType] = useState(null);

  useEffect(() => {
    // Fetch Hospitals from Django API
    fetch(server+':'+serverPort+"/api/hospitals/")
      .then((response) => response.json())
      .then((data) => {
        // Filter out duplicate hospital names
        const uniqueHospitals = Array.from(
          new Set(data.map((hospital) => hospital.HospitalName))
        ).map((name) =>
          data.find((hospital) => hospital.HospitalName === name)
        );

        setHospitalList(uniqueHospitals);
      });
  }, []);

  const handleSave = () => {
    const data = {
      HospitalID: selectedHospital ? selectedHospital.HospitalID : null,
      Purpose: purpose,
      VisitDate: visitDate,
    };

    // Send data to the backend API endpoint
    axios
      .post(server+':'+serverPort+"/api/hospital_visits/", data)
      .then((response) => {
        console.log(response.data);
        // Handle success or navigate to another page
      })
      .catch((error) => {
        console.error("Error saving hospital visit:", error);
        // Handle error
      });
  };

  const handleHospitalChange = (event) => {
    const selectedHospital = hospitalList.find(
      (hospital) => hospital.HospitalID === event.target.value
    );
    setSelectedHospital(selectedHospital);
    setSelectedHospitalType(null); // Reset selected hospital type
  };

  useEffect(() => {
    if (selectedHospital) {
      // Fetch Hospital Types based on the selected hospital
      fetch(
        `${server}:${serverPort}/api/hospital-types/?hospital_id=${selectedHospital.HospitalID}`
      )
        .then((response) => response.json())
        .then((data) => {
          // Filter out duplicate hospital types
          const uniqueHospitalTypes = Array.from(
            new Set(data.map((type) => type.hospitalType))
          ).map((type) =>
            data.find((item) => item.hospitalType === type)
          );

          setHospitalTypes(uniqueHospitalTypes);
        });
    }
  }, [selectedHospital]);

  useEffect(() => {
    if (selectedHospitalType) {
      // Fetch Departments based on the selected hospital type
      fetch(
        `${server}:${serverPort}/api/departments/?hospital_type=${selectedHospitalType.hospitalType}`
      )
        .then((response) => response.json())
        .then((data) => {
          // Filter out duplicate departments
          const uniqueDepartments = Array.from(
            new Set(data.map((department) => department.departmentName))
          ).map((name) =>
            data.find((department) => department.departmentName === name)
          );

          setDepartments(uniqueDepartments);
        });
    }
  }, [selectedHospitalType]);

  return (
    <Box>
      <StudentHorizontalNav/>
      <Box className="HV-Container">
        <Typography variant="h3" className="AdA-title grayFont" sx={{display: 'flex', justifyContent: 'flex-start'}}>
          <text className="BrasikaFont floatRightIn">
          Hospital Visit Form
          </text>
        </Typography>
        <Box className="HV-Style">
          {/* <Box> */}

            <Box className="HV-Items">
              <h3 className="HV-input BrasikaFont floatRightIn grayFont">Hospital Name</h3>
              <FormControl variant="outlined" style={{ width: "100%" }}>
                <InputLabel id="hospital-label">Hospital</InputLabel>
                <Select
                  className="floatRightIn"
                  labelId="hospital-label"
                  id="hospital"
                  sx={{ width: '100%' }}
                  value={selectedHospital ? selectedHospital.HospitalID : ""}
                  onChange={handleHospitalChange}
                  label="Hospital"
                >
                  {hospitalList.map((hospital) => (
                    <MenuItem key={hospital.HospitalID} value={hospital.HospitalID}>
                      {hospital.HospitalName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <Box  className="HV-Items">
              <h3 className="HV-input BrasikaFont floatRightIn grayFont">Hospital Type </h3>
              <Autocomplete
                className="floatRightIn"
                disablePortal
                id="hospital-type"
                options={hospitalTypes}
                getOptionLabel={(option) => option.hospitalType}
                getOptionSelected={(option, value) =>
                  option.hospitalType === value.hospitalType
                }
                sx={{ width: '100%' }}
                renderInput={(params) => <TextField {...params} label="Hospital Type" />}
                onChange={(event, newValue) => setSelectedHospitalType(newValue)}
              />
            </Box>

            <Box className="HV-Items">
              <h3 className="HV-input BrasikaFont floatRightIn grayFont">Department </h3>
              <Autocomplete
                className="floatRightIn"
                disablePortal
                id="department"
                options={departments}
                getOptionLabel={(option) => option.departmentName}
                sx={{ width: '100%' }}
                renderInput={(params) => <TextField {...params} label="Department" />}
              />
            </Box>
          {/* </Box> */}

          <Box className="HV-Items">
            <h3 className="HV-input BrasikaFont floatRightIn grayFont">Purpose</h3>
            <TextField
              className="floatRightIn"
              id="filled-basic"
              label="Purpose"
              variant="outlined"
              sx={{ width: '100%' }}
              onChange={(e) => setPurpose(e.target.value)}
            />
          </Box>

          <Box className="HV-Items">
            <h3 className="HV-input BrasikaFont floatRightIn grayFont">Visit Date</h3>
            <TextField
              className="floatRightIn"
              id="filled-basic"
              variant="outlined"
              type="datetime-local"
              sx={{ width: '100%' }}
              onChange={(e) => setVisitDate(e.target.value)}
            />
          </Box>
          <Box className="HV-Items"/> 
          <Box className="HV-Items floatRightIn">
            <Button variant="outlined" onClick={handleSave}>
              Save
            </Button>
          </Box>
          <Box className="HV-Items"/>
        </Box>
      </Box>
  </Box>
  );
}

export default HospitalVisitForm;
