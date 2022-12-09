import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FaMinus } from "react-icons/fa";

export function DeleteConfirmation(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Button
        variant="danger"
        onClick={() => handleShow(true)}
        className="circle-buttons btn-sm remove-at-small">
        <FaMinus />
      </Button>

      <Modal show={show} onHide={handleClose} keyboard={false} className="text-black" centered>
        <Modal.Header closeButton>
          <Modal.Title>About to Delete {props.group.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this group?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
          <Button
            form="course-form"
            onClick={(e) => props.handleGroupDelete(e, props.keyId)}
            variant="primary">
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
