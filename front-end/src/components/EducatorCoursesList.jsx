import axios from "axios";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import CourseCard from "./CourseCard";

export default function EducatorCoursesList() {
  //console.log("inside educator courses props", props);
  const history = useHistory();
  console.log("history in educator course", JSON.stringify(history));
  const user = history.location.state.user;
  const { firstname, lastname, email, id } = user;
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:9001/educator/${id}/courses`)
      .then((response) => {
        setCourses(response.data);
        console.log("courses", response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return (
    <div>
      <span className="my-course">My Course</span>
      {courses.length ? (
        <CourseCard courses={courses} />
      ) : (
        <span>No Courses</span>
      )}
    </div>
  );
}
