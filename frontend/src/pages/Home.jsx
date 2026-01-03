import React, { useEffect, useState, useContext } from "react";
import { fetchServices, createBooking } from "../api";
import { AuthContext } from "../context/AuthContext";
import ReviewList from "../components/ReviewList";
import ReviewForm from "../components/ReviewForm";

const Home = () => {
  const [services, setServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useContext(AuthContext);

  const getServices = async () => {
    try {
      const { data } = await fetchServices(
        searchTerm ? `?search=${searchTerm}` : ""
      );
      setServices(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getServices();
  }, [searchTerm]);

  const handleBooking = async (serviceId) => {
    if (!user) {
      alert("Please login to book a service");
      return;
    }
    const bookingDate = prompt("Enter booking date (YYYY-MM-DD):");
    if (!bookingDate) return;

    try {
      await createBooking({ serviceId, bookingDate });
      alert("Booking request sent!");
    } catch (error) {
      alert("Error sending booking request");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Welcome to Karma Follows</h1>
      <h2>Find the best services near you</h2>
      <input
        type="text"
        placeholder="Search services (e.g. plumber, painter)..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ padding: "0.5rem", width: "300px", marginBottom: "2rem" }}
      />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem" }}>
        {services.map((service) => (
          <div key={service._id} style={{ border: "1px solid #ccc", padding: "1rem", borderRadius: "8px" }}>
            <h3>{service.serviceType}</h3>
            <p>{service.description}</p>
            <p><strong>Location:</strong> {service.location}</p>
            <p><strong>Price:</strong> {service.pricing}</p>
            <p><strong>Provider:</strong> {service.provider?.mobile}</p>
            
            {user?.role === "serviceSeeker" && (
              <button onClick={() => handleBooking(service._id)} style={{ backgroundColor: "#007bff", color: "white", border: "none", padding: "0.5rem 1rem", borderRadius: "4px", cursor: "pointer" }}>
                Book Now
              </button>
            )}

            <ReviewList serviceId={service._id} />
            
            {user?.role === "serviceSeeker" && (
              <ReviewForm serviceId={service._id} onReviewAdded={getServices} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
