import React, { useState } from "react";
import { addReview } from "../api";

const ReviewForm = ({ serviceId, onReviewAdded }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addReview({ serviceId, rating, comment });
      alert("Review added successfully!");
      setComment("");
      if (onReviewAdded) onReviewAdded();
    } catch (error) {
      alert("Error adding review");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "1rem", borderTop: "1px solid #eee", paddingTop: "1rem" }}>
      <h4>Leave a Review</h4>
      <select value={rating} onChange={(e) => setRating(e.target.value)}>
        <option value="5">5 - Excellent</option>
        <option value="4">4 - Very Good</option>
        <option value="3">3 - Good</option>
        <option value="2">2 - Fair</option>
        <option value="1">1 - Poor</option>
      </select>
      <br />
      <textarea
        placeholder="Share your experience..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        style={{ width: "100%", margin: "0.5rem 0" }}
      ></textarea>
      <br />
      <button type="submit">Submit Review</button>
    </form>
  );
};

export default ReviewForm;
