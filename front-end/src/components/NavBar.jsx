import "./NavBar.css";

export default function NavBar() {
  return (
    <nav className="navbar">
    <ul>
      <li><a className="active" href="/">Home</a></li>
      <li><a href="/login">Login</a></li>
    </ul>
    </nav>
    );
}