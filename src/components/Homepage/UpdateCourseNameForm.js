import React, { useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import "../css/index.css";

export function UpdateCourseNameForm(props) {
  const [courseName, setCourseName] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleFormSubmit = (e) => {
    handleClose();
    e.preventDefault();

    props.handleCourseUpdate({ courseId: courseName }, props.id);
    setCourseName("");
  };

  const handleNameChange = (event) => setCourseName(event.target.value);

  return (
    <>
      <Button variant="primary" className="btn-sm circle-buttons mb-1" onClick={handleShow}>
        <FaPencilAlt />
      </Button>
      <Modal show={show} onHide={handleClose} className="text-black" centered>
        <Modal.Header closeButton>
          <Modal.Title>Update Course Name</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form id="courseNameUpdate">
            <Form.Group className="mb-1" controlId="courseNameUpdate">
              Course Name
            </Form.Group>
            <Form.Control
              required
              value={courseName}
              className="form-control"
              type="text"
              placeholder="New Course Name"
              onChange={handleNameChange}
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            form="courseNameUpdate"
            onClick={handleFormSubmit}
            type="submit"
            variant="primary">
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
