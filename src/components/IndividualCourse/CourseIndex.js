import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { CourseAssnGroupsAccordian } from "./AssignmentGroupAccordian";
import { AssignmentGroupForm } from "./AssignmentGroupForm.js";
import { ref, push as firebasePush, onValue, remove, update } from "firebase/database";
import { db } from "../../firebase-db";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { courseAvg } from "../utils";

import "../css/index.css";

export function CourseIndex(props) {
  const [courseGroups, setCourseGroups] = useState([]);
  const [courseName, setCourseName] = useState("Default Course Name");
  const [courseGrade, setCourseGrade] = useState(0);

  const urlParams = useParams();
  const courseIdString = urlParams.id;

  const auth = getAuth();
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    const groupsRef = ref(db, `courses/${user.uid}/${courseIdString}`);
    return onValue(groupsRef, (snapshot) => {
      const data = snapshot.val();
      setCourseName(data.courseId);
      if (snapshot.exists()) {
        const assignGroupArray = [];
        for (let [id, group] of Object.entries(data)) {
          if (typeof group === "object") assignGroupArray.push({ ...group, id });
        }
        setCourseGroups(assignGroupArray);
        setCourseGrade(courseAvg(assignGroupArray));
      }
    });
  }, [courseIdString, user]);

  if (loading) return <p>Initializing user</p>;
  if (error) return <p>Error: {error}</p>;
  if (!user) {
    return (
      <p className="p-3 mb-2 bg-danger text-white display-1 ">
        Please <Link to="/login">sign in</Link>
      </p>
    );
  }

  const handleNewGroup = (group) => {
    const groupsRef = ref(db, `courses/${user.uid}/${courseIdString}`);
    const forKey = firebasePush(groupsRef, group);
    const groupWithKey = [{ ...group, id: forKey.key }];
    setCourseGroups([...courseGroups, groupWithKey[0]]);
  };

  const handleGroupUpdate = (modifiedGroup) => {
    const route = `courses/${user.uid}/${courseIdString}/${modifiedGroup.id}`;
    const groupRef = ref(db, route);
    update(groupRef, modifiedGroup);
  };

  const handleGroupDelete = (e, id) => {
    const route = `courses/${user.uid}/${courseIdString}/${id}`;
    const assignmentRef = ref(db, route);
    remove(assignmentRef).then(() => {
      const newAssignGroups = courseGroups.filter((assignmentGroup) => assignmentGroup.id !== id);
      setCourseGroups(newAssignGroups);
    });
  };

  return (
    <>
      <div className="container container-fluid">
        <div className="row justify-content-between pb-5 display-1">
          <h1 id="courseInfo" className="col-xl-4 col-md-6">
            {courseName}
          </h1>
          <h2
            id="courseInfo"
            className="col-xl-4 col-md-6 d-flex justify-content-center bold-text display-6">
            Overall Grade: {courseGrade}
          </h2>
        </div>
        <div className="row justify-content-center pb-2">
          <AssignmentGroupForm props={props} addAssignmentGroup={handleNewGroup} />
        </div>
      </div>

      <CourseAssnGroupsAccordian
        assignmentGroups={courseGroups}
        handleGroupDelete={handleGroupDelete}
        handleGroupUpdate={handleGroupUpdate}
      />
    </>
  );
}
