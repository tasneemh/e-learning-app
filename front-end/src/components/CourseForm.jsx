import React from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

export default function CourseForm() {
  const history = useHistory();
  //console.log("prop history", JSON.stringify(history));
  const educator = history.location.state.educator;
  const { firstname, lastname, email, id } = educator;
  const { register, handleSubmit } = useForm();
  const url = "https://api.cloudinary.com/v1_1/c0ur-e/auto/upload";

  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'courses');
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
        mode: 'cors' 
      })

      const result = await response.json();
      console.log("result in uploadfile", JSON.stringify(result.secure_url));
      return JSON.stringify(result.secure_url);
    }
    catch (error) {
      console.log("upload file error", error);
    }
  };

  const saveCourse = (course) => {
    axios.post(`http://localhost:9001/savecourse`, { course })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log("error in save course", error);
      });
  };


    //upload different file type?
    //using drag and drop package?
    console.log("data", data);
    let courseImageUrl;
    if (Object.values(data.courseImage).length > 0) {
      courseImageUrl = await uploadFile(data.courseImage[0]);
    }
    const courseMaterialUrl = await uploadFile(data.courseMaterial[0]);
    console.log("url", courseImageUrl, courseMaterialUrl);
    const course = {};
    course['courseName'] = data['courseName'];
    course['courseCode'] = data['courseCode'];
    course['courseDescription'] = data['courseDescription'];
    courseImageUrl ? course['courseImageUrl'] = courseImageUrl : course['courseImageUrl'] = "";
    course['courseMaterialUrl'] = courseMaterialUrl;
    course['educatorId'] = id;
    await saveCourse(course);


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <span>Hello, {firstname} {lastname} {email} {id}</span>
      Course name: <input name="courseName" ref={register} />
      <br />
      Course code: <input name="courseCode" ref={register} />
      <br />
      Course Description: <textarea name="courseDescription" ref={register}></textarea>
      <br />
      Upload course material: <input type="file" name="courseMaterial" multiple ref={register} />
      <br />
      Upload course image (optional): <input type="file" name="courseImage" multiple ref={register} />
      <br />
      <input type="submit" />
    </form>
  );

}

