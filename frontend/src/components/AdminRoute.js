import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function AdminRoute(props) {
  const userState = useSelector((state) => state.userAuth);
  const { userInfo } = userState;
  if (userInfo && userInfo.isAdmin) return props.children;

  return <Navigate to="/" />;
}
