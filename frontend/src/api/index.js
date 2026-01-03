import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

API.interceptors.request.use((req) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user && user.token) {
    req.headers.Authorization = `Bearer ${user.token}`;
  }
  return req;
});

export const login = (formData) => API.post("/auth/login", formData);
export const register = (formData) => API.post("/auth/register", formData);

export const fetchServices = (query = "") => API.get(`/services${query}`);
export const createService = (serviceData) => API.post("/services", serviceData);

export const createBooking = (bookingData) => API.post("/bookings", bookingData);
export const fetchBookings = () => API.get("/bookings");

export const addReview = (reviewData) => API.post("/reviews", reviewData);
export const fetchReviews = (serviceId) => API.get(`/reviews/${serviceId}`);
