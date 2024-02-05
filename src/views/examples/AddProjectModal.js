import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-bootstrap/Modal";
import { addProjectData } from "../../Slices/ProjectSlices";
import { notify } from "../../alerts/Toastify";

const AddProjectModal = ({ show, handleClose }) => {
    // console.log(method);
    const { projects } = useSelector((state) => state.projectList);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [inputName, setInputName] = useState("");
    // const [isInputEmpty, setIsInputEmpty] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        addData(inputName);
    };
    const addData = (name1) => {
        const project = {
            id: '',
            name: name1
        };
        // Check if the name already exists in the projects array
        const nameExists = projects.some((project) => project.name === name1);
        if (nameExists) {
            // alert("Project name already exists");
            notify("Project name already exists.")
            return;
        }
        dispatch(addProjectData(project));
        setInputName("");
        handleClose();
        navigate("/admin/projects");
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Form onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Project</Modal.Title>
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
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="danger"
                        type="submit"
                        style={{ margin: "20px" }}
                    // onClick={() =>
                    // }
                    >
                        Add Project
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default AddProjectModal;