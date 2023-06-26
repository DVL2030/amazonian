import React, { useEffect, useState } from "react";
import { Col, Container, Row, Carousel } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getProductAsin } from "../slice/amazonSlice";

import MessageBox from "../components/MessageBox";
import LoadingBox from "../components/LoadingBox";
import Rating from "../components/Rating";
import SorryBox from "../components/SorryBox";

export default function ProductDetailsPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const amazonState = useSelector((state) => state.amazon);
  const { amazonProductAsin: data, loading, error } = amazonState;

  const [qty, setQty] = useState(1);

  const param = useParams();
  const { asin } = param;

  const changeMainImage = (idx) => {
    // console.log(idx);
    const listEl = document.getElementsByClassName("main-image-item");
    for (let list of listEl) {
      if (list.getAttribute("data-index") == idx) {
        list.classList.remove("d-none");
        list.classList.add("d-block");
      } else {
        list.classList.remove("d-block");
        list.classList.add("d-none");
      }
    }
  };

  const addToCartHandler = () => {
    // navigate(`/cart/${productId}?qty=${qty}`);
  };

  const zoomInImage = () => {};

  useEffect(() => {
    if (!asin) navigate("/");
    else if (!data) {
      dispatch(
        getProductAsin({
          type: "product",
          asin: asin,
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
      {data && (
        <>
          <Container id="ppd" className="product-details-container pt-4">
            <Row>
              <Col xs={12} className="d-block d-lg-none mb-4">
                {data.images && (
                  <Carousel
                    fade
                    slide
                    variant="dark"
                    indicators={false}
                    className="myCarousel"
                  >
                    {data.images.map((item, idx) => (
                      <Carousel.Item>
                        <img
                          className="product-details-carousel-img"
                          key={idx}
                          src={item.image}
                          alt={idx}
                        ></img>
                      </Carousel.Item>
                    ))}
                  </Carousel>
                )}
              </Col>
              <Col lg={5} className="d-none d-lg-block">
                <div className="image-block d-flex">
                  <div className="imageThumbnail">
                    {data.images && (
                      <ul className="no-list-style imageThumbnail-list">
                        {data.images.map((item, idx) => (
                          <li
                            key={idx}
                            onMouseOver={() => changeMainImage(idx)}
                          >
                            <img src={item.thumb} alt={idx}></img>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div className="main-image-container">
                    <ul>
                      {data.images.map((item, idx) => (
                        <li
                          key={idx}
                          data-index={idx}
                          className={
                            idx === 0
                              ? "main-image-item d-block"
                              : "main-image-item d-none"
                          }
                        >
                          <img
                            src={item.image}
                            alt={idx}
                            onMouseOver={zoomInImage}
                          ></img>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Col>
              <Col xs={12} lg={5}>
                <div>
                  <div className="product-details-title">
                    <h5>{data.title}</h5>
                  </div>
                  <div className="product-details-rating d-flex">
                    <Rating
                      rating={data.reviewData.avgRating || 0}
                      size="fa-sm"
                    ></Rating>
                    <Link className="ml-2">
                      {" "}
                      {data.reviewData.totalReviewCount}
                    </Link>
                  </div>
                  <div className="product-details-price">
                    <div>
                      <span className="product-details-discount dark-red">
                        ${data.price.discount}%
                      </span>
                      <span className="a-price">{data.price.currentPrice}</span>
                    </div>

                    {data.price.beforePrice && (
                      <div>
                        <span className="a-price-label">List Price:</span>
                        <span className="a-discout-price">
                          {data.price.beforePrice}
                        </span>
                      </div>
                    )}
                    {data.overview && (
                      <table id="product-details-overview">
                        <tbody>
                          {Object.entries(data.overview).map(
                            ([k, v], idx) =>
                              k !== "aboutItem" && (
                                <tr key={idx}>
                                  <th>{k}</th>
                                  <td>{v}</td>
                                </tr>
                              )
                          )}
                        </tbody>
                      </table>
                    )}
                  </div>
                  <hr></hr>
                  <div className="product-details-variants"></div>
                  <div className="product-details-about">
                    <b>About this item</b>
                    <ul>
                      {data.overview.aboutItem &&
                        data.overview.aboutItem.map((about, idx) => (
                          <li key={idx}>{about}</li>
                        ))}
                    </ul>
                  </div>
                </div>
              </Col>
              <Col lg={2} className="d-none d-lg-block">
                <div className="buy-box box">
                  <div className="buy-box-price mb-4">
                    <h5 className="a-price display-4">
                      {data.price.currentPrice}
                    </h5>
                  </div>
                  <div className="buy-box-delivery-info">
                    {data.delivery.map((d, idx) => (
                      <div key={idx}>
                        <span>{d}</span>
                      </div>
                    ))}
                  </div>
                  <div className="buy-box-availability">
                    <span
                      className={
                        data.availability ? "text-success" : "text-danger"
                      }
                    >
                      {data.availability ? "In Stock" : "Out of Stock"}
                    </span>
                  </div>
                  <div className="buy-box-qty">
                    Qty:
                    <span>
                      <select
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                      >
                        {[...Array(Number(10)).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </span>
                  </div>
                  {data.availability && (
                    <div className="buy-box-button">
                      <button
                        onClick={addToCartHandler}
                        className="rect yellow"
                      >
                        Add to Cart
                      </button>

                      <button className="rect orange">Buy Now</button>
                    </div>
                  )}
                </div>
              </Col>
            </Row>
          </Container>
          <hr></hr>
          <Container id="feature-div-container">
            {data.brandInfo && <Row id="brand-info-container"></Row>}
            <hr></hr>
            {data.information && (
              <Row>
                <Col>
                  <table id="product-details-info">
                    <tbody>
                      {Object.entries(data.information).map(([k, v], idx) => (
                        <tr key={idx}>
                          <th>{k}</th>
                          <td>{v}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Col>
              </Row>
            )}
            <hr></hr>
            {data.reviewData && (
              <Row>
                <Col lg={3} className="d-none d-lg-block">
                  <div className="review-histogram"></div>
                </Col>
                <Col lg={9} className="">
                  <div className="reviews-local">
                    <h4>Top reviews from the United States</h4>
                    {data.reviewData.reviewListLocal.map((review, idx) => (
                      <div key={idx} id={review.id}>
                        <div className="review-profile d-flex">
                          <div className="profile-avatar">
                            <img
                              src={
                                review.avatar
                                  ? review.avatar
                                  : "imgs/default-avatar.jpeg"
                              }
                              alt={review.name}
                            ></img>
                          </div>
                          <div className="profile-name">
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
                          <span className="strip-col">{review.strip}</span>
                          {review.verified && (
                            <span className="text-danger vl">
                              Verified Purchase
                            </span>
                          )}
                        </div>
                        <div className="review-content">
                          <p>{review.content}</p>
                        </div>
                        <span className="review-vote">
                          {review.helpful}{" "}
                          {review.helpful > 1 ? "people" : "person"} found this
                          helpful
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="reviews-global">
                    <h4>Top reviews from other countries</h4>

                    {data.reviewData.reviewListGlobal.map((review, idx) => (
                      <div key={idx} id={review.id}>
                        <div className="review-profile d-flex">
                          <div className="profile-avatar">
                            <img
                              src={
                                review.avatar
                                  ? review.avatar
                                  : "imgs/default-avatar.jpeg"
                              }
                              alt={review.name}
                            ></img>
                          </div>
                          <div className="profile-name">
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
                          <span className="strip-col">{review.strip}</span>
                          {review.verified && (
                            <span className="text-danger vl">
                              Verified Purchase
                            </span>
                          )}
                        </div>
                        <div className="review-content">
                          <p>{review.content}</p>
                        </div>
                        <span className="review-vote">
                          {review.helpful}{" "}
                          {review.helpful > 1 ? "people" : "person"} found this
                          helpful
                        </span>
                      </div>
                    ))}
                  </div>
                </Col>
              </Row>
            )}
          </Container>
        </>
      )}
    </div>
  );
}
