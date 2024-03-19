// import React, { useState } from "react";
// import Select from '@mui/material/Select';  
// import MenuItem from '@mui/material/MenuItem';  
// import InputLabel from '@mui/material/InputLabel';  
// import { FormControl } from "@mui/material";
// import SelectAllTransferList from "./list.js";

// function App() {
//   const [selectedFloor, setSelectedFloor] = useState("");
//   const [selectedRoom, setSelectedRoom] = useState("");
//   const [selectedPosition, setSelectedPosition] = useState("");

//   const handleFloorChange = (event) => {
//     setSelectedFloor(event.target.value);
//   };

//   const handleRoomChange = (event) => {
//     setSelectedRoom(event.target.value);
//   };

//   const handlePositionChange = (event) => {
//     setSelectedPosition(event.target.value);
//   };

//   return (
//     <div>
//       <FormControl fullWidth style={{ width: '200px' }}>
//         <InputLabel id="label-id_1">Floor</InputLabel>
//         <Select
//           labelId="select-id_1"
//           id="id_1"
//           value={selectedFloor}
//           onChange={handleFloorChange}
//         >
//           <MenuItem value="" disabled>Select floor</MenuItem>
//           <MenuItem value="A">A</MenuItem>
//           <MenuItem value="B">B</MenuItem>
//           <MenuItem value="C">C</MenuItem>
//         </Select>
//       </FormControl> 

//       <FormControl fullWidth style={{ width: '200px' }}>
//         <InputLabel id="label-id_2">Room number</InputLabel>
//         <Select
//           labelId="select-id_2"
//           id="id_2"
//           value={selectedRoom}
//           onChange={handleRoomChange}
//         >
//           <MenuItem value="1">1</MenuItem>
//           <MenuItem value="2">2</MenuItem>
//           <MenuItem value="3">3</MenuItem>
//         </Select>
//       </FormControl>

//       <FormControl fullWidth style={{ width: '200px' }}>
//         <InputLabel id="label-id_3">Position</InputLabel>
//         <Select
//           labelId="select-id_3"
//           id="id_3"
//           value={selectedPosition}
//           onChange={handlePositionChange}
//         >
//           <MenuItem value="Room-leader">Room Leader</MenuItem>
//           <MenuItem value="Normal">Normal</MenuItem>
//           {selectedPosition === "Room-leader" && (
//             <>
//               <MenuItem value="1">1 UG</MenuItem>
//               <MenuItem value="2">2 UG</MenuItem>
//               <MenuItem value="3">3 UG</MenuItem>
//             </>
//           )}
//           {selectedPosition === "Normal" && (
//             <>
//               <MenuItem value="4">1msc</MenuItem>
//               <MenuItem value="5">2 msc</MenuItem>
//               <MenuItem value="6">3ug </MenuItem>
//             </>
//           )}
//         </Select>
          
//       </FormControl>
//       <div>
//           <SelectAllTransferList />
//       </div>
//     </div>    
//   );
// }

// export default App;

//------------------------------------------------------------------------------------------------------------------
import React, { useState,useEffect } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import { Box, FormControl, Typography } from "@mui/material";
import SelectAllTransferList from "./list.js";
import axios from "axios";
import AdminHorizontalNav2 from "../navbars/HorizontalNav/Adminhnav2.jsx";
import { server, serverPort } from "../utils/Constants.jsx";

import "../asset/sharedAnimation.css"
import "../asset/sharedCss.css"

