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
import React, { useEffect, useState } from "react";

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
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { deleteUserData } from "../../Slices/UserSlices";
import { getUsersData } from "../../Slices/UserSlices";
import { updateUserData } from "../../Slices/UserSlices";
import AddUserModal from "./AddUserModal";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

const Users = () => {

    const { users, isLoading, error } = useSelector((state) => state.userList);
    console.log("users", users);
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [designation, setDesignation] = useState("");
    const [id, setId] = useState(0);
    const [show, setShow] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [emptyFieldErrors, setEmptyFieldErrors] = useState({
        name: false,
        email: false,
        designation: false,
    });
    const [emailFormatError, setEmailFormatError] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const handleClose = () => {
        setShow(false);
        setEmptyFieldErrors({
            name: false,
            email: false,
            designation: false,
        });
        setEmailFormatError(false);
        setShowEdit(false);
    };
    const dispatch = useDispatch();
    const deleteUser = (index) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085D6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteUserData(index));
            }
        });
    };
    function validateEmail(email) {
        const emailPattern = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
        return emailPattern.test(email);
    }
    const updateUser = () => {
        const newEmptyFieldErrors = {};
        if (!name) {
            newEmptyFieldErrors.name = true;
        }
        if (!email) {
            newEmptyFieldErrors.email = true;
        }
        if (!designation) {
            newEmptyFieldErrors.designation = true;
        }
        setEmptyFieldErrors(newEmptyFieldErrors);
        if (!email) {
            setEmailFormatError(false); // Email not required, so clear the error
        } else if (validateEmail(email)) {
            setEmailFormatError(false);
        } else {
            setEmailFormatError(true);
        }
        if (
            !Object.values(newEmptyFieldErrors).some((value) => value) &&
            !emailFormatError
        ) {
            setEmptyFieldErrors({
                name: false,
                email: false,
                designation: false,
            });
            dispatch(updateUserData(id, name, email, designation));
            handleClose();
        }
    };
    const handleNameChange = (value) => {
        setName(value);
        if (value) {
            setEmptyFieldErrors((prevErrors) => ({
                ...prevErrors,
                name: false,
            }));
        }
    };
    const handleDesignationChange = (value) => {
        setDesignation(value);
        if (value) {
            setEmptyFieldErrors((prevErrors) => ({
                ...prevErrors,
                designation: false,
            }));
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();
    };
    const handleButtonClick = (item) => {
        setName(item.name);
        setEmail(item.email);
        setId(item.id);
        setDesignation(item.designation);
        setShowEdit(true);
    };
    const handleEmailChange = (value) => {
        setEmail(value);
        if (value) {
            setEmptyFieldErrors((prevErrors) => ({
                ...prevErrors,
                email: false,
            }));
            if (validateEmail(value)) {
                setEmailFormatError(false);
            } else {
                setEmailFormatError(true); // Set emailFormatError to true if the email format is invalid
            }
        } else {
            setEmailFormatError(false); // Clear the error if the email field is empty
        }
    };
    useEffect(() => {
        dispatch(getUsersData());
    }, [dispatch]);

    // Pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);

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
                                        <h3 className="mb-0">Users</h3>
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
                                            Add New User
                                        </Button>
                                    </Col>
                                </Row>
                            </CardHeader>
                            <div style={{ height: '375px' }} >
                                <Table className="align-items-center table-flush" responsive >
                                    <thead className="thead-light">
                                        <tr>
                                            <th scope="col">ID</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Email</th>
                                            <th scope="col">Designation</th>
                                            {/* <th scope="col">Hierarchy</th> */}
                                            <th scope="col" />
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {isLoading ?
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
                                                    <th>{item.email}</th>
                                                    <th>{item.designation}</th>
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
                                                                {item.id === 1 ? (
                                                                    <DropdownItem
                                                                        disabled={true}
                                                                        href="#pablo"
                                                                        onClick={() => handleButtonClick(item)}
                                                                    >
                                                                        Edit
                                                                    </DropdownItem>
                                                                ) : (
                                                                    <DropdownItem
                                                                        href="#pablo"
                                                                        onClick={() => handleButtonClick(item)}
                                                                    >
                                                                        Edit
                                                                    </DropdownItem>
                                                                )}
                                                                <DropdownItem
                                                                    href="#pablo"
                                                                    onClick={() => deleteUser(item.id)}
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
                                            <td className="text-right"></td>
                                        </tr>

                                    </tbody>
                                </Table>
                            </div>
                            <CardFooter className="py-4">
                                <nav aria-label="...">
                                    <Pagination className="pagination justify-content-end mb-0" listClassName="justify-content-end mb-0">
                                        <PaginationItem className={currentPage === 1 ? "disabled" : ""}>
                                            <PaginationLink previous href="#" onClick={(e) => { e.preventDefault(); paginate(currentPage - 1) }} />
                                        </PaginationItem>
                                        {Array.from({ length: Math.ceil(users.length / itemsPerPage) }, (_, i) => {
                                            const isCurrent = i + 1 === currentPage;
                                            const isLast = i + 1 === Math.ceil(users.length / itemsPerPage);
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
                                        <PaginationItem className={currentPage === Math.ceil(users.length / itemsPerPage) ? "disabled" : ""}>
                                            <PaginationLink next href="#" onClick={(e) => { e.preventDefault(); paginate(currentPage + 1) }} />
                                        </PaginationItem>
                                    </Pagination>
                                </nav>
                            </CardFooter>
                        </Card>
                    </div>
                </Row>
            </Container>
            <AddUserModal
                show={show}
                handleClose={handleClose}
            />
            <Modal show={showEdit} onHide={handleClose}>
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
                                onChange={(e) => handleNameChange(e.target.value)}
                            />
                            {emptyFieldErrors.name && (
                                <p style={{ color: "red" }}>Name is required</p>
                            )}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label className="text-center">Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => handleEmailChange(e.target.value)}
                            />
                            {emptyFieldErrors.email && (
                                <p style={{ color: "red" }}>Email is required</p>
                            )}
                            {emailFormatError && (
                                <p style={{ color: "red" }}>Invalid email format</p>
                            )}
                        </Form.Group>
                        <Form.Group
                            controlId="dob"
                            style={{ display: "flex", flexDirection: "column" }}
                        >
                            <Form.Label>Designation</Form.Label>
                            <Form.Control
                                type="text"
                                value={designation}
                                placeholder="Update designation"
                                onChange={(e) => handleDesignationChange(e.target.value)}
                            />
                            {emptyFieldErrors.designation && (
                                <p style={{ color: "red" }}>Designation is required</p>
                            )}
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="danger"
                            type="button"
                            // style={{ margin: "20px" }}
                            onClick={updateUser}
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

export default Users;
