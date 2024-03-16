import React from 'react';
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
// import SuperuserNavbar from './sidenavbar/admin.jsx' ;
// import ActiveuserNavbar from './sidenavbar/student.jsx';
// import StaffuserNavbar from './sidenavbar/staff.jsx'; 
function App() {

  return (
    <div className="App">
       <Router>
        <Routes>
          <Route path="/" element={<SignInSide />} />
          <Route path="/adminhome" element={<AdminHome />}/>
          <Route path="/staffhome" element={<StaffHome />}/>
          <Route path="/studenthome" element={<StudentHome/>}/>
          <Route path="/signup" element={<SignUpSide />} />
         
          <Route path="/usermanagement" element={<Manage />} />
          <Route path="/asset" element={< AdminAsset/>} />
          <Route path="/roomallotment" element={<AdminRoomAllotment />} />
          <Route path="/ailment" element={<AdminAilment />} />
          <Route path="/medicine" element={<AdminMedicine />} /> 
          <Route path="/hospitalvisit" element={< HospitalVisitForm/>} />
          <Route path="/studentailment" element={< StudentAilment/>} />
          <Route path="/studentasset" element={<StudentAsset />} />  
          <Route path="/register" element={<StudentRegistration />} />
          <Route path="/forgotpassword/:username" element={<PasswordResetForm />} />
          <Route path="/viewroom" element={<AdminView />} />
          <Route path="/studentviewroom" element={<StudentView />} />
        </Routes>
      </Router>
    </div>
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
//     <Link  id='link'   to="/roomallotment">  Check Room</Link><br/>
//     <br />
//     <Link  id='link'   to="/manage"> User </Link><br/>
    
//     <Link  to="/stores"></Link>
//     <Link   to="/electronics"> </Link>
//     <Link   to="/ailment"> </Link> 
//     <Link    to="/asset">  </Link>
//     <Link  id='link'   to="/forgotpassword"></Link><br/>

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
//           <Route path="/roomallotment" element={<StudentRoom />} />
//           <Route path="/stores" element={<Stores />} />
//           <Route path="/electronics" element={<Electronic />} />
//           <Route path="/manage" element={<Manage />} />
//           <Route path="/forgotpassword/:username" element={<ForgotPasswordForm />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App0;