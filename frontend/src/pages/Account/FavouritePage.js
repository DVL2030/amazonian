import React, { useEffect, useState } from "react";
import { Col, Container, Row, Card, Modal, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  getFavouriteProductList,
  getFavouriteReviewList,
  removeItemFromFavourite,
} from "../../slice/favouriteSlice";
import Rating from "../../components/Rating";
import { addItemToCart } from "../../slice/cartSlice";
import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";
import Review from "../../components/Review";
import { wrapCartItem } from "../../utils";
import SorryBox from "../../components/SorryBox";

export default function FavouritePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const favState = useSelector((state) => state.favourite);
  const { favProducts, favReviews, loading, error, success } = favState;

  const [removeSelect, setRemoveSelect] = useState(null);

  const [show, setShow] = useState("products");

  // Bootstrap Modal
  const [showModal, setShowModal] = useState(false);

  const addToCartHandler = (data) => {
    const cartItem = wrapCartItem(data.asin, data);

    dispatch(addItemToCart(cartItem));
    navigate("/cart");
  };

  const removeFromFavourite = (id, type) => {
    setRemoveSelect({ id: id, type: type });
    setShowModal(true);
  };

  const handleConfirm = (val) => {
    if (val === "true") {
      dispatch(removeItemFromFavourite(removeSelect));
    }
    setShowModal(false);
  };

  const changeShowFavourites = (select) => {
    setShow(select);
    if (select === "products") {
      dispatch(getFavouriteProductList());
    } else if (select === "reviews") {
      dispatch(getFavouriteReviewList());
    }
  };

  useEffect(() => {
    dispatch(getFavouriteProductList());

    const elP = document.getElementById("fav-products");
    const elR = document.getElementById("fav-reviews");
    if (show === "products") {
      elP.classList.add("selected");
      elR.classList.remove("selected");
    } else if (show === "reviews") {
      elR.classList.add("selected");
      elP.classList.remove("selected");
    }
  }, [success]);
  return loading ? (
    <LoadingBox></LoadingBox>
  ) : (
    <Container className="py-5 ">
      <Row className="mb-5">
        <Col>
          <h4>Your Favourites</h4>
          <Card className="p-1">
            <Container fluid>
              <Row>
                <Col xs={12} md={3} className="p-3">
                  <div
                    id="fav-products"
                    className="fav-list"
                    onClick={() => changeShowFavourites("products")}
                  >
                    <div>
                      <b>Favourite Products</b>
                    </div>
                    <span className="text-muted">Default List</span>
                  </div>
                  <div
                    id="fav-reviews"
                    className="fav-list reviews"
                    onClick={() => changeShowFavourites("reviews")}
                  >
                    <div>
                      <b>Favourite Reviews</b>
                    </div>
                    <span className="text-muted">Default List</span>
                  </div>
                </Col>

                <Col xs={12} md={9}>
                  {error ? (
                    <MessageBox variants="danger">{error}</MessageBox>
                  ) : (
                    <>
                      <Container>
                        {favProducts &&
                        show === "products" &&
                        favProducts.length === 0 ? (
                          <SorryBox></SorryBox>
                        ) : (
                          favProducts &&
                          show === "products" &&
                          favProducts.map((item, idx) => (
                            <Row key={idx} className="py-4">
                              <Col xs={12} lg={3}>
                                <div className="img-cart-item">
                                  <img
                                    className="w-80"
                                    src={item.images[0].image}
                                  ></img>
                                </div>
                              </Col>
                              <Col xs={12} lg={6}>
                                <Link to={`/product/${item.asin}`}>
                                  <big>
                                    <strong>{item.title}</strong>
                                  </big>
                                </Link>
                                <ul className="no-list-style">
                                  <li>
                                    <Rating
                                      rating={item.reviewData.avgRating}
                                      size="fa-sm"
                                    ></Rating>
                                    <Link to={`/product-reviews/${item.asin}`}>
                                      {item.reviewData.totalReviewCount}
                                    </Link>
                                  </li>
                                  <li>
                                    <div>
                                      <span className="product-details-discount dark-red">
                                        {item.price.discount &&
                                          `${item.price.discount}%`}{" "}
                                      </span>
                                      <span className="product-details-a-price">
                                        {item.price.currentPrice &&
                                          item.price.currentPrice}
                                      </span>
                                    </div>
                                    {item.price.beforePrice && (
                                      <div>
                                        <small className="a-price-label">
                                          List Price:
                                        </small>
                                        <small className="a-discout-price">
                                          {item.price.beforePrice}
                                        </small>
                                      </div>
                                    )}
                                  </li>
                                </ul>
                              </Col>
                              <Col xs={12} lg={3}>
                                <ul className="no-list-style">
                                  <li>
                                    <div className="buy-box-button">
                                      <button
                                        onClick={() => addToCartHandler(item)}
                                        className="rect yellow"
                                      >
                                        Add to Cart
                                      </button>
                                      <button className="rect orange">
                                        Buy Now
                                      </button>
                                      <button
                                        className="rect orange"
                                        onClick={() =>
                                          removeFromFavourite(
                                            item._id,
                                            "products"
                                          )
                                        }
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </li>
                                  <li></li>
                                </ul>
                              </Col>
                              <hr></hr>
                              <Modal
                                show={showModal}
                                onHide={() => setShowModal(false)}
                              >
                                <Modal.Header closeButton>
                                  <Modal.Title>Confirm Delete</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                  Are you sure you want to delete this item?
                                </Modal.Body>
                                <Modal.Footer>
                                  <Button
                                    variant="secondary"
                                    value={false}
                                    onClick={(e) =>
                                      handleConfirm(e.target.value)
                                    }
                                  >
                                    No
                                  </Button>
                                  <Button
                                    variant="primary"
                                    value={true}
                                    onClick={(e) =>
                                      handleConfirm(e.target.value)
                                    }
                                  >
                                    Yes
                                  </Button>
                                </Modal.Footer>
                              </Modal>
                            </Row>
                          ))
                        )}
                        {favReviews &&
                        show === "reviews" &&
                        favReviews.length === 0 ? (
                          <SorryBox></SorryBox>
                        ) : (
                          favReviews &&
                          show === "reviews" &&
                          favReviews.map((review, idx) => (
                            <Row key={idx} className="py-4">
                              <Col xs={6}>
                                <Review review={review}></Review>
                              </Col>

                              <hr></hr>
                            </Row>
                          ))
                        )}
                      </Container>
                    </>
                  )}
                </Col>
              </Row>
            </Container>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
