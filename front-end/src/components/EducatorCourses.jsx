import axios from "axios";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import SideBar from "./SideBar";

export default function EducatorCourses() {
  //console.log("inside educator courses props", props);
  const history = useHistory();
  console.log("history in educator course", JSON.stringify(history));
  const user = history.location.state.user;
  const { firstname, lastname, email, id } = user;
  const [courses, setCourses] = useState();

  useEffect(() => {
    axios.get(`http://localhost:9001/educator/${id}/courses`)
      .then(response => {
        setCourses(response.data);
        console.log("courses", response.data);
      });
  }, [id]);

  const handleCreateNewCourseClick = () => {
    history.push({ pathname: "/educator-course-createnewcourses", state: { user } });
  };

  return (
    <div>
      <SideBar />
      <button onClick={handleCreateNewCourseClick}>Create new course!</button>
    </div>

  );
}
