import { Link } from "react-router-dom";
import "./index.scss";

export default function Footer() {
  return (
    <footer className="footer">
      <nav className="footer__container">
        <ul className="footer__container__list">
          <span className="footer__container__list__title">Job Offers</span>
          <li>
            <Link to={"/"}>Job Openings</Link>
          </li>
          <li>
            <Link to={"/"}>Employers</Link>
          </li>
          <li>
            <Link to={"/"}>Part-time jobs</Link>
          </li>
          <li>
            <Link to={"/"}>Students</Link>
          </li>
          <li>
            <Link to={"/"}>NGO</Link>
          </li>
          <li>
            <Link to={"/"}>Remote Work</Link>
          </li>
        </ul>
        <ul className="footer__container__list">
          <span className="footer__container__list__title">Tips</span>
          <li>
            <Link to={"/"}>How to write a CV</Link>
          </li>
          <li>
            <Link to={"/"}>Tax Calculator</Link>
          </li>
        </ul>
        <ul className="footer__container__list">
          <span className="footer__container__list__title">My Jobs</span>
          <li>
            <Link to={"/"}>Overview</Link>
          </li>
          <li>
            <Link to={"/"}>Saved</Link>
          </li>
          <li>
            <Link to={"/"}>Application History</Link>
          </li>
        </ul>
        <ul className="footer__container__list">
          <span className="footer__container__list__title">Follow us</span>
          <li>
            <Link to={"/"}>Facebook</Link>
          </li>
          <li>
            <Link to={"/"}>Twitter</Link>
          </li>
          <li>
            <Link to={"/"}>Instagram</Link>
          </li>
          <li>
            <Link to={"/"}>Linkedin</Link>
          </li>
        </ul>
      </nav>
    </footer>
  );
}
