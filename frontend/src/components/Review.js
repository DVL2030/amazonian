import React from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";

export default function Review(props) {
  const { review } = props;
  return (
    <div className="mb-5" id={review.id}>
      <div className="review-profile d-flex">
        <div className="profile-avatar">
          <img
            src={review.avatar ? review.avatar : "imgs/default-avatar.jpeg"}
            alt={review.name}
            className="round"
          ></img>
        </div>
        <div className="profile-name m-2">
          <span>{review.name}</span>
        </div>
      </div>
      <div className="review-main-row">
        <Link to={`/review/${review.id}`}>
          <Rating rating={review.star}></Rating>
          <h5>{review.title}</h5>
        </Link>
      </div>
      <span className="review-date">{review.date}</span>
      <div className="review-strip">
        {review.verified && (
          <span className="text-danger">Verified Purchase</span>
        )}
      </div>
      <div className="review-content">
        <p>{review.content}</p>
      </div>
      {review.imgs &&
        review.imgs.map((image, idx) => (
          <div className="review-imgs d-flex">
            <img key={idx} alt="review-img" src={image}></img>
          </div>
        ))}

      <span className="review-vote">
        {review.helpful} {review.helpful > 1 ? "people" : "person"} found this
        helpful
      </span>
      <div>
        <button className="review helpful">Helpful</button>
        <button className="review helpful">Report</button>
      </div>
    </div>
  );
}
