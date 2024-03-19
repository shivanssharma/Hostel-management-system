
import React, { useState, useEffect } from "react";
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Box, Typography } from '@mui/material';
import axios from "axios";
import './stud.css';
import "../asset/sharedAnimation.css"
import StudentHorizontalNav from "../navbars/HorizontalNav/student_hnav";
import { server, serverPort } from "../utils/Constants";



function StudentAilment() {
  const [ailment, setAilment] = useState("");
  const [ailmentList, setAilmentList] = useState([]);
  const [medicineData, setMedicineData] = useState([]);
  const [suggestion, setSuggestion] = useState("");
 

  useEffect(() => {
    // Fetch ailment list from the backend
    axios.get(`${server}:${serverPort}/api/ailment/`)
      .then(response => {
        setAilmentList(response.data);
      })
      .catch(error => {
        console.error("Error fetching ailment list:", error);
      });
  }, []);

  const ailmentChange = (event) => {
    const selectedAilment = event.target.value;
    setAilment(selectedAilment);
  };

  useEffect(() => {
    if (ailment) {
      axios.get(`${server}:${serverPort}/api/suggest_medicine/${encodeURIComponent(ailment.AilmentName)}/`)
        .then(response => {
          const medicineNames = response.data;
          setMedicineData(medicineNames);
          
          
        })
        .catch(error => {
          console.error("Error fetching medicine list:", error);
        });
        
    }
  }, [ailment]);

  const handleSuggestMedicine = () => {
    if (medicineData.length > 0) {
      const displayText = `${medicineData.join(", ")} Can be taken from holistic health department (if present) `;
      setSuggestion(displayText);
    } else {
      setSuggestion("You Can Check with the Department");
    }
  };

  return (
    <Box>
    <StudentHorizontalNav/>
      <Box className="SA-Style">
        <Typography variant="h3" className="AdA-title grayFont" sx={{display: 'flex', justifyContent: 'flex-start'}}>
          <text className="BrasikaFont floatRightIn">
            Need Some Medicine!!
          </text>
        </Typography>

        <Box className="SA-Item">
          <h4 className="BrasikaFont floatRightIn grayFont">
            Select Ailment
          </h4>
          <FormControl variant="outlined" style={{ width: '100%', marginBottom: '5%' }}>
            <InputLabel id="ailment-label">Ailment</InputLabel>
            <Select
              className="floatRightIn"
              labelId="ailment-label"
              id="ailment"
              value={ailment}
              onChange={ailmentChange}
              label="Ailment"
            >
              {ailmentList.map((ailmentItem) => (
                <MenuItem key={ailmentItem.AilmentID} value={ailmentItem}>
                  {ailmentItem.AilmentName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>



          <h4 className="BrasikaFont floatRightIn grayFont">
            Description
          </h4>
          <TextField id="filled-basic"  className="floatRightIn" label="Description" variant="outlined" style={{ width: '100%', marginBottom: '5%'  }} />
        
          <Button variant="outlined" className="floatRightIn" sx={{marginBottom: '5%', p: '2%' }} onClick={handleSuggestMedicine}>Suggest Medicine</Button>

          <TextField
            className="floatRightIn"
            id="outlined-multiline-static"
            label="Suggestion"
            multiline
            rows={4}
            style={{ width: '100%' }}
            value={suggestion}
          />
        </Box>        
      </Box>
    </Box>
  );
}

export default StudentAilment;
