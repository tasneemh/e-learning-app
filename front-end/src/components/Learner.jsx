import { useHistory } from "react-router-dom";
import LearnerSideBar from "./LearnerSideBar";
import "./Learner.css";
import LearnerRegisteredCourses from "./LearnerRegisteredCourses";
import LearnerCoursesList from "./LearnerCoursesList";


export default function Learner() {
  const history = useHistory();
  const learner = history.location.state.user;
  console.log("history in learner", learner);
  
  return (
    <div className="learner-container">
      <LearnerSideBar className="learner-sidebar" learner={learner} />
      <div className="learner-content">
        <div className="learner-registered-courses">
          <LearnerRegisteredCourses />
        </div>
        <div className="learner-allcourses-list">
        <div className="learner-title">New Courses</div>
          <LearnerCoursesList />
        </div>
      </div>
    </div>
  );
}
