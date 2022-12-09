import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";

export function AssignmentGroupForm(props) {
  const [AssnGrpWeight, setAssnGrpWeight] = useState("");
  const [AssnGrpName, setAssnGrpName] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    props.addAssignmentGroup({
      name: AssnGrpName,
      weight: AssnGrpWeight,
      assignments: [],
    });
    setAssnGrpWeight("");
    setAssnGrpName("");
  };

  const handleNameChange = (event) => setAssnGrpName(event.target.value);
  const handleWeightChange = (event) => setAssnGrpWeight(event.target.value);

  return (
    <>
      <Form id="assignment-group-form" onSubmit={(e) => handleFormSubmit(e)}>
        <div className="input-group justify-content-center">
          <div className="p-2">
            <Form.Control
              value={AssnGrpName}
              type="text"
              className="form-control"
              placeholder="Group Name"
              onChange={handleNameChange}
            />
          </div>
          <div className="p-2">
            <Form.Control
              value={AssnGrpWeight}
              type="number"
              className="form-control"
              placeholder="Group Weight"
              onChange={handleWeightChange}
            />
          </div>
          <div className="p-2">
            <Button form="assignment-group-form" type="submit">
              ADD
            </Button>
          </div>
        </div>
      </Form>
    </>
  );
}
