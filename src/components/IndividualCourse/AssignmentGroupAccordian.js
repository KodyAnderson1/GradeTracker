import React, { useState, useEffect } from "react";
import Accordion from "react-bootstrap/Accordion";
import { useParams } from "react-router-dom";
import { AssignmentForm } from "./AssignmentForm";
import { ref, push as firebasePush, onValue, remove, update } from "firebase/database";
import { db } from "../../firebase-db";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { groupAvg } from "../utils";
import { TitlesAndSorting } from "./AssignmentRow";

import "../css/AssignmentGroupDetails.css";
import "../css/index.css";

export function CourseAssnGroupsAccordian(props) {
  return (
    <>
      <div className="container container-fluid">
        <div className="row justify-content-center">
          <div className="col-10 col-md-8">
            <Accordion>
              {props.assignmentGroups.map((group) => (
                <AccordianItem
                  key={group.id}
                  group={group}
                  id={group.id}
                  handleGroupDelete={props.handleGroupDelete}
                  handleGroupUpdate={props.handleGroupUpdate}
                />
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </>
  );
}

function AccordianItem(props) {
  const [assignmentGroup, setAssignmentGroup] = useState([]);

  const auth = getAuth();
  const [user] = useAuthState(auth);

  const urlParams = useParams();
  const courseIdString = urlParams.id;
  const groupDbId = props.group.id;

  useEffect(() => {
    const assignmentRef = ref(db, `courses/${user.uid}/${courseIdString}/${groupDbId}`);
    return onValue(assignmentRef, (snapshot) => {
      const data = snapshot.val();
      if (snapshot.exists()) {
        const assignmentsArray = [];
        for (let [id, group] of Object.entries(data)) {
          if (typeof group === "object") assignmentsArray.push({ ...group, id });
        }
        setAssignmentGroup(assignmentsArray);
      }
    });
  }, [user, groupDbId, courseIdString, assignmentGroup.name]);

  const addAssignment = (assignment, id) => {
    let assignmentRef;

    if (id) assignmentRef = ref(db, `courses/${user.uid}/${courseIdString}/${id}`);
    else assignmentRef = ref(db, `courses/${user.uid}/${courseIdString}/${groupDbId}`);

    const toGetKey = firebasePush(assignmentRef, assignment);
    const assignWithKey = { ...assignment, id: toGetKey.key };

    setAssignmentGroup([...assignmentGroup, assignWithKey]);
  };

  const handleDelete = (assignmentId) => {
    const route = `courses/${user.uid}/${courseIdString}/${groupDbId}/${assignmentId}`;
    const assignmentRef = ref(db, route);
    remove(assignmentRef).then(() => {
      const newAssignGroup = assignmentGroup.filter(
        (assignments) => assignments.id !== assignmentId
      );
      setAssignmentGroup(newAssignGroup);
    });
  };

  const handleNickname = (nickname, id) => {
    const nicknametRef = ref(db, `courses/${user.uid}/${courseIdString}/${id}`);
    update(nicknametRef, nickname);
  };

  return (
    <>
      <Accordion.Item eventKey={props.group.name}>
        <Accordion.Header>
          <div className="container container-fluid">
            <div className="row">
              <div className="pt-2 col-10 col-md-11 bold-text accord-head">{props.group.name}</div>
              <GradeDisplay group={props.group} />
            </div>
          </div>
        </Accordion.Header>
        <Accordion.Body>
          <TitlesAndSorting
            idCourse={courseIdString}
            handleNickname={handleNickname}
            group={props.group}
            id={props.id}
            assignmentGroup={assignmentGroup}
            handleDelete={handleDelete}
            handleGroupUpdate={props.handleGroupUpdate}
            handleGroupDelete={props.handleGroupDelete}
          />
          <AssignmentForm
            nickname={props.group.nickname}
            group={props.group}
            addAssignment={addAssignment}
          />
        </Accordion.Body>
      </Accordion.Item>
    </>
  );
}

function GradeDisplay(props) {
  const allGradesStyle = "p-2 col-2 col-md-1 d-flex justify-content-center group-average bold-text";
  const average = groupAvg(props.group);

  const getColorFromGrade = (average) => {
    average = parseInt(average);
    if (average <= 70) return "bg-danger";
    if (average < 80) return "bg-warning";
    if (average >= 80) return "bg-success";
  };
  return (
    <div className={`${allGradesStyle} ${getColorFromGrade(average)}`}>
      {isNaN(average) ? " " : average}
    </div>
  );
}
