import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAdminUserOverView } from "../../slice/adminSlice";

export default function AdminManageUsersPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAdminUserOverView());
  }, []);
  return <div>AdminManageUsers</div>;
}
