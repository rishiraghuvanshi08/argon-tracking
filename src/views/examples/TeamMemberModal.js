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

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Select from 'react-select';
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { deleteTeamMemberData } from "../../Slices/TeamMemberSlice";
import { addTeamMemberData } from "../../Slices/TeamMemberSlice";
import { getTeamMemberData } from "../../Slices/TeamMemberSlice";
import { notify } from "../../alerts/Toastify";
import Swal from "sweetalert2";
import { getUsersData } from "../../Slices/UserSlices";

const TeamMemberModal = ({ teamObject, memberShow, handleClose, addMemberCheck, setAddMemberCheck, teams }) => {
    const { teamMember } = useSelector((state) => state.teaMemberList);
    const { users, isLoading, error } = useSelector((state) => ({
        users: Array.isArray(state.userList.users) ? state.userList.users : [],
        isLoading: state.userList.isLoading,
        error: state.userList.error,
    }));
    const id = teamObject != undefined && teamObject.id;
    const dispatch = useDispatch();
    const [selectedUsers, setSelectedUsers] = useState([]);

    const userOptions = users
        .filter(user => !teamMember.some(teamUser => teamUser.id === user.id))
        .map((user) => ({
            value: user.id,
            label: user.name,
        }));

    useEffect(() => {
        if (id != undefined) {
            dispatch(getTeamMemberData(id));
            dispatch(getUsersData(false));
        }
    }, [teamObject])

    const [uId, setuId] = useState();
    // const [show, setShow] = useState(false);
    // const handleClose = () => setShow(false);

    // const teamId = useParams();

    const addUserToTeam = () => {
        if (selectedUsers.length > 0) {
            dispatch(addTeamMemberData(id, selectedUsers))
                .then(() => {
                    notify("Team member(s) added successfully");
                    handleClose();
                })
                .catch((error) => {
                    notify("Error adding team member");
                });
        } else {
            notify("Please Select Members");
        }
    };

    const deleteTeam = (teamId, userId) => {
        handleClose();
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
                dispatch(deleteTeamMemberData(teamId, userId));
            }
        })
    };

    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            border: "1px solid #ced4da",
            borderRadius: "4px",
            width: "100%",
        }),
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <Modal show={memberShow} onHide={handleClose}>
            <Form onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>Members Of {teamObject.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table className="align-items-center table-flush" responsive>
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>Name</th>
                                <th>Team Details</th>
                                <th>Delete</th>
                            </tr>
                            {teamObject != undefined && teamObject.teamMembers != undefined && teamObject.teamMembers.map((elem, index) => (
                                <tr key={index} >
                                    <th>{elem.id}</th>
                                    <th>{elem.name}</th>
                                    <th>{elem.designation}</th>
                                    <th><Button className="tableButton" onClick={() => deleteTeam(teamObject.id, elem.id)}>Delete</Button></th>
                                </tr>
                            ))}
                        </thead>
                    </Table>
                </Modal.Body>
                <Modal.Footer style={{ display: "flex", justifyContent: "center" }}>
                    {addMemberCheck ? (
                        <Form onSubmit={handleSubmit} style={{ width: "100%" }}>
                            <div >
                                <Form.Group className="mb-3" controlId="userDropdown" >
                                    <Form.Label>Users</Form.Label>
                                    <Select
                                        styles={customStyles}
                                        isMulti
                                        value={selectedUsers.map((userId) => userOptions.find((user) => user.value === userId))}
                                        onChange={(selected) => setSelectedUsers(selected.map((user) => user.value))}
                                        options={userOptions}
                                    />
                                </Form.Group>
                            </div>
                            <div style={{ display: "flex", justifyContent: "center" }}>
                                <Button
                                    variant="danger"
                                    type="submit"
                                    // style={{ margin: '20px' }}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        addUserToTeam()
                                    }}
                                >
                                    Save Changes
                                </Button>
                            </div>
                        </Form>
                    ) : (
                        <div style={{ "display": "flex", "justifyContent": "center", "width": "100%" }}>
                            <Button variant='danger'
                                onClick={() => {
                                    setAddMemberCheck(true);
                                }}
                            >
                                ADD TEAM MEMBER
                            </Button>
                        </div>
                    )}
                </Modal.Footer>
            </Form>
        </Modal >
    );
};

export default TeamMemberModal;