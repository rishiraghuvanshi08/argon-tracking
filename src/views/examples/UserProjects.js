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
import { useEffect, useState } from "react";
import { getUsersDataId } from "../../Slices/LoginUserSlice";
import { getUserProjectsData } from "../../Slices/ProjectSlices";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

const UserProjects = () => {

    const { projects, isLoadingProject } = useSelector((state) => state.projectList);
    const dispatch = useDispatch();

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const data = localStorage.getItem('data');
    const parsedData = data ? JSON.parse(data) : null;
    let userEmail = '';

    if (parsedData && parsedData.email) {
        const email = parsedData.email;
        userEmail = email;
    }

    useEffect(() => {
        dispatch(getUsersDataId(userEmail))
            .then((userId) => {
                dispatch(getUserProjectsData(userId));
            });
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
                                </Row>
                            </CardHeader>
                            <Table className="align-items-center table-flush" responsive>
                                <thead className="thead-light">
                                    <tr>
                                        <th scope="col">ID</th>
                                        <th scope="col">Name</th>
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
                                            </tr>
                                        ))}
                                    <tr>
                                        <td></td>
                                        <td></td>
                                    </tr>

                                </tbody>
                            </Table>
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
        </>
    );
};

export default UserProjects;
