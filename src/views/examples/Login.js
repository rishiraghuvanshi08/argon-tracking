/*!

=========================================================
* Argon Dashboard React - v1.2.4
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2024 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DoLogin } from "../../Authentication/index";
import { useDispatch } from "react-redux";
import { getLoginStatus } from "../../Slices/loginSlice";
import { jwtDecode } from 'jwt-decode';
import { sendOtp } from "../../Slices/otpSlice";
import { toast } from 'react-toastify';
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";

const Login = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginDetails, setLoginDetails] = useState({
    email: '',
    password: '',
    showPassword: false,
  })
  const [showOldPassword, setShowOldPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setLoginDetails({
      ...loginDetails,
      showPassword: !loginDetails.showPassword,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  };
  const notify2 = () => {
    toast.success("Login Success");
  }
  const notify = (msg) => toast(msg);
  const handleChange = (e, field) => {
    let actualValue = e.target.value;
    setLoginDetails({
      ...loginDetails,
      [field]: actualValue
    })
  }
  const [emailDetails, setemailDetails] = useState({
    email: '',
  });
  const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] = useState(false);
  const [backendMessage, setBackendMessage] = useState('');
  const [isEmailEmpty, setIsEmailEmpty] = useState(false);
  //for forgot password
  const openForgotPasswordModal = () => {
    setemailDetails({
      email: ' ',
    });
    setIsForgotPasswordModalOpen(true);
  };
  const handleemailDetailsChange = (e, field) => {
    setIsEmailEmpty(false);
    const actualValue = e.target.value;
    setemailDetails({
      ...emailDetails,
      [field]: actualValue,
    });
  };
  const loginForm = () => {
    dispatch(getLoginStatus(loginDetails))
      .then((data) => {
        if (data != undefined) {
          DoLogin(data, () => {
            // console.log("Login details is saved to localStorage", data);
          });
          notify2();
          const data2 = localStorage.getItem('data');
          const parsedData = JSON.parse(data2);
          const decodedToken = jwtDecode(parsedData.jwtToken);
          const role = decodedToken.role;
          if (role == "ROLE_ADMIN") {
            navigate("/admin/dashboard");
          }
          else {
            navigate("/user/dashboard");
          }
        }
        else {
          toast.error("Login failed! Invalid Credentials.");
        }
      });
  }
  const closeForgotPasswordModal = () => {
    setIsForgotPasswordModalOpen(false);
  };
  function validateEmail(email) {
    const emailPattern = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    return emailPattern.test(email);
  }
  const handleFormSubmitForEmail = (e) => {
    e.preventDefault();
    if (emailDetails.email.trim() === '') {
      setIsEmailEmpty(true);
      return;
    }
    if (!validateEmail(emailDetails.email)) {
      notify('Invalid email format');
    }
    else {
      dispatch(sendOtp(emailDetails))
        .then((data) => {
          handleBackendMessage(data.message);
          setIsForgotPasswordModalOpen(false);
          notify(data.message);
        })
    }
  };
  const handleBackendMessage = (message) => {
    setBackendMessage(message);
  };

  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small>Sign In With Credentials</small>
            </div>
            <Form onSubmit={handleSubmit}>
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Email"
                    type="email"
                    autoComplete="new-email"
                    value={loginDetails.email}
                    onChange={(e) => handleChange(e, 'email')}
                    required
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Password"
                    type={showOldPassword ? 'text' : 'password'}
                    value={loginDetails.password}
                    onChange={(e) => handleChange(e, 'password')}
                    autoComplete="new-password"
                    required
                  />
                  <Button
                    variant="outline-secondary"
                    style={{ borderTopLeftRadius: '0px', borderBottomLeftRadius: '0px' }}
                    onClick={() => setShowOldPassword(!showOldPassword)}
                  >
                    <FontAwesomeIcon icon={showOldPassword ? faEye : faEyeSlash} />
                  </Button>
                </InputGroup>
              </FormGroup>
              <div className="text-center">
                <Button className="my-4" color="primary" type="button" onClick={loginForm}>
                  Sign in
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
        <Row className="mt-3">
          <Col xs="6">
            <a
              className="text-light"
              href="#pablo"
              onClick={(e) => {
                e.preventDefault();
                openForgotPasswordModal();
              }}
            >
              <small>Forgot password?</small>
            </a>
          </Col>
        </Row>
      </Col>
      <Modal show={isForgotPasswordModalOpen} onHide={closeForgotPasswordModal}>
        <Form>
          <Modal.Header closeButton>
            <Modal.Title>Forgot Password</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label className="text-center">Enter Email</Form.Label>
              <Form.Control
                required
                type="email"
                id="email"
                placeholder="Enter Your Email"
                value={emailDetails.email}
                onChange={(e) => handleemailDetailsChange(e, 'email')}
                aria-required="true"
              />
              {isEmailEmpty && <p style={{ color: 'red' }}>Please input your email!</p>}
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeForgotPasswordModal}>
              Close
            </Button>
            <Button variant="danger" onClick={handleFormSubmitForEmail}>
              Submit
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default Login;
