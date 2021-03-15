import { useHistory } from 'react-router-dom';
import EducatorSideBar from "./EducatorSideBar";
import EducatorCoursesList from './EducatorCoursesList';
import EducatorReport from "./EducatorReport";
import "./Educator.css";

export default function Educator() {
  const history = useHistory();
  console.log("educator history", JSON.stringify(history));
  const educator = history.location.state.user;
  const { firstname, lastname, email, id } = educator;

  return (
    <div className="educator-container">
      <span>{firstname} {lastname} {email} {id}</span>
      <EducatorSideBar educator={educator} />
      <div className="educator-content">
        <div className="educator-report">
          <EducatorReport />
        </div>
        <div className="educator-courses-list">
          <EducatorCoursesList />
        </div>
      </div>
    </div>
  );
}
