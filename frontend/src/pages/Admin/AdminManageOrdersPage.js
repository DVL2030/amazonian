import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAdminOrderOverView } from "../../slice/adminSlice";

export default function AdminManageOrderPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAdminOrderOverView());
  }, []);
  return <div>AdminManageOrder</div>;
}
