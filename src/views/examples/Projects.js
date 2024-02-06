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
import AddProjectModal from "./AddProjectModal";
import { useSelector, useDispatch } from "react-redux";
import { getProjectData, deleteProjectData, updateProjectData, deleteProjectTeamData, addProjecTeamData } from "../../Slices/ProjectSlices";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Select from 'react-select';
import { getTeamData } from "../../Slices/TeamSlice";
import { notify } from "../../alerts/Toastify";
import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

const Projects = () => {
  const { projects, isLoadingProject } = useSelector((state) => state.projectList);
  console.log("Projects List in Main", projects);
  const { teams } = useSelector((state) => state.teamsList);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [teamId, setTeamId] = useState("");
  const [projectInd, setProjectInd] = useState("");
  const [projectId, setProjectId] = useState(0);
  const [teamField, setTeamField] = useState(false);
  const [show, setShow] = useState(false);
  const [editShow, setEditShow] = useState(false);

  const [view, setView] = useState(false);
  const handleClose = () => setShow(false);
  const closeHandle = () => {
    setView(false);
    setTeamField(false);
  };
  const closeHandle2 = () => setEditShow(false);
  const dispatch = useDispatch();
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const teamOptions = teams.map((team) => ({
    value: team.id,
    label: team.name,
  }));

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      border: "1px solid #ced4da",
      borderRadius: "4px",
      width: "100%",
    }),
  };

  const deleteTeam = (projectId, teamId) => {
    setView(false);
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      onOpen: () => {
        // Set z-index of the Swal overlay to a high value
        document.querySelector('.swal2-popup.swal2-toast.swal2-shown').style.zIndex = 1060;
      },
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteProjectTeamData(projectId, teamId));
      }
    })
  };

  // console.log(users);
  const deleteProject = (index) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteProjectData(index));
      }
    })
  };

  const updateProject = (id, name,) => {
    console.log(name)
    if (name) {
      dispatch(updateProjectData(id, name));
      closeHandle2();
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleButtonClick = (item) => {

    setName(item.name);
    // setTeams(item.team);
    setProjectId(item.id);
    // setShow(true);
    setEditShow(true);
  };
  const handleTeamsClick = (prId, index) => {
    // console.log(teamsId, index)
    setView(true);
    setProjectInd(index);
    setProjectId(prId);
    // console.log("Clicked")
  }
  const teamMember = (IdTeam, projectId) => {
    navigate(`/admin/teams/${IdTeam}/teamDetails`)
  }

  // const saveTeam = (projectId, teamId) => {
  //   dispatch(addProjecTeamData(projectId, teamId))
  //   setTeamField(!teamField);
  // }

  const saveTeam = () => {
    if (selectedTeams.length === 0) {
      alert("Please select at least one team.");
      return;
    }

    const teamIds = selectedTeams.map((teamId) => parseInt(teamId, 10));
    dispatch(addProjecTeamData(projectId, teamIds))
      .then(() => {
        dispatch(getProjectData());
        setTeamField(!teamField);
        setSelectedTeams([]);
        notify("Teams added successfully");
      })
      .catch((error) => {
        console.error("Error adding teams or updating state:", error);
      });
  };

  useEffect(() => {
    dispatch(getProjectData());
    dispatch(getTeamData());
  }, []);

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = projects.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
                    <h3 className="mb-0">Projects</h3>
                  </Col>
                  <Col className="text-right" xs="4">
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={(e) => {
                        e.preventDefault()
                        setShow(true)
                      }}
                      size="sm"
                    >
                      Add New Project
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              <div style={{ height: '410px' }} >
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">ID</th>
                      <th scope="col">Name</th>
                      <th scope="col">Teams</th>
                      <th scope="col" />
                    </tr>
                  </thead>
                  <tbody>
                    {isLoadingProject ?
                      <tr>
                        <td colSpan="5" style={{ textAlign: "center" }}>
                          <p style={{ fontStyle: "italic", color: "#aaa" }}>
                            <FontAwesomeIcon icon={faSpinner} spin /> Loading... Please Wait
                          </p>
                        </td>
                      </tr>
                      : currentItems.map((item, index) => (
                        <tr key={index}>
                          <th>{item.id}</th>
                          <th>{item.name}</th>
                          <th><Button className="tableButton" onClick={() => handleTeamsClick(item.id, index)}>View Teams</Button></th>
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
                                  onClick={() => deleteProject(item.id)}
                                >
                                  Delete
                                </DropdownItem>
                                {/* <DropdownItem
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                              >
                                Something else here
                              </DropdownItem> */}
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
                  <Modal show={editShow} onHide={closeHandle2}>
                    <Form onSubmit={handleSubmit}>
                      <Modal.Header closeButton>
                        <Modal.Title>Edit Form</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Form.Group className="mb-3" controlId="Name">
                          <Form.Label>Name</Form.Label>
                          <Form.Control
                            type="text" required
                            placeholder="Enter Name"
                            defaultValue={name || ""}
                            onChange={(e) => setName(e.target.value)}
                          />
                        </Form.Group>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button
                          variant="danger"
                          type="submit"
                          style={{ margin: "20px" }}
                          onClick={() => updateProject(projectId, name)}
                        // onClick={handleClose}
                        >
                          Save Changes
                        </Button>
                        <Button variant="secondary" onClick={closeHandle2}>
                          Close
                        </Button>
                      </Modal.Footer>
                    </Form>
                  </Modal>

                  <Modal show={view} onHide={closeHandle}>
                    <Modal.Header closeButton>
                      <Modal.Title>View</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Table className="align-items-center table-flush" responsive>
                        <thead>
                          <tr>
                            <th>id</th>
                            <th>Name</th>
                            <th>Delete</th>
                            {/* <th>Team Details</th> */}
                          </tr>
                          {/* {console.log(teamId)} */}
                          {projects[projectInd]?.teams?.map((elem, index) => (
                            <tr key={index} >
                              <th>{elem.id}</th>
                              <th>{elem.name}</th>
                              <th><Button className="tableButton" onClick={() => deleteTeam(projectId, elem.id)}>Delete</Button></th>
                              {/* <th><Button className="tableButton" onClick={() => teamMember(elem.id, projectId)}>View Members</Button></th> */}
                            </tr>
                          ))}
                        </thead>
                      </Table>
                    </Modal.Body>
                    <Modal.Footer style={{ "display": "block" }}>
                      {teamField ? (
                        <>

                          <Form>
                            <Form.Group className="mb-3" controlId="teamDropdown">
                              <Form.Label>Teams</Form.Label>
                              <Select
                                styles={customStyles}
                                isMulti
                                value={selectedTeams.map((teamId) => teamOptions.find((team) => team.value === teamId))}
                                onChange={(selected) => setSelectedTeams(selected.map((team) => team.value))}
                                options={teamOptions.filter((team) => !projects[projectInd]?.teams?.some((elem) => elem.id === team.value))}
                              />
                            </Form.Group>
                            <div style={{ display: "flex", justifyContent: "center" }}>
                              <Button variant="danger" onClick={saveTeam}>
                                SAVE
                              </Button>
                            </div>
                          </Form>
                        </>
                      ) : (
                        <>
                          <div style={{ display: "flex", justifyContent: "center" }}>
                            <Button variant="danger" onClick={() => setTeamField(!teamField)}>
                              ADD TEAM
                            </Button>
                          </div>
                        </>)}
                    </Modal.Footer>
                  </Modal>
                </Table>
              </div>
              <CardFooter className="py-4">
                <nav aria-label="...">
                  <Pagination className="pagination justify-content-end mb-0" listClassName="justify-content-end mb-0">
                    <PaginationItem className={currentPage === 1 ? "disabled" : ""}>
                      <PaginationLink previous href="#" onClick={(e) => { e.preventDefault(); paginate(currentPage - 1) }} />
                    </PaginationItem>
                    {Array.from({ length: Math.ceil(projects.length / itemsPerPage) }, (_, i) => {
                      const isCurrent = i + 1 === currentPage;
                      const isLast = i + 1 === Math.ceil(projects.length / itemsPerPage);
                      const isFirst = i === 0;
                      return (
                        (isFirst || isLast || isCurrent) && (
                          <PaginationItem key={i} className={isCurrent ? "active" : ""}>
                            <PaginationLink href="#" onClick={() => paginate(i + 1)}>
                              {i + 1}
                            </PaginationLink>
                          </PaginationItem>
                        )
                      );
                    })}
                    <PaginationItem className={currentPage === Math.ceil(projects.length / itemsPerPage) ? "disabled" : ""}>
                      <PaginationLink next href="#" onClick={(e) => { e.preventDefault(); paginate(currentPage + 1) }} />
                    </PaginationItem>
                  </Pagination>
                </nav>
              </CardFooter>
            </Card>
          </div>
        </Row>
      </Container >
      <AddProjectModal
        show={show}
        handleClose={() => setShow(false)}
      />
    </>
  );
};

export default Projects;
