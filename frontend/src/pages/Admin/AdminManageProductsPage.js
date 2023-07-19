import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Col, Container, Row } from "react-bootstrap";
import AdminSideBar from "../../components/AdminSideBar";
import StatBox from "../../components/StatBox";
import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";
import AdminTable from "../../components/AdminTable";
import { getAdminProductOverView } from "../../slice/adminSlice";

export default function AdminManageProductsPage() {
  const dispatch = useDispatch();

  const adminState = useSelector((state) => state.admin);
  const { product, loading, error } = adminState;

  useEffect(() => {
    dispatch(getAdminProductOverView());
  }, []);
  return loading ? (
    <LoadingBox></LoadingBox>
  ) : (
    <div className="d-flex">
      <AdminSideBar></AdminSideBar>
      <Container fluid>
        {error && <MessageBox varints="danger">{error}</MessageBox>}

        {product && (
          <>
            {/* <Row>
              <Col xs={12} sm={6}>
                <StatBox
                  icon="fa-solid fa-user"
                  number={user.total_products}
                  percentage={32}
                  label="Total Products"
                ></StatBox>
              </Col>
              <Col xs={12} sm={6}>
                <StatBox
                  icon="fa-solid "
                  number={}
                  percentage={13}
                  label=""
                ></StatBox>
              </Col>
            </Row> */}
            <Row className="my-3 p-5">
              <h3 className="mb-3" style={{ color: "#154c79" }}>
                Most Popular Products
              </h3>
              <Col>
                <AdminTable data={product.most_popular_products} />
              </Col>
            </Row>
            <Row className="my-3 p-5">
              <h3 className="mb-3" style={{ color: "#154c79" }}>
                All Users
              </h3>
              <Col>
                <AdminTable data={product.all_products} />
              </Col>
            </Row>
          </>
        )}
      </Container>
    </div>
  );
}
