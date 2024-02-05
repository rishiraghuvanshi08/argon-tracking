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
  Badge,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  UncontrolledTooltip,
  Col,
} from "reactstrap";
// core components
import UserHeader from "../../components/Headers/UserHeader";
import { useSelector, useDispatch } from "react-redux";
import { getTeamData, updateTeamData, addTeamData } from "../../Slices/TeamSlice";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Select from 'react-select';
// import { notify } from "alerts/Toastify";
import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import { getUsersData } from "../../Slices/UserSlices";
import TeamMemberModal from "./TeamMemberModal";

const Teams = () => {

  const { teams, isTeamsLoading, teamsError } = useSelector((state) => state.teamsList);
  const { teamMember } = useSelector((state) => state.teaMemberList);
  console.log(teams);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [teamId, setTeamId] = useState("");
  const [show, setShow] = useState(false);
  const [addShow, setAddShow] = useState(false);
  const [view, setView] = useState(false);
  const [memberShow, setMemberShow] = useState(false);
  const [userIds, setUserIds] = useState([""]);
  const [numUserIds, setNumUserIds] = useState(1);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const { users, isLoading, error } = useSelector((state) => ({
    users: Array.isArray(state.userList.users) ? state.userList.users : [],
    isLoading: state.userList.isLoading,
    error: state.userList.error,
  }));
  const [teamObject, setTeamObject] = useState("");
  const [addMemberCheck, setAddMemberCheck] = useState(false);

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      border: "1px solid #ced4da",
      borderRadius: "4px",
      width: "100%",
    }),
  };

  const userOptions = users != undefined && users.map((user) => ({
    value: user.id,
    label: user.name,
  }));

  const handleClose = () => {
    setShow(false);
    setAddShow(false);
    setMemberShow(false);
    setAddMemberCheck(false);
    setUserIds([""]);
  };
  const dispatch = useDispatch();

  const updateTeam = (name) => {
    console.log("update team details ", name, teamId);
    const teamNameExists = teams.some((team) => team.name === name);
    if (teamNameExists) {
      notify("Team with the same name already exists");
    }
    else if (name) {
      dispatch(updateTeamData(teamId, name));
      handleClose();
    }
  };

  const notify = (msg) => {
    toast(msg);
  };

  const addTeam = (name) => {
    if (!selectedUsers || selectedUsers.length === 0) {
      notify("At least one team member should be selected");
      return;
    }

    const teamNameExists = teams.some((team) => team.name === name);
    if (teamNameExists) {
      notify("Team with the same name already exists");
      return;
    }

    if (name) {
      const teamData = {
        id: "",
        name: name,
        teamMembers: selectedUsers.map((userId) => ({ user: { id: userId } })),
      };
      dispatch(addTeamData(teamData));
      handleClose();
    }
  };

  const addUserIdField = () => {
    setUserIds([...userIds, ""]);
    setNumUserIds(numUserIds + 1);
  };

  const removeUserIdField = () => {
    if (numUserIds > 1) {
      setUserIds(userIds.slice(0, numUserIds - 1));
      setNumUserIds(numUserIds - 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleButtonClick = (item) => {
    setName(item.name);
    setTeamId(item.id);
    setShow(true);
  };

  const handleAddButtonClick = (item) => {
    setAddShow(true);
  };

  const teamMember1 = (team) => {
    // navigate(`/admin/teams/${IdTeam}/teamDetails`)
    setTeamObject(team);
    setMemberShow(true);
  };

  useEffect(() => {
    dispatch(getTeamData());
    dispatch(getUsersData());
  }, [dispatch]);

  // if (isTeamsLoading) {
  //   return <div>Loading...</div>;
  // }

  // if (teamsError) {
  //   return <div>Error: {teamsError.message}</div>;
  // }

  return (
    <>
      <UserHeader />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Teams</h3>
                  </Col>
                  <Col className="text-right" xs="4">
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={(e) => {
                        e.preventDefault()
                        handleAddButtonClick();
                      }}
                      size="sm"
                    >
                      Add New Team
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">View Members</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {teams !== undefined &&
                    teams.map((item, index) => (
                      <tr key={index}>
                        <th>{item.id}</th>
                        <th>{item.name}</th>
                        <th><Button className="tableButton" onClick={() => teamMember1(item)}>View Members</Button></th>
                        <th className="text-right">
                          <UncontrolledDropdown>
                            <DropdownToggle
                              className="btn-icon-only text-light"
                              href="#pablo"
                              role="button"
                              size="sm"
                              color=""
                              onClick={(e) => e.preventDefault()}
                            >
                              <i className="fas fa-ellipsis-v" />
                            </DropdownToggle>
                            <DropdownMenu className="dropdown-menu-arrow" right>
                              <DropdownItem
                                href="#pablo"
                                onClick={() => handleButtonClick(item)}
                              >
                                Edit
                              </DropdownItem>
                              <DropdownItem
                                href="#pablo"
                                disabled
                              >
                                Delete
                              </DropdownItem>
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </th>
                      </tr>
                    ))}
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>

                </tbody>
              </Table>
              <CardFooter className="py-4">
                <nav aria-label="...">
                  <Pagination
                    className="pagination justify-content-end mb-0"
                    listClassName="justify-content-end mb-0"
                  >
                    <PaginationItem className="disabled">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        tabIndex="-1"
                      >
                        <i className="fas fa-angle-left" />
                        <span className="sr-only">Previous</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className="active">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        2 <span className="sr-only">(current)</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        3
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className="fas fa-angle-right" />
                        <span className="sr-only">Next</span>
                      </PaginationLink>
                    </PaginationItem>
                  </Pagination>
                </nav>
              </CardFooter>
            </Card>
          </div>
        </Row>
      </Container >
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
                defaultValue={name || ""}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="danger"
              type="submit"
              style={{ margin: "20px" }}
              onClick={() => updateTeam(name)}
            >
              Save Changes
            </Button>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
      <Modal show={addShow} onHide={handleClose}>
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Add Team</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="Name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter New Team Name"
                defaultValue={""}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="userDropdown">
              <Form.Label>Users</Form.Label>
              <Select
                styles={customStyles}
                isMulti
                value={selectedUsers.map((userId) => userOptions.find((user) => user.value === userId))}
                onChange={(selected) => setSelectedUsers(selected.map((user) => user.value))}
                options={userOptions}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="danger"
              type="submit"
              style={{ margin: "20px" }}
              onClick={() => addTeam(name)}
            >
              Save Changes
            </Button>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
      <TeamMemberModal
        memberShow={memberShow}
        handleClose={handleClose}
        teamObject={teamObject}
        addMemberCheck={addMemberCheck} 
        setAddMemberCheck={setAddMemberCheck}
        teams={teams}
      />
    </>
  );
};

export default Teams;
