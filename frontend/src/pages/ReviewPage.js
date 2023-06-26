import React, { useEffect, useState } from "react";
import { Col, Container, Row, Carousel } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import { getProductAsin, getProductReviews } from "../slice/amazonSlice";

import MessageBox from "../components/MessageBox";
import LoadingBox from "../components/LoadingBox";
import Rating from "../components/Rating";
import SorryBox from "../components/SorryBox";
import RatingHistogram from "../components/RatingHistogram";
import Review from "../components/Review";

export default function ReviewPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const scrollTo = location.search.split("=")[1];

  const amazonState = useSelector((state) => state.amazon);
  const { amazonReviews: data, loading, error } = amazonState;

  const generateRefineURL = () => {};

  const param = useParams();
  const { asin, page = 1, reviewFilter = {} } = param;

  useEffect(() => {
    if (!asin) navigate("/");
    else if (!data) {
      dispatch(
        getProductReviews({
          type: "reviews",
          asin: asin,
          page: page,
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
            <Col xs={12} lg={2}>
              <div className="review-histogram">
                <h3>Customer Reviews</h3>
                <div className="d-flex gap-1">
                  <Rating rating={data.avgRating}></Rating>
                  <h5>{data.avgRating} out of 5</h5>
                </div>
                <small className="text-secondary">
                  {data.totalReviewCount}
                </small>

                <RatingHistogram asin={asin} distribution={data.histogram} />
              </div>
            </Col>
            <Col xs={12} lg={7}>
              <div className="d-flex">
                <div className="img-xs">
                  <img src={data.img} alt={data.pname}></img>
                </div>
                <Link>
                  <h2>{data.pname}</h2>
                </Link>
              </div>
            </Col>
          </Row>
          <hr></hr>
          {data.positive ||
            (data.critical && (
              <Row>
                <Col xs={12} lg={9}>
                  <div className="d-flex">
                    <div className="top-positive">
                      <h4>Top positive review </h4>
                      <Review review={data.positive} />
                    </div>
                    <div className="top-negative">
                      <h4>Top critical review </h4>
                      <Review review={data.positive} />
                    </div>
                  </div>
                </Col>
              </Row>
            ))}
          <Row>
            <Col xs={12} lg={9}>
              <div>
                <table className="review">
                  <thead>
                    <tr>
                      <th>
                        <small>SORT BY</small>
                      </th>
                      <th className="filter">
                        <small>FILTER BY</small>
                      </th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <select
                          className="review sort"
                          onChange={(e) => {
                            navigate(
                              generateRefineURL({ sortOrder: e.target.value })
                            );
                          }}
                        >
                          <option value="top">Top reviews</option>
                          <option value="recent">Most recent</option>
                        </select>
                      </td>
                      <td className="filter">
                        <select
                          className="review"
                          onChange={(e) => {
                            navigate(
                              generateRefineURL({
                                verifiedFilter: e.target.value,
                              })
                            );
                          }}
                        >
                          <option value={false}>All reviewers</option>
                          <option value={true}>Verified purchase only</option>
                        </select>
                      </td>
                      <td className="filter">
                        <select
                          className="review"
                          onChange={(e) => {
                            navigate("/");
                          }}
                        >
                          <option value="all_stars">All stars</option>
                          <option value="5">5 star only</option>
                          <option value="4">4 star only</option>
                          <option value="3">3 star only</option>
                          <option value="2">2 star only</option>
                          <option value="1">1 star only</option>
                          <option disabled role="separator"></option>
                          <option value="positive">All positive</option>
                          <option value="critical">All critical</option>
                        </select>
                      </td>
                      <td className="filter">
                        <select
                          className="review"
                          onChange={(e) => {
                            navigate("/");
                          }}
                        >
                          <option value="all">All formats</option>
                          <option value="current_format">Only Variation</option>
                        </select>
                      </td>
                      <td className="filter">
                        <select
                          className="review"
                          onChange={(e) => {
                            navigate("/");
                          }}
                        >
                          <option value="all">Text, image, video</option>
                          <option value="media_reviews_only">
                            Image and video reviews only
                          </option>
                        </select>
                      </td>
                    </tr>
                    {/* <tr>
                      <td>
                        <strong className="dark-grey">FILTERED BY</strong>
                      </td>
                      <td></td>
                    </tr> */}
                    {/* {filterByString.length > 0 && (
                    <tr>
                      <td>
                        <strong>{filterByString}</strong>
                        <Link to="#">
                          <small> Clear filter</small>
                        </Link>
                      </td>
                    </tr>
                  )} */}
                    <tr>
                      <td>{data.totalReviewCount} global ratings | reviews</td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={12} lg={9}>
              <div className="reviews-local p-3">
                <h4>From the United States</h4>
                {data.reviews.map((review, idx) => (
                  <Review review={review} key={idx}></Review>
                ))}
              </div>
              <hr></hr>
            </Col>
          </Row>
        </Container>
      ) : (
        <></>
      )}
    </div>
  );
}
