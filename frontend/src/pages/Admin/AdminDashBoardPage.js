import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getDashboardOverview } from "../../slice/adminSlice";

export default function AdminDashBoardPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDashboardOverview());
  }, []);
  return <div>AdminDashBoardPage</div>;
}
