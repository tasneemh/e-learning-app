import { useHistory } from "react-router-dom";
import LearnerSideBar from "./LearnerSideBar";
import "./Learner.css";
import LearnerRegisteredCourses from "./LearnerRegisteredCourses";
import LearnerCoursesList from "./LearnerCoursesList";

export default function Learner() {
  const history = useHistory();
  const learner = history.location.state.user;
  console.log("history in learner", learner);
  const { firstname, lastname, email, id } = learner;
  return (
    <div className="learner-container">
      <span>
        {firstname} {lastname} {email} {id}
      </span>
      <LearnerSideBar learner={learner} />
      <div className="learner-content">
        <div className="learner-registered-courses">
          <LearnerRegisteredCourses />
        </div>
        <div className="learner-allcourses-list">
          <LearnerCoursesList />
        </div>
      </div>
    </div>
  );
}
