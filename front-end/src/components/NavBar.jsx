import "./NavBar.css";

export default function NavBar(props) {
  const { loggedIn } = props;
  return (
    <nav className="navbar">
    <ul>
      <li><a className="active" href="/">Home</a></li>
      <li><a href="/login">Login</a></li>
    </ul>
    </nav>
  );
}