import React, { useState } from "react";
import { createService } from "../api";

const ProviderDashboard = () => {
  const [formData, setFormData] = useState({
    serviceType: "",
    description: "",
    location: "",
    availability: "",
    pricing: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createService(formData);
      alert("Service listing created successfully!");
    } catch (error) {
      alert("Error creating service listing");
    }
  };

  return (
    <div>
      <h2>Service Provider Dashboard</h2>
      <h3>Create New Service Listing</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Service Type (e.g. Plumber)"
          onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
        />
        <textarea
          placeholder="Description"
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        ></textarea>
        <input
          type="text"
          placeholder="Location"
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
        />
        <input
          type="text"
          placeholder="Availability"
          onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
        />
        <input
          type="text"
          placeholder="Pricing"
          onChange={(e) => setFormData({ ...formData, pricing: e.target.value })}
        />
        <button type="submit">Create Listing</button>
      </form>
    </div>
  );
};

export default ProviderDashboard;
