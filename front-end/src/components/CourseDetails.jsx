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
  const clearMessage = () =>{
    setTimeout(()=>{
      setMessage("");
    }, 10000);
  }
  const checkDuplicateCourse = (data) =>{
    console.log("data in duplicateCourse: ", 
    data);
    return axios
      .get(`http://localhost:9001/learner/${data.learnerid}/checkduplicatecourse/${data.courseid}`)
      .then((response) => {
        //console.log("response in checkDuplicateCourse ",response);
        //console.log("response.data.message", response.data.message);
        if (response.data.message === "You have already enrolled for this course!"){
        console.log("SUCCESSFUL");
        setMessage("YOU HAVE ALREADY ENROLLED FOR THIS COURSE!");
        clearMessage();
        return true;
        } else{
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
    console.log("data inside enroll course, ", data);
    const message = await checkDuplicateCourse(data);
    console.log("message inside enroll course", message);
      if (message){
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

  return (
    <div className="coursedetails-container">
      <div className="course-material">{displayCourseMaterial()}</div>
      <div className="course-info">
        <Card style = {{width:"100%", height: "50%", backgroundColor: "#36453B", color: "silver"}}>
          <CardContent>
            <div>{name}</div>
            <div>{code}</div>
            <div>{created_at}</div>
            <div>{first_name} {last_name} </div>
            <div>{email} </div>
            <div>{description} </div>
          </CardContent>
          <div className="learner-courseDetails-btn-container">
          <Button style = {{width:"25%", height: "50%", backgroundColor: "silver", color: "black"}}
            variant="contained"
            // color="primary"
            // size="large"
            className={classes.button}
            startIcon={<SaveIcon />}
            onClick={enrollCourse}
          >
            ENROLL
          </Button>
          <Button className={classes.button}style = {{width:"25%", height: "50%", backgroundColor: "silver", color: "black" }} onClick={() => history.goBack()}>
            BACK
          </Button>
          </div>
          {message && <div className="enroll-msg">{message}</div>}
        </Card>
      </div>
    </div>
  );
}
