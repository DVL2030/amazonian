import React from "react";
import { Link } from "react-router-dom";

export default function Rating(props) {
  const { rating, size, color, inline } = props;
  return (
    <div className={`rating ${inline && "inline"}`}>
      <span>
        <i
          className={
            rating >= 1
              ? `fa-solid fa-star ${size} ${color}`
              : rating >= 0.5
              ? `fa-solid fa-star-half-stroke ${size} ${color}`
              : `fa-regular fa-star ${size} ${color}`
          }
        ></i>
      </span>
      <span>
        <i
          className={
            rating >= 2
              ? `fa-solid fa-star ${size} ${color}`
              : rating >= 1.5
              ? `fa-solid fa-star-half-stroke ${size} ${color}`
              : `fa-regular fa-star ${size} ${color}`
          }
        ></i>
      </span>
      <span>
        <i
          className={
            rating >= 3
              ? `fa-solid fa-star ${size} ${color}`
              : rating >= 2.5
              ? `fa-solid fa-star-half-stroke ${size} ${color}`
              : `fa-regular fa-star ${size} ${color}`
          }
        ></i>
      </span>
      <span>
        <i
          className={
            rating >= 4
              ? `fa-solid fa-star ${size} ${color}`
              : rating >= 3.5
              ? `fa-solid fa-star-half-stroke ${size} ${color}`
              : `fa-regular fa-star ${size} ${color}`
          }
        ></i>
      </span>
      <span>
        <i
          className={
            rating >= 5
              ? `fa-solid fa-star ${size} ${color}`
              : rating >= 4.5
              ? `fa-solid fa-star-half-stroke ${size} ${color}`
              : `fa-regular fa-star ${size} ${color}`
          }
        ></i>
      </span>
    </div>
  );
}