function AdminRoomAllotment() {
  // const [leftItems, setLeftItems] = useState([]);
  // const [rightItems, setRightItems] = useState([]);

  // useEffect(() => {
  //   // Fetch data from backend
  //   fetch('your-backend-endpoint')
  //     .then(response => response.json())
  //     .then(data => {
  //       // Assume data is an array of objects with 'id' and 'name' properties
  //       const dataLeft = data.map(item => item.id); // Extract 'id' for left items
  //       const dataRight = data.map(item => item.name); // Extract 'name' for right items
  //       setLeftItems(dataLeft); // Update state with left items
  //       setRightItems(dataRight); // Update state with right items
  //     })
  //     .catch(error => console.error('Error fetching data:', error));
  // }, []); // Empty dependency array ensures the effect runs only once on component mount

  
  const [selectedFloor, setSelectedFloor] = useState("");
  const [selectedRoom, setSelectedRoom] = useState("");
  const [selectedPosition, setSelectedPosition] = useState("");
  const [selectedDropdown, setSelectedDropdown] = useState("");
  const [studentList, setStudentList] = useState();
  const [roomList, setRoomList] = useState();
  const [rightList, setRightList] = useState([]); // State to store the right list
  const [loginError, setLoginError] = useState(null);
  console.log("New room list")
  console.log(rightList)
  console.log(selectedPosition)
  // const [updatedRoomList, setUpdatedRoomList] = useState([]);
  //const [ready, setReady] = useState(false);
        // Function to fetch 3UG list from Django backend
        useEffect(() => {
          // Fetch room list
          // axios.get(server+':'+serverPort+'/api/rooms/')
          //   .then(response => {
          //     setRoomList(response.data);
          //   })
          //   .catch(error => {
          //     console.error('Error fetching room list:', error);
          //   });

          // Fetch 3UG list
          
            axios.get(`${server}:${serverPort}/api/room/${selectedFloor}/${selectedRoom}/`)
            .then(response => {
              setRoomList(response.data);
              console.log('hello world, we got list data: ')
              console.log(response.data);
              //setReady(true)
            })
            .catch(error => {
              console.error('Error fetching Room list:', error);
            });
                
        }, [selectedFloor,selectedRoom]);
        console.log(studentList);
        useEffect(() => {
          
          // Fetch 3UG list if room leader option is selected
          if (selectedPosition === "room leader" || selectedPosition === "room mate") {

            axios.get(`${server}:${serverPort}/api/students/${selectedDropdown}/`)
              .then(response => {
                setStudentList(response.data);
              })
              .catch(error => {
                console.error(`Error fetching ${selectedDropdown} list:`, error);
              });

          }
          
        }, [selectedDropdown, selectedPosition]);

  // console.log(studentList)
  const handleFloorChange = (event) => {
    const Floor=event.target.value;
    setSelectedFloor(Floor);
   // console.log(Floor);
  };

  const handleRoomChange = (event) => {
    const Room=event.target.value;
    setSelectedRoom(Room);
  };

  const handlePositionChange = (event) => {
    const position=event.target.value;
    setSelectedPosition(position);
    // it Resets Additional Dropdown when Position changes
    setSelectedDropdown("");
  };

  const handleDropdownChange = (event) => {
    const RoomLeader=event.target.value;
    setSelectedDropdown(RoomLeader);
  };

  const handleSubmit = () => {
    // Make a POST request to save the updated data in the backend
    axios.post(server+':'+serverPort+"/api/save_data/", {
      // roomList: roomList,
      rightList: rightList,
      selectedFloor: selectedFloor,
      selectedRoom: selectedRoom,
      selectedPosition:selectedPosition
      
    })
    
    .then((response) => {
      console.log("Data saved successfully:", response.data);
      setLoginError("Data saved successfully");

    })
    .catch((error) => {
      console.error("Error saving data:", error);
      setLoginError("Error saving data may be duplicacy");
    });
  };
  console.log("this is the room list",roomList)
 
  return (
    <Box >
      <AdminHorizontalNav2 />
      <Box sx={{display: 'flex', flexDirection: 'column', width: '80%', margin: 'auto', p: '5%'}}>
        <Typography 
          variant="h3" className="grayFont" 
          sx={{display: 'flex', justifyContent: 'flex-start', paddingBottom: '5%'}}
        >
          <text className="BrasikaFont floatRightIn">
          Allocate Room
          </text>
        </Typography>
        
        <Box sx={{width: '100%'}} className="floatUpIn">
          <FormControl sx={{width:'48%', marginRight: '1%'}}>
            <InputLabel id="label-id_1">Floor</InputLabel>
            <Select
              labelId="select-id_1"
              id="id_1"
              value={selectedFloor}
              onChange={handleFloorChange}
            >
              <MenuItem value="" disabled>
                Select floor
              </MenuItem>
              <MenuItem value="a">a</MenuItem>
              <MenuItem value="b">b</MenuItem>
              <MenuItem value="c">c</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{width:'48%', marginLeft: '1%'}}>
            <InputLabel id="label-id_2"style={{paddingLeft:'60px'}}>Room number</InputLabel>
            <Select
              labelId="select-id_2"
              id="id_2"
              value={selectedRoom}
              onChange={handleRoomChange}
            >
              <MenuItem value="1">1</MenuItem>
              <MenuItem value="2">2</MenuItem>
              <MenuItem value="3">3</MenuItem>
            </Select>
          </FormControl>
        </Box>
        
        <Box sx={{width: '100%', marginTop: '3%'}} className="floatUpIn">
          <FormControl sx={{width:'48%', marginRight: '1%'}}>
            <InputLabel id="label-id_3">Position</InputLabel>
            <Select
              labelId="select-id_3"
              id="id_3"
              value={selectedPosition}
              onChange={handlePositionChange}
            >
              <MenuItem value="room leader">Room Leader</MenuItem>
              <MenuItem value="room mate">Room mate</MenuItem>
            </Select>
          </FormControl>

          {selectedPosition === "room leader" && (
            <FormControl sx={{width:'48%', marginLeft: '1%'}}>
              <InputLabel id="label-id_4" >Select Rooms for room-leaders</InputLabel>
              <Select
                labelId="select-id_4"
                id="id_4"
                value={selectedDropdown}
                onChange={handleDropdownChange}
              >
                <MenuItem value="3 ug">3 Ug</MenuItem>
                <MenuItem value="1 msc">1 Msc</MenuItem>
                <MenuItem value="2 msc">2 Msc</MenuItem>
              </Select>
            </FormControl>
          )}

          {selectedPosition === "room mate" && (
              <FormControl sx={{width:'48%', marginLeft: '1%'}}>
              <InputLabel id="label-id_5">Select Rooms for Roommate</InputLabel>
              <Select
                labelId="select-id_5"
                id="id_5"
                value={selectedDropdown}
                onChange={handleDropdownChange}
              >
                
                <MenuItem value="1 ug">1 Ug</MenuItem>
                <MenuItem value="2 ug">2 Ug</MenuItem>
                <MenuItem value="3 ug">3 Ug</MenuItem>
                <MenuItem value="1 msc">1 Msc</MenuItem>
                <MenuItem value="2 msc">2 Msc</MenuItem>
              </Select>
            </FormControl>
          )}

        </Box>

        <Box sx={{mt: '5%', mb: '5%', p: '5%', borderRadius: '7px', background: '#f5efef'}} className="floatUpIn">
          {
            roomList && studentList && <SelectAllTransferList roomList={roomList} studentList={studentList} setRightList={setRightList}/>
          }
        </Box>
        
        {loginError && <p style={{ color: 'Green' }}>{loginError}</p>} 
        <Button sx={{p: '1%', width: '10%'}} className="floatUpIn" variant="outlined" onClick={handleSubmit}>Submit</Button>
      </Box>
    </Box>
  );
}

export default AdminRoomAllotment;

