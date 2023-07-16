import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

export default function AccountHomeCard(props) {
  const { img, heading, content } = props;
  return (
    <Container className="box home-card">
      <Row>
        <Col xs={12} sm={6} md={3}>
          <img src={img} alt={heading}></img>
        </Col>
        <Col xs sm md>
          <h5>{heading}</h5>
          <span className="text-secondary">{content}</span>
        </Col>
      </Row>
    </Container>
  );
}
