import { useState } from "react";
import Card from "@material-ui/core/Card";
import clsx from "clsx";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import "./CourseCard.css";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y, EffectFade } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Carousel from 'react-elastic-carousel';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
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

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, EffectFade]);

export default function CourseCard(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  console.log("props in course card", props.courses);
  const coursesList = props.courses;

  const breakPoints = [{width: 768, itemsToShow:2}];
  const displayCourses = coursesList.map((course, index) => {
    return (
      <div className="educator-course-card" key={index}>
        <Card className={classes.root}>
          <CardMedia
            className={classes.media}
            image={course.image_url}
          />
          <CardHeader title={course.name} subheader={course.created_at} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">{course.code}</Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton
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

  return <div 
  className="courses-cards-container">
  <Carousel breakPoints = {breakPoints} className="course-card-swiper"
        // effect="fade"
        // spaceBetween={1}
        // slidesPerView={4}
        // navigation
        // pagination={{ clickable: true }}
        // scrollbar={{ draggable: true }}
        // onSwiper={(swiper) => console.log(swiper)}
      >{displayCourses}</Carousel>
  </div>;
}
