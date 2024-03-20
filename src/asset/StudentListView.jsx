// StudentAssetListView.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './admasset.css';
function StudentAssetList() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = () => {
        axios.get('http://127.0.0.1:8000/api/asset_bookings/')
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
        <div className='Style'>
            <h1>Asset Bookings</h1><br/>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            
                            <th>Student Name</th>
                            <th>Asset Name</th>
                            <th>Reservation Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map(booking => (
                            <tr key={booking.id}>
                                <td>{booking.StudentName}</td>
                                <td>{booking.AssetName}</td>
                                <td>{formatDate(booking.ReservationDate)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default StudentAssetList;
