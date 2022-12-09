import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";
import { CourseDeleteConfirmation } from "./CourseDeleteConfirmation";
import { UpdateCourseNameForm } from "./UpdateCourseNameForm";

import { groupAvg, courseAvg } from "../utils";

import "../css/index.css";

function PopUpAssignmentGroup(props) {
  const coursesArray = [];
  Object.values(props.courses).map((e) => {
    Object.values(e).map((why) => {
      if (typeof why === "object") coursesArray.push(why);
    });
  });

  if (coursesArray.length <= 0) {
    return <>Click "Go To Course" to add some assignment groups!</>;
  }

  return (
    <>
      <div className="row">
        <div className="col bold-text">ASSIGNMENT GROUP:</div>
        <div className="col bold-text">GRADE:</div>
      </div>

      {coursesArray.map((group, index) => {
        const avg = groupAvg(group);
        const grade = isNaN(avg) ? "N / A" : avg + " %";
        return (
          <>
            <div key={index} className="row">
              <div className="col">{group.name}</div>
              <div className="col">{grade}</div>
            </div>
          </>
        );
      })}
    </>
  );
}

function Popup(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const course = props.props;
  const courseAverage = courseAvg(course);
  return (
    <>
      <div className="course-button" onClick={handleShow}>
        <div className="row">
          <div className="col-9">{course.courseId}</div>
          <div className="col-3">{courseAverage}</div>
        </div>
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        keyboard={false}
        className="text-black"
        centered
        size="md">
        <Modal.Header closeButton className="bg-light">
          <Modal.Title>
            <div className="row">
              <div className="col-2 ps-1">
                <UpdateCourseNameForm
                  id={course.id}
                  handleCourseUpdate={props.handleCourseUpdate}
                />
              </div>
              <div className="col-10">{props.props.courseId}</div>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-light">
          <PopUpAssignmentGroup courses={props} />
        </Modal.Body>
        <Modal.Footer className="bg-light">
          <Link className="btn btn-primary me-auto" to={`${props.props.id}`}>
            Go To Course
          </Link>
          <div>
            <CourseDeleteConfirmation
              handleDeleteCourse={props.handleDeleteCourse}
              course={course}
            />
          </div>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Popup;
