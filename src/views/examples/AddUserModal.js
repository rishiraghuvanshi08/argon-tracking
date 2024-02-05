import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { addUserData, getUsersData } from "../../Slices/UserSlices";
import { toast } from "react-toastify";
import Select from 'react-select';
import Modal from "react-bootstrap/Modal";

const AddUserModal = ({ show, handleClose }) => {
    //const { users } = useSelector((state) => state.userList);
    const { users, isLoading, error } = useSelector((state) => ({
        users: Array.isArray(state.userList.users) ? state.userList.users : [],
        isLoading: state.userList.isLoading,
        error: state.userList.error,
    }));
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [inputName, setInputName] = useState("");
    const [inputEmail, setInputEmail] = useState("");
    const [inputPassword, setInputPassword] = useState("");
    const [designation, setDesignation] = useState("");
    const [role, setRole] = useState("");
    const [reporting, setReporting] = useState(null);
    const [nameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [designationError, setDesignationError] = useState("");
    const [reportingError, setReportingError] = useState("");
    const [roleError, setRoleError] = useState("");

    const reportingUserOptions = users.map((user) => ({
        value: user.id,
        label: user.name,
    }));

    useEffect(() => {
        dispatch(getUsersData(false));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            addUser(
                inputName,
                inputEmail,
                designation,
                inputPassword,
                reporting,
                role
            );
        }
    };

    const validateForm = () => {
        let isValid = true;
        setNameError("");
        setEmailError("");
        setPasswordError("");
        setDesignationError("");
        setReportingError("");
        setRoleError("");

        if (!inputName) {
            setNameError("Name is required");
            isValid = false;
        }
        if (!inputEmail) {
            setEmailError("Email is required");
            isValid = false;
        }
        if (!inputPassword) {
            setPasswordError("Password is required");
            isValid = false;
        } else if (inputPassword.length < 8) {
            setPasswordError("Password must be at least 8 characters long");
            isValid = false;
        }
        if (!designation) {
            setDesignationError("Designation is required");
            isValid = false;
        }
        if (!reporting) {
            setReportingError("Reporting User is required");
            isValid = false;
        }
        if (!role) {
            setRoleError("Role is required");
            isValid = false;
        }

        return isValid;
    };

    const notify = (msg) => toast(msg);

    const addUser = (name, email, designation, password, reportingID, role) => {
        const emailExists = users.some((user) => user.email === email);
        if (emailExists) {
            notify("Email already exists");
            return;
        }

        if (users != null) {
            const reportingUser = users.find((user) => user.id === reportingID.value);
            if (!reportingUser) {
                notify("Invalid Reporting ID");
                return;
            }
        }

        navigate("/admin/users");

        let user = {
            name,
            email,
            designation,
            password,
            reportingUser: {
                id: reportingID.value,
            },
            role: {
                role,
            },
        };

        dispatch(addUserData(user));
        setInputName("");
        setInputEmail("");
        setDesignation("");
        setInputPassword("");
        setReporting(null);
        setRole("");
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Form onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label className="text-center">Name</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Enter Name"
                            value={inputName}
                            onChange={(e) => setInputName(e.target.value)}
                        />
                        <Form.Text className="text-danger">{nameError}</Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center">Email address</Form.Label>
                        <Form.Control
                            required
                            type="email"
                            placeholder="Enter email"
                            value={inputEmail}
                            onChange={(e) => setInputEmail(e.target.value)}
                        />
                        <Form.Text className="text-danger">{emailError}</Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicDesignation">
                        <Form.Label className="text-center">Designation</Form.Label>
                        <Select
                            placeholder="Select Designation"
                            // defaultValue={{ label: designation, value: designation }}
                            defaultValue='Employee'
                            onChange={(selectedOption) => setDesignation(selectedOption.value)}
                            options={[
                                { value: 'Employee', label: 'Employee' },
                                { value: 'Module_lead', label: 'Module Lead' },
                                { value: 'Manager', label: 'Manager' },
                                { value: 'CEO', label: 'CEO' },
                            ]}
                            required
                        />
                        <Form.Text className="text-danger">{designationError}</Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            required
                            type="password"
                            placeholder="Enter Password"
                            value={inputPassword}
                            onChange={(e) => setInputPassword(e.target.value)}
                        />
                        <Form.Text className="text-danger">{passwordError}</Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicReportingId">
                        <Form.Label className="text-center">Reporting Users</Form.Label>
                        <Select
                            value={reporting}
                            onChange={(selectedOption) => setReporting(selectedOption)}
                            options={reportingUserOptions}
                            placeholder="Select Reporting User"
                        />
                        <Form.Text className="text-danger">{reportingError}</Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="role">
                        <div>
                        <Form.Label className="text-center">Role</Form.Label>
                        </div>
                        {/* <div>
                        <Form.Select
                            placeholder="Select Role"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            required
                        >
                            <option value=''>Select Role</option>
                            <option value="ROLE_USER">User</option>
                            <option value="ROLE_ADMIN">Admin</option>
                        </Form.Select>
                        </div> */}
                        <Select
                            placeholder="Select Role"
                            defaultValue='ROLE_USER'
                            onChange={(e) => setRole(e.value)}
                            options={[
                                { value: 'ROLE_USER', label: 'USER' },
                                { value: 'ROLE_ADMIN', label: 'ADMIN' }
                            ]}
                            required
                        />
                        <Form.Text className="text-danger">{roleError}</Form.Text>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="danger"
                        type="submit"
                    // style={{ margin: "20px" }}
                    >
                        ADD USER
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default AddUserModal;