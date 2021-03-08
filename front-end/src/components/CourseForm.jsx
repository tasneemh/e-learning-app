import React from 'react';
import { useForm } from "react-hook-form";

function CourseForm() {
  const { register, handleSubmit } = useForm();
  const onSubmit = data => console.log(data);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      Course name: <input name="courseName" ref={register} />
      <br/>
      Course code: <input name="courseCode" ref={register} />
      <br/>
      Course Description: <textarea></textarea>
      <br/>
      Upload course material: <input type="file" ref={register} name="picture" />
      <br/>
      Upload course image (optional): <input type="file" ref={register} name="picture" />
      <br/>
      <input type="submit" />
    </form>
  );
}

export default CourseForm;

