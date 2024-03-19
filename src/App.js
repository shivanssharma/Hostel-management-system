import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminHome from './HomePage/AdminHome.js';
import StaffHome from './HomePage/Staffhome.js';
import StudentHome from './HomePage/Studenthome.js';
import SignInSide from './loginpage/login.js';
import SignUpSide from './loginpage/signup.js';
import Manage from './admin manager/user_manager.js';
import PasswordResetForm from './admin manager/forgot_password.js';
import AdminAilment from './ailment/adminailment.js';
import StudentAilment from './ailment/studentailment.js';
import AdminAsset from './asset/adminasset.js';
import StudentAsset from './asset/studentasset.js';
import HospitalVisitForm from './hospitalvisit/hospitalvisit.jsx';
import StudentRegistration from './registration/studentregistrations.js';
import AdminRoomAllotment from './room _component/app.js';
import AdminView from './room _component/adminview.js';
import StudentView from './room _component/studentView.js';
import AdminMedicine from './Medicine/admin_medicine/AdminMedicine.jsx';
import { Box, Tooltip, Typography, useMediaQuery } from '@mui/material';
import ActiveuserNavbar from './sidenavbar/student.jsx';
import { useState } from 'react';

import "./asset/sharedCss.css"
import { CloseRounded, MenuRounded } from '@mui/icons-material';
import SuperuserNavbar from './sidenavbar/admin.jsx';
import StaffuserNavbar from './sidenavbar/staff.jsx';
// import SuperuserNavbar from './sidenavbar/admin.jsx' ;
// import ActiveuserNavbar from './sidenavbar/student.jsx';
// import StaffuserNavbar from './sidenavbar/staff.jsx'; 
function App() {
  const [open, setOpen] = useState(localStorage.length > 0 ? true : false);
  const [loggedin, setLoggedIn] = useState(localStorage.length > 0 ? true : false);
  const [userType, setUserType] = useState(localStorage.getItem("userType"))
  function callback(flag) {
    setOpen(flag)
    setLoggedIn(flag)
  }
  useEffect(() => {
    setUserType(localStorage.getItem("userType"))
  },[open])
  const isSmallScreen = useMediaQuery(theme => theme.breakpoints.down('sm')); // Change 'sm' to other breakpoints as needed
  
  return (
      <Box className="App">
        {loggedin 
          ? 
            <Tooltip 
              title={open ? "Close Menu" : "Open Menu"} placement='left-end'
            >
              <Box 
                className="MenuOpenBtn flexColumn centerFlex topElement" 
                sx={{width:{lg: '3%'}}}
                onClick={() => setOpen(!open)}
              >
                <Typography variant='p' > HMIS </Typography>
                {/* <IconButton> */}
                  {open 
                    ? <CloseRounded className="icons" />
                    : <MenuRounded className="icons" />
                  }
                {/* </IconButton> */}
              </Box>
            </Tooltip>
          :
            null
        }
        <Router>
          <Box sx={{ position: 'relative', display: 'flex', flexDirection: 'row'}}>
            <Box className={`${isSmallScreen ? "sideSmallMenu": "sideMenu"}  ${open ? "openSideNav" : "closeSideNav"}`} >
              <Box className="menuContainer">
                {
                  userType === "admin"
                  ? <SuperuserNavbar callback={setOpen} />
                  : userType === "staff"
                  ? <StaffuserNavbar callback={setOpen} />
                  : userType === "student"
                  ? <ActiveuserNavbar callback={setOpen} />
                  : null
                }
              </Box>
            </Box>
            <Box 
                // className="flexColumn" 
                sx={{
                    position: 'relative', 
                    height: '100vh',
                    flex: 1,
                    overflowX: 'hidden', 
                    overflowY: 'auto',
                    justifyContent: 'center'
                  }}>
                <Routes>
                  <Route path="/" element={<SignInSide loggedIn={callback} />} />
                  <Route path="/admin-home" element={<AdminHome />}/>
                  <Route path="/staff-home" element={<StaffHome />}/>
                  <Route path="/student-home" element={<StudentHome/>}/>
                  <Route path="/signup" element={<SignUpSide />} />
                
                  <Route path="/user-management" element={<Manage />} />
                  <Route path="/asset" element={< AdminAsset/>} />
                  <Route path="/room-allotment" element={<AdminRoomAllotment />} />
                  <Route path="/ailment" element={<AdminAilment />} />
                  <Route path="/medicine" element={<AdminMedicine />} /> 
                  <Route path="/hospital-visit" element={< HospitalVisitForm/>} />
                  <Route path="/student-ailment" element={< StudentAilment/>} />
                  <Route path="/student-asset" element={<StudentAsset />} />  
                  <Route path="/register" element={<StudentRegistration />} />
                  <Route path="/forgot-password/:username" element={<PasswordResetForm />} />
                  <Route path="/viewroom" element={<AdminView />} />
                  <Route path="/student-viewroom" element={<StudentView />} />
                </Routes>
            </Box>
          </Box>
        </Router>
      </Box>
  );
}

