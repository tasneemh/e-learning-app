import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import "./CourseDetails.css";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import { Player } from "video-react";
import moment from "moment";

const useStyles = makeStyles({
  root: {
    minWidth: 550,
  },
});

export default function CourseDetails() {
  const history = useHistory();
  const {
    course_id,
    name,
    code,
    description,
    created_at,
    first_name,
    last_name,
    email,
    material_url,
    material_file_format,
  } = history.location.state;

  const learnerId = history.location.state.learner.id;

  const classes = useStyles();
  const [message, setMessage] = useState("");

  const displayCourseMaterial = () => {
    const fileType = material_file_format.toLowerCase();
    if (fileType === "mp3" || fileType === "mp4") {
      return (
        <Player>
          <source src={material_url} />
        </Player>
      );
    } else if (fileType === "png" || fileType === "jpg") {
      /*else if (fileType === "pdf" )
      return (
      <iframe src={material_url} height="100%" width="100%"></iframe>
      );
    }*/
      return <img src={material_url} width="100%" height="100%" alt=""/>;
    }
  };

  const clearMessage = () => {
    setTimeout(() => {
      setMessage("");
    }, 10000);
  };

  const checkDuplicateCourse = (data) => {
    return axios
      .get(
        `http://localhost:9001/learner/${data.learnerid}/checkduplicatecourse/${data.courseid}`
      )
      .then((response) => {
        //console.log("response in checkDuplicateCourse ",response);
        console.log("response.data.message", response.data.message);
        if (
          response.data.message === "You have already enrolled for this course!"
        ) {
          console.log("SUCCESSFUL");
          setMessage("YOU HAVE ALREADY ENROLLED FOR THIS COURSE!");
          clearMessage();
          return true;
        } else {
          return false;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const enrollCourse = async () => {
    const data = {};
    data["learnerid"] = learnerId;
    data["courseid"] = course_id;
    const message = await checkDuplicateCourse(data);
    if (message) {
      return;
    } else {
      axios
        .post(`http://localhost:9001/enrollcourse`, { data })
        .then((response) => {
          setMessage("YOU HAVE ENROLLED SUCCESSFULLY IN THE COURSE!");
          clearMessage();
        })
        .catch((error) => {
          setMessage("ERROR IN ENROLLING COURSE");
          clearMessage();
        });
    }
  };

  const calDate = function (timeString) {
    return moment(timeString).fromNow();
  };

  return (
    <div className="coursedetails-container">
      <div className="course-material">{displayCourseMaterial()}</div>
      <div className="course-info">
        <Card
          style={{
            width: "100%",
            height: "50%",
            backgroundColor: "#36453B",
            color: "silver",
          }}
        >
          <CardContent>
            <div className="course-details-name">{name}</div>
            <div className="course-details-code">{code}</div>
            <div className="course-details-created-at">
              Created: {calDate(created_at)}
            </div>
            <div className="course-details-created-name">
              Created By: {first_name} {last_name}
            </div>
            <div className="course-details-created-email">{email} </div>
            <div className="course-details-description">{description} </div>
          </CardContent>
          <div className="learner-courseDetails-btn-container">
            <Button
              style={{
                width: "25%",
                height: "50%",
                backgroundColor: "silver",
                color: "black",
              }}
              variant="contained"
              className={classes.button}
              startIcon={<SaveIcon />}
              onClick={enrollCourse}
            >
              ENROLL
            </Button>
            <Button
              className={classes.button}
              style={{
                width: "25%",
                height: "50%",
                backgroundColor: "silver",
                color: "black",
              }}
              onClick={() => history.goBack()}
            >
              BACK
            </Button>
          </div>
          {message && <div className="enroll-msg">{message}</div>}
        </Card>
      </div>
    </div>
  );
}
