import { useHistory } from "react-router-dom";
// import "./EducatorSideBar.css";

export default function EducatorSideBar(props) {
  console.log("props in educator sidebar", props);
  const history = useHistory();
  console.log("history in educator side bar", JSON.stringify(history));
  const user = history.location.state.user;

  const handleCreateNewCoursesClick = () => {
    history.push({ pathname: "/educator-createnewcourses", state: { user } });
  };
  //create new pathway
  const handleAccessRights = () =>{
    history.push({ pathname: "/educator-giveaccessrights", state: { user } });
  }

  return (
    <section className="educator-sidebar">
      <div className="profile">
        <div className="message">Hello</div>
        <div className="learner-overlay"></div>
      </div>
      <div className="educator-btn-group">
        <button className="btn-test" onClick={handleCreateNewCoursesClick}>Create new courses</button>
        <button className="btn-test" onClick={handleAccessRights}>Access Rights</button>
      </div>
    </section>);
} 

