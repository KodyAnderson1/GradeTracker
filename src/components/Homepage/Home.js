import React, { useState, useEffect } from "react";
import { db } from "../../firebase-db";
import { ref, push as firebasePush, onValue, remove, update } from "firebase/database";
import Dropdown from "react-bootstrap/Dropdown";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

import NewCourseForm from "./NewCourseForm";
import Popup from "./Popup";
import "../css/Homepage.css";
import "../css/index.css";
import LoginPage from "../login/Login";

export function CoursesDropdown(props) {
  const [courses, setCourses] = useState([]);
  const auth = getAuth();
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      const coursesRef = ref(db, `courses/${user.uid}`);
      return onValue(coursesRef, (snapshot) => {
        const data = snapshot.val();
        if (snapshot.exists()) {
          const courseArray = [];
          for (let [id, course] of Object.entries(data)) {
            courseArray.push({ ...course, id });
          }
          setCourses(courseArray);
        }
      });
    }
  }, [user]);

  if (loading) return <p>Initializing user</p>;
  if (error) return <p>Error: {error}</p>;
  if (!user) {
    return <LoginPage />;
  }

  const handleNewCourse = (newCourse) => {
    if (user) {
      const coursesRef = ref(db, `courses/${user.uid}`);
      firebasePush(coursesRef, newCourse);
    } else console.error("User is not logged in!");
  };

  const handleDeleteCourse = (e, courseId) => {
    const route = `courses/${user.uid}/${courseId}`;
    const courseRef = ref(db, route);
    remove(courseRef).then(() => {
      const newCourseGroup = courses.filter((course) => course.id !== courseId);
      setCourses(newCourseGroup);
    });
  };

  const handleCourseUpdate = (modifiedCourse, id) => {
    const route = `courses/${user.uid}/${id}`;
    const courseRef = ref(db, route);
    update(courseRef, modifiedCourse);
  };

  return (
    <>
      <main className="container container-fluid">
        <div className="row top-img">
          <h1 className="course-info">Grade Calculator</h1>
        </div>
        <h2 className="course-info">Welcome, {user.displayName}!</h2>
        <div className="pt-1 pb-1">
          <NewCourseForm addCourse={handleNewCourse} />
        </div>
        <div className="justify-content-center">
          <Dropdown id="dropdown">
            <Dropdown.Toggle
              variant="success"
              className="pt-6 pb-6 justify-content-center"
              style={{ fontSize: "xx-large", height: "5rem", width: "21rem" }}>
              Courses
            </Dropdown.Toggle>
            <Dropdown.Menu className="p-4" id="dropdownMenu">
              <DropdownItem
                handleCourseUpdate={handleCourseUpdate}
                upToDateCourses={courses}
                handleDeleteCourse={handleDeleteCourse}
              />
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </main>
    </>
  );
}

export function DropdownItem(props) {
  const courses = props.upToDateCourses;

  if (courses.length <= 0) {
    return <>Add some courses!</>;
  }

  return (
    <>
      {courses.map((course, index) => {
        return (
          <Dropdown.Item key={index}>
            <div
              onKeyDown={(e) => e.stopPropagation()}
              onClick={(e) => e.stopPropagation()}
              onFocus={(e) => e.stopPropagation()}
              onMouseOver={(e) => e.stopPropagation()}>
              <Popup
                handleCourseUpdate={props.handleCourseUpdate}
                key={course.id}
                props={course}
                handleDeleteCourse={props.handleDeleteCourse}
              />
            </div>
          </Dropdown.Item>
        );
      })}
    </>
  );
}
