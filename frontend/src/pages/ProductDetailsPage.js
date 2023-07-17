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
import ProductDetails from "../components/ProductDetails";

// import { getItemFromHistory } from "../slice/historySlice";

export default function ProductDetailsPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const amazonState = useSelector((state) => state.amazon);
  const { amazonProductAsin: data, loading, error } = amazonState;

  // const historyState = useSelector((state) => state.history);
  // const { historyItems } = historyState;

  const param = useParams();
  const { asin } = param;

  useEffect(() => {
    if (!asin) navigate("/");
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
      {data && <ProductDetails data={data} asin={asin}></ProductDetails>}
    </div>
  );
}
