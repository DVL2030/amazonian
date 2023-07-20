import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Rating from "./Rating";
import {
  addItemToFavourite,
  removeItemFromFavourite,
} from "../slice/favouriteSlice";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import ReadMore from "./ReadMore";

export default function Review(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { review, fav, asin } = props;

  const userAuthState = useSelector((state) => state.userAuth);
  const { userInfo } = userAuthState;

  const favButtonHandler = (e) => {
    e.preventDefault();
    if (!userInfo) navigate(`/signin?redirect=/product/${asin}`);
    if (review)
      if (e.target.value === "save")
        toast.promise(addItemToFavourite(userInfo, review, "reviews"), {
          pending: {
            render() {
              return "Please wait..";
            },
            icon: false,
          },
          success: {
            render() {
              return `Added Fav Review!`;
            },
          },
          error: {
            render({ data }) {
              return `${data}`;
            },
          },
        });
      else if (e.target.value === "remove") {
        toast.promise(removeItemFromFavourite(userInfo, fav._id, "reviews"), {
          pending: {
            render() {
              return "Please wait..";
            },
            icon: false,
          },
          success: {
            render() {
              return `Removed Fav Review!`;
            },
          },
          error: {
            render({ data }) {
              return `${data}`;
            },
          },
        });
      }
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
      {review.helpful > 0 && (
        <span className="review-vote">
          {review.helpful} {review.helpful > 1 ? "people" : "person"} found this
          helpful
        </span>
      )}

      <div>
        <button className="review helpful">Helpful</button>
        {fav ? (
          <button
            className="review helpful"
            value={"remove"}
            onClick={(e) => favButtonHandler(e)}
          >
            Remove
          </button>
        ) : (
          <button
            className="review helpful"
            value={"save"}
            onClick={(e) => favButtonHandler(e)}
          >
            Save
          </button>
        )}
      </div>
    </div>
  );
}