export default App;
// import React from 'react';
// import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

// import Layout from '../home_page/home.js';
// import App2 from '../student_ailment/app2.js';
// import App5 from '../student_asset/app5.js';
// import App7 from '../student_hospitalvisit/app7.js';
// import App8 from '../registration/app8.js';
// //import App from './room _component/app';
// import SignInSide from '../loginpage/login.js';
// import SignUpSide from '../loginpage/signup.js';
// import Stores from '../stores/stores.js';
// import Electronic from '../electronics/electronics.js'
// import StudentRoom from '../room _component/studentView.js';
// import Manage from '../admin manager/user_manager.js'; 
// import ForgotPasswordForm from '../admin manager/forgot_password.js';

// const Navbar = () => (
//   <nav className="sidebar">
//     <img src="images\SSSIHL-Logo_Blue.png" alt='SSSIHL'></img>
//     <hr/>
//     <Link  to="/signin"> </Link>

//     <Link    to="/signup"> </Link> 

//     {/* <Link    to="/admin-notifications"> </Link> */}
//     <Link  id='link'  to="/home"> Home</Link> <br />

//     <Link  id='link'   to="/register">  Enrollement</Link> 
//     <br />
//     <Link  id='link'   to="/hospital">  Hospital</Link>
//     <br />
//     <Link  id='link'   to="/room-allotment">  Check Room</Link><br/>
//     <br />
//     <Link  id='link'   to="/manage"> User </Link><br/>
    
//     <Link  to="/stores"></Link>
//     <Link   to="/electronics"> </Link>
//     <Link   to="/ailment"> </Link> 
//     <Link    to="/asset">  </Link>
//     <Link  id='link'   to="/forgot-password"></Link><br/>

//     {/* <Link to='/studentnotifications'>Notifications</Link> */}
//   </nav>

// );


// function App0() {
//   return (
//     <Router>
//       <div className="App">
//         <Routes>       
//         <Route path="/" element={<SignInSide />} />
//         <Route path="/signup" element={<SignUpSide />} />
//         <Route path="/home" element={<><Navbar /><Layout /></>} />
//           {/* Ailment route */}
//           <Route path="/ailment" element={<App2 />} />
//           {/* Asset route */}
//           <Route path="/asset" element={<App5 />} />
//           <Route path="/hospital" element={<App7 />} />
//           <Route path="/register" element={<App8 />} />
//           <Route path="/room-allotment" element={<StudentRoom />} />
//           <Route path="/stores" element={<Stores />} />
//           <Route path="/electronics" element={<Electronic />} />
//           <Route path="/manage" element={<Manage />} />
//           <Route path="/forgot-password/:username" element={<ForgotPasswordForm />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App0;