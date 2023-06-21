import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router";
import { signin } from "../slice/userSlice";

import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

import { Col, Container, Row } from "react-bootstrap";

export default function SigninPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { search } = useLocation();
  const redirectSearch = new URLSearchParams(search).get("redirect");
  const redirectUrl = redirectSearch ? redirectSearch : "/";

  const userState = useSelector((state) => state.user);
  const { userInfo, loading, error } = userState;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signinHandler = (e) => {
    e.preventDefault();
    dispatch(signin({ email, password }));
    if (userInfo && !error) navigate("/");
  };

  const registerHandler = () => {
    navigate(`/register?redirect=${redirectUrl}`);
  };

  return (
    <>
      {loading ? (
        <LoadingBox />
      ) : (
        <>
          {error && <MessageBox variants="danger">{error}</MessageBox>}
          <Container className="vh-100 pt-5">
            <Row>
              <Col xs="12">
                <Link to="/">
                  <div className="img-logo mx-auto">
                    <img
                      src="/imgs/amazonian_brand_logo.png"
                      alt="amazonian_brand_logo"
                    />
                  </div>
                </Link>
              </Col>
              <Col xs="12">
                <div className="crd crd-body signin mx-auto">
                  <form className="form" onSubmit={signinHandler}>
                    <div>
                      <h1>Sign-In</h1>
                    </div>
                    <div>
                      <label htmlFor="email">
                        <small>E-mail address or mobile phone number</small>
                      </label>
                      <input
                        type="email"
                        id="email"
                        placeholder="E-mail or Mobile phone number"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                      ></input>
                    </div>
                    <div>
                      <label htmlFor="password">
                        <small>Password </small>
                      </label>
                      <input
                        type="password"
                        id="password"
                        placeholder="password"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                      ></input>
                    </div>
                    <div>
                      <button className="rect sign-in yellow" type="submit">
                        Sign In
                      </button>
                    </div>
                  </form>
                  <div>
                    <small>
                      By continuing, you agree to Amazonian's{" "}
                      <Link to="https://www.amazon.com/gp/help/customer/display.html?nodeId=508088">
                        Conditions of Use
                      </Link>{" "}
                      and{" "}
                      <Link to="https://www.amazon.com/gp/help/customer/display.html?nodeId=468496">
                        Privacy Notice.
                      </Link>{" "}
                    </small>
                  </div>
                  <div className="text-center">
                    <small className="grey content-center">
                      New to Amazonian?
                    </small>
                    <button
                      className="rect create-account"
                      onClick={registerHandler}
                    >
                      Create your Amazonian account
                    </button>
                  </div>
                </div>
              </Col>
              <hr />
              <Col xs="12">
                <div className="text-center">
                  <small>
                    <Link to="https://www.amazon.com/gp/help/customer/display.html?nodeId=508088">
                      Conditions of Use
                    </Link>
                  </small>
                  <small>
                    <Link to="https://www.amazon.com/gp/help/customer/display.html?nodeId=468496">
                      Privacy Notice
                    </Link>
                  </small>
                  <small>
                    <Link to="https://www.amazon.com/gp/help/customer/display.html">
                      Help
                    </Link>
                  </small>
                </div>
              </Col>
              <Col xs="12">
                <div className="text-center">
                  <small className="grey">
                    © 1996-2023, Amazonian, Inc. or its affiliates
                  </small>
                </div>
              </Col>
            </Row>
          </Container>
        </>
      )}
    </>
  );
}
