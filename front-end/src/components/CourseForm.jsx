import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import EducatorSideBar from "./EducatorSideBar";
import "./CourseForm.css";

export default function CourseForm() {
  const history = useHistory();
  console.log("prop history in course form", JSON.stringify(history));
  const user = history.location.state.user;
  const { firstname, lastname, email, id } = user;
  const { register, handleSubmit, errors } = useForm();
  const url = "https://api.cloudinary.com/v1_1/c0ur-e/auto/upload";
  const [message, setMessage] = useState("");

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
      //console.log("result in uploadfile", JSON.stringify(result.format));
      //console.log("result secure url in uploadfile", JSON.stringify(result.secure_url));
      const data = {};
      data["secureUrl"] = result.secure_url;
      data["format"] = result.format;
      console.log("data in upload function", data);
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
      })
      .catch((error) => {
        console.log("error in save course", error);
      });
  };

  const onSubmit = async (data, event) => {
    console.log("data in on submit", data);
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
    console.log("on submit function", course);
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
          <input type="submit" className="courseForm-submit-btn" />
          <button
            className="courseForm-back-btn"
            type="button"
            onClick={() => history.goBack()}
          >
            Back
          </button>
        </div>
        {message && <span>{message}</span>}
      </form>
    </div>
  );
}
