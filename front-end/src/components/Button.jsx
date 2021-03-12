import { useHistory } from "react-router-dom";
import "./Button.css";

export default function Button() {
  const history = useHistory();
  console.log("history in button", history);
  const user = history.location.state.user;

  const handleCoursesClick = () => {
    console.log("redirect to educator/courses");
    history.push({ pathname: "/educator-courses", state: { user } });
  };

  if (user.usertype === "educator") {
    return (
      <div className="educator-btn-group">
        <button>Statistic</button>
        <button onClick={handleCoursesClick}>Courses</button>
      </div>
    );
  }else{
    return <div>no data yet</div>
  }

}