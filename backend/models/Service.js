const mongoose = require("mongoose");

const ServiceSchema = mongoose.Schema(
  {
    provider: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    serviceType: {
      type: String,
      required: [true, "Please add a service type"],
    },
    description: {
      type: String,
      required: [true, "Please add a description"],
    },
    location: {
      type: String,
      required: [true, "Please add a location"],
    },
    availability: {
      type: String,
      required: [true, "Please add availability"],
    },
    pricing: {
      type: String,
      required: [true, "Please add pricing"],
    },
    images: {
      type: [String],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Service", ServiceSchema);
