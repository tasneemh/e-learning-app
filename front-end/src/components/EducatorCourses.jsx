import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

export default function EducatorCourses() {
  const history = useHistory();
  //console.log("history in educator courses", JSON.stringify(history));
  const educator = history.location.state.educator;
  const { firstname, lastname, email, id } = educator;
  const { register, handleSubmit } = useForm();

  const handleClick = () => {
    history.push({ pathname: "/educator-course-createnewcourses", state: { educator } });
  };

  return (
    <div>
      <span>this is educator courses</span>
      <span>Hello, {firstname} {lastname} {email} {id}</span>
      <button onClick={handleClick}>Create new course!</button>
    </div>

  );
}
