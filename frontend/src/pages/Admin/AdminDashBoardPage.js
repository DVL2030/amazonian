import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDashboardOverview } from "../../slice/adminSlice";
import { Link } from "react-router-dom";
import { Chart } from "react-google-charts";
import { Col, Container, Row } from "react-bootstrap";
import AdminSideBar from "../../components/AdminSideBar";
import StatBox from "../../components/StatBox";
import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";

export default function AdminDashBoardPage() {
  const dispatch = useDispatch();

  const adminState = useSelector((state) => state.admin);
  const { dashboard, loading, error } = adminState;

  const data = dashboard
    ? [["Month", "Sales", "Expenses", "Profit"], ...dashboard.monthly_incomes]
    : [];

  const options = {
    chart: {
      title: "Amazonian Performance",
      subtitle: "Sales, Expenses, and Profit",
    },
  };

  useEffect(() => {
    dispatch(getDashboardOverview());
  }, []);
  return loading ? (
    <LoadingBox></LoadingBox>
  ) : (
    <div className="d-flex">
      <AdminSideBar></AdminSideBar>
      <Container fluid>
        {error && <MessageBox varints="danger">{error}</MessageBox>}

        {dashboard && (
          <>
            <Row>
              <Col xs={12} sm={6} md={3}>
                <StatBox
                  icon="fa-solid fa-user-plus"
                  number={dashboard.new_users}
                  percentage={dashboard.new_users_percentage}
                  label="New Users"
                ></StatBox>
              </Col>
              <Col xs={12} sm={6} md={3}>
                <StatBox
                  icon="fa-solid fa-truck"
                  number={dashboard.new_orders}
                  percentage={dashboard.new_orders_percentage}
                  label="New Orders"
                ></StatBox>
              </Col>
              <Col xs={12} sm={6} md={3}>
                <StatBox
                  icon="fa-solid fa-globe"
                  number={dashboard.total_traffic}
                  percentage={10}
                  label="Total Visits"
                ></StatBox>
              </Col>
              <Col xs={12} sm={6} md={3}>
                <StatBox
                  icon="fa-solid fa-sack-dollar"
                  number={`$${dashboard.total_revenue}`}
                  percentage={20}
                  label="Total Revenue"
                ></StatBox>
              </Col>
            </Row>
            <Row className="my-5 p-5">
              <Col>
                <div>
                  <Chart
                    chartType="Bar"
                    width="80%"
                    height="500px"
                    data={data}
                    options={options}
                  />
                </div>
              </Col>
            </Row>
          </>
        )}
      </Container>
    </div>
  );
}
