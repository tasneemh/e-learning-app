import { useHistory } from 'react-router-dom';

export default function Educator() {
  const history = useHistory();
  const educator = history.location.state.user;
  const { firstname, lastname, email, id } = educator;
  const handleCoursesClick = () => {
    history.push("/courses");
    //history.push("/educator/courses");
  };

  return (
    <>
      <span>Hello, {firstname} {lastname} {email} {id}</span>
      <div>
        <button>Statistic</button>
        <button onClick={handleCoursesClick}>Courses</button>
      </div>
    </>);
}
