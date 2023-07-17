import React, { useState } from "react";
import { Button, Card, Col, Container, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { updateUserSecurity } from "../../slice/userSlice";
import MessageBox from "../../components/MessageBox";

export default function UserUpdateSecurityPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userAuthState = useSelector((state) => state.userAuth);
  const { userInfo } = userAuthState;

  const userState = useSelector((state) => state.user);
  const { update, error, loading } = userState;

  const [newVal, setNewVal] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordValid, setPasswordValid] = useState(true);

  const { search } = useLocation();
  const fieldSearch = new URLSearchParams(search).get("field");
  const field = fieldSearch ? String(fieldSearch) : "";

  const type =
    field === "name" ? "text" : field === "mobile" ? "tel" : String(field);

  const updateHandler = (e) => {
    e.preventDefault();
    if (field === "password") {
      if (newVal !== confirmPassword) {
        setPasswordValid(false);
        return;
      }
    }
    dispatch(
      updateUserSecurity({
        field: field === "mobile" ? "phone" : field,
        value: newVal,
      })
    );
    navigate(`/user/security?field=${field}`);
  };

  return (
    <Container className="p-5">
      <Row>
        <Col xs={12}>
          {!passwordValid && (
            <MessageBox variants="danger">
              <span>Passwords do not match!</span>
            </MessageBox>
          )}
        </Col>
        <Col xs={12}>
          {error && <MessageBox variants="danger">{error}</MessageBox>}
        </Col>
        <h3 className="text-center">Change your {field}</h3>

        <Col className="d-flex justify-content-center">
          <Card className="security-card">
            <ListGroup variant="flush">
              <ListGroup.Item>
                <small>
                  If you want to change the {field} associated with your Amazon
                  customer account, you may do so below. Be sure to click the
                  Save Changes button when you are done.
                </small>
              </ListGroup.Item>
              <ListGroup.Item>
                <form action="update" onSubmit={(e) => updateHandler(e)}>
                  <div>
                    <strong>New {field}</strong>
                  </div>
                  <div className="mb-3">
                    {field === "name" ? (
                      <input
                        id={field}
                        type={type}
                        placeholder={`Enter new ${field}`}
                        title="Name must consist of 3~50 alphabet characters."
                        pattern="^(\w\w+)\s?(\w+)$"
                        required
                        value={newVal}
                        onChange={(e) => setNewVal(e.target.value)}
                      ></input>
                    ) : field === "password" ? (
                      <input
                        id={field}
                        type={type}
                        placeholder={`Enter new ${field}`}
                        title="Passwords must consist of at least 6 characters."
                        pattern=".{6,}"
                        required
                        value={newVal}
                        onChange={(e) => setNewVal(e.target.value)}
                      ></input>
                    ) : (
                      <input
                        id={field}
                        type={type}
                        placeholder={`Enter new ${field}`}
                        required
                        value={newVal}
                        onChange={(e) => setNewVal(e.target.value)}
                      ></input>
                    )}
                  </div>
                  {field === "password" && (
                    <div className="mb-3">
                      <input
                        id={field}
                        type={type}
                        placeholder="Confirm password"
                        title="Passwords must consist of at least 6 characters."
                        pattern=".{6,}"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      ></input>
                      <div>
                        <small className="dark-grey">
                          <i
                            className="fa fa-info-circle"
                            aria-hidden="true"
                          ></i>{" "}
                          Passwords must consist of at least 6 characters.
                        </small>
                      </div>
                    </div>
                  )}

                  <Button variant="warning" type="submit" value="submit">
                    Save changes
                  </Button>
                </form>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
