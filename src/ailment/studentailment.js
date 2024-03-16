
import React, { useState, useEffect } from "react";
import { TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import axios from "axios";
import './stud.css';
import StudentHorizontalNav from "../navbars/HorizontalNav/student_hnav";



function StudentAilment() {
  const [ailment, setAilment] = useState("");
  const [ailmentList, setAilmentList] = useState([]);
  const [medicineData, setMedicineData] = useState([]);
  const [suggestion, setSuggestion] = useState("");
 

  useEffect(() => {
    // Fetch ailment list from the backend
    axios.get(`http://127.0.0.1:8000/api/ailment/`)
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
      axios.get(`http://127.0.0.1:8000/api/suggest_medicine/${encodeURIComponent(ailment.AilmentName)}/`)
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
    <header>
    <StudentHorizontalNav/>
      <div className="Style">
        <h1>Need Some Medicine!!</h1>
        <hr />
        <div>
          <h2>Select Ailment</h2>
          <FormControl variant="outlined" style={{ width: '100%' }}>
            <InputLabel id="ailment-label">Ailment</InputLabel>
            <Select
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
        </div>
        <div>
          <h2>Description</h2>
          <TextField id="filled-basic" label="Description" variant="outlined" style={{ width: '100%' }} />
        </div>
        <br />
        <Button variant="outlined" onClick={handleSuggestMedicine}>Suggest Medicine</Button>
        <hr />
        <TextField
          id="outlined-multiline-static"
          label="Suggestion"
          multiline
          rows={4}
          style={{ width: '100%' }}
          value={suggestion}
        />
        
      </div>
    </header>
  );
}

export default StudentAilment;
