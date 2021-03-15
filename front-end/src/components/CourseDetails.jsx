import { useHistory } from "react-router-dom";

export default function CourseDetails(){
  const history = useHistory();
  const learner = history.location.state.learner;
  const course = history.location.state.name;
  console.log("history in course details", history);
  //console.log("learner in course details", learner);
  //console.log("course in course details", course);

  return (
  <></>
  )
}