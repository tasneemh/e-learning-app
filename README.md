## EDUCATIONAL WEB APPLICATION
The web application that is built to give access to quality education to all the learners coming from all walks of life all across the world. The educators can create new courses and improve their course content with the help of data visualization dashboard.

# SCREENSHOTS
!["Screenshot of home"](https://github.com/tasneemh/e-learning-app/blob/master/images/home.png?raw=true)
!["Screenshot of register"](https://github.com/tasneemh/e-learning-app/blob/master/images/register.png?raw=true)
!["Screenshot of login"](https://github.com/tasneemh/e-learning-app/blob/master/images/login.png?raw=true)
!["Screenshot of educator"](https://github.com/tasneemh/e-learning-app/blob/master/images/educator1.png?raw=true)
!["Screenshot of educator mycourses"](https://github.com/tasneemh/e-learning-app/blob/master/images/educatorcourses.png?raw=true)
!["Screenshot of educator courses expansion"](https://github.com/tasneemh/e-learning-app/blob/master/images/educatorcoursesexpand.png?raw=true)
!["Screenshot of educator courses with access rights"](https://github.com/tasneemh/e-learning-app/blob/master/images/educatorcoursesaccessrights.png?raw=true)
!["Screenshot of educator create new course"](https://github.com/tasneemh/e-learning-app/blob/master/images/educatorcreatenewcourse.png?raw=true)
!["Screenshot of educator create new course in dashboard"](https://github.com/tasneemh/e-learning-app/blob/master/images/educatornewcourseindashboard.png?raw=true)
!["Screenshot of educator new course in my courses"](https://github.com/tasneemh/e-learning-app/blob/master/images/educatornewcourseinmycourses.png?raw=true)
!["Screenshot of educator giving course access rights"](https://github.com/tasneemh/e-learning-app/blob/master/images/educatoronegivenaccessrights.png?raw=true)
!["Screenshot of educator demo given access rights"](https://github.com/tasneemh/e-learning-app/blob/master/images/educatordemoaccessrights.png?raw=true)
!["Screenshot of learner mycourses"](https://github.com/tasneemh/e-learning-app/blob/master/images/learneronemycourses.png?raw=true)
!["Screenshot of learner new courses"](https://github.com/tasneemh/e-learning-app/blob/master/images/learneronenewcourses.png?raw=true)
!["Screenshot of learner course learn more info"](https://github.com/tasneemh/e-learning-app/blob/master/images/learnercourselearnmoreinfo.png?raw=true)

!["Screenshot of learner enroll for new course"](https://github.com/tasneemh/e-learning-app/blob/master/images/learnerenrollfornewcourse.png?raw=true)
!["Screenshot of learner new course enrolled in my courses"](https://github.com/tasneemh/e-learning-app/blob/master/images/learnercourseenrolledinmycourses.png?raw=true)

# Dependencies
- React
- CSS
- Node.js
- Express
- Postgre SQL
- Firebase
- Coudinary
- Axios

# Technology
This is a full stack web application that is built by using React, HTML and CSS on front-end and Express, Node.js and PostgreSQL on backend. The login authentication is done using firebase while the course content such as .png, .jpeg, .mp4 are uploaded on Cloudinary.

# Getting Started
- Install all dependencies (using the npm install command).
- Start the front-end server using the npm start command. The app will be served at http://localhost:9000/
- Start the back-end server using the npm start command. 

# How to use the application?
- Educators and learners can register by clicking on the login button on home page. The users will be redirected to register page once they click on register link.
- The educators on logging in will be redirected to educator page where they can see a data visualization dashboard which provides the information on the number of learners enrolled in each course created by that educator.
- Once the educator scrolls down the page, they can view all the courses created by them in my courses section.
- On further scrolling, the educators can view the courses for which they have been provided access rights created by other educators.
- The side bar has 2 buttons, one for creating new courses and the other to provide access rights.
- On clicking the create new courses button, the educator is redirected to create new course form page. Once the course is successfully created, the newly created course information is available in the data visualization dashboard and my courses section.
- On clicking the access rights button, the educator is redirected to access form where they can provide the course and educator information whom they want to provide the access rights with.
- Learner on registering/ logging in is redirected to learner page where they can check all the courses that they have already enrolled in. 
- Upon scrolling down,learner can find all the new courses that are created by different educators in the app.
- By clicking on learn more button on each course, learner is redirected to course information and they can enroll in a course by clicking on enroll button.
- The newly enrolled course is available in my courses section of learner.


