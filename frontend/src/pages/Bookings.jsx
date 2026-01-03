import React, { useEffect, useState, useContext } from "react";
import { fetchBookings } from "../api";
import { AuthContext } from "../context/AuthContext";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const getBookings = async () => {
      try {
        const { data } = await fetchBookings();
        setBookings(data);
      } catch (error) {
        console.error(error);
      }
    };
    getBookings();
  }, []);

  return (
    <div>
      <h2>Your Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {bookings.map((booking) => (
            <div key={booking._id} style={{ border: "1px solid #ccc", padding: "1rem" }}>
              <h4>Service: {booking.service?.serviceType}</h4>
              <p>Status: <strong>{booking.status}</strong></p>
              <p>Date: {new Date(booking.bookingDate).toLocaleDateString()}</p>
              <p>
                {user.role === "serviceProvider"
                  ? `Seeker Mobile: ${booking.seeker?.mobile}`
                  : `Provider Mobile: ${booking.provider?.mobile}`}
              </p>
              {booking.message && <p>Message: {booking.message}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Bookings;
