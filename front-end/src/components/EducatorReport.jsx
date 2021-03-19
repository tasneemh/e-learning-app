import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import HorizontalBarChart from "./HorizontalBarChart";

export default function EducatorReport() {
  const history = useHistory();
  //console.log("history in educator report", JSON.stringify(history));
  const educator = history.location.state.user;
  const { firstname, lastname, email, id } = educator;
  const [totalLearners, setTotalLearners] = useState();
  const [totalCourses, setTotalCourses] = useState();
  const [numLearnersForCourses, setNumLearnersForCourses] = useState([]);

  useEffect(() => {
    Promise.all([
      axios.get(`http://localhost:9001/educator/${id}/totallearnersandcourses`),
      axios.get(`http://localhost:9001/educator/${id}/learnersforcourses`),
    ]).then((all) => {
      const [newTotalCount, newTotalNumLearnersForCourses] = all;
      setTotalLearners(newTotalCount.data.total_learners);
      setTotalCourses(newTotalCount.data.total_courses);
      setNumLearnersForCourses(newTotalNumLearnersForCourses.data);
    });
  }, [id]);

  return (
    <div>
      <div className="total-number">
      There are a total of <span  className="bold-number">{totalLearners ? totalLearners : 0}</span>individual learners enrolled in 
        <span className="bold-number">{totalCourses ? totalCourses : 0} </span> different courses
      </div>
      {numLearnersForCourses && (
        <HorizontalBarChart numLearnersForCourses={numLearnersForCourses}/>
      )}
    </div>
  );
}
