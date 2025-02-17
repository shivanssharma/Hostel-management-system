import React from 'react';
import ReactDOM from 'react-dom';


import App0 from './App';
import { ThemeProvider, createTheme } from '@mui/material';





const createLightTheme = createTheme({
  palette: {
      mode: "light",
  },
});

ReactDOM.render(
  <ThemeProvider theme={createLightTheme} >
    <App0 />
  </ThemeProvider>
  
,document.getElementById("root"));
