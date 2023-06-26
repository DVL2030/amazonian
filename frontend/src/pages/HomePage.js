import React, { useEffect } from "react";
import { Col, Container, Row, Carousel } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getHomePage } from "../slice/amazonSlice";
import MessageBox from "../components/MessageBox";
import LoadingBox from "../components/LoadingBox";

import MultiCarousel from "../components/MultiCarousel";
import Card from "../components/Card";

export default function HomePage() {
  const dispatch = useDispatch();

  const amazonState = useSelector((state) => state.amazon);
  const { amazonHome, loading, error } = amazonState;

  useEffect(() => {
    if (!amazonHome) dispatch(getHomePage());
  }, []);

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

            {amazonHome &&
              amazonHome.gwCardList &&
              amazonHome.gwCardList.length > 0 && (
                <Row className="gwCardList">
                  {amazonHome.gwCardList.map((card, idx) => (
                    <Col key={idx} xs={6} md={4} lg={3}>
                      <Card
                        header={card.header}
                        items={card.items}
                        footer="See more"
                        footerLink={`/products/${card.header}`}
                      ></Card>
                    </Col>
                  ))}
                </Row>
              )}
            {amazonHome &&
              amazonHome.mainCard &&
              amazonHome.mainCard.length > 0 && (
                <Row className="mainCard mb-3">
                  {amazonHome.mainCard.map((card, idx) => (
                    <Col key={idx} xs={6} md={4} lg={3}>
                      <Card
                        header={card.header}
                        items={card.items}
                        footer="Shop now"
                        footerLink={`/products/${card.header}`}
                      ></Card>
                    </Col>
                  ))}
                </Row>
              )}
            {amazonHome &&
              amazonHome.mainCarousel &&
              amazonHome.mainCarousel.length > 0 && (
                <Row className="mainCarousel">
                  {amazonHome.mainCarousel.map((carousel, idx) => (
                    <div
                      key={idx}
                      className="carousel-container bg-white mb-5 p-3"
                    >
                      <div className="carousel-header ">
                        <h4>{carousel.header}</h4>
                      </div>
                      <div className="carousel-viewport">
                        <MultiCarousel>{carousel.items}</MultiCarousel>
                      </div>
                    </div>
                  ))}
                </Row>
              )}
          </Container>
        </div>
      )}
    </>
  );
}
