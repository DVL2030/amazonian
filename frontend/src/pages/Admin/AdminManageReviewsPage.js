import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Col, Container, Row } from "react-bootstrap";
import AdminSideBar from "../../components/AdminSideBar";
import StatBox from "../../components/StatBox";
import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";
import AdminTable from "../../components/AdminTable";
import { getAdminReviewOverView } from "../../slice/adminSlice";

export default function AdminManageReviewsPage() {
  const dispatch = useDispatch();

  const adminState = useSelector((state) => state.admin);
  const { review, loading, error } = adminState;

  useEffect(() => {
    dispatch(getAdminReviewOverView());
  }, []);
  return loading ? (
    <LoadingBox></LoadingBox>
  ) : (
    <div className="d-flex">
      <AdminSideBar></AdminSideBar>
      <Container fluid>
        {error && <MessageBox varints="danger">{error}</MessageBox>}

        {review && (
          <>
            <Row className="my-3 p-5">
              <h3 className="mb-3" style={{ color: "#154c79" }}>
                Most Popular Reviews
              </h3>
              <Col>
                <AdminTable data={review.most_popular_reviews} />
              </Col>
            </Row>
            <Row className="my-3 p-5">
              <h3 className="mb-3" style={{ color: "#154c79" }}>
                All Reviews
              </h3>
              <Col>
                <AdminTable data={review.all_reviews} />
              </Col>
            </Row>
          </>
        )}
      </Container>
    </div>
  );
}
