import Navbar from "./components/Navbar";
import { Route, Routes, Navigate } from "react-router-dom";
import { CoursesDropdown } from "./components/Homepage/Home";
import { CourseIndex } from "./components/IndividualCourse/CourseIndex";
import LoginPage from "./components/login/Login";

/**
 * ********************* TO-DO **********************
 * Add a sorting feature for the assignment groups?
 * Better sign-in screen? translucent card in center of screen?
 * Delete Course -> ReRoute?
 */

function App(props) {
  return (
    <>
      <Routes>
        <Route path="/courses" element={<Navbar />}>
          <Route path=":id" element={<CourseIndex />} />
          <Route index element={<CoursesDropdown />} />
        </Route>
        <Route path="login" element={<LoginPage />} />
        <Route path="*" element={<Navigate to="/courses" />} />
      </Routes>
    </>
  );
}

export default App;
