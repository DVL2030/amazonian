import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function PrivateRoute(props) {
  const userState = useSelector((state) => state.user);
  const { userInfo } = userState;

  if (userInfo) return props.children;

  return <Navigate to="/signin" />;
}
