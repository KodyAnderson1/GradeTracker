import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { FaPencilAlt } from "react-icons/fa";

export function UpdateAssignmentGroup(props) {
  const [show, setShow] = useState(false);
  const [groupName, setGroupName] = useState(props.group.name);
  const [groupWeight, setGroupWeight] = useState(props.group.weight);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleNameChange = (event) => setGroupName(event.target.value);
  const handleWeightChange = (event) => setGroupWeight(event.target.value);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    props.handleGroupUpdate({
      name: groupName,
      weight: groupWeight,
      id: props.group.id,
    });
    handleClose();
    setGroupName("");
    setGroupWeight("");
  };

  return (
    <>
      <Button
        variant="success"
        onClick={() => handleShow(true)}
        className="circle-buttons btn-sm remove-at-small">
        <FaPencilAlt />
      </Button>

      <Modal className="text-black" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="text-black">Update Course Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form id="update-group-form" onSubmit={(e) => handleFormSubmit(e)}>
            <div className="input-group justify-content-center">
              <div className="p-2">
                <Form.Label>Group Name</Form.Label>
                <Form.Control
                  value={groupName}
                  type="text"
                  className="form-control"
                  placeholder="Group Name"
                  onChange={handleNameChange}
                />
              </div>
              <div className="p-2">
                <Form.Label>Group Weight</Form.Label>
                <Form.Control
                  value={groupWeight}
                  type="number"
                  className="form-control"
                  placeholder="Group Weight"
                  onChange={handleWeightChange}
                />
              </div>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button form="update-group-form" type="submit">
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
