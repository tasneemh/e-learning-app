import { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import RegisteredCourseCard from "./RegisteredCourseCard";

export default function LearnerRegisteredCourses() {
  const history = useHistory();
  const user = history.location.state.user;
  const { id } = user;
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:9001/learner/${id}/courses`)
      .then((response) => {
        setCourses(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return (
    <div>
      <div className="learner-title">My Course</div>
      {courses.length ? (
        <RegisteredCourseCard courses={courses} />
      ) : (
        <div>no course</div>
      )}
    </div>
  );
}
