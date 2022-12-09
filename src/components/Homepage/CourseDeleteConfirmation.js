import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export function CourseDeleteConfirmation(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Button variant="danger" onClick={() => handleShow(true)} className="">
        Delete Course
      </Button>

      <Modal show={show} onHide={handleClose} keyboard={false} className="text-black" centered>
        <Modal.Header closeButton>
          <Modal.Title>About to Delete {props.course.courseId}</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete {props.course.courseId}?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
          <Button
            form="course-form"
            onClick={(e) => props.handleDeleteCourse(e, props.course.id)}
            variant="primary">
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
