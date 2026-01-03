const Service = require("../models/Service");

// @desc    Get all services
// @route   GET /api/services
// @access  Public
const getServices = async (req, res) => {
  const { category, location, search } = req.query;
  let query = {};

  if (category) {
    query.serviceType = { $regex: category, $options: "i" };
  }

  if (location) {
    query.location = { $regex: location, $options: "i" };
  }

  if (search) {
    query.$or = [
      { serviceType: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
    ];
  }

  const services = await Service.find(query).populate("provider", "mobile");
  res.status(200).json(services);
};

// @desc    Create a service
// @route   POST /api/services
// @access  Private (Service Provider only)
const createService = async (req, res) => {
  if (req.user.role !== "serviceProvider") {
    return res
      .status(403)
      .json({ message: "Only service providers can create listings" });
  }

  const { serviceType, description, location, availability, pricing, images } =
    req.body;

  if (!serviceType || !description || !location || !availability || !pricing) {
    return res.status(400).json({ message: "Please add all required fields" });
  }

  const service = await Service.create({
    provider: req.user.id,
    serviceType,
    description,
    location,
    availability,
    pricing,
    images,
  });

  res.status(201).json(service);
};

// @desc    Update a service
// @route   PUT /api/services/:id
// @access  Private (Owner only)
const updateService = async (req, res) => {
  const service = await Service.findById(req.params.id);

  if (!service) {
    return res.status(404).json({ message: "Service not found" });
  }

  // Check for user
  if (!req.user) {
    return res.status(401).json({ message: "User not found" });
  }

  // Make sure the logged in user matches the service provider
  if (service.provider.toString() !== req.user.id) {
    return res.status(401).json({ message: "User not authorized" });
  }

  const updatedService = await Service.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json(updatedService);
};

// @desc    Delete a service
// @route   DELETE /api/services/:id
// @access  Private (Owner only)
const deleteService = async (req, res) => {
  const service = await Service.findById(req.params.id);

  if (!service) {
    return res.status(404).json({ message: "Service not found" });
  }

  // Check for user
  if (!req.user) {
    return res.status(401).json({ message: "User not found" });
  }

  // Make sure the logged in user matches the service provider
  if (service.provider.toString() !== req.user.id) {
    return res.status(401).json({ message: "User not authorized" });
  }

  await service.deleteOne();

  res.status(200).json({ id: req.params.id });
};

module.exports = {
  getServices,
  createService,
  updateService,
  deleteService,
};
