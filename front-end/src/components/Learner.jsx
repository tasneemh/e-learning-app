import { useHistory } from 'react-router-dom';

export default function Learner() {
  const history = useHistory();
  const learner = history.location.state.user;
  const { firstname, lastname, email, id } = learner;
  return <span>Hello {firstname} {lastname} {email} {id}</span>;
}