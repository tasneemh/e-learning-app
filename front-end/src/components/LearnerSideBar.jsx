import { useHistory } from "react-router-dom";
import { Animated } from "react-animated-css";
import "./Learner.css";

export default function LearnerSideBar(props) {
  console.log("props in learner sidebar", props);
  const history = useHistory();
  console.log("history in learner side bar", JSON.stringify(history));
  const user = history.location.state.user;
  const { firstname, lastname, email } = user;
  

  return (
    <section className="learner-sidebar">
      <div className="profile">
        <Animated
          animationIn="lightSpeedIn"
          animationOut="zoomOutDown"
          animationInDuration={1000}
          animationOutDuration={1000}
          isVisible={true}
        >
          <h3>HELLO,</h3>
        </Animated>
        <div className="learner-name">
          {firstname} {lastname}
        </div>
        <div className="learner-email">{email}</div>
        <div className="learner-overlay"></div>
      </div>
      <div className="learner-btn-group">
        <button className="btn-test">button test</button>
      </div>
    </section>
  );
}
