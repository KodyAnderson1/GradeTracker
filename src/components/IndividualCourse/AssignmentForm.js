import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";

import "../css/AssignmentGroupDetails.css";

export function AssignmentForm(props) {
  const [groupCount, setGroupCount] = useState(0);
  const [assignmentName, setAssignmentName] = useState("");
  const [actualGrade, setActualGrade] = useState("");
  const [potentialGrade, setPotentialGrade] = useState("");
  const [nickname, setNickname] = useState("");
  const groupName = props.group.name;

  useEffect(() => {
    setNickname(props.nickname ? props.nickname : props.group.name);
    const lengthOfGroup = Object.values(props.group).filter((m) => typeof m === "object");
    setGroupCount(lengthOfGroup.length + 1);
    setAssignmentName(`${nickname + " " + groupCount}`);
  }, [props.group, groupCount, nickname, props.nickname]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    props.addAssignment(
      {
        name: assignmentName,
        actualGrade: actualGrade,
        potentialGrade: potentialGrade,
      },
      props.group.id
    );
    setAssignmentName("");
    setActualGrade("");
    setPotentialGrade("");
  };

  const handleNameChange = (event) => setAssignmentName(event.target.value);
  const handleActualGradeChange = (event) => setActualGrade(event.target.value);
  const handlePotentialGradeChange = (event) => setPotentialGrade(event.target.value);

  return (
    <>
      <Form id={groupName + "name"} onSubmit={handleFormSubmit}>
        <div className="row">
          <div className="col-3 col-md">
            <Form.Control
              className="d-flex course-assignment-names course-name"
              required
              value={assignmentName}
              id={props.group.name + ""}
              type="text"
              placeholder={groupName + " #"}
              onChange={handleNameChange}
            />
          </div>
          <div className="col-3 col-md">
            <Form.Control
              className="d-flex justify-content-center actual-grade"
              required
              value={actualGrade}
              id={props.group.name + "actualGrade"}
              type="number"
              placeholder="90"
              onChange={handleActualGradeChange}
            />
          </div>
          <div className="col-3 col-md">
            <Form.Control
              className="d-flex justify-content-center potential-grade"
              required
              value={potentialGrade}
              id={props.group.name + "potentialGrade"}
              type="number"
              placeholder="100"
              onChange={handlePotentialGradeChange}
            />
          </div>
          <div className="col-3 col-md button-padding d-flex justify-content-center">
            <button form={groupName + "name"} type="submit" className="btn btn-success">
              <i className="fa fa-plus"></i>
            </button>
          </div>
        </div>
      </Form>
    </>
  );
}
