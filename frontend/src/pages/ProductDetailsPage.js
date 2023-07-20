import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getProductAsin } from "../slice/amazonSlice";

import MessageBox from "../components/MessageBox";
import LoadingBox from "../components/LoadingBox";
import SorryBox from "../components/SorryBox";
import ProductDetails from "../components/ProductDetails";
import { getAsinFromDB, saveProduct } from "../slice/productSlice";

export default function ProductDetailsPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const param = useParams();
  const { asin } = param;

  const productState = useSelector((state) => state.product);
  const {
    product,
    loading: productLoading,
    error: productError,
  } = productState;

  const amazonState = useSelector((state) => state.amazon);
  const { amazonProductAsin: data, loading, error } = amazonState;

  useEffect(() => {
    if (!asin) navigate("/");
    if (!product) {
      dispatch(getAsinFromDB(asin));
      if (!data && productError) {
        dispatch(getProductAsin(asin));
      }
      if (data) {
        const save = { asin: asin, ...data };
        dispatch(saveProduct(save));
      }
    }
  }, [product, data, productError]);

  return loading ? (
    <LoadingBox />
  ) : data && data.length === 0 ? (
    <SorryBox />
  ) : (
    <div>
      {error && <MessageBox variants="danger">{error}</MessageBox>}
      {(data || product) && (
        <ProductDetails data={product || data} asin={asin}></ProductDetails>
      )}
    </div>
  );
}
