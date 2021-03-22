import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import "./AccessForm.css";
import { useHistory } from "react-router-dom";
import EducatorSideBar from "./EducatorSideBar";

function AccessForm() {
  const { register, handleSubmit, errors } = useForm({});
  const [message, setMessage] = useState("");
  const [educators, setEducators] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedEducator, setSelectedEducator] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const history = useHistory();
  //console.log("history in educator access form", JSON.stringify(history));
  const user = history.location.state.user;
  const educatorId = user.id;

  const clearMessage = () => {
    setTimeout(() => {
      setMessage("");
    }, 10000);
  };

  useEffect(() => {
    Promise.all([
      axios.get(`http://localhost:9001/${educatorId}/getalleducators`),
      axios.get(`http://localhost:9001/educator/${educatorId}/courses`),
    ]).then((all) => {
      setEducators(all[0].data);
      setCourses(all[1].data);
    });
  }, [educatorId]);

  const displayEducators = () => {
    return (
      educators &&
      educators.map((educator) => {
        return (
          <option value={educator.id}>
            {" "}
            {educator.last_name}
            {", "}
            {educator.first_name}
          </option>
        );
      })
    );
  };

  const displayCourses = () => {
    return (
      courses &&
      courses.map((course) => {
        return <option value={course.id}> {course.name}</option>;
      })
    );
  };

  const onSubmit = (option) => {
    const data = {};
    data['substituteid'] = option.substituteid;
    data['courseid'] = option.courseid;
    data['educatorid'] = educatorId;
    console.log("data in access form", data);
    axios
      .post(`http://localhost:9001/addnewsubstitute`, { data })
      /*.then((response) => {
        const message = response.data.message;
        const error = response.data.error;
        if (message) {
          setMessage("YOU HAVE SUCCESSFULLY PROVIDED ACCESS RIGHTS");
          clearMessage();
          event.target.reset();
        }
        if (error) {
          setMessage("THERE IS AN ERROR IN PROVIDING ACCESS RIGHTS");
          clearMessage();
          event.target.reset();
        }
      })
      .catch((error) => {
        console.log(error);
      });*/
  };

  return (
    <div className="accessform-container">
      <EducatorSideBar />
      <form className="accessform" onSubmit={handleSubmit(onSubmit)}>
        <h4>Access form</h4>
        <label>Substitute: </label>
        <select name="substituteid" ref={register}>
          {displayEducators()}
        </select>
        <br />
        <label>Courses: </label>
        <select name="courseid" ref={register}>
          {displayCourses()}
        </select>
        <br />
        <input type="submit" value="SUBMIT" />
        <p>{message}</p>
      </form>
    </div>
  );
}

export default AccessForm;
