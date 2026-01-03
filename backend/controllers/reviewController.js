const Review = require("../models/Review");

// @desc    Add a review
// @route   POST /api/reviews
// @access  Private (Seeker only)
const addReview = async (req, res) => {
  if (req.user.role !== "serviceSeeker") {
    return res
      .status(403)
      .json({ message: "Only service seekers can add reviews" });
  }

  const { serviceId, rating, comment } = req.body;

  if (!serviceId || !rating) {
    return res.status(400).json({ message: "Please add rating and service ID" });
  }

  const review = await Review.create({
    seeker: req.user.id,
    service: serviceId,
    rating,
    comment,
  });

  res.status(201).json(review);
};

// @desc    Get reviews for a service
// @route   GET /api/reviews/:serviceId
// @access  Public
const getReviews = async (req, res) => {
  const reviews = await Review.find({ service: req.params.serviceId }).populate(
    "seeker",
    "mobile"
  );
  res.status(200).json(reviews);
};

module.exports = {
  addReview,
  getReviews,
};
