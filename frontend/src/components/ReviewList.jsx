import React, { useState, useEffect } from "react";
import { fetchReviews } from "../api";

const ReviewList = ({ serviceId }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const getReviews = async () => {
      try {
        const { data } = await fetchReviews(serviceId);
        setReviews(data);
      } catch (error) {
        console.error(error);
      }
    };
    getReviews();
  }, [serviceId]);

  return (
    <div style={{ marginTop: "1rem" }}>
      <h4>Reviews</h4>
      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {reviews.map((review) => (
            <div key={review._id} style={{ borderBottom: "1px solid #eee", paddingBottom: "0.5rem" }}>
              <p>
                <strong>Rating: {review.rating}/5</strong>
              </p>
              <p>{review.comment}</p>
              <small>By: {review.seeker?.mobile}</small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewList;
