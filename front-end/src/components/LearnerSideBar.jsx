import { useHistory } from "react-router-dom";
import "./Learner.css";

export default function LearnerSideBar(props) {
  console.log("props in learner sidebar", props);
  const history = useHistory();
  console.log("history in learner side bar", JSON.stringify(history));
  const user = history.location.state.user;
  const { firstname, lastname, email } = user;
  

  return (
    <section className="learner-sidebar">
      <img className="profile-img" src="/images/learnerprofile.jpg" alt="learner-img"/>
      <div className="sidebar-profile">
        <div className="greeting-message">HELLO,</div>
        <div className="sidebar-name">{firstname} {lastname}</div>
        <div className="sidebar-email">{email}</div>
      </div>
      <div className="learner-btn-group">
      </div>
    </section>
  );
}
