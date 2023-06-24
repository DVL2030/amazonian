import React, { useEffect } from "react";
import { Col, Container, Row, Carousel } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getProductList } from "../slice/amazonSlice";

import MessageBox from "../components/MessageBox";
import LoadingBox from "../components/LoadingBox";
import Rating from "../components/Rating";

import d from "../data";

export default function ProductSearchPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const param = useParams();
  const {
    keyword,
    department,
    minPrice = 0,
    maxPrice = Infinity,
    minRating = 0,
    sortOrder = "newest",
    page = 1,
    // availability = false,
  } = param;

  const data = d.products;

  const amazonState = useSelector((state) => state.amazon);
  const { loading, error } = amazonState;
  const totalItems = data ? data.totalPage * data.items.length : 100;

  const range = {
    low: data ? Number(data.items.length * (page - 1) + 1) : 1,
    high: data ? Number(data.items.length * page) : 1,
  };

  useEffect(() => {
    if (!keyword) navigate("/");
    else {
      dispatch(
        getProductList({
          type: "products",
          keyword: keyword,
          department: department ? department : {},
          page: "1",
        })
      );
    }
  }, []);

  return loading ? (
    <LoadingBox />
  ) : data.items.length == 0 ? (
    <div className="d-flex justify-content-center align-items-center vh-100">
      Sorry, I could not find anything... Try with different keyword or refresh
      this page.
    </div>
  ) : (
    <div>
      {error && <MessageBox variants="danger">{error}</MessageBox>}
      <Container className="products-search-container mt-4">
        <Row>
          <Col>
            <div>
              {range.low}-{range.high} of {totalItems} Results for{" "}
              <small className="dark-red">"{keyword}"</small>
            </div>
          </Col>
        </Row>
        <hr />

        <Row>
          <Col lg={3} className="d-none d-lg-block refinement-col">
            <div>
              <h6>Sort by</h6>
              <ul className="no-list-style">
                <li>
                  <Link>Price: Low to High</Link>
                </li>
                <li>
                  <Link>Price: High to Low</Link>
                </li>
                <li>
                  <Link>Avg. Customer Reviews</Link>
                </li>
                <li>
                  <Link>Newest Arrivals</Link>
                </li>
              </ul>
            </div>
            <div>
              <h6>Customer Review</h6>
              <ul className="no-list-style">
                <li>
                  <Link>
                    <Rating rating="4"></Rating> & up
                  </Link>
                </li>
                <li>
                  <Link>
                    <Rating rating="3"></Rating> & up
                  </Link>
                </li>
                <li>
                  <Link>
                    <Rating rating="2"></Rating> & up
                  </Link>
                </li>
                <li>
                  <Link>
                    <Rating rating="1"></Rating> & up
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h6>{keyword} Price</h6>
              <ul className="no-list-style">
                <li>
                  <Link>Under $10</Link>
                </li>
                <li>
                  <Link>$10 to $15</Link>
                </li>
                <li>
                  <Link>$15 to $25</Link>
                </li>
                <li>
                  <Link>$25 to $35</Link>
                </li>
                <li>
                  <Link>$35 & Above</Link>
                </li>
              </ul>
            </div>
          </Col>
          <Col xs={12} lg={9}>
            <Container>
              {data &&
                data.items.map((item, idx) => (
                  <Row key={idx} className="products-search-row">
                    <Col xs={3} className="products-search-img">
                      <Link to={`/product/${item.asin}`}>
                        <img src={item.image} alt={item.asin}></img>
                      </Link>
                    </Col>
                    <Col xs={9} className="products-search-content">
                      <div className="product-title">
                        <Link to={`/product/${item.asin}`}>
                          <h5>{item.name}</h5>
                        </Link>
                      </div>
                      <div className="d-flex">
                        <Rating rating={item.rating} size="fa-sm"></Rating>
                        <Link className="ml-2"> {item.totalReview}</Link>
                      </div>
                      <div className="mb-2">
                        <span className="products-search-price a-price">
                          {item.price.currentPrice}
                          {"  "}
                        </span>

                        {item.price.beforePrice && (
                          <>
                            <span className="a-price-label">List</span>
                            <span className="a-discout-price">
                              ${item.price.beforePrice}
                            </span>
                          </>
                        )}
                      </div>
                      {item.shippingInfo.map((ship) => (
                        <div className="shipping-info">
                          <span className="dark-red">{ship}</span>
                        </div>
                      ))}
                    </Col>
                  </Row>
                ))}
            </Container>

            <div className="pagination">
              <span aria-disabled={page == 1}>
                <Link to="#">
                  <i className="fa-solid fa-angle-left fa-xs"></i> Prev
                </Link>
              </span>

              {page - 1 > 1 && (
                <>
                  <Link to="#">1</Link>
                  <span>...</span>
                </>
              )}
              {page == 1 ? (
                <>
                  <Link to="#" className="active">
                    1
                  </Link>
                  <Link to="#">2</Link>
                  <Link to="#">3</Link>
                </>
              ) : page == data.totalPage ? (
                <>
                  <Link to="#">{data.totalPage - 2}</Link>
                  <Link to="#">{data.totalPage - 1}</Link>
                  <Link to="#" class="active">
                    {data.totalPage}
                  </Link>
                </>
              ) : (
                <>
                  <Link to="#">{page - 1}</Link>
                  <Link to="#" class="active">
                    {page}
                  </Link>
                  <Link to="#">{page + 1}</Link>
                </>
              )}
              {page + 1 < data.totalPage && (
                <>
                  {page < 18 && <span>...</span>}

                  <Link to="#">{data.totalPage}</Link>
                </>
              )}

              <span aria-disabled={page == 20}>
                <Link to="#">
                  Next <i className="fa-solid fa-angle-right fa-xs"></i>
                </Link>
              </span>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
