import React from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import { addItemToFavourite } from "../slice/favouriteSlice";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import ReadMore from "./ReadMore";

export default function Review(props) {
  const dispatch = useDispatch();

  const { review } = props;

  const favState = useSelector((state) => state.favourite);
  const { success, loading, error } = favState;

  const saveHandler = (e) => {
    e.preventDefault();
    dispatch(addItemToFavourite({ item: review, type: "reviews" }));
    const id = toast.loading("Please wait...");
    setTimeout(() => {
      if (success) {
        toast.update(id, {
          render: "Added!",
          type: "success",
          isLoading: false,
          autoClose: 1000,
        });
      } else if (error) {
        toast.update(id, {
          render: "There was an error... Please try again",
          type: "error",
          autoClose: 1000,
          isLoading: false,
        });
      } else {
        toast.dismiss();
      }
    }, 1500);
  };
  return (
    <div className="mb-5" id={review.id}>
      <ToastContainer autoClose={1000} />
      <div className="review-profile d-flex">
        <div className="profile-avatar">
          <img
            src={review.avatar ? review.avatar : "/imgs/default-avatar.jfif"}
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
        <p>
          <ReadMore text={review.content}></ReadMore>
        </p>
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
        <button className="review helpful" onClick={(e) => saveHandler(e)}>
          Save
        </button>
      </div>
    </div>
  );
}
