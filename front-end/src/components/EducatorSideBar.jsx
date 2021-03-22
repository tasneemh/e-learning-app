import { useHistory } from "react-router-dom";
import "./EducatorSideBar.css";

export default function EducatorSideBar(props) {
  console.log("props in educator sidebar", props);
  const history = useHistory();

  console.log("history in educator side bar", JSON.stringify(history));

  const user = history.location.state.user;
  const { firstname, lastname, email } = user;

  const handleCreateNewCourseClick = () => {
    history.push({ pathname: "/educator-createnewcourses", state: { user } });
  };
  //create new pathway
  const handleAccessRights = () =>{
    history.push({ pathname: "/educator-giveaccessrights", state: { user } });
  }

  return (
    <section className="educator-sidebar">
      <img className="profile-img" src="/images/educatorprofile.jpg" alt="educator-img"/>
      <div className="sidebar-profile">
        <div className="greeting-message">HELLO,</div>
        <div className="sidebar-name">{firstname} {lastname}</div>
        <div className="sidebar-email">{email}</div>
      </div>
      <div className="educator-btn-group">

        
        <button className="btn-test" onClick={handleAccessRights}>Access Rights</button>

        <button className="create-new-course-btn" onClick={handleCreateNewCourseClick}>Create New Course</button>

      </div>
    </section>);
} 

