import React from 'react';
import { useForm } from "react-hook-form";
import axios from 'axios';
import FormData from 'form-data';

function CourseForm() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    let form = new FormData();
    form.append('file', data.courseMaterial);
    console.log("form", form);

    try {
      const res = axios.post(('/savecourse', form, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      Course name: <input name="courseName" ref={register} />
      <br />
      Course code: <input name="courseCode" ref={register} />
      <br />
      Course Description: <textarea name="courseDescription" ref={register}></textarea>
      <br />
      Upload course material: <input type="file" name="courseMaterial" ref={register}/>
      <br />
      Upload course image (optional): <input type="file" name="courseImage" ref={register} />
      <br />
      <input type="submit" />
    </form>
  );
}

export default CourseForm;

