import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

export default function EducatorCourses() {
  const history = useHistory();
  //const {register, handleSubmit} = useForm();
  const handleClick = (data) => {
    console.log(data);
    history.push("/createnewcourses");
  };

  return (
    <div>
      <button onClick={handleClick}>Create new course!</button>
    </div>

  );
}
/**
 * <form onSubmit={handleSubmit(onSubmit)}>

      <input type="file" ref = {register} name="picture" />
      <button>Submit</button>
    </form>
 */