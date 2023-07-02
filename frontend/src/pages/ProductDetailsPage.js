import React, { useEffect, useState } from "react";
import { Col, Container, Row, Carousel } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getProductAsin } from "../slice/amazonSlice";

import MessageBox from "../components/MessageBox";
import LoadingBox from "../components/LoadingBox";
import Rating from "../components/Rating";
import SorryBox from "../components/SorryBox";
import RatingHistogram from "../components/RatingHistogram";
import Review from "../components/Review";
import { addItemToCart } from "../slice/cartSlice";
import { getItemFromHistory } from "../slice/historySlice";

export default function ProductDetailsPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const amazonState = useSelector((state) => state.amazon);
  const { amazonProductAsin: data, loading, error } = amazonState;

  // const historyState = useSelector((state) => state.history);
  // const { historyItems } = historyState;

  const [qty, setQty] = useState(1);

  const param = useParams();
  const { asin } = param;

  const changeMainImage = (idx) => {
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
    const cartItem = {
      asin: asin,
      title: data.title,
      image: data.images[0].image,
      currentPrice: data.price.currentPrice,
      beforePrice: data.price.beforePrice,
      discount: data.price.discount,
      available: data.available,
      availability: data.availability,
      delivery: data.delivery,
      qty: qty,
    };
    dispatch(addItemToCart(cartItem));
    navigate("/cart");
  };

  const zoomInImage = () => {};

  useEffect(() => {
    if (!asin) navigate("/");
    // else if (
    //   historyItems.length != 0 &&
    //   historyItems.find((x) => x.asin === asin).length !== 0
    // ) {
    //   dispatch(getItemFromHistory(asin));
    // }
    else {
      dispatch(getProductAsin(asin));
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
          <Container id="ppd" className="product-details-container py-4">
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
                      <Carousel.Item key={idx}>
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
              <Col lg={4} className="d-none d-lg-block">
                <div className="product-details-image-container">
                  <div className="image-block d-flex">
                    <div className="imageThumbnail">
                      {data.images && (
                        <ul className="no-list-style imageThumbnail-list">
                          {data.images.map(
                            (item, idx) =>
                              item.thumb &&
                              idx < 7 && (
                                <li
                                  key={idx}
                                  onMouseOver={() => changeMainImage(idx)}
                                >
                                  <img src={item.thumb} alt={idx}></img>
                                </li>
                              )
                          )}
                        </ul>
                      )}
                    </div>
                    <div className="main-image-container">
                      <ul>
                        {data.images &&
                          data.images.map((item, idx) => (
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
                </div>
              </Col>
              <Col xs={12} lg={5}>
                <div>
                  <div className="product-details-title">
                    <h5>{data.title}</h5>
                  </div>
                  <div className="product-details-rating d-flex">
                    <Rating
                      rating={
                        data.reviewData.avgRating
                          ? data.reviewData.avgRating
                          : 0
                      }
                      size="fa-sm"
                    ></Rating>
                    <Link className="ml-2">
                      {data.reviewData.totalReviewCount}
                    </Link>
                  </div>
                  <hr></hr>
                  <div className="product-details-price">
                    {data.price.currentPrice && (
                      <>
                        <div>
                          <span className="product-details-discount dark-red">
                            {data.price.discount && `${data.price.discount}%`}{" "}
                          </span>
                          <span className="product-details-a-price">
                            {data.price.currentPrice}
                          </span>
                        </div>
                        {data.price.beforePrice && (
                          <div>
                            <small className="a-price-label">List Price:</small>
                            <small className="a-discout-price">
                              {data.price.beforePrice}
                            </small>
                          </div>
                        )}

                        <div className="buy-box d-lg-none">
                          <div className="buy-box-delivery-info">
                            {data.delivery.map((d, idx) => (
                              <div className="mb-2" key={idx}>
                                <b>{d}</b>
                              </div>
                            ))}
                          </div>
                          <div className="buy-box-availability mt-4">
                            <h4
                              className={
                                data.availability === "In Stock"
                                  ? "text-success"
                                  : "text-danger"
                              }
                            >
                              {data.availability}
                            </h4>
                          </div>

                          {data.available && (
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
                          {data.tabularFeature && (
                            <div>
                              <table id="buy-box-tabular">
                                <tbody>
                                  {Object.entries(data.tabularFeature).map(
                                    ([k, v], idx) => (
                                      <tr key={idx}>
                                        <th className="py-2 px-2">{k}</th>
                                        <td className="py-1 px-2">{v}</td>
                                      </tr>
                                    )
                                  )}
                                </tbody>
                              </table>
                            </div>
                          )}
                        </div>

                        <hr></hr>
                      </>
                    )}

                    {data.overview && (
                      <>
                        <table id="product-details-overview">
                          <tbody>
                            {Object.entries(data.overview).map(
                              ([k, v], idx) =>
                                k !== "aboutItem" &&
                                k !== "bookDes" && (
                                  <tr key={idx}>
                                    <th className="py-1">{k}</th>
                                    <td className="py-1 px-5">{v}</td>
                                  </tr>
                                )
                            )}
                            {Object.entries(data.overview).map(
                              ([k, v], idx) =>
                                k == "bookDes" && (
                                  <tr key={idx}>
                                    <td className="py-1 px-5">
                                      <p>{v}</p>
                                    </td>
                                  </tr>
                                )
                            )}
                          </tbody>
                        </table>
                        <hr></hr>
                      </>
                    )}
                  </div>
                  <div className="product-details-variants"></div>

                  {data.overview.aboutItem.length !== 0 && (
                    <div className="product-details-about">
                      <b>About this item</b>
                      <ul>
                        {data.overview.aboutItem.map((about, idx) => (
                          <li key={idx}>{about}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </Col>
              <Col lg={3} className="d-none d-lg-block">
                <div className="buy-box box">
                  <div className="buy-box-price mb-4">
                    <h4 className="a-price">
                      <big>{data.price.currentPrice}</big>
                    </h4>
                  </div>
                  <div className="buy-box-delivery-info">
                    {data.delivery.map((d, idx) => (
                      <div className="mb-2" key={idx}>
                        <b>{d}</b>
                      </div>
                    ))}
                  </div>
                  <div className="buy-box-availability mt-4">
                    <h4
                      className={
                        data.availability === "In Stock"
                          ? "text-success"
                          : "text-danger"
                      }
                    >
                      {data.availability}
                    </h4>
                  </div>
                  {data.availability && (
                    <div className="buy-box-qty my-4">
                      Qty:{" "}
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
                  )}

                  {data.available && (
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
                  {data.tabularFeature && (
                    <div>
                      <table id="buy-box-tabular">
                        <tbody>
                          {Object.entries(data.tabularFeature).map(
                            ([k, v], idx) => (
                              <tr key={idx}>
                                <th className="py-2 px-2">{k}</th>
                                <td className="py-1 px-2">{v}</td>
                              </tr>
                            )
                          )}
                        </tbody>
                      </table>
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
                <Col xs={12} lg={6}>
                  <h3>Product Information</h3>
                  <table id="product-details-info" cellSpacing="2">
                    <tbody>
                      {Object.entries(data.information).map(([k, v], idx) => (
                        <tr key={idx}>
                          <th className="bg-grey py-3 px-3">{k}</th>
                          <td className="px-3">{v}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Col>
              </Row>
            )}
            <hr></hr>
            {data.reviewData && (
              <Row className="py-4">
                <Col lg={4} className="d-none d-lg-block">
                  <div className="review-histogram">
                    <h3>Customer Reviews</h3>
                    <div className="d-flex gap-1">
                      <Rating rating={data.reviewData.avgRating}></Rating>
                      <h5>{data.reviewData.avgRating} out of 5</h5>
                    </div>
                    <small className="text-secondary">
                      {data.reviewData.totalReviewCount}
                    </small>

                    <RatingHistogram
                      asin={asin}
                      distribution={data.reviewData.histogram}
                    />
                  </div>
                </Col>
                <Col lg={8} className="">
                  {data.reviewData.reviewListLocal &&
                  data.reviewData.reviewListLocal.length !== 0 ? (
                    <div className="reviews-local ">
                      <h4>Top reviews from the United States</h4>
                      {data.reviewData.reviewListLocal.map((review, idx) => (
                        <Review review={review} key={idx}></Review>
                      ))}
                      <hr></hr>
                    </div>
                  ) : (
                    <div>
                      <h4>
                        There is no Review for this product yet. <br></br> You
                        can be the first one to create a review!
                      </h4>
                    </div>
                  )}

                  {data.reviewData.reviewListGlobal &&
                    data.reviewData.reviewListGlobal.length !== 0 && (
                      <div className="reviews-local ">
                        <h4>Top reviews from other countries</h4>

                        {data.reviewData.reviewListGlobal.map((review, idx) => (
                          <Review review={review} key={idx}></Review>
                        ))}
                        <hr></hr>
                      </div>
                    )}
                </Col>
              </Row>
            )}
          </Container>
        </>
      )}
    </div>
  );
}