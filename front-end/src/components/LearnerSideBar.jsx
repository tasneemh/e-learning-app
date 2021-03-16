import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { Animated } from "react-animated-css";

export default function LearnerSideBar(props) {
  console.log("props in learner sidebar", props);
  const history = useHistory();
  console.log("history in learner side bar", JSON.stringify(history));
  const user = history.location.state.user;
  const { firstname, lastname, email } = user;
  const userIcon = <FontAwesomeIcon icon={faUsers} />;

  return (
    <section className="sidebar">
      <div className="profile">
        <i className="user-icon">{userIcon}</i>
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
        <div className="overlay"></div>
      </div>
      <div className="learner-btn-group">
        <button>button test</button>
      </div>
    </section>
  );
}
