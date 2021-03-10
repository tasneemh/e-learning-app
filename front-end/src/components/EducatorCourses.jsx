import axios from "axios";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

export default function EducatorCourses() {
  const history = useHistory();
  const educator = history.location.state.educator;
  const { firstname, lastname, email, id } = educator;
  const [courses, setCourses] = useState([]);
  
  useEffect(() => {
    axios.get(`http://localhost:9001/educator/${id}/courses`)
      .then(response => {
        setCourses(response.data);
        console.log("courses", response.data);
      });
  }, [id]);

  const handleClick = () => {
    history.push({ pathname: "/educator-course-createnewcourses", state: { educator } });
  };

  return (
    <div>
      <span>Hello, {firstname} {lastname} {email} {id}</span>
      <button onClick={handleClick}>Create new course!</button>
    </div>

  );
}
