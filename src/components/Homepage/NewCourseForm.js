import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import "../css/index.css";

function NewCourseForm(props) {
  const [courseName, setCourseName] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleFormSubmit = (e) => {
    handleClose();
    e.preventDefault();
    props.addCourse({
      courseId: courseName,
      assignmentGroups: [],
    });
    setCourseName("");
  };

  const handleNameChange = (event) => setCourseName(event.target.value);

  return (
    <>
      <Button variant="primary" className="big-button" onClick={handleShow}>
        <i className="fa fa-plus p-2"> </i> Create New Course
      </Button>

      <Modal show={show} onHide={handleClose} keyboard={false} className="text-black" centered>
        <Modal.Header closeButton>
          <Modal.Title>New Course</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form id="course-form" onSubmit={(e) => handleFormSubmit(e)}>
            <Form.Group className="mb-1" controlId="formBasicCourseName">
              Course Name
            </Form.Group>
            <Form.Control
              required
              value={courseName}
              type="text"
              placeholder="Client-Side Programming"
              onChange={handleNameChange}
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button form="course-form" type="submit" variant="primary">
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default NewCourseForm;
