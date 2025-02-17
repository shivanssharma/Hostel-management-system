import React, { useState } from "react";
import { FormControlLabel, Checkbox, Button, Snackbar } from "@mui/material";
import { server, serverPort } from "../utils/Constants";
import { useNavigate } from "react-router-dom";
function Electronic({ registrationNumber }) {
  const [electronicData, setElectronicData] = useState({
    username:localStorage.getItem('username'),
    mobile_phone: false,
    laptop: false,
    earphone: false,
    kindle: false,
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const navigate=useNavigate();

  const handleCheckboxChange = (name) => {
    setElectronicData((prevData) => ({ ...prevData, [name]: !prevData[name] }));
  };

  const handleSubmit = async () => {
    try {
      const csrftoken = getCookie('csrftoken'); // Retrieve CSRF token

      if (!csrftoken) {
        setSnackbarMessage("CSRF token not found.");
        setSnackbarOpen(true);
        return;
      }

      const response = await fetch(server+":"+serverPort+'/api/submit-electronic/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrftoken,
        },
        body: JSON.stringify(electronicData)
      });

      if (response.ok) {
        setSnackbarMessage('Electronic record submitted successfully.');
        setSnackbarOpen(true);
        setSubmitted(true);
        setTimeout(() => {
          navigate("/student-home")
        }, 2000)
      } else {
        setSnackbarMessage('Failed to submit electronic record.');
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  // Function to get CSRF token from cookie
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  };

  return (
    <header>
      <div className="style">
        <h2>Electronic Record</h2>
        <hr />
        <h4>Mark the Electronic items you got</h4>
        <FormControlLabel
          control={<Checkbox checked={electronicData.mobile_phone} onChange={() => handleCheckboxChange("mobile_phone")} />}
          label="Mobile Phone"
        />
        <br />
        <FormControlLabel
          control={<Checkbox checked={electronicData.earphone} onChange={() => handleCheckboxChange("earphone")} />}
          label="Earphone"
        />
        <br />
        <FormControlLabel
          control={<Checkbox checked={electronicData.laptop} onChange={() => handleCheckboxChange("laptop")} />}
          label="Laptop"
        />
        <br />
        <FormControlLabel
          control={<Checkbox checked={electronicData.kindle} onChange={() => handleCheckboxChange("kindle")} />}
          label="Kindle"
        />
        <br />
        <FormControlLabel control={<Checkbox />} label="Power bank" />
        <br />
        <br />
        <br />
        {!submitted && (
          <Button variant="outlined" onClick={handleSubmit}>
            Submit
          </Button>
        )}
         {submitted && (
          <p>Form submitted successfully!</p>
        )}
      </div>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose} message={snackbarMessage} />
    </header>
  );
}

export default Electronic;
