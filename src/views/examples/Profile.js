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
  Input,
  Container,
  FormGroup,
  Row,
  Col,
  Table,
} from "reactstrap";
// core components
import { passwordChange } from "../../Slices/PasswordChangeSlice";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { notify } from "../../alerts/Toastify";
import { updateUserIdData } from "../../Slices/UserSlices";
import { getUsersData } from "../../Slices/UserSlices";
import { getProjectData } from "../../Slices/ProjectSlices";
import { getTeamData } from "../../Slices/TeamSlice";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import Header from "../../components/Headers/Header";

const Profile = () => {
  const { users, error } = useSelector((state) => state.userList);
  const { projects } = useSelector((state) => state.projectList);
  const { teams } = useSelector((state) => state.teamsList);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [designation, setdesignation] = useState("");
  const [uid, setUId] = useState(0);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const dispatch = useDispatch();
  const totalProjects = projects.length;
  const totalTeams = teams.length;
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
    passwordChangeError: "",
    showPassword: false,
  });
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [oldPasswordError, setOldPasswordError] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("")
  const [newPasswordMatchMessage, setNewPasswordMatchMessage] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const handlePasswordModalClose = () => {
    setPasswordData({
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
      passwordChangeError: "",
      showPassword: false,
    });
    setShowPasswordModal(false);
  };
  const toggleShowPassword = () => {
    setPasswordData({ ...passwordData, showPassword: !passwordData.showPassword });
  };
  const handlePasswordChange = () => {
    const { oldPassword, newPassword, confirmPassword } = passwordData;
    setOldPasswordError("");
    setNewPasswordError("");
    setConfirmPasswordError("");
    setNewPasswordMatchMessage("");
    let hasError = false;
    if (!oldPassword) {
      setOldPasswordError("Please input your old password.");
      hasError = true;
    }
    if (!newPassword) {
      setNewPasswordError("Please input your new password.");
      hasError = true;
    }
    if (!confirmPassword) {
      setConfirmPasswordError("Please input your confirm password.");
      hasError = true;
    }
    else if (newPassword.length < 8) {
      setNewPasswordError("Password must be at least 8 characters.");
      hasError = true;
    }
    else if (newPassword !== confirmPassword) {
      setConfirmPasswordError("Passwords should match.");
      hasError = true;
    }
    if (!hasError) {
      dispatch(passwordChange(passwordData))
        .then((data) => {
          if (data.message == 'Cannot be same as old Password') {
            setNewPasswordMatchMessage("Cannot be same as old Password");
            hasError = true;
          }
          else {
            setPasswordData({
              oldPassword: "",
              newPassword: "",
              confirmPassword: "",
              passwordChangeError: "",
              showPassword: false,
            });
            setShowPasswordModal(false)
            notify(data.message);
          }
        })
    }
  };
  const handlePasswordModalShow = () => {
    setShowPasswordModal(true);
  };
  const data = localStorage.getItem('data');
  const parsedData = data ? JSON.parse(data) : null;
  let userEmail = '';
  if (parsedData && parsedData.email) {
    const email = parsedData.email;
    userEmail = email;
  }

  function validateEmail(email) {
    const emailPattern = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    return emailPattern.test(email);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setNameError("");
    setEmailError("");
    let hasError = false;

    if (!name) {
      setNameError("Please enter a name.");
      hasError = true;
    }

    if (!email || !validateEmail(email)) {
      setEmailError("Please enter a valid email.");
      hasError = true;
    }

    if (nameError || emailError) {
      hasError = true;
    }

    if (!hasError) {
      dispatch(updateUserIdData(uid, name, email, designation))
        .then(() => {
          setName("");
          setEmail("");
        })
        .catch((error) => {
          console.error("API call error:", error);
        });
      handleClose();
    }
  };


  const handleButtonClick = (item) => {
    setName(item.name);
    setEmail(item.email);
    setUId(item.id);
    setdesignation(item.designation);
    setShow(true);
  };

  useEffect(() => {
    dispatch(getUsersData());
    dispatch(getProjectData());
    dispatch(getTeamData());
  }, []);

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--5" fluid>
        <Row>
          <Col className="order-xl-2 mb-5 mb-xl-0" xl="">
            <Card className="card-profile shadow">
              <Row className="justify-content-center">
                <Col className="order-lg-2" lg="3">
                  <div className="card-profile-image">
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      <img
                        alt="..."
                        className="rounded-circle"
                        src={require("../../assets/img/theme/team-1-800x800.jpg")}
                      />
                    </a>
                  </div>
                </Col>
              </Row>
              <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">

              </CardHeader>
              <CardBody className="pt-0 pt-md-4">
                <Row>
                  <div className="col">
                    <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                      <div className="d-flex justify-content-between">
                        <Button
                          className="mr-4"
                          color="info"
                          href="#pablo"
                          onClick={handlePasswordModalShow}
                          size="sm"
                        >
                          Change Password
                        </Button>
                        <Button
                          className="float-right"
                          color="default"
                          href="#pablo"
                          onClick={() => handleButtonClick(users.find(user => user.email === userEmail))}
                          size="sm"
                        >
                          Edit Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </Row>
                <div className="text-center">
                  <h1>
                    {users
                      .filter(user => user.email === userEmail)
                      .map(user => user.name)
                      .join(", ")
                    }
                  </h1>
                  <div className="h3 font-weight-500">
                    {users
                      .filter(user => user.email === userEmail)
                      .map(user => user.email)
                      .join(", ")
                    }
                  </div>
                  <div className="h2 mt-2">
                    {users
                      .filter(user => user.email === userEmail)
                      .map(user => user.designation)
                      .join(", ")
                    }
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
          {/* <Col className="order-xl-1" xl="8">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Page visits</h3>
                  </div>
                  <div className="col text-right">
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      size="sm"
                    >
                      See all
                    </Button>
                  </div>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Page name</th>
                    <th scope="col">Visitors</th>
                    <th scope="col">Unique users</th>
                    <th scope="col">Bounce rate</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">/argon/</th>
                    <td>4,569</td>
                    <td>340</td>
                    <td>
                      <i className="fas fa-arrow-up text-success mr-3" /> 46,53%
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">/argon/index.html</th>
                    <td>3,985</td>
                    <td>319</td>
                    <td>
                      <i className="fas fa-arrow-down text-warning mr-3" />{" "}
                      46,53%
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">/argon/charts.html</th>
                    <td>3,513</td>
                    <td>294</td>
                    <td>
                      <i className="fas fa-arrow-down text-warning mr-3" />{" "}
                      36,49%
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">/argon/tables.html</th>
                    <td>2,050</td>
                    <td>147</td>
                    <td>
                      <i className="fas fa-arrow-up text-success mr-3" /> 50,87%
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">/argon/profile.html</th>
                    <td>1,795</td>
                    <td>190</td>
                    <td>
                      <i className="fas fa-arrow-down text-danger mr-3" />{" "}
                      46,53%
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Card>
          </Col> */}
        </Row>
      </Container>
      <Modal show={showPasswordModal} onHide={handlePasswordModalClose}>
        <Form>
          <Modal.Header closeButton>
            <Modal.Title>Change Password</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormGroup className="mb-3" controlId="oldPassword">
              <Form.Label>Old Password</Form.Label>
              <div className="input-group">
                <Form.Control
                  type={showOldPassword ? 'text' : 'password'}
                  placeholder="Enter Old Password"
                  value={passwordData.oldPassword}
                  onChange={(e) => {
                    setOldPasswordError("");
                    setPasswordData({ ...passwordData, oldPassword: e.target.value })
                  }
                  }
                />
                <Button
                  variant="outline-secondary"
                  onClick={() => setShowOldPassword(!showOldPassword)}
                  style={{ border: "1px solid #cad1d7", borderTopLeftRadius: '0px', borderBottomLeftRadius: '0px' }}
                >
                  <FontAwesomeIcon icon={showOldPassword ? faEye : faEyeSlash} />
                </Button>
              </div>
              <p className="text-danger">{oldPasswordError}</p>
            </FormGroup>
            <FormGroup className="mb-3" controlId="newPassword">
              <Form.Label>New Password</Form.Label>
              <div className="input-group">
                <Form.Control
                  type={showNewPassword ? 'text' : 'password'}
                  placeholder="Enter New Password"
                  value={passwordData.newPassword}
                  onChange={(e) => {
                    setNewPasswordError("");
                    setPasswordData({ ...passwordData, newPassword: e.target.value })
                  }
                  }
                />
                <Button
                  variant="outline-secondary"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  style={{ border: "1px solid #cad1d7", borderTopLeftRadius: '0px', borderBottomLeftRadius: '0px' }}
                >
                  <FontAwesomeIcon icon={showNewPassword ? faEye : faEyeSlash} />
                </Button>
              </div>
              <p className="text-danger">{newPasswordError}</p>
              <p className="text-danger">{newPasswordMatchMessage}</p>
            </FormGroup>
            <FormGroup className="mb-3" controlId="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <div className="input-group">
                <Form.Control
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm New Password"
                  value={passwordData.confirmPassword}
                  onChange={(e) => {
                    setConfirmPasswordError("");
                    setPasswordData({ ...passwordData, confirmPassword: e.target.value })
                  }
                  }
                />
                <Button
                  variant="outline-secondary"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={{ border: "1px solid #cad1d7", borderTopLeftRadius: '0px', borderBottomLeftRadius: '0px' }}
                >
                  <FontAwesomeIcon icon={showConfirmPassword ? faEye : faEyeSlash} />
                </Button>
              </div>
              <p className="text-danger">{confirmPasswordError}</p>
            </FormGroup>
            <p className="text-danger">{passwordData.passwordChangeError}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handlePasswordChange}>
              Confirm
            </Button>
            <Button variant="secondary" onClick={handlePasswordModalClose}>
              Close
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
      <Modal show={show} onHide={handleClose}>
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Form</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="Name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => {
                  setNameError("");
                  setName(e.target.value)
                }
                }
              />
              {nameError && <p className="text-danger">{nameError}</p>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="text-center">Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => {
                  setEmailError("");
                  setEmail(e.target.value)
                }}
                disabled
              />
              {emailError && <p className="text-danger">{emailError}</p>}
            </Form.Group>

            <Form.Group
              controlId="dob"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <Form.Label>Designation</Form.Label>
              <Form.Control
                type="test"
                defaultValue={designation}
                placeholder="Update designation"
                disabled="true"
                onChange={(e) => setdesignation(e.target.value)}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="primary"
              type="submit"
            >
              Save Changes
            </Button>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default Profile;
