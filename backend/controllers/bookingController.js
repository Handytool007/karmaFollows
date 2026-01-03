const Booking = require("../models/Booking");
const Service = require("../models/Service");

// @desc    Create a booking request
// @route   POST /api/bookings
// @access  Private (Service Seeker only)
const createBooking = async (req, res) => {
  if (req.user.role !== "serviceSeeker") {
    return res
      .status(403)
      .json({ message: "Only service seekers can create booking requests" });
  }

  const { serviceId, bookingDate, message } = req.body;

  if (!serviceId || !bookingDate) {
    return res.status(400).json({ message: "Please add all required fields" });
  }

  const service = await Service.findById(serviceId);

  if (!service) {
    return res.status(404).json({ message: "Service not found" });
  }

  const booking = await Booking.create({
    seeker: req.user.id,
    service: serviceId,
    provider: service.provider,
    bookingDate,
    message,
  });

  res.status(201).json(booking);
};

// @desc    Get bookings (Seeker or Provider)
// @route   GET /api/bookings
// @access  Private
const getBookings = async (req, res) => {
  let bookings;

  if (req.user.role === "serviceProvider") {
    bookings = await Booking.find({ provider: req.user.id })
      .populate("seeker", "mobile")
      .populate("service", "serviceType");
  } else {
    bookings = await Booking.find({ seeker: req.user.id })
      .populate("provider", "mobile")
      .populate("service", "serviceType");
  }

  res.status(200).json(bookings);
};

// @desc    Update booking status
// @route   PUT /api/bookings/:id
// @access  Private (Provider only for status changes)
const updateBooking = async (req, res) => {
  const booking = await Booking.findById(req.params.id);

  if (!booking) {
    return res.status(404).json({ message: "Booking not found" });
  }

  // Only provider can change status
  if (booking.provider.toString() !== req.user.id) {
    return res.status(401).json({ message: "User not authorized" });
  }

  const updatedBooking = await Booking.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );

  res.status(200).json(updatedBooking);
};

module.exports = {
  createBooking,
  getBookings,
  updateBooking,
};
