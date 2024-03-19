//-----------------------------------------------------------------------------------
import React, { useState, useRef } from "react";
import { TextField, Autocomplete, Button, Snackbar, Box } from "@mui/material";
import StudentHorizontalNav2 from "../navbars/HorizontalNav/StudenthNav2.jsx";
import Electronic from "../electronics/electronics.js";
// import App10 from "../navbarHealth"; // Remove if unused
import { Outlet } from "react-router-dom";
import Nav2 from "../navbars/Nav2";

import './register.css'
import "../asset/sharedAnimation.css"
import { server, serverPort } from "../utils/Constants";

function StudentRegistration() {
    const [formData, setFormData] = useState({
        regis: '',
        fname: '',
        lname: '',
        selectedCourse: '',
        date: '',
        father: '',
        mother: '',
        birth: '',
        email: '',
        address: '',
        phone: ''
    });
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [submitted, setSubmitted] = useState(false); // State to track form submission

    const textFieldStyle = {
        width: '99%',
        marginBottom: '15px',
    };

    const courses = [
        { name: '1 BSc' },
        { name: '1 BBA' },
        { name: '2 BSc' },
        { name: '2 BBA' },
        { name: '3 BBA' },
        { name: '3 BSc' },
        { name: '1 MSc' },
        { name: '2 MSc' },
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async () => {
        try {
            const csrftoken = getCookie('csrftoken'); // Retrieve CSRF token
    
            if (!formData.selectedCourse) {
                setSnackbarMessage("Please select a course.");
                setSnackbarOpen(true);
                return;
            }
    
            const response = await fetch(server+':'+serverPort+'/api/save_student_data/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrftoken, // Include CSRF token in headers
                },
                body: JSON.stringify(formData)
            });
    
            if (response.ok) {
                setSnackbarMessage('Form submitted successfully.');
                setSnackbarOpen(true);
                setSubmitted(true); // Set submitted to true after successful submission
            } else {
                setSnackbarMessage('Failed to submit form.');
                setSnackbarOpen(true);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    
    
    const getCookie = (name) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
    };

    return (
      <Box>
          <StudentHorizontalNav2 />
          <Box className="styletwo">
              {submitted ? (
                  <Electronic />
              ) : (
                  <>
                    <h1 className="BrasikaFont floatRightIn grayFont">Register Yourself </h1>
                    <h3 className="BrasikaFont floatRightIn grayFont">Registration number </h3>
                    
                    <TextField className="floatRightIn SR-input" name="regis" value={formData.regis} onChange={handleChange} label="Registration number" variant="outlined" required style={textFieldStyle}/>
                    
                    <Box className="SR-dualInput">
                      <h3 className="BrasikaFont floatRightIn grayFont">First name </h3>
                      <TextField className="floatRightIn" name="fname" value={formData.fname} onChange={handleChange} label="First name" variant="outlined" required />

                      <h3 className="BrasikaFont floatRightIn grayFont">Last name </h3>
                      <TextField className="floatRightIn" name="lname" value={formData.lname} onChange={handleChange} label="Last name" variant="outlined" required />
                    </Box>

                    <h3 className="BrasikaFont floatRightIn grayFont">Course and year </h3>
                    <Autocomplete
                        className="floatRightIn"
                        disablePortal
                        id="combo-box-demo"
                        options={courses}
                        style={textFieldStyle}
                        getOptionLabel={(option) => option.name}
                        isOptionEqualToValue={(option, value) => option.name === value.name}
                        onChange={(event, value) => setFormData(prevState => ({ ...prevState, selectedCourse: value ? value.name : '' }))}
                        renderInput={(params) => <TextField {...params} label="Course" />}
                        required
                    />

                    <h3 className="BrasikaFont floatRightIn grayFont">Date-of-Joining </h3>
                    <TextField className="floatRightIn" type="date" name="date" value={formData.date} onChange={handleChange} variant="outlined" required style={textFieldStyle}/>
                    <br />
                    
                    <hr />
                    <h3 style={{marginTop: '3%'}} className="BrasikaFont floatRightIn grayFont">Parents Details:</h3>
                    <Box className='SR-dualInput'>
                        <h3 className="BrasikaFont floatRightIn grayFont">Father name</h3>
                        <TextField className="floatRightIn" name="father" value={formData.father} onChange={handleChange} label="Father name" variant="outlined" required />

                        <h3 className="BrasikaFont floatRightIn grayFont">Mother name </h3>
                        <TextField className="floatRightIn" name="mother" value={formData.mother} onChange={handleChange} label="Mother name" variant="outlined" required />
                    </Box>

                    <h3 className="BrasikaFont floatRightIn grayFont">Personal Details:</h3>
                    <h4 className="BrasikaFont floatRightIn grayFont">Date-of-birth </h4>
                    <TextField className="floatRightIn" style={textFieldStyle} type="date" name="birth" value={formData.birth} onChange={handleChange} variant="outlined" required />

                    <Box className='SR-dualInput'>
                        <h3 className="BrasikaFont floatRightIn grayFont">Email id</h3>
                        <TextField className="floatRightIn" name="email" value={formData.email} onChange={handleChange} label="Email-id" variant="outlined" required />

                        <h3 className="BrasikaFont floatRightIn grayFont">Phone number</h3>
                        <TextField className="floatRightIn" name="phone" value={formData.phone} onChange={handleChange} label="Phone Number" variant="outlined" required />
                    </Box>
                    
                    
                    <h3 className="BrasikaFont floatRightIn grayFont">Address</h3>
                    <TextField className="floatRightIn" style={textFieldStyle} name="address" value={formData.address} onChange={handleChange} label="Address" variant="outlined" required />
                    <hr />
                    <Button className="floatRightIn" sx={{p: '2%'}} variant="outlined" onClick={handleSubmit}>Submit</Button>
                  </>
              )}
          </Box>
          <Snackbar
              open={snackbarOpen}
              autoHideDuration={6000}
              onClose={() => setSnackbarOpen(false)}
              message={snackbarMessage}
          />
      </Box>
    );
}

export default StudentRegistration;
// //-----------------------------------------------------------------------------------
// import React, { useState, useRef } from "react";
// import { TextField, Autocomplete, Button } from "@mui/material";
// // import App10 from "../navbarHealth"; // Remove if unused
// import { Outlet } from "react-router-dom";
// import Nav2 from "../navbars/Nav2";
// import './register.css'
// function StudentRegistration() {
//   const textFieldStyle = {
//     width: '75%', // Adjust as needed for your design
//     marginBottom: '15px', // Adjust the margin for spacing between text fields
    
// }
//   const courses = [
//     { value: "1 bsc", label: "1 BSC" },
//     { value: "1 bba", label: "1 BBA" },
//     { value: "2 bsc", label: "2 BSC" },
//     { value: "2 bba", label: "2 BBA" },
//     { value: "3 bsc", label: "3 BSC" }, // Ensure all values have double quotes
//     { value: "3 bba", label: "3 BBA" },
//     { value: "1 msc", label: "1 MSC" },
//     { value: "2 msc", label: "2 MSC" },
//   ];

//   const dateInputRef = useRef(null);
//   const [date, setDate] = useState("");
//   const [birth, setBirth] = useState("");
//   const [regis, setRegis] = useState("");
//   const [fname, setFname] = useState("");
//   const [lname, setLname] = useState("");
//   const [father, setFather] = useState("");
//   const [mother, setMother] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [selectedCourse, setSelectedCourse] = useState(null);

//   const handleChange = (e) => {
//     setDate(e.target.value);
//   };

//   const handleChange1 = (e) => {
//     setBirth(e.target.value);
//   };

//   const handleRegis = (e) => {
//     setRegis(e.target.value);
//   };

//   const handleFname = (e) => {
//     setFname(e.target.value);
//   };

//   const handleLname = (e) => {
//     setLname(e.target.value);
//   };

//   const handleFather = (e) => {
//     setFather(e.target.value);
//   };

//   const handleMother = (e) => {
//     setMother(e.target.value);
//   };

//   const handleEmail = (e) => {
//     setEmail(e.target.value);
//   };

//   const handlePhone = (e) => {
//     setPhone(e.target.value);
//   };

//   const handleSubmit = () => {
//     const dataToSend = {
//       date,
//       birth,
//       regis,
//       fname,
//       lname,
//       selectedCourse: selectedCourse ? selectedCourse.value : "", // Access the value only if selected
//       father,
//       mother,
//       phone,
//       email,

//       // Add other fields here if needed
//     };

//     console.log(selectedCourse.value); // Log for verification (optional)

//     // Send data using fetch or a similar mechanism
//     fetch("http://127.0.0.1:8000/api/form_data/", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(dataToSend),
//     })
//       .then((response) => {
//         if (response.ok) {
//           console.log("Data sent successfully");
//           // Handle success, e.g., show a success message
//         } else {
//           console.error("Failed to send data");
//           // Handle errors, e.g., show an error message
//         }
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//       });
//   };   
    
//     return(
//         <header>
//            <Nav2 />
//         <div className="styletwo">
//             <h3>Registration number </h3>
//             <TextField id="outlined-basic" label="Registration number" onChange={handleRegis} variant="outlined" style={textFieldStyle}/>
//             <div className="TwoTextFieldsTogether">
//                 <h3>First name </h3>
//                 <TextField id="outlined-basic" label="First name" onChange={handleFname} variant="outlined"  />
//                 <h3>Last name </h3>
//                 <TextField id="outlined-basic" label="Last name" onChange={handleLname} variant="outlined" />
//             </div>
            
//             <h3>Course and year</h3>
//             <Autocomplete
//                 id="combo-box-demo"
//                 options={courses}
//                 getOptionLabel={(option) => option.label}
//                 onChange={(event, value) => {
//                     setSelectedCourse(value);
//                 }}
//                 value={selectedCourse}
//                 sx={{ width: 300 }}
//                 renderInput={(params) => <TextField {...params} label="Course" />}
//                 style={textFieldStyle}
//             />

//             <h3>Date-of-Joining </h3>
//             <div>
//             <TextField
//                 type="date"
//                 onChange={handleChange}
//                 ref={dateInputRef}
//                 style={textFieldStyle}
//             />
//             <p>Date-of-joining: {date}</p>
//             </div>

//             <hr/>
//             <h3>Parents Details:</h3>
//             <div className='TwoTextFieldsTogether'> 
            
//             <h3>Father name</h3>
//             <TextField id="outlined-basic" label="Father name" onChange={handleFather} variant="outlined"  />
//             <h3>Mother name </h3>
//             <TextField id="outlined-basic" label="Mother name" onChange={handleMother} variant="outlined" />
//             </div>
//             <br/>
//             <hr/>
//             <h3>Personal Details:</h3>
//             <h3>Date-of-birth </h3>
//             <TextField
//                 type="date"
//                 onChange={handleChange1}
//                 ref={dateInputRef}
//                 style={textFieldStyle}
//             />
//             <p>Date-of-birth: {birth}</p>
//             <div className='TwoTextFieldsTogether'>
//             <h3>Email id</h3>
//             <TextField id="outlined-basic" label="Email-id" onChange={handleEmail} variant="outlined" />
//             <h3>Phone number</h3>
//             <TextField id="outlined-basic" label="Phone number" onChange={handlePhone} variant="outlined"  /><br/>
//             </div>
//             <hr/>
//            <br/>
//            <br/>
//            <Button variant="outlined" onClick={handleSubmit}>Submit</Button> 
           
//         </div>
//         <Outlet/>
//         </header>
//     );
// }

// export default StudentRegistration;





    
    

    

