import Button from "../Button/Button";
import "./index.scss";

export default function Header() {
  return (
    <nav className="header">
      <ul className="header__nav">
        <li>
          <span className="header__nav__logo">
            <svg viewBox="0 0 24 24">
              <path d="M0 0h24v24H0V0z" fill="none"></path>
              <path d="M14 6V4h-4v2h4zM4 8v11h16V8H4zm16-2c1.11 0 2 .89 2 2v11c0 1.11-.89 2-2 2H4c-1.11 0-2-.89-2-2l.01-11c0-1.11.88-2 1.99-2h4V4c0-1.11.89-2 2-2h4c1.11 0 2 .89 2 2v2h4z"></path>
            </svg>
            <h1>JobSnap</h1>
          </span>
        </li>
        <div className="header__nav__center">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/explore">Explore</a>
          </li>
          <li>
            <a href="/">Post A Job</a>
          </li>
          <li>
            <a href="/search">Search</a>
          </li>
        </div>
        <li>
          <Button color="dark" type="button">
            Log in
          </Button>
        </li>
      </ul>
    </nav>
  );
}
