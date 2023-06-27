import React, { useEffect, useState } from "react";
import { Col, Container, Row, Carousel } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";

import MessageBox from "../components/MessageBox";
import LoadingBox from "../components/LoadingBox";
import Rating from "../components/Rating";
import SorryBox from "../components/SorryBox";
import RatingHistogram from "../components/RatingHistogram";
import Review from "../components/Review";

import { getReviewID } from "../slice/amazonSlice";

export default function ReviewIdPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const amazonState = useSelector((state) => state.amazon);
  const { amazonReviewID: data, loading, error } = amazonState;

  const param = useParams();
  const { id } = param;

  useEffect(() => {
    if (!id) navigate("/");
    else if (!data) {
      dispatch(
        getReviewID({
          id: id,
        })
      );
    }
  }, []);

  return loading ? (
    <LoadingBox />
  ) : data && data.length === 0 ? (
    <SorryBox />
  ) : (
    <div>
      {error && <MessageBox variants="danger">{error}</MessageBox>}
      {data ? (
        <Container fluid className="py-4">
          <Row className="px-4 py-3">
            <Col xs={12} md={8} lg={9}>
              <h2>Customer Review</h2>
              {data.reviews.map((review, idx) => (
                <Review review={review} key={idx}></Review>
              ))}
            </Col>
            <Col xs={12} md={4} lg={3}>
              <div className="d-flex">
                <div className="img-xs">
                  <img src={data.img} alt={data.pname}></img>
                </div>
                <Link>
                  <small>
                    {data.pname > 20 ? data.pname.substring(20) : data.pname}
                  </small>
                </Link>
              </div>
              <div className="review-histogram">
                <h3>Customer Review</h3>
                <div className="d-flex gap-1">
                  <Rating rating={data.avgRating}></Rating>
                  <h5>{data.avgRating} out of 5</h5>
                </div>
                <small className="text-secondary">
                  {data.totalReviewCount}
                </small>

                <RatingHistogram
                  asin={data.pasin}
                  distribution={data.histogram}
                />
              </div>
            </Col>
          </Row>
          <hr></hr>
        </Container>
      ) : (
        <></>
      )}
    </div>
  );
}
