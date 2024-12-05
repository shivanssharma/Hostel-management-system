import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './admasset.css';
import { server, serverPort } from '../utils/Constants';
import { Box, Typography } from '@mui/material';
import AdminHorizontalNav from '../navbars/HorizontalNav/Admin_hnav';
function StudentAssetList() {
    const [bookings, setBookings] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = () => {
        axios.get(server+':'+serverPort+'/api/asset_bookings/')
            .then(response => {
                // Filter out bookings made more than 5-6 days ago
                const filteredBookings = response.data.filter(booking => {
                    const bookingDate = new Date(booking.ReservationDate);
                    const currentDate = new Date();
                    const daysDifference = Math.floor((currentDate - bookingDate) / (1000 * 60 * 60 * 24));
                    return daysDifference <= 6; // Adjust this value to filter out bookings made more than 5-6 days ago
                });
                setBookings(filteredBookings);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching bookings:', error);
                setLoading(false);
            });
    };

    // Function to format date as 'YYYY-MM-DD'
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    };

    return (
        <header>
            <AdminHorizontalNav/>
        <Box className='SLV-Style'>
            <Box>
                <Typography variant="h2" sx={{pb: '5%'}}>
                    <text className="BrasikaFont floatRightIn grayFont">
                        Asset Bookings
                    </text>
                </Typography>
            </Box>
            <Box>
             {
                loading 
                ? <p className="BrasikaFont floatRightIn grayFont">Loading...</p>
                : (
                    <table className="SLV-TableContainer">
                        <thead>
                            <tr>
                                <th className="BrasikaFont floatRightIn grayFont">Student Name</th>
                                <th className="BrasikaFont floatRightIn grayFont">Asset Name</th>
                                <th className="BrasikaFont floatRightIn grayFont">Reservation Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings && bookings.length > 0 ? (
                                bookings.map(booking => (
                                    <tr key={booking.id} className="SLV-TableRow">
                                        <td className="BrasikaFont floatRightIn grayFont SLV-TableItem">{booking.StudentName}</td>
                                        <td className="BrasikaFont floatRightIn grayFont SLV-TableItem">{booking.AssetName}</td>
                                        <td className="BrasikaFont floatRightIn grayFont SLV-TableItem">{formatDate(booking.ReservationDate)}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="BrasikaFont floatRightIn grayFont" style={{padding: '3%'}}>
                                      <h3> Currently there are no data to display</h3> 
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )
            }


            </Box>
        </Box>
        </header>
    );
}

export default StudentAssetList;
//-----------------------------------------------------
// // StudentAssetListView.js

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './admasset.css';
// import { server, serverPort } from '../utils/Constants';
// import { Box, Typography } from '@mui/material';
// import AdminHorizontalNav from '../navbars/HorizontalNav/Admin_hnav';
// function StudentAssetList() {
//     const [bookings, setBookings] = useState(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         fetchBookings();
//     }, []);

//     const fetchBookings = () => {
//         axios.get(server+':'+serverPort+'/api/asset_bookings/')
//             .then(response => {
//                 // Filter out bookings made more than 5-6 days ago
//                 const filteredBookings = response.data.filter(booking => {
//                     const bookingDate = new Date(booking.ReservationDate);
//                     const currentDate = new Date();
//                     const daysDifference = Math.floor((currentDate - bookingDate) / (1000 * 60 * 60 * 24));
//                     return daysDifference <= 6; // Adjust this value to filter out bookings made more than 5-6 days ago
//                 });
//                 setBookings(filteredBookings);
//                 setLoading(false);
//             })
//             .catch(error => {
//                 console.error('Error fetching bookings:', error);
//                 setLoading(false);
//             });
//     };

//     // Function to format date as 'YYYY-MM-DD'
//     const formatDate = (dateString) => {
//         const date = new Date(dateString);
//         return date.toISOString().split('T')[0];
//     };

//     return (
//         <header>
//         <AdminHorizontalNav/>
//         <Box className='SLV-Style'>
//             <Box>
//                 <Typography variant="h2" sx={{pb: '5%'}}>
//                     <text className="BrasikaFont floatRightIn grayFont">
//                         Asset Bookings
//                     </text>
//                 </Typography>
//             </Box>
//             <Box>
//                 {
//                     loading 
//                     ?  <p className="BrasikaFont floatRightIn grayFont">Loading...</p>
//                     : bookings && bookings ?
//                         <table className="SLV-TableContainer">
//                             <thead>
//                                 <tr>
//                                     <th className="BrasikaFont floatRightIn grayFont">Student Name</th>
//                                     <th className="BrasikaFont floatRightIn grayFont">Asset Name</th>
//                                     <th className="BrasikaFont floatRightIn grayFont">Reservation Date</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {bookings.map(booking => (
//                                     <tr key={booking.id} className="SLV-TableRow">
//                                         <td className="BrasikaFont floatRightIn grayFont SLV-TableItem">{booking.StudentName}</td>
//                                         <td className="BrasikaFont floatRightIn grayFont SLV-TableItem">{booking.AssetName}</td>
//                                         <td className="BrasikaFont floatRightIn grayFont SLV-TableItem">{formatDate(booking.ReservationDate)}</td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     :
//                         <h2 className="BrasikaFont floatRightIn grayFont">Currently there are no data to display</h2>

//                 }
//             </Box>
//         </Box>
//         </header>
//     );
// }

// export default StudentAssetList;
