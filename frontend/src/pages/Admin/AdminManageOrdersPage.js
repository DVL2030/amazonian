import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAdminOrderOverView } from "../../slice/adminSlice";
import { Chart } from "react-google-charts";
import { Col, Container, Row } from "react-bootstrap";
import AdminSideBar from "../../components/AdminSideBar";
import StatBox from "../../components/StatBox";
import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";
import { DonutMultiple, DonutElement } from "react-donut-component";
import AdminTable from "../../components/AdminTable";

export default function AdminManageOrdersPage() {
  const dispatch = useDispatch();

  const adminState = useSelector((state) => state.admin);
  const { order, loading, error } = adminState;

  useEffect(() => {
    dispatch(getAdminOrderOverView());
  }, []);
  return loading ? (
    <LoadingBox></LoadingBox>
  ) : (
    <div className="d-flex">
      <AdminSideBar></AdminSideBar>
      <Container fluid>
        {error && <MessageBox varints="danger">{error}</MessageBox>}

        {order && (
          <>
            <Row>
              <Col xs={12} sm={6} md={3}>
                <StatBox
                  icon="fa-solid fa-truck"
                  number={order.total_orders}
                  percentage={32}
                  label="Total Orders"
                ></StatBox>
              </Col>
              <Col xs={12} sm={6} md={3}>
                <StatBox
                  icon="fa-solid fa-globe"
                  number={order.total_tax}
                  percentage={13}
                  label="Total Tax"
                ></StatBox>
              </Col>
              <Col xs={12} sm={6} md={3}>
                <StatBox
                  icon="fa-solid fa-sack-dollar"
                  number={
                    order.delivery_status.find((d) => d._id === true).count
                  }
                  percentage={order.delivery_status[2].stat}
                  label="Delivered Orders"
                ></StatBox>
              </Col>
              {order.order_country && (
                <Col xs={12} sm={6} md={3}>
                  <div className="stat-box d-flex ">
                    <div>
                      <DonutMultiple linecap="butt" size={100} strokeWidth={10}>
                        <DonutElement color="#56ADA7">
                          {order.order_country[0].count}
                        </DonutElement>
                        <DonutElement color="#DC442D">
                          {order.order_country[1].count}
                        </DonutElement>
                        <DonutElement color="#EA9564">
                          {order.order_country[2].count}
                        </DonutElement>
                      </DonutMultiple>
                    </div>
                    <div>
                      <h5 style={{ color: "#56ADA7" }}>
                        {order.order_country[0].country}
                      </h5>
                      <h5 style={{ color: "#DC442D" }}>
                        {order.order_country[1].country}
                      </h5>
                      <h5 style={{ color: "#EA9564" }}>
                        {order.order_country[2].country}
                      </h5>
                    </div>
                  </div>
                </Col>
              )}
            </Row>
            <Row className="my-5 p-5">
              <Col>
                <AdminTable data={order.most_sold_products} />
              </Col>
              {/* <Col>
                <div>
                  <Chart
                    chartType="Bar"
                    width="80%"
                    height="500px"
                    data={data}
                    options={options}
                  />
                </div>
              </Col> */}
            </Row>
          </>
        )}
      </Container>
    </div>
  );
}
