import { useHistory } from 'react-router-dom';
import SideBar from './SideBar';

export default function Educator() {
  const history = useHistory();
  //console.log("history", JSON.stringify(history));
  const educator = history.location.state.user;
  //const { firstname, lastname, email, id } = educator;

  return (
    <SideBar educator={educator} />
  );

}
