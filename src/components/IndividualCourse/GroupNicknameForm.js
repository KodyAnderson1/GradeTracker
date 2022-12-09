import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { FaEllipsisV } from "react-icons/fa";
import "../css/index.css";

export function GroupNicknameForm(props) {
  const [show, setShow] = useState(false);
  const [groupName, setGroupName] = useState();

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleNameChange = (event) => setGroupName(event.target.value);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    props.handleNickname(
      {
        nickname: groupName,
      },
      props.id.id
    );
    handleClose();
    setGroupName("");
  };

  return (
    <>
      <Button
        variant="dark"
        onClick={() => handleShow(true)}
        className="circle-buttons btn-sm remove-at-small">
        <FaEllipsisV />
      </Button>

      <Modal className="text-black" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="text-black">Update Group Nickname</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form id="update-group-nickname" onSubmit={(e) => handleFormSubmit(e)}>
            <div className="input-group justify-content-center">
              <div className="p-2">
                <Form.Label>Nickname</Form.Label>
                <Form.Control
                  value={groupName}
                  type="text"
                  className="form-control"
                  placeholder={props.id.group.nickname}
                  onChange={handleNameChange}
                />
              </div>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button form="update-group-nickname" type="submit">
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
