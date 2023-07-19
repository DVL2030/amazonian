import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";

export default function AdminSideBar() {
  const userState = useSelector((state) => state.userAuth);
  const { userInfo } = userState;

  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <Sidebar collapsed={isCollapsed} collapsedWidth="70px">
      <Menu
        menuItemStyles={{
          button: ({ active }) => {
            // only apply styles on first level elements of the tree
            if (active)
              return {
                backgroundColor: "#1b4a79",
                color: "#b6c8d9",
              };
            return {
              color: "#13395e",
              backgroundColor: active ? "#eecef9" : undefined,
            };
          },
        }}
      >
        <MenuItem
          onClick={() => setIsCollapsed(!isCollapsed)}
          icon={
            isCollapsed ? (
              <i className="admin-dashboard-toggle fa-solid fa-bars fa-xl"></i>
            ) : undefined
          }
          style={{
            margin: "10px 0 20px 0",
            background: "none",
          }}
        >
          {!isCollapsed && (
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h3>ADMIN</h3>
              <div
                className="admin-dashboard-toggle"
                onClick={() => setIsCollapsed(!isCollapsed)}
              >
                <i className="fa-solid fa-bars fa-xl"></i>
              </div>
            </div>
          )}
        </MenuItem>

        <div className="mb-2">
          <div className="d-flex justify-content-center align-items-center mb-2">
            <img alt="profile-user" src="/imgs/default-avatar.jfif"></img>
          </div>
          <div className="admin-dashboard-header">
            <h5>{userInfo.name}</h5>
          </div>
        </div>

        <MenuItem active icon={<i className="fa-solid fa-house"></i>}>
          Dashboard
        </MenuItem>

        <div className="text-center my-3">
          <span className="text-secondary">Data</span>
        </div>
        <MenuItem icon={<i className="fa-solid fa-receipt"></i>}>
          Orders
        </MenuItem>
        <MenuItem icon={<i className="fa-solid fa-users"></i>}>Users</MenuItem>
        <MenuItem icon={<i className="fa-solid fa-boxes-stacked"></i>}>
          Products
        </MenuItem>
        <MenuItem icon={<i className="fa-solid fa-comment"></i>}>
          Reviews
        </MenuItem>

        <div className="text-center my-3">
          <span className="text-secondary">Others</span>
        </div>
        <MenuItem icon={<i className="fa-solid fa-calendar-days"></i>}>
          Calendar
        </MenuItem>
        <MenuItem icon={<i className="fa-brands fa-servicestack"></i>}>
          Examples
        </MenuItem>
        <div className="text-center my-3">
          <span className="text-secondary">Charts</span>
        </div>
        <MenuItem icon={<i className="fa-solid fa-chart-column"></i>}>
          Bar Chart
        </MenuItem>
        <MenuItem icon={<i className="fa-solid fa-chart-pie"></i>}>
          Pie Chart
        </MenuItem>
        <MenuItem icon={<i className="fa-solid fa-chart-line"></i>}>
          Line Chart
        </MenuItem>
      </Menu>
    </Sidebar>
  );
}
