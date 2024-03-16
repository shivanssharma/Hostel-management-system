import React from "react";
import { FormControlLabel,Checkbox,Button } from "@mui/material";
import './electroni.css';

function Electronic(){
    return(
        <div className="style">
            <h2>Electronic Record</h2>
            <hr />
            <h4>Mark the electronic items you have got</h4>
            <FormControlLabel control={<Checkbox />} label="Mobile Phone" />
            <br />
            <FormControlLabel control={<Checkbox />} label="Earphone" />
            <br />
            <FormControlLabel control={<Checkbox />} label="Laptop" />
            <br />
            <FormControlLabel control={<Checkbox />} label="kindle" />
            <br />
            <FormControlLabel control={<Checkbox />} label="Power bank" />
            <br />
            <Button variant="contained">Submit</Button>
        </div>
    );
}
export default Electronic;