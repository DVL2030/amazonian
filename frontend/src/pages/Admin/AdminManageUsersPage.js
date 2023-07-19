import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Col, Container, Row } from "react-bootstrap";
import AdminSideBar from "../../components/AdminSideBar";
import StatBox from "../../components/StatBox";
import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";
import AdminTable from "../../components/AdminTable";
import { getAdminUserOverView } from "../../slice/adminSlice";

export default function AdminManageUsersPage() {
  const dispatch = useDispatch();

  const adminState = useSelector((state) => state.admin);
  const { user, loading, error } = adminState;

  useEffect(() => {
    dispatch(getAdminUserOverView());
  }, []);
  return loading ? (
    <LoadingBox></LoadingBox>
  ) : (
    <div className="d-flex">
      <AdminSideBar></AdminSideBar>
      <Container fluid>
        {error && <MessageBox varints="danger">{error}</MessageBox>}

        {user && (
          <>
            <Row>
              <Col xs={12} sm={6}>
                <StatBox
                  icon="fa-solid fa-user"
                  number={user.total_users}
                  percentage={32}
                  label="Total Users"
                ></StatBox>
              </Col>
              <Col xs={12} sm={6}>
                <StatBox
                  icon="fa-solid fa-globe"
                  number={user.total_user_visits}
                  percentage={13}
                  label="Total Vists"
                ></StatBox>
              </Col>
            </Row>
            <Row className="my-3 p-5">
              <h3 className="mb-3" style={{ color: "#154c79" }}>
                Most Active Users
              </h3>
              <Col>
                <AdminTable data={user.most_active_users} />
              </Col>
            </Row>
            <Row className="my-3 p-5">
              <h3 className="mb-3" style={{ color: "#154c79" }}>
                All Users
              </h3>
              <Col>
                <AdminTable data={user.all_users} />
              </Col>
            </Row>
          </>
        )}
      </Container>
    </div>
  );
}
