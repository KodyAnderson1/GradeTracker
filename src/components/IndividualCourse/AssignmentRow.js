import React, { useState, useEffect } from "react";
import { UpdateAssignmentGroup } from "./UpdateCourse";
import { DeleteConfirmation } from "./GroupDeleteConfirmation";
import { GroupNicknameForm } from "./GroupNicknameForm";

import _ from "lodash";

import "../css/AssignmentGroupDetails.css";
import "../css/index.css";

export function TitlesAndSorting(props) {
  const [sortByCriteria, setSortByCriteria] = useState(null);
  const [isAscending, setIsAscending] = useState(null);
  const [testData, setTestData] = useState(props.assignmentGroup);

  useEffect(() => {
    const sorted = sortByCriteria
      ? _.sortBy(props.assignmentGroup, sortByCriteria)
      : props.assignmentGroup;
    setTestData(sortByCriteria && !isAscending ? _.reverse(sorted) : sorted);
  }, [props.assignmentGroup, isAscending, sortByCriteria]);

  const handleClick = (event) => {
    const clickedName = event.currentTarget.name;
    if (clickedName !== sortByCriteria) {
      setSortByCriteria(clickedName);
      setIsAscending(true);
    } else if (isAscending) {
      setIsAscending(false);
    } else {
      setSortByCriteria(null);
      setIsAscending(null);
    }
  };

  const styling = "col-md-3 d-flex bold-text pb-2";
  return (
    <>
      <div className="row">
        <div className={`${styling} justify-content-start col-4`}>
          Name
          <SortButton
            name="name"
            active={sortByCriteria === "name"}
            ascending={sortByCriteria === "name" && isAscending}
            onClick={handleClick}
          />
        </div>
        <div className={`${styling} col-3 justify-content-center ps-5 `}>
          Actual
          <SortButton
            name="actualGrade"
            active={sortByCriteria === "actualGrade"}
            ascending={sortByCriteria === "actualGrade" && isAscending}
            onClick={handleClick}
          />
        </div>
        <div className={`${styling} col-3 justify-content-center ps-5`}>
          Potential
          <SortButton
            name="potentialGrade"
            active={sortByCriteria === "potentialGrade"}
            ascending={sortByCriteria === "potentialGrade" && isAscending}
            onClick={handleClick}
          />
        </div>
        <div className={styling}>
          <AddAndRemoveBtns
            group={props.group}
            handleGroupUpdate={props.handleGroupUpdate}
            handleGroupDelete={props.handleGroupDelete}
            handleNickname={props.handleNickname}
            id={props.group.id}
          />
        </div>
      </div>
      {testData.map((assignment) => (
        <AssignmentGroupRow
          key={assignment.id + assignment.name}
          assignment={assignment}
          removeElement={props.handleDelete}
        />
      ))}
    </>
  );
}

function AddAndRemoveBtns(props) {
  const styling = "col-4 d-flex justify-content-center";
  return (
    <>
      <div className={`${styling}`}>
        <UpdateAssignmentGroup
          handleGroupUpdate={props.handleGroupUpdate}
          group={props.group}
          keyId={props.group.id}
        />
      </div>
      <div className={`${styling}`}>
        <GroupNicknameForm id={props} handleNickname={props.handleNickname} />
      </div>
      <div className={`${styling}`}>
        <DeleteConfirmation
          handleGroupDelete={props.handleGroupDelete}
          group={props.group}
          keyId={props.group.id}
        />
      </div>
    </>
  );
}

function SortButton(props) {
  let iconClasses = "";
  if (props.active) iconClasses += ` active`;
  if (props.ascending) iconClasses += ` flip`;

  return (
    <button
      className="btn btn-sm btn-sort remove-at-small"
      name={props.name}
      onClick={props.onClick}>
      <span className={"material-icons" + iconClasses} aria-label={`sort by ${props.name}`}>
        sort
      </span>
    </button>
  );
}

function AssignmentGroupRow(props) {
  const assignment = props.assignment;
  return (
    <>
      <div className="row ">
        <div className="col-6 col-md course-assignment-names">{assignment.name}</div>
        <div className="col-2 col-md d-flex justify-content-center">{assignment.actualGrade}</div>
        <div className="col-2 col-md d-flex justify-content-center">
          {assignment.potentialGrade}
        </div>
        <div className="col-2 col-md button-padding d-flex justify-content-center">
          <button className="btn btn-danger" onClick={(e) => props.removeElement(assignment.id)}>
            <i className="fa fa-minus"></i>
          </button>
        </div>
      </div>
    </>
  );
}
