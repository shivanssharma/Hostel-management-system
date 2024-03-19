import React, { useState, useEffect } from "react";
import {
  Autocomplete,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import "./hpvisit.css"; // Update this with your CSS file name
import StudentHorizontalNav from "../navbars/HorizontalNav/student_hnav";

function HospitalVisitForm() {
  const [hospitalList, setHospitalList] = useState([]);
  const [purpose, setPurpose] = useState("");
  const [visitDate, setVisitDate] = useState("");
  const [hospitalTypes, setHospitalTypes] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [selectedHospitalType, setSelectedHospitalType] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    // Fetch Hospitals from Django API
    fetch("http://127.0.0.1:8000/api/hospitals/")
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

  const handleSnackbarOpen = (severity, message) => {
    setSnackbarSeverity(severity);
    setSnackbarMessage(message);
    setOpenSnackbar(true);
  };

  const handleSave = () => {
    const data = {
      HospitalID: selectedHospital ? selectedHospital.HospitalID : null,
      Purpose: purpose,
      VisitDate: visitDate,
      username: localStorage.getItem("username"), // Fetching username from local storage
    };

    // Fetch CSRF token from cookies
    const csrfToken = getCookie("csrftoken");

    // Send data to the backend API endpoint with CSRF token included in headers
    axios
      .post("http://127.0.0.1:8000/api/save_hospital_visit/", data, {
        headers: {
          "X-CSRFToken": csrfToken,
        },
      })
      .then((response) => {
        console.log(response.data);
        handleSnackbarOpen(
          "success",
          "Hospital visit saved successfully"
        );
        // Handle success or navigate to another page
      })
      .catch((error) => {
        console.error("Error saving hospital visit:", error);
        handleSnackbarOpen("error", "Error saving hospital visit");
        // Handle error
      });
  };

  // Function to get cookie value by name
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  }

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
        `http://127.0.0.1:8000/api/hospital-types/?hospital_id=${selectedHospital.HospitalID}`
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
        `http://127.0.0.1:8000/api/departments/?hospital_type=${selectedHospitalType.hospitalType}`
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
    <header>
      <StudentHorizontalNav />
      <div className="Style">
        <h1>Hospital Visit Form</h1>
        <hr />

        <div>
          <h2>Hospital Name</h2>
          <FormControl
            variant="outlined"
            style={{ width: "100%", paddingLeft: "50px" }}
          >
            <InputLabel
              id="hospital-label"
              style={{ paddingLeft: "50px" }}
            >
              Hospital
            </InputLabel>
            <Select
              labelId="hospital-label"
              id="hospital"
              sx={{ width: 500 }}
              value={selectedHospital ? selectedHospital.HospitalID : ""}
              onChange={handleHospitalChange}
              label="Hospital"
            >
              {hospitalList.map((hospital) => (
                <MenuItem
                  key={hospital.HospitalID}
                  value={hospital.HospitalID}
                >
                  {hospital.HospitalName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <h2>Hospital Type </h2>
        <Autocomplete
          disablePortal
          id="hospital-type"
          options={hospitalTypes}
          getOptionLabel={(option) => option.hospitalType}
          getOptionSelected={(option, value) =>
            option.hospitalType === value.hospitalType
          }
          style={{ width: "92%", paddingLeft: "50px" }}
          renderInput={(params) => (
            <TextField {...params} label="Hospital Type" />
          )}
          onChange={(event, newValue) => setSelectedHospitalType(newValue)}
        />

        <h2>Department </h2>
        <Autocomplete
          disablePortal
          id="department"
          options={departments}
          getOptionLabel={(option) => option.departmentName}
          style={{ width: "92%", paddingLeft: "50px" }}
          renderInput={(params) => <TextField {...params} label="Department" />}
        />
        <div>
          <h2>Purpose</h2>
          <TextField
            id="filled-basic"
            label="Purpose"
            variant="outlined"
            sx={{ width: 500 }}
            onChange={(e) => setPurpose(e.target.value)}
          />
        </div>
        <div>
          <h2>Visit Date</h2>
          <TextField
            id="filled-basic"
            variant
            ="outlined"
            type="datetime-local"
            sx={{ width: 500 }}
            onChange={(e) => setVisitDate(e.target.value)}
          />
        </div>
        <br />
        <Button variant="outlined" onClick={handleSave}>
          Save
        </Button>
      </div>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={() => setOpenSnackbar(false)}
          severity={snackbarSeverity}
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </header>
  );
}

export default HospitalVisitForm;
