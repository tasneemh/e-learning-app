import { useHistory } from 'react-router-dom';
import SideBar from './SideBar';
export default function Educator() {
  const history = useHistory();
  console.log("prop history", JSON.stringify(history));
  const educator = history.location.state.user;
  const { firstname, lastname, email, id } = educator;

  const handleCoursesClick = () => {
    console.log("redirect to educator/courses");
    history.push({pathname:"/educator-courses", state: { educator }});
  };

  return (
    <>
      <SideBar firstname={firstname} lastname={lastname} email={email}></SideBar>
      <div>
        <button>Statistic</button>
        <button onClick={handleCoursesClick}>Courses</button>
      </div>
    </>);
}
