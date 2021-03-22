import { useState } from "react";
import Card from "@material-ui/core/Card";
import clsx from "clsx";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import Carousel from "react-elastic-carousel";
import "./RegisteredCourseCard.css";
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
  media: {
    height: 150,
    padding: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
}));

export default function RegisteredCourseCard(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const breakPoints = [{ width: 768, itemsToShow: 2 }];

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const coursesList = props.courses;

  const calDate = function (timeString) {
    return moment(timeString).fromNow();
  }

  const displayCourses = coursesList.map((course, index) => {
    return (
      <div className="learner-course-card" key={index}>
        <Card style={{width:"80%", backgroundColor: "#36453B", color: "silver"}}>
          <CardMedia className={classes.media} image={course.image_url} />
          <CardContent>
            <div className="registered-course-name">{course.name}</div>
            <div className="registered-course-code">{course.code}</div>
            <div className="enrollment-date">Enrolled: {calDate(course.enrollment)}</div>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton
              style={{color: "silver"}}
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph>Description:</Typography>
              <Typography paragraph>{course.description}</Typography>
            </CardContent>
          </Collapse>
        </Card>
      </div>
    );
  });
  return (
    <div className="courses-cards-container">
      <Carousel breakPoints={breakPoints}>{displayCourses}</Carousel>
    </div>
  );
}
