import { useHistory } from "react-router-dom";
import LearnerSideBar from "./LearnerSideBar";


export default function Learner(props) {
  const history = useHistory();
  const learner = history.location.state.user;
  //console.log("history in learner", learner);
  const { firstname, lastname, email, id } = learner;
  return (
    <div className="learner-container">
      <span>
        {firstname} {lastname} {email} {id}
      </span>
      <LearnerSideBar learner={learner} />
      <div className="learner-content">
        <div className="learner-report"></div>
        <div className="learner-courses-list"></div>
      </div>
      
    </div>
  );
}
