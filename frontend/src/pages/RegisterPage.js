import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router";

import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

import { Col, Container, Row } from "react-bootstrap";

import { register } from "../slice/userRegisterSlice";

export default function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { search } = useLocation();
  const redirectSearch = new URLSearchParams(search).get("redirect");
  const redirectUrl = redirectSearch ? redirectSearch : "/";

  const userState = useSelector((state) => state.userAuth);
  const { userInfo } = userState;

  const userRegisterState = useSelector((state) => state.userRegister);
  const { success, loading, error } = userRegisterState;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordValid, setPasswordValid] = useState(true);

  const registerHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPasswordValid(false);
    } else {
      dispatch(register({ name, email, password }));
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirectUrl);
    }
    if (success) {
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  }, [navigate, userInfo, success, redirectUrl]);

  return (
    <>
      {loading ? (
        <LoadingBox />
      ) : (
        <>
          {error && <MessageBox variants="danger">{error}</MessageBox>}
          {success && (
            <MessageBox variants="success">{success.message}</MessageBox>
          )}
          <Container className="py-5">
            <Row>
              <Col xs="12">
                <div className="img-logo mx-auto">
                  <Link to="/">
                    <img
                      src="/imgs/amazonian_brand_logo.png"
                      alt="amazonian_brand_logo"
                    />
                  </Link>
                </div>
              </Col>
              <Col xs="12" className="mb-4">
                <div className="crd crd-body register mx-auto">
                  <form className="form register" onSubmit={registerHandler}>
                    <div>
                      <h1>Create account</h1>
                    </div>
                    <div>
                      <label htmlFor="name">Your name</label>
                      <input
                        type="text"
                        id="name"
                        placeholder="Your name"
                        title="Name must consist of 3~50 alphabet characters."
                        pattern="[A-Za-z\s]{3,50}"
                        required
                        onChange={(e) => setName(e.target.value)}
                      ></input>
                      <small className="dark-grey">
                        <i className="fa fa-info-circle" aria-hidden="true"></i>
                        Name must consist of 3~50 alphabet characters.
                      </small>
                    </div>
                    <div>
                      <label htmlFor="email">E-mail address</label>
                      <input
                        type="email"
                        id="email"
                        placeholder="E-mail"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                      ></input>
                    </div>
                    <div>
                      <label htmlFor="password">Password</label>
                      <input
                        type="password"
                        id="password"
                        placeholder="password"
                        title="Passwords must consist of at least 6 characters."
                        pattern=".{6,}"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                      ></input>
                      <small className="dark-grey">
                        <i className="fa fa-info-circle" aria-hidden="true"></i>
                        Passwords must consist of at least 6 characters.
                      </small>
                    </div>
                    <div>
                      <label htmlFor="confirmPassword">Confirm Password</label>
                      <input
                        type="password"
                        id="confirmPassword"
                        placeholder="confirm password"
                        title="Passwords must consist of at least 6 characters."
                        pattern=".{6,}"
                        required
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      ></input>
                      {!passwordValid && (
                        <small className="text-danger">
                          <i
                            className="fa-solid fa-circle-exclamation"
                            aria-hidden="true"
                          ></i>
                          Passwords must consist of at least 6 characters.
                        </small>
                      )}
                    </div>
                    <div>
                      <label />
                      <button className="rect" type="submit">
                        Create your Amazonian account
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
                  <hr className="grad" />

                  <div>
                    <div className="content-center">
                      <small className="grey content-center">
                        Already have an account?{" "}
                        <Link to={`/signin?redirect=${redirectUrl}`}>
                          Sign in
                        </Link>{" "}
                      </small>
                    </div>
                  </div>
                </div>
              </Col>
              <hr className="grad" />
              <Col xs="12">
                <div className="d-flex justify-content-center gap-4">
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
