import React, { useEffect, useid, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router";
import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";
import { Button, Card, Col, Container, ListGroup, Row } from "react-bootstrap";

export default function UserSecurityPage() {
  const navigate = useNavigate();
  const userAuthState = useSelector((state) => state.userAuth);
  const { userInfo } = userAuthState;

  const userState = useSelector((state) => state.user);
  const { update, error, loading } = userState;

  const editButtonHandler = (e, reqField) => {
    e.preventDefault();

    navigate(`/user/security/update?field=${reqField}`);
  };

  return loading ? (
    <LoadingBox></LoadingBox>
  ) : (
    <Container className="p-5">
      <Row>
        <Col xs={12}>
          {error && <MessageBox variants="danger">{error}</MessageBox>}
        </Col>
        <Col xs={12}>
          {update.status && (
            <MessageBox variants="success">{update.message}</MessageBox>
          )}
        </Col>
        <h3 className="text-center">Login & Security</h3>

        <Col className="d-flex justify-content-center">
          <Card className="security-card">
            <ListGroup variant="flush">
              <ListGroup.Item>
                <div className="d-flex px-1 py-3">
                  <div className="flex-fill">
                    <div>
                      <strong>Name: </strong> {userInfo.name}
                    </div>
                  </div>
                  <div>
                    <button
                      className="rect security"
                      onClick={(e) => editButtonHandler(e, "name")}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </ListGroup.Item>
              <ListGroup.Item>
                <div className="d-flex px-1 py-3">
                  <div className="flex-fill">
                    <div>
                      <strong>Email: </strong>
                      {userInfo.email}
                    </div>
                  </div>
                  <div className="">
                    <button
                      className="rect security"
                      onClick={(e) => editButtonHandler(e, "email")}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </ListGroup.Item>
              <ListGroup.Item>
                <div className="d-flex px-1 py-3">
                  <div className="flex-fill">
                    <div>
                      <strong>Mobile Phone Number: </strong>
                    </div>
                    {userInfo.phone ? (
                      <> {userInfo.phone}</>
                    ) : (
                      <div className="blue">why add a mobile phone number?</div>
                    )}
                  </div>
                  <div className="">
                    <button
                      className="rect security"
                      onClick={(e) => editButtonHandler(e, "mobile")}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </ListGroup.Item>
              <ListGroup.Item>
                <div className=" d-flex px-1 py-3">
                  <div className="flex-fill">
                    <div>
                      <strong>Password:</strong>
                    </div>
                    <div>*******</div>
                  </div>
                  <div className="">
                    <button
                      className="rect security"
                      onClick={(e) => editButtonHandler(e, "password")}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
