import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getProductAsin } from "../slice/amazonSlice";

import MessageBox from "../components/MessageBox";
import LoadingBox from "../components/LoadingBox";
import SorryBox from "../components/SorryBox";
import ProductDetails from "../components/ProductDetails";
import { getFavouriteAsins } from "../slice/favouriteSlice";
import { saveProduct } from "../slice/productSlice";

// import { getItemFromHistory } from "../slice/historySlice";

export default function ProductDetailsPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const param = useParams();
  const { asin } = param;

  const amazonState = useSelector((state) => state.amazon);
  const { amazonProductAsin: data, loading, error } = amazonState;

  const favState = useSelector((state) => state.favourite);
  const { favAsins } = favState;

  useEffect(() => {
    if (!asin) navigate("/");
    else if (!data) {
      dispatch(getFavouriteAsins());
      dispatch(getProductAsin(asin));
    }
    if (data) {
      const save = { asin: asin, ...data };
      dispatch(saveProduct(save));
    }
  }, [data]);

  return loading ? (
    <LoadingBox />
  ) : data && data.length === 0 ? (
    <SorryBox />
  ) : (
    <div>
      {error && <MessageBox variants="danger">{error}</MessageBox>}
      {data && favAsins && (
        <ProductDetails
          data={data}
          asin={asin}
          fav={favAsins.filter((f) => f.asin === asin)}
        ></ProductDetails>
      )}
    </div>
  );
}
