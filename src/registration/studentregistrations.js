
//-----------------------------------------------------------------------------------
import React, { useState, useRef } from "react";
import { TextField, Autocomplete, Button, Box } from "@mui/material";
// import App10 from "../navbarHealth"; // Remove if unused
import { Outlet } from "react-router-dom";
import Nav2 from "../navbars/Nav2";
import './register.css'
import "../asset/sharedAnimation.css"
import { server, serverPort } from "../utils/Constants";
function StudentRegistration() {
  const textFieldStyle = {
    width: '100%', // Adjust as needed for your design
    marginBottom: '3%', // Adjust the margin for spacing between text fields
    
}
  const courses = [
    { value: "1 bsc", label: "1 BSC" },
    { value: "1 bba", label: "1 BBA" },
    { value: "2 bsc", label: "2 BSC" },
    { value: "2 bba", label: "2 BBA" },
    { value: "3 bsc", label: "3 BSC" }, // Ensure all values have double quotes
    { value: "3 bba", label: "3 BBA" },
    { value: "1 msc", label: "1 MSC" },
    { value: "2 msc", label: "2 MSC" },
  ];

  const dateInputRef = useRef(null);
  const [date, setDate] = useState("");
  const [birth, setBirth] = useState("");
  const [regis, setRegis] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [father, setFather] = useState("");
  const [mother, setMother] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(null);

  const handleChange = (e) => {
    setDate(e.target.value);
  };

  const handleChange1 = (e) => {
    setBirth(e.target.value);
  };

  const handleRegis = (e) => {
    setRegis(e.target.value);
  };

  const handleFname = (e) => {
    setFname(e.target.value);
  };

  const handleLname = (e) => {
    setLname(e.target.value);
  };

  const handleFather = (e) => {
    setFather(e.target.value);
  };

  const handleMother = (e) => {
    setMother(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePhone = (e) => {
    setPhone(e.target.value);
  };

  const handleSubmit = () => {
    const dataToSend = {
      date,
      birth,
      regis,
      fname,
      lname,
      selectedCourse: selectedCourse ? selectedCourse.value : "", // Access the value only if selected
      father,
      mother,
      phone,
      email,

      // Add other fields here if needed
    };

    console.log(selectedCourse.value); // Log for verification (optional)

    // Send data using fetch or a similar mechanism
    fetch(server+':'+serverPort+"/api/form_data/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Data sent successfully");
          // Handle success, e.g., show a success message
        } else {
          console.error("Failed to send data");
          // Handle errors, e.g., show an error message
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };   
    
    return(
        <Box>
          <Nav2 />
          <Box className="styletwo">
              <h3 className="BrasikaFont floatRightIn grayFont">Registration number </h3>
              <TextField className="floatRightIn SR-input" id="outlined-basic" label="Registration number" onChange={handleRegis} variant="outlined" style={textFieldStyle}/>

              <Box className="SR-dualInput">
                  <h3 className="BrasikaFont floatRightIn grayFont">First name </h3>
                  <TextField className="floatRightIn" id="outlined-basic" label="First name" onChange={handleFname} variant="outlined"  />

                  <h3 className="BrasikaFont floatRightIn grayFont">Last name </h3>
                  <TextField className="floatRightIn" id="outlined-basic" label="Last name" onChange={handleLname} variant="outlined" />
              </Box>
              
              <h3 className="BrasikaFont floatRightIn grayFont">Course and year</h3>
              <Autocomplete
                  className="floatRightIn"
                  id="combo-box-demo"
                  options={courses}
                  getOptionLabel={(option) => option.label}
                  onChange={(event, value) => {
                      setSelectedCourse(value);
                  }}
                  value={selectedCourse}
                  renderInput={(params) => <TextField {...params} label="Course" />}
                  style={textFieldStyle}
              />

              <h3 className="BrasikaFont floatRightIn grayFont">Date-of-Joining </h3>
              <Box>
                <TextField
                    className="floatRightIn"
                    type="date"
                    onChange={handleChange}
                    ref={dateInputRef}
                    style={textFieldStyle}
                />
                <p className="floatRightIn">Date-of-joining: {date}</p>
              </Box>

              <hr/>
              <h3 style={{marginTop: '3%'}} className="BrasikaFont floatRightIn grayFont">Parents Details:</h3>
              <Box className='SR-dualInput'> 
                <h3 className="BrasikaFont floatRightIn grayFont">Father name</h3>
                <TextField className="floatRightIn" id="outlined-basic" label="Father name" onChange={handleFather} variant="outlined"  />

                <h3 className="BrasikaFont floatRightIn grayFont">Mother name </h3>
                <TextField className="floatRightIn" id="outlined-basic" label="Mother name" onChange={handleMother} variant="outlined" />
              </Box>
              {/* <hr/> */}
              <h3  className="BrasikaFont floatRightIn grayFont">Personal Details:</h3>
              <h4  className="BrasikaFont floatRightIn grayFont">Date-of-birth </h4>
              <TextField
                  className="floatRightIn"
                  type="date"
                  onChange={handleChange1}
                  ref={dateInputRef}
                  style={textFieldStyle}
              />
              <p className="floatRightIn">Date-of-birth: {birth}</p>
              <Box className='SR-dualInput'>
                <h3 className="BrasikaFont floatRightIn grayFont">Email id</h3>
                <TextField className="floatRightIn" id="outlined-basic" label="Email-id" onChange={handleEmail} variant="outlined" />

                <h3 className="BrasikaFont floatRightIn grayFont">Phone number</h3>
                <TextField className="floatRightIn" id="outlined-basic" label="Phone number" onChange={handlePhone} variant="outlined"  /><br/>
              </Box>
              <hr/>
            <br/>
            <br/>
            <Button className="floatRightIn" variant="outlined" sx={{p: '2%'}} onClick={handleSubmit}>Submit</Button> 
            
          </Box>
          <Outlet/>
        </Box>
    );
}

export default StudentRegistration;





    
    

    

