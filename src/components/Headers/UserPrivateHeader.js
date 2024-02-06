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
import { useSelector } from "react-redux";
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

const UserPrivateHeader = () => {

    const { projects, isLoadingProject } = useSelector((state) => state.projectList);
    const { teams, isLoadingTeam } = useSelector((state) => state.teamsList);
    const totalProjects = projects.length;
    const totalTeams = teams.length;

    return (
        <>
            <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
                <Container fluid>
                    <div className="header-body">
                        {/* Card stats */}
                        <Row>
                            {/* <Col lg="6" xl="3">
                                <Card className="card-stats mb-4 mb-xl-0">
                                    <CardBody>
                                        <Row>
                                            <div className="col">
                                                <CardTitle
                                                    tag="h5"
                                                    className="text-uppercase text-muted mb-0"
                                                >
                                                    Total Users
                                                </CardTitle>
                                                <span className="h2 font-weight-bold mb-0">
                                                    {totalUsers}
                                                </span>
                                            </div>
                                            <Col className="col-auto">
                                                <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                                                    <i className="fas fa-users" />
                                                </div>
                                            </Col>
                                        </Row>
                                        <p className="mt-3 mb-0 text-muted text-sm">
                                            <span className="text-nowrap">Check Users Section For Details</span>
                                        </p>
                                    </CardBody>
                                </Card>
                            </Col> */}
                            <Col lg="6" xl="3">
                                <Card className="card-stats mb-4 mb-xl-0">
                                    <CardBody>
                                        <Row>
                                            <div className="col">
                                                <CardTitle
                                                    tag="h5"
                                                    className="text-uppercase text-muted mb-0"
                                                >
                                                    Active Projects
                                                </CardTitle>
                                                <span className="h2 font-weight-bold mb-0">
                                                    {isLoadingProject ?
                                                        <p style={{ fontStyle: "italic", color: "#aaa" }}>
                                                            <FontAwesomeIcon icon={faSpinner} spin />
                                                        </p> : totalProjects}</span>
                                            </div>
                                            <Col className="col-auto">
                                                <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                                                    <i className="fas fa-chart-bar" />
                                                </div>
                                            </Col>
                                        </Row>
                                        <p className="mt-3 mb-0 text-muted text-sm">
                                            {/* <span className="text-danger mr-2">
                        <i className="fas fa-arrow-down" /> 3.48%
                      </span>{" "} */}
                                            <span className="text-nowrap">Check Projects Section For Details</span>
                                        </p>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col lg="6" xl="3">
                                <Card className="card-stats mb-4 mb-xl-0">
                                    <CardBody>
                                        <Row>
                                            <div className="col">
                                                <CardTitle
                                                    tag="h5"
                                                    className="text-uppercase text-muted mb-0"
                                                >
                                                    My Teams
                                                </CardTitle>
                                                <span className="h2 font-weight-bold mb-0">
                                                    {isLoadingTeam ?
                                                        <p style={{ fontStyle: "italic", color: "#aaa" }}>
                                                            <FontAwesomeIcon icon={faSpinner} spin />
                                                        </p> : totalTeams}</span>
                                            </div>
                                            <Col className="col-auto">
                                                <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                                                    <i className="fas fa-users" />
                                                </div>
                                            </Col>
                                        </Row>
                                        <p className="mt-3 mb-0 text-muted text-sm">
                                            {/* <span className="text-warning mr-2">
                        <i className="fas fa-arrow-down" /> 1.10%
                      </span>{" "} */}
                                            <span className="text-nowrap">Check Teams Section For Details</span>
                                        </p>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col lg="6" xl="3">
                                <Card className="card-stats mb-4 mb-xl-0">
                                    <CardBody>
                                        <Row>
                                            <div className="col">
                                                <CardTitle
                                                    tag="h5"
                                                    className="text-uppercase text-muted mb-0"
                                                >
                                                    To Check
                                                </CardTitle>
                                                <span className="h2 font-weight-bold mb-0">My GitHub</span>
                                            </div>
                                            <Col className="col-auto">
                                                <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                                                    <a href="https://github.com/rishiraghuvanshi08" target="_blank"><i className="fas fa-link" /></a>
                                                </div>
                                            </Col>
                                        </Row>
                                        <p className="mt-3 mb-0 text-muted text-sm">

                                            <span className="text-nowrap">Click On The Link Icon!</span>
                                        </p>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                </Container>
            </div>
        </>
    );
};

export default UserPrivateHeader;
