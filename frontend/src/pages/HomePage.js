import React from "react";
import { Col, Container, Row, Carousel } from "react-bootstrap";

export default function HomePage() {
  return (
    <div>
      <Carousel
        fade
        slide
        showControls
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
        <Row>
          <Col xs sm={6} md={4} lg={3}>
            <div className="crd">
              <div className="crd-head">
                <h5>Gaming accessories</h5>
              </div>
              <div className="crd-body">
                <img
                  src="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Dashboard/Fuji_Dash_Electronics_1x._SY304_CB432774322_.jpg"
                  alt="logo"
                />
                <span>
                  <small>Headsets</small>
                </span>
              </div>
              <div className="crd-toe">
                <small>See more</small>
              </div>
            </div>
          </Col>
          <Col xs sm={6} md={4} lg={3}>
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
              <div className="crd-toe">
                <small>See more</small>
              </div>
            </div>
          </Col>
          <Col xs sm={6} md={4} lg={3}>
            <div className="card-normal">
              <Container>
                <Row className="flex-column">
                  <Col className="card-ui-header mt-1">
                    <h5 className="m-0">Gaming accessories</h5>
                  </Col>
                  <Col className="card-ui-body mt-1">
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
                  </Col>
                  <Col className="card-ui-footer mt-4">
                    <div>
                      <small>See more</small>
                    </div>
                  </Col>
                </Row>
              </Container>
            </div>
          </Col>
          <Col xs sm={6} md={4} lg={3}>
            <div className="card-normal">
              <Container>
                <Row className="flex-column">
                  <Col className="card-ui-header mt-1">
                    <h5 className="m-0">Gaming accessories</h5>
                  </Col>
                  <Col className="card-ui-body mt-1">
                    <div className="">
                      <img
                        src="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Dashboard/Fuji_Dash_Electronics_1x._SY304_CB432774322_.jpg"
                        alt="logo"
                      />
                      <span>
                        <small>Headsets</small>
                      </span>
                    </div>
                  </Col>
                  <Col className="card-ui-footer mt-4">
                    <div>
                      <small>See more</small>
                    </div>
                  </Col>
                </Row>
              </Container>
            </div>
          </Col>
          <Col xs sm={6} md={4} lg={3}>
            <div className="card-normal">
              <Container>
                <Row className="flex-column">
                  <Col className="card-ui-header mt-1">
                    <h5 className="m-0">Gaming accessories</h5>
                  </Col>
                  <Col className="card-ui-body mt-1">
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
                  </Col>
                  <Col className="card-ui-footer mt-4">
                    <div>
                      <small>See more</small>
                    </div>
                  </Col>
                </Row>
              </Container>
            </div>
          </Col>
          <Col xs sm={6} md={4} lg={3}>
            <div className="card-normal">
              <Container>
                <Row className="flex-column">
                  <Col className="card-ui-header mt-1">
                    <h5 className="m-0">Gaming accessories</h5>
                  </Col>
                  <Col className="card-ui-body mt-1">
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
                  </Col>
                  <Col className="card-ui-footer mt-4">
                    <div>
                      <small>See more</small>
                    </div>
                  </Col>
                </Row>
              </Container>
            </div>
          </Col>
          <Col xs sm={6} md={4} lg={3}>
            <div className="card-normal">
              <Container fluid>
                <Row className="flex-column">
                  <Col className="card-ui-header mt-1">
                    <h5 className="m-0">Gaming accessories</h5>
                  </Col>
                  <Col className="card-ui-body mt-1">
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
                  </Col>
                  <Col className="card-ui-footer mt-4">
                    <div>
                      <small>See more</small>
                    </div>
                  </Col>
                </Row>
              </Container>
            </div>
          </Col>
          <Col xs sm={6} md={4} lg={3}>
            <Container className="card-normal ">
              <Row className="flex-column">
                <Col className="card-ui-header mt-1">
                  <h5 className="m-0">Gaming accessories</h5>
                </Col>
                <Col className="card-ui-body mt-1">
                  <div className="">
                    <img
                      src="https://images-na.ssl-images-amazon.com/images/G/01/softlines/shopbop/ingress/2023/March/mp_20230219_ff_desktopsinglecategory_desktop_379x304_1._SY304_CB612639047_.jpg"
                      alt="logo"
                    />
                    <span>
                      <small>Headsets</small>
                    </span>
                  </div>
                </Col>
                <Col className="card-ui-footer mt-4">
                  <div>
                    <small>See more</small>
                  </div>
                </Col>
              </Row>
            </Container>
          </Col>
          <Col xs sm={6} md={4} lg={3}>
            <Container className="card-normal ">
              <Row className="flex-column">
                <Col className="card-ui-header mt-1">
                  <h5 className="m-0">Gaming accessories</h5>
                </Col>
                <Col className="card-ui-body mt-1">
                  <div className="">
                    <img
                      src="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2022/February/DashboardCards/GW_CONS_AUS_HPC_HPCEssentials_CatCard_Desktop1x._SY304_CB627424361_.jpg"
                      alt="logo"
                    />
                    <span>
                      <small>Headsets</small>
                    </span>
                  </div>
                </Col>
                <Col className="card-ui-footer mt-4">
                  <div>
                    <small>See more</small>
                  </div>
                </Col>
              </Row>
            </Container>
          </Col>
          <Col xs sm={6} md={4} lg={3}>
            <Container className="card-normal ">
              <Row className="flex-column">
                <Col className="card-ui-header mt-1">
                  <h5 className="m-0">Gaming accessories</h5>
                </Col>
                <Col className="card-ui-body mt-1">
                  <div className="">
                    <img
                      src="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Dashboard/Fuji_Dash_Electronics_1x._SY304_CB432774322_.jpg"
                      alt="logo"
                    />
                    <span>
                      <small>Headsets</small>
                    </span>
                  </div>
                </Col>
                <Col className="card-ui-footer mt-4">
                  <div>
                    <small>See more</small>
                  </div>
                </Col>
              </Row>
            </Container>
          </Col>
          <Col xs sm={6} md={4} lg={3}>
            <Container className="card-normal ">
              <Row className="flex-column">
                <Col className="card-ui-header mt-1">
                  <h5 className="m-0">Gaming accessories</h5>
                </Col>
                <Col className="card-ui-body mt-1">
                  <div className="">
                    <img
                      src="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Dashboard/Fuji_Dash_Beauty_1x._SY304_CB432774351_.jpg"
                      alt="logo"
                    />
                    <span>
                      <small>Headsets</small>
                    </span>
                  </div>
                </Col>
                <Col className="card-ui-footer mt-4">
                  <div>
                    <small>See more</small>
                  </div>
                </Col>
              </Row>
            </Container>
          </Col>

          <Col xs sm={6} md={4} lg={3}>
            <div className="card-normal card-normal-body center">
              <div className="card-head">
                <h5 className="m-0">Gaming accessories</h5>
              </div>
              <div className="card-grid mt-2">
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
              <div className="card-normal-content">
                <small>See more</small>
              </div>
            </div>
          </Col>
          <Col xs sm={6} md={4} lg={3}>
            <div className="card-normal card-normal-body center">
              <div className="card-head">
                <h5>Gaming accessories</h5>
              </div>
              <div className="mt-2">
                <img
                  src="https://images-na.ssl-images-amazon.com/images/G/01/softlines/shopbop/ingress/2023/March/mp_20230219_ff_desktopsinglecategory_desktop_379x304_1._SY304_CB612639047_.jpg"
                  alt="logo"
                />
              </div>
              <div className="card-normal-content">
                <small>See more</small>
              </div>
            </div>
          </Col>
          <Col xs sm={6} md={4} lg={3}>
            <div className="card-normal card-normal-body center">
              <div className="card-head">
                <h5>Gaming accessories</h5>
              </div>
              <div className="mt-2">
                <img
                  src="https://images-na.ssl-images-amazon.com/images/G/01/softlines/shopbop/ingress/2023/March/mp_20230219_ff_desktopsinglecategory_desktop_379x304_1._SY304_CB612639047_.jpg"
                  alt="logo"
                />
              </div>
              <div className="card-normal-content">
                <small>See more</small>
              </div>
            </div>
          </Col>
          <Col xs sm={6} md={4} lg={3}>
            <div className="card-normal card-normal-body center">
              <div className="card-head">
                <h5>Gaming accessories</h5>
              </div>
              <div className="mt-2">
                <img
                  src="https://images-na.ssl-images-amazon.com/images/G/01/softlines/shopbop/ingress/2023/March/mp_20230219_ff_desktopsinglecategory_desktop_379x304_1._SY304_CB612639047_.jpg"
                  alt="logo"
                />
              </div>
              <div className="card-normal-content">
                <small>See more</small>
              </div>
            </div>
          </Col>
          <Col xs sm={6} md={4} lg={3}>
            <div className="card-normal card-normal-body center">
              <div className="card-head">
                <h5>Gaming accessories</h5>
              </div>
              <div className="mt-2">
                <img
                  src="https://images-na.ssl-images-amazon.com/images/G/01/softlines/shopbop/ingress/2023/March/mp_20230219_ff_desktopsinglecategory_desktop_379x304_1._SY304_CB612639047_.jpg"
                  alt="logo"
                />
              </div>
              <div className="card-normal-content">
                <small>See more</small>
              </div>
            </div>
          </Col>
          <Col xs sm={6} md={4} lg={3}>
            <div className="card-normal card-normal-body center">
              <div className="card-head">
                <h5>Gaming accessories</h5>
              </div>
              <div className="mt-2">
                <img
                  src="https://images-na.ssl-images-amazon.com/images/G/01/softlines/shopbop/ingress/2023/March/mp_20230219_ff_desktopsinglecategory_desktop_379x304_1._SY304_CB612639047_.jpg"
                  alt="logo"
                />
              </div>
              <div className="card-normal-content">
                <small>See more</small>
              </div>
            </div>
          </Col>
          <Col xs sm={6} md={4} lg={3}>
            <div className="card-normal card-normal-body center">
              <div className="card-head">
                <h5>Gaming accessories</h5>
              </div>
              <div className="mt-2">
                <img
                  src="https://images-na.ssl-images-amazon.com/images/G/01/softlines/shopbop/ingress/2023/March/mp_20230219_ff_desktopsinglecategory_desktop_379x304_1._SY304_CB612639047_.jpg"
                  alt="logo"
                />
              </div>
              <div className="card-normal-content">
                <small>See more</small>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
