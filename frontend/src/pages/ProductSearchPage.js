import React, { useEffect, useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getProductList } from "../slice/amazonSlice";

import MessageBox from "../components/MessageBox";
import LoadingBox from "../components/LoadingBox";
import Rating from "../components/Rating";
import SorryBox from "../components/SorryBox";
import Paginate from "../components/Paginate";
import { filterProductSearch } from "../utils";

export default function ProductSearchPage() {
  const filter = useRef({
    sort: null,
    rating: null,
    price: null,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const param = useParams();
  const { keyword, department, page = 1 } = param;

  const amazonState = useSelector((state) => state.amazon);
  const { data: searchData, loading, error } = amazonState;

  const [filterData, setFilterData] = useState(null);

  const data = filterData ? filterData : searchData;

  const totalItems =
    data && data.totalPage ? data.totalPage * data.items.length : 100;

  const range = {
    low: data ? Number(data.items.length * (page - 1) + 1) : 1,
    high: data ? Number(data.items.length * page) : 1,
  };

  const filterSearchHandler = (field, value) => {
    if (filter.current[field] === value) {
      filter.current = { ...filter.current, [field]: null };
    } else {
      filter.current = { ...filter.current, [field]: value };
    }

    if (searchData)
      setFilterData(filterProductSearch(searchData, filter.current));
  };

  useEffect(() => {
    if (!keyword) navigate("/");
    else {
      dispatch(
        getProductList({
          type: "products",
          keyword: keyword,
          ...(department && { department: department }),
          page: page,
        })
      );
    }
  }, [page]);

  return loading ? (
    <LoadingBox />
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
              <ul className="no-list-style search-filter search-filter-sort">
                <li
                  data-field="sort"
                  data-val="lowFirst"
                  onClick={() => filterSearchHandler("sort", "lowFirst")}
                >
                  <Link>Price: Low to High</Link>
                </li>
                <li
                  data-field="sort"
                  data-val="highFirst"
                  onClick={() => filterSearchHandler("sort", "highFirst")}
                >
                  <Link>Price: High to Low</Link>
                </li>
                <li
                  data-field="sort"
                  data-val="topRated"
                  onClick={() => filterSearchHandler("sort", "topRated")}
                >
                  <Link>Avg. Customer Reviews</Link>
                </li>
                <li
                  data-field="sort"
                  data-val="newest"
                  onClick={() => filterSearchHandler("sort", "newest")}
                >
                  <Link>Newest Arrivals</Link>
                </li>
              </ul>
            </div>
            <div>
              <h6>Customer Review</h6>
              <ul className="no-list-style search-filter search-filter-rating">
                <li
                  data-field="rating"
                  data-val="gt4"
                  onClick={() => filterSearchHandler("rating", "gt4")}
                >
                  <Link>
                    <Rating rating="4"></Rating> & up
                  </Link>
                </li>
                <li
                  data-field="rating"
                  data-val="gt3"
                  onClick={() => filterSearchHandler("rating", "gt3")}
                >
                  <Link>
                    <Rating rating="3"></Rating> & up
                  </Link>
                </li>
                <li
                  data-field="rating"
                  data-val="gt2"
                  onClick={() => filterSearchHandler("rating", "gt2")}
                >
                  <Link>
                    <Rating rating="2"></Rating> & up
                  </Link>
                </li>
                <li
                  data-field="rating"
                  data-val="gt1"
                  onClick={() => filterSearchHandler("rating", "gt1")}
                >
                  <Link>
                    <Rating rating="1"></Rating> & up
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h6>{keyword} Price</h6>
              <ul className="no-list-style search-filter search-filter-price">
                <li
                  data-field="price"
                  data-val="<25"
                  onClick={() => filterSearchHandler("price", "<25")}
                >
                  <Link>Under $25</Link>
                </li>
                <li
                  data-field="price"
                  data-val="25-50"
                  onClick={() => filterSearchHandler("price", "25-50")}
                >
                  <Link>$25 to $50</Link>
                </li>
                <li
                  data-field="price"
                  data-val="50-100"
                  onClick={() => filterSearchHandler("price", "50-100")}
                >
                  <Link>$50 to $100</Link>
                </li>
                <li
                  data-field="price"
                  data-val="100-200"
                  onClick={() => filterSearchHandler("price", "100-200")}
                >
                  <Link>$100 to $200</Link>
                </li>
                <li
                  data-field="price"
                  data-val=">200"
                  onClick={() => filterSearchHandler("price", ">200")}
                >
                  <Link>$200 & Above</Link>
                </li>
              </ul>
            </div>
          </Col>
          <Col xs={12} lg={9}>
            <Container>
              {data && data.items.length === 0 ? (
                <SorryBox />
              ) : (
                data &&
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
              )}
            </Container>
            <Container>
              {data && data.totalPage && (
                <Row className="py-3">
                  <Col className="d-flex justify-content-center d-sm-none">
                    <Paginate
                      path={`products/${keyword}`}
                      label={false}
                      page={Number(page)}
                      totalPage={data.totalPage}
                    ></Paginate>
                  </Col>
                  <Col className="d-none d-sm-flex justify-content-center">
                    <Paginate
                      path={`products/${keyword}`}
                      label={true}
                      page={Number(page)}
                      totalPage={data.totalPage}
                    ></Paginate>
                  </Col>
                </Row>
              )}
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
