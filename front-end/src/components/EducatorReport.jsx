import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function EducatorReport() {
  const history = useHistory();
  console.log("history in educator report", JSON.stringify(history));
  const educator = history.location.state.user;
  const { firstname, lastname, email, id } = educator;
  const [learner, setLearner] = useState(0);

  useEffect(() => {
    Promise.all([
      axios.get("/eudcator/:id/totallearners"),
      axios.get("/eudcator/:id/learnersforcourses"),
    ]).then((all) => {
      setLearner((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  return <span>this is where the statisitic goes !</span>;
}
