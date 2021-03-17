import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import "./CourseDetails.css";
import { CardHeader } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import { Player } from "video-react";

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

  console.log("history in course details", history);
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
    } 
    /*else if (fileType === "pdf" )
      return (
      <iframe src={material_url} height="100%" width="100%"></iframe>
      );
    }*/ 
    else if (fileType === "png" || fileType === "jpg"){
      return(
        <img src={material_url} width="100%" height="100%"/>
      );
    }
  };

  const enrollCourse = () => {
    const data = {};
    data["learnerid"] = learnerId;
    data["courseid"] = course_id;
    axios
      .post(`http://localhost:9001/enrollcourse`, { data })
      .then((response) => {
        console.log("response", response);
        setMessage("you have enrolled in the course successfully!");
      })
      .catch((error) => {
        console.log("error in enrolling course", error);
      });
  };

  return (
    <div className="coursedetails-container">
      <div className="course-material">{displayCourseMaterial()}</div>
      <div className="course-info">
        <Card className={classes.root}>
          <CardHeader title={name} subheader={created_at} />
          <CardContent>
            <Typography>{code}</Typography>
            <Typography color="textSecondary">{description}</Typography>
            <Typography variant="body2" component="p">
              {first_name}
              <br />
              {last_name}
              <br />
              {email}
            </Typography>
          </CardContent>
          <Button
            variant="contained"
            color="primary"
            size="large"
            className={classes.button}
            startIcon={<SaveIcon />}
            onClick={enrollCourse}
          >
            Save
          </Button>
          <button type="button" onClick={() => history.goBack()}>
            Back
          </button>
          {message && <span>{message}</span>}
        </Card>
      </div>
    </div>
  );
}
