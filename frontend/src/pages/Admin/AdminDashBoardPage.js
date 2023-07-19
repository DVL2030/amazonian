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

  const data = [
    ["Month", "Sales", "Expenses", "Profit"],
    [
      "Feb",
      dashboard.monthly_revenue[2].sum * 1.5,
      dashboard.monthly_revenue[2].sum * 1.5 * 0.7,
      dashboard.monthly_revenue[2].sum * 1.5 * 0.3,
    ],
    [
      "Mar",
      dashboard.monthly_revenue[1].sum * 0.5,
      dashboard.monthly_revenue[1].sum * 0.5 * 0.7,
      dashboard.monthly_revenue[1].sum * 0.5 * 0.3,
    ],
    [
      "Apr",
      dashboard.monthly_revenue[0].sum * 2,
      dashboard.monthly_revenue[0].sum * 2 * 0.7,
      dashboard.monthly_revenue[0].sum * 2 * 0.3,
    ],
    [
      "May",
      dashboard.monthly_revenue[2].sum,
      dashboard.monthly_revenue[2].sum * 0.7,
      dashboard.monthly_revenue[2].sum * 0.3,
    ],
    [
      "June",
      dashboard.monthly_revenue[1].sum,
      dashboard.monthly_revenue[1].sum * 0.7,
      dashboard.monthly_revenue[1].sum * 0.3,
    ],
    [
      "Jul",
      dashboard.monthly_revenue[0].sum,
      dashboard.monthly_revenue[0].sum * 0.7,
      dashboard.monthly_revenue[0].sum * 0.3,
    ],
  ];

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
                  increase={dashboard.new_users_percentage}
                  label="New Users"
                ></StatBox>
              </Col>
              <Col xs={12} sm={6} md={3}>
                <StatBox
                  icon="fa-solid fa-truck"
                  number={dashboard.new_orders}
                  increase={dashboard.new_orders_percentage}
                  label="New Orders"
                ></StatBox>
              </Col>
              <Col xs={12} sm={6} md={3}>
                <StatBox
                  icon="fa-solid fa-globe"
                  number={dashboard.total_traffic}
                  increase={10}
                  label="Total Visits"
                ></StatBox>
              </Col>
              <Col xs={12} sm={6} md={3}>
                <StatBox
                  icon="fa-solid fa-sack-dollar"
                  number={`$${dashboard.total_revenue}`}
                  increase={20}
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
