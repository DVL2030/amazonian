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
  const { data, loading, error } = amazonState;

  useEffect(() => {
    dispatch(getHomePage());
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

            {data && data.gwCardList && data.gwCardList.length > 0 && (
              <Row className="gwCardList">
                {data.gwCardList.map((card) => (
                  <Col xs={6} md={4} lg={3}>
                    <Card
                      header={card.header}
                      items={card.items}
                      footer="See more"
                      footerLink="/"
                    ></Card>
                  </Col>
                ))}
              </Row>
            )}
            {data && data.mainCard && data.mainCard.length > 0 && (
              <Row className="mainCard mb-3">
                {data.mainCard.map((card, idx) => (
                  <Col key={idx} xs={6} md={4} lg={3}>
                    <Card
                      header={card.header}
                      items={card.items}
                      footer="Shop now"
                      footerLink="/"
                    ></Card>
                  </Col>
                ))}
              </Row>
            )}
            {data && data.mainCarousel && data.mainCarousel.length > 0 && (
              <Row className="mainCarousel">
                {data.mainCarousel.map((carousel) => (
                  <div className="carousel-container bg-white mb-5">
                    <div className="darousel-header ">
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
