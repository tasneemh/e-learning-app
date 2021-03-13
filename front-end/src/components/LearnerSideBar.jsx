import { useHistory } from "react-router-dom";
export default function LearnerSideBar(props){
  console.log("props in learner sidebar", props);
  const history = useHistory();
  console.log("history in learner side bar", JSON.stringify(history));
  const user = history.location.state.user;

  return (
    <section className="sidebar">
      <div className="profile">
        <div className="message">Hello</div>
        <div className="overlay"></div>
      </div>
      <div className="learner-btn-group">
        <button>button test</button>
      </div>
    </section>);
}