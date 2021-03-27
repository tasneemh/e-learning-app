import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import EducatorSideBar from "./EducatorSideBar";
import "./CourseForm.css";

export default function CourseForm() {
  const history = useHistory();
  const user = history.location.state.user;
  const { id } = user;
  const { register, handleSubmit, errors } = useForm();
  const url = "https://api.cloudinary.com/v1_1/c0ur-e/auto/upload";
  const [message, setMessage] = useState("");
  const clearMessage = () =>{
    setTimeout(()=>{
      setMessage("");
    }, 10000);
  }
  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "courses");
    try {
      const response = await fetch(url, {
        method: "POST",
        body: formData,
        mode: "cors",
      });

      const result = await response.json();
      const data = {};
      data["secureUrl"] = result.secure_url;
      data["format"] = result.format;
      return data;
    } catch (error) {
      console.log("upload file error", error);
    }
  };

  const saveCourse = (course) => {
    axios
      .post(`http://localhost:9001/uploadcourse`, { course })
      .then((response) => {
        setMessage("course material has been successfully uploaded!");
        clearMessage();
      })
      .catch((error) => {
        console.log("error in save course", error);
      });
  };

  const onSubmit = async (data, event) => {
    let courseImage;
    if (Object.values(data.courseimage).length > 0) {
      courseImage = await uploadFile(data.courseimage[0]);
    }
    const courseMaterial = await uploadFile(data.coursematerial[0]);
    const course = {};
    course["courseName"] = data["coursename"];
    course["courseCode"] = data["coursecode"];
    course["courseDescription"] = data["coursedescription"];
    if (courseImage) {
      course["courseImageUrl"] = courseImage.secureUrl;
      course["imageFileFormat"] = courseImage.format;
    } else {
      course["courseImageUrl"] = "";
      course["imageFileFormat"] = "";
    }
    course["courseMaterialUrl"] = courseMaterial.secureUrl;
    course["materialFileFormat"] = courseMaterial.format;
    course["educatorId"] = id;
    await saveCourse(course);
    event.target.reset();
  };

  return (
    <div className="main-container">
      <EducatorSideBar />
      <form className="course-form" onSubmit={handleSubmit(onSubmit)}>
        <input
          className="course-input"
          name="coursename"
          placeholder="Course Name"
          ref={register({ required: true })}
        />
        {errors.coursename && errors.coursename.type === "required" && (
          <span className="errorMsg">course name is required</span>
        )}
        <input
          name="coursecode"
          className="course-input"
          placeholder="Course Code"
          ref={register({ required: true })}
        />
        {errors.coursecode && errors.coursecode.type === "required" && (
          <span className="errorMsg">course code is required</span>
        )}
        <textarea
          name="coursedescription"
          className="textarea"
          ref={register({ required: true })}
          placeholder="Course Description"
        />
        {errors.coursedescription &&
          errors.coursedescription.type === "required" && (
            <span className="errorMsg">course description is required</span>
          )}

        <div className="course-container">
          <label className="file-label"> Course Material:</label>
          <input
            type="file"
            className="file-nput"
            name="coursematerial"
            multiple
            ref={register({ required: true })}
          />
        </div>
        {errors.coursematerial && errors.coursematerial.type === "required" && (
          <span className="errorMsg">course material is required</span>
        )}

        <div className="course-container">
          <label className="file-label">Course Image (optional):</label>
          <input
            type="file"
            className="file-input"
            name="courseimage"
            multiple
            ref={register}
          />
        </div>
        <div className="courseForm-btn-container">
          <input type="submit" className="courseForm-submit-btn" value="SUBMIT"/>
          <button
            className="courseForm-back-btn"
            type="button"
            onClick={() => history.goBack()}
          >
            BACK
          </button>
        </div>
        {message && <span>{message}</span>}
      </form>
    </div>
  );
}
