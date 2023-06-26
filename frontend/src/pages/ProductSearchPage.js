import React, { useEffect } from "react";
import { Col, Container, Row, Carousel } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getProductList } from "../slice/amazonSlice";

import MessageBox from "../components/MessageBox";
import LoadingBox from "../components/LoadingBox";
import Rating from "../components/Rating";
import SorryBox from "../components/SorryBox";

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

  const amazonState = useSelector((state) => state.amazon);
  const { data, loading, error } = amazonState;
  const totalItems =
    data && data.totalPage ? data.totalPage * data.items.length : 100;

  const range = {
    low: data ? Number(data.items.length * (page - 1) + 1) : 1,
    high: data ? Number(data.items.length * page) : 1,
  };

  // const linkHandler = (link) => {
  //   navigate(link);
  // };

  useEffect(() => {
    if (!keyword) navigate("/");
    else {
      dispatch(
        getProductList({
          type: "products",
          keyword: keyword,
          department: department ? department : {},
          page: page,
        })
      );
    }
  }, []);

  return loading ? (
    <LoadingBox />
  ) : data && data.items.length === 0 ? (
    <SorryBox />
  ) : (
    <div>
      {error && <MessageBox variants="danger">{error}</MessageBox>}
      <Container className="products-search-container pt-4">
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
              {data ? (
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
                              {item.price.beforePrice}
                            </span>
                          </>
                        )}
                      </div>
                      {item.shippingInfo.map((ship, idx) => (
                        <div key={idx} className="shipping-info">
                          <span className="dark-red">{ship}</span>
                        </div>
                      ))}
                    </Col>
                  </Row>
                ))
              ) : (
                <div></div>
              )}
            </Container>
            {data && data.totalPage ? (
              <div className="pagination">
                <span>
                  <Link
                    className={page === 1 && "link-disabled"}
                    // onClick={linkHandler(`/products/${keyword}/page/${1}`)}
                    to={`/products/${keyword}/page/${page - 1}`}
                  >
                    <i className="fa-solid fa-angle-left fa-xs"></i> Prev
                  </Link>
                </span>

                {page > 3 && (
                  <>
                    <Link to={`/products/${keyword}/page/${1}`}>1</Link>
                    <span>...</span>
                  </>
                )}
                {page === 1 ? (
                  <>
                    <Link to="#" className="active link-disabled">
                      1
                    </Link>
                    <Link
                      to={`/products/${keyword}/page/${2}`}
                      // onClick={linkHandler(`/products/${keyword}/page/${2}`)}
                    >
                      2
                    </Link>
                    <Link to={`/products/${keyword}/page/${3}`}>3</Link>
                  </>
                ) : page === data.totalPage ? (
                  <>
                    <Link to={`/products/${keyword}/page/${1}`}>
                      {Number(data.totalPage) - 2}
                    </Link>
                    <Link to={`/products/${keyword}/page/${1}`}>
                      {data.totalPage - 1}
                    </Link>
                    <Link
                      to={`/products/${keyword}/page/${1}`}
                      class="active link-disabled"
                    >
                      {data.totalPage}
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      to={`/products/${keyword}/page/${1}`}
                      // onClick={linkHandler(`/products/${keyword}/page/${1}`)}
                    >
                      {Number(page) - 1}
                    </Link>
                    <Link
                      to={`/products/${keyword}/page/${1}`}
                      class="active link-disabled"
                    >
                      {page}
                    </Link>
                    <Link to={`/products/${keyword}/page/${1}`}>
                      {Number(page) + 1}
                    </Link>
                  </>
                )}
                {page + 1 < data.totalPage ? (
                  <>
                    {page < data.totalPage - 2 && <span>...</span>}

                    <Link to={`/products/${keyword}/page/${1}`}>
                      {data.totalPage}
                    </Link>
                  </>
                ) : (
                  <span>...</span>
                )}
                <span>
                  <Link
                    className={page === data.totalPage && "link-disabled"}
                    to={`/products/${keyword}/page/${1}`}
                  >
                    Next <i className="fa-solid fa-angle-right fa-xs"></i>
                  </Link>
                </span>
              </div>
            ) : (
              <></>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}
