import { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Carousel from "react-elastic-carousel";
import moment from "moment";
import "./LearnerCoursesList.css";


const useStyles = makeStyles({
  media: {
    height: 0,
    padding: "56.25%", // 16:9
  },
});

export default function LearnerCoursesList() {
  const history = useHistory();
  const learner = history.location.state.user;
  const { id } = learner;
  const [courses, setCourses] = useState([]);
  const classes = useStyles();
  const breakPoints = [{ width: 768, itemsToShow: 2 }];

  useEffect(() => {
    axios
      .get(`http://localhost:9001/allcoursesforlearner`)
      .then((response) => {
        setCourses(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const calDate = function (timeString) {
    return moment(timeString).fromNow();
  };

  const displayCourses = courses.map((course, index) => {
    console.log("display courses", course);
    return (
      <div className="learner-course-card" key={index}>
        <Card
          style={{ width: "80%", backgroundColor: "#36453B", color: "silver" }}
        >
          <CardMedia className={classes.media} image={course.image_url} />
          <CardContent>
            <div className="allcourse-name">{course.name}</div>
            <div className="allcourse-code">{course.code}</div>
            <div className="allcourse-created">
              Created: {calDate(course.created_at)}
            </div>
            <div className="allcourse-educator">
              Created By: {course.first_name} {course.last_name}
            </div>
          </CardContent>
          <CardActions>
            <Button
              style={{
                width: "40%",
                backgroundColor: "silver",
                color: "black",
              }}
              size="small"
              onClick={() => handleLearnMoreClick(course)}
            >
              Learn More
            </Button>
          </CardActions>
        </Card>
      </div>
    );
  });

  const handleLearnMoreClick = (course) => {
    course["learner"] = learner;
    history.push({ pathname: "learner-coursedetails", state: course });
  };

  return (
    <div>
      <div className="learner-allcourses-container">
        <Carousel breakPoints={breakPoints}>
          {courses && displayCourses}
        </Carousel>
      </div>
    </div>
  );
}
