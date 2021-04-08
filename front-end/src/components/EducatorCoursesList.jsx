import axios from "axios";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import CourseCard from "./CourseCard";
import AccessRightsCourseCard from "./AccessRightsCourseCard";

export default function EducatorCoursesList() {
  const history = useHistory();
  const user = history.location.state.user;
  const { id } = user;
  const [courses, setCourses] = useState([]);
  const [accessRightCourses, setAccessRightCourses] = useState([]);

  useEffect(() => {
    Promise.all([
      axios.get(`http://localhost:9001/educator/${id}/courses`),
      axios.get(`http://localhost:9001/educator/${id}/courseswithaccessrights`),
    ]).then((all) => {
      setCourses(all[0].data);
      setAccessRightCourses(all[1].data);
    });
  }, [id]);

  return (
    <div>
      <div className="educator-my-course">My Course</div>
      {courses.length ? (
        <CourseCard courses={courses}/>
      ) : (
        <div>No Course</div>
      )}
      <div className="educator-my-course">Courses With Access Rights Granted</div>
      {accessRightCourses.length ? (
        <AccessRightsCourseCard accessRightCourses={accessRightCourses} />
      ) : (
        <div>No Course</div>
      )}
    </div>
  );
}
