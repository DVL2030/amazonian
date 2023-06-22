import React, { useEffect } from "react";
import { Col, Container, Row, Carousel } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getHomePage } from "../slice/amazonSlice";
import MessageBox from "../components/MessageBox";
import LoadingBox from "../components/LoadingBox";

import hardData from "../data";

export default function HomePage() {
  const dispatch = useDispatch();

  const amazonState = useSelector((state) => state.amazon);
  const { data, loading, error } = amazonState;
  console.log(data);

  const defaultSrc =
    "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Dashboard/Fuji_Dash_Beauty_1x._SY304_CB432774351_.jpg";

  useEffect(() => {
    dispatch(getHomePage());
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <LoadingBox />
      ) : (
        <div id="home">
          <Carousel
            fade
            slide
            variant="dark"
            indicators={false}
            className="myCarousel"
          >
            <Carousel.Item>
              <img src="imgs/crousel1.jpg" alt="First slide" />
            </Carousel.Item>
            <Carousel.Item>
              <img src="imgs/crousel2.jpg" alt="First slide" />
            </Carousel.Item>
            <Carousel.Item>
              <img src="imgs/crousel3.jpg" alt="First slide" />
            </Carousel.Item>
            <Carousel.Item>
              <img src="imgs/crousel4.jpg" alt="First slide" />
            </Carousel.Item>
            <Carousel.Item>
              <img src="imgs/crousel5.jpg" alt="First slide" />
            </Carousel.Item>
            <Carousel.Item>
              <img src="imgs/crousel6.jpg" alt="First slide" />
            </Carousel.Item>
            <Carousel.Item>
              <img src="imgs/crousel7.jpg" alt="First slide" />
            </Carousel.Item>
          </Carousel>
          <Container fluid className="main-container">
            {error && <MessageBox variant="danger">{error}</MessageBox>}

            {data && data.gwCardList && data.gwCardList.length > 0 && (
              <Row className="gwCardList">
                {data.gwCardList.map((card) => (
                  <Col xs={6} md={4} lg={3}>
                    <div className="crd">
                      <div className="crd-head">
                        <h5>{card.header}</h5>
                      </div>

                      <div className="crd-body">
                        {card.items.length <= 1 ? (
                          card.items.map((item, idx) => (
                            <Link key={idx} to={item.link}>
                              <img
                                className="img"
                                src={item.img ? item.img : defaultSrc}
                                alt="gw-card-img"
                              />
                            </Link>
                          ))
                        ) : (
                          <div className="card-grid">
                            {card.items.map(
                              (item, idx) =>
                                idx <= 3 && (
                                  <div key={idx} className="card-grid-item">
                                    <Link to={item.link ? item.link : ""}>
                                      <img
                                        src={item.img ? item.img : defaultSrc}
                                        alt="gw-grid-img"
                                      />
                                      <span>
                                        <small>{item.label}</small>
                                      </span>
                                    </Link>
                                  </div>
                                )
                            )}
                          </div>
                        )}
                      </div>
                      <div className="crd-footer">
                        <Link to="/">
                          <small>See more</small>
                        </Link>
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>
            )}
            {data && data.mainCard && data.mainCard.length > 0 && (
              <Row className="mainCard">
                {data.mainCard.map((card) => (
                  <Col xs={6} md={4} lg={3}>
                    <div className="crd">
                      <div className="crd-head">
                        <h5>{card.header}</h5>
                      </div>

                      <div className="crd-body">
                        {card.items.length <= 1 ? (
                          card.items.map((item, idx) => (
                            <Link key={idx} to={item.link}>
                              <img
                                className="img"
                                src={item.img ? item.img : defaultSrc}
                                alt="gw-card-img"
                              />
                            </Link>
                          ))
                        ) : (
                          <div className="card-grid">
                            {card.items.map(
                              (item, idx) =>
                                idx <= 3 && (
                                  <div key={idx} className="card-grid-item">
                                    <Link to={item.link}>
                                      <img
                                        src={item.img ? item.img : defaultSrc}
                                        alt="gw-grid-img"
                                      />
                                      <span>
                                        <small>{item.label}</small>
                                      </span>
                                    </Link>
                                  </div>
                                )
                            )}
                          </div>
                        )}
                      </div>
                      <div className="crd-footer">
                        <Link to="/">
                          <small>See more</small>
                        </Link>
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>
            )}
            <Row>
              <Col xs={6} md={4} lg={3}>
                <div className="crd">
                  <div className="crd-head">
                    <h5>Gaming accessories</h5>
                  </div>
                  <div className="crd-body">
                    <img
                      className="img"
                      src="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Dashboard/Fuji_Dash_PC_1x._SY304_CB431800965_.jpg"
                      alt="logo"
                    />
                  </div>
                  <div className="crd-footer">
                    <Link to="/">
                      <small>See more</small>
                    </Link>
                  </div>
                </div>
              </Col>
              <Col xs={6} md={4} lg={3}>
                <div className="crd">
                  <div className="crd-head">
                    <h5>Gaming accessories</h5>
                  </div>
                  <div className="crd-body">
                    <img
                      className="img"
                      src="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2022/February/DashboardCards/GW_CONS_AUS_HPC_HPCEssentials_CatCard_Desktop1x._SY304_CB627424361_.jpg"
                      alt="logo"
                    />
                  </div>
                  <div className="crd-footer">
                    <Link to="/">
                      <small>See more</small>
                    </Link>
                  </div>
                </div>
              </Col>
              <Col xs={6} md={4} lg={3}>
                <div className="crd">
                  <div className="crd-head">
                    <h5>Gaming accessories</h5>
                  </div>
                  <div className="crd-body">
                    <img
                      className="img"
                      src="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Dashboard/Fuji_Dash_Beauty_1x._SY304_CB432774351_.jpg"
                      alt="logo"
                    />
                  </div>
                  <div className="crd-footer">
                    <Link to="/">
                      <small>See more</small>
                    </Link>
                  </div>
                </div>
              </Col>
              <Col xs={6} md={4} lg={3}>
                <div className="crd">
                  <div className="crd-head">
                    <h5>Gaming accessories</h5>
                  </div>
                  <div className="crd-body">
                    <img
                      className="img"
                      src="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Dashboard/Fuji_Dash_PC_1x._SY304_CB431800965_.jpg"
                      alt="logo"
                    />
                  </div>
                  <div className="crd-footer">
                    <Link to="/">
                      <small>See more</small>
                    </Link>
                  </div>
                </div>
              </Col>
              <Col xs={6} md={4} lg={3}>
                <div className="crd">
                  <div className="crd-head">
                    <h5>Gaming accessories</h5>
                  </div>
                  <div className="crd-body">
                    <img
                      className="img"
                      src="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Dashboard/Fuji_Dash_PC_1x._SY304_CB431800965_.jpg"
                      alt="logo"
                    />
                  </div>
                  <div className="crd-footer">
                    <Link to="/">
                      <small>See more</small>
                    </Link>
                  </div>
                </div>
              </Col>
              <Col xs={6} md={4} lg={3}>
                <div className="crd">
                  <div className="crd-head">
                    <h5>Gaming accessories</h5>
                  </div>
                  <div className="crd-body">
                    <img
                      className="img"
                      src="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Dashboard/Fuji_Dash_PC_1x._SY304_CB431800965_.jpg"
                      alt="logo"
                    />
                  </div>
                  <div className="crd-footer">
                    <Link to="/">
                      <small>See more</small>
                    </Link>
                  </div>
                </div>
              </Col>
              <Col xs={6} md={4} lg={3}>
                <div className="crd">
                  <div className="crd-head">
                    <h5>Gaming accessories</h5>
                  </div>
                  <div className="crd-body">
                    <img
                      className="img"
                      src="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Dashboard/Fuji_Dash_PC_1x._SY304_CB431800965_.jpg"
                      alt="logo"
                    />
                  </div>
                  <div className="crd-footer">
                    <Link to="/">
                      <small>See more</small>
                    </Link>
                  </div>
                </div>
              </Col>
              <Col xs={6} md={4} lg={3}>
                <div className="crd">
                  <div className="crd-head">
                    <h5>Gaming accessories</h5>
                  </div>
                  <div className="crd-body">
                    <div className="card-grid">
                      <div className="card-grid-item">
                        <img
                          className="img-fluid"
                          src="https://images-na.ssl-images-amazon.com/images/G/01/softlines/shopbop/ingress/2023/March/mp_20230219_ff_desktopsinglecategory_desktop_379x304_1._SY304_CB612639047_.jpg"
                          alt="logo"
                        />
                        <span>
                          <small>Headsets</small>
                        </span>
                      </div>
                      <div className="card-grid-item">
                        <img
                          src="https://images-na.ssl-images-amazon.com/images/G/01/softlines/shopbop/ingress/2023/March/mp_20230219_ff_desktopsinglecategory_desktop_379x304_1._SY304_CB612639047_.jpg"
                          alt="logo"
                        />
                        <span>
                          <small>Headsets</small>
                        </span>
                      </div>
                      <div className="card-grid-item">
                        <img
                          src="https://images-na.ssl-images-amazon.com/images/G/01/softlines/shopbop/ingress/2023/March/mp_20230219_ff_desktopsinglecategory_desktop_379x304_1._SY304_CB612639047_.jpg"
                          alt="logo"
                        />
                        <span>
                          <small>Headsets</small>
                        </span>
                      </div>
                      <div className="card-grid-item">
                        <img
                          src="https://images-na.ssl-images-amazon.com/images/G/01/softlines/shopbop/ingress/2023/March/mp_20230219_ff_desktopsinglecategory_desktop_379x304_1._SY304_CB612639047_.jpg"
                          alt="logo"
                        />
                        <span>
                          <small>Headsets</small>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="crd-footer">
                    <Link to="/">
                      <small>See more</small>
                    </Link>
                  </div>
                </div>
              </Col>
              <Col xs={6} md={4} lg={3}>
                <div className="crd">
                  <div className="crd-head">
                    <h5>Gaming accessories</h5>
                  </div>
                  <div className="crd-body">
                    <div className="card-grid">
                      <div className="card-grid-item">
                        <img
                          src="https://images-na.ssl-images-amazon.com/images/G/01/softlines/shopbop/ingress/2023/March/mp_20230219_ff_desktopsinglecategory_desktop_379x304_1._SY304_CB612639047_.jpg"
                          alt="logo"
                        />
                        <span>
                          <small>Headsets</small>
                        </span>
                      </div>
                      <div className="card-grid-item">
                        <img
                          src="https://images-na.ssl-images-amazon.com/images/G/01/softlines/shopbop/ingress/2023/March/mp_20230219_ff_desktopsinglecategory_desktop_379x304_1._SY304_CB612639047_.jpg"
                          alt="logo"
                        />
                        <span>
                          <small>Headsets</small>
                        </span>
                      </div>
                      <div className="card-grid-item">
                        <img
                          src="https://images-na.ssl-images-amazon.com/images/G/01/softlines/shopbop/ingress/2023/March/mp_20230219_ff_desktopsinglecategory_desktop_379x304_1._SY304_CB612639047_.jpg"
                          alt="logo"
                        />
                        <span>
                          <small>Headsets</small>
                        </span>
                      </div>
                      <div className="card-grid-item">
                        <img
                          src="https://images-na.ssl-images-amazon.com/images/G/01/softlines/shopbop/ingress/2023/March/mp_20230219_ff_desktopsinglecategory_desktop_379x304_1._SY304_CB612639047_.jpg"
                          alt="logo"
                        />
                        <span>
                          <small>Headsets</small>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="crd-footer">
                    <Link to="/">
                      <small>See more</small>
                    </Link>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      )}
    </>
  );
}
