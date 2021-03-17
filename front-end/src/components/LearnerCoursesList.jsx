import { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y, EffectFade } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "./LearnerCoursesList.css";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    padding: "56.25%", // 16:9
  },
});

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, EffectFade]);

export default function LearnerCoursesList() {
  const history = useHistory();
  const learner = history.location.state.user;
  console.log("history in learner courses list", learner);
  const { firstname, lastname, email, id } = learner;
  const [courses, setCourses] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    axios
      .get(`http://localhost:9001/allcoursesforlearner`)
      .then((response) => {
        setCourses(response.data);
        console.log("response data", response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const displayCourses = courses.map((course, index) => {
    console.log("display courses", course.image_url);
    return (
      <SwiperSlide className="learner-course-card" key={index}>
        <Card className={classes.root}>
          <CardMedia className={classes.media} image={course.image_url} />
          <CardHeader title={course.name} subheader={course.created_at} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Course Code: {course.code}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Created By: {course.first_name}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              color="primary"
              onClick={() => handleLearnMoreClick(course)}
            >
              Learn More
            </Button>
          </CardActions>
        </Card>
      </SwiperSlide>
    );
  });

  const handleLearnMoreClick = (course) => {
    //console.log("learner", learner);
    course["learner"] = learner;
    console.log("course inside the click", learner);
    history.push({ pathname: "learner-coursedetails", state: course });
  };

  return (
    <div className="learner-allcourses-container">
      <span>New Courses</span>
      <Swiper
        effect="fade"
        spaceBetween={50}
        slidesPerView={10}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {courses && displayCourses}
      </Swiper>
    </div>
  );
}
