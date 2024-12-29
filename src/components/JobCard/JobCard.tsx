import { Link } from "react-router-dom";
import JobTag from "../JobTag/JobTag";
import "./index.scss";
import Wallet from "/assets/images/Wallet.png";

export default function JobCard() {
  const getCompanycolor = () => {
    const colors = [
      "#bceee0",
      "#ffd0fc",
      "#c5f0f8",
      "#cbf0b0",
      "#f3f9aa",
      "#d7d0ff",
      "#597ae8",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };
  return (
    <div className="job-card">
      <div className="job-card__upper">
        <div className="job-card__upper__left">
          <div
            className="job-card__upper__left__logo"
            style={{ backgroundColor: getCompanycolor() }}
          >
            <svg height={34} width={34} viewBox="0 0 24 24">
              <path d="M0 0h24v24H0z" fill="none"></path>
              <path d="M7.5 5.6 10 7 8.6 4.5 10 2 7.5 3.4 5 2l1.4 2.5L5 7zm12 9.8L17 14l1.4 2.5L17 19l2.5-1.4L22 19l-1.4-2.5L22 14zM22 2l-2.5 1.4L17 2l1.4 2.5L17 7l2.5-1.4L22 7l-1.4-2.5zm-7.63 5.29a.996.996 0 0 0-1.41 0L1.29 18.96a.996.996 0 0 0 0 1.41l2.34 2.34c.39.39 1.02.39 1.41 0L16.7 11.05a.996.996 0 0 0 0-1.41l-2.33-2.35zm-1.03 5.49-2.12-2.12 2.44-2.44 2.12 2.12-2.44 2.44z"></path>
            </svg>
          </div>
          <div>
            <div className="job-card__upper__left__job">
              Sales representative
            </div>
            <div className="job-card__upper__left__company">Science Inc.</div>
          </div>
        </div>
        <div className="job-card__upper__right">
          <Link to="/job/1">
            <span>apply</span>
            <svg
              height={20}
              width={20}
              color="#4869d7"
              fill="#4869d7"
              viewBox="0 0 24 24"
            >
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path d="M9 5v2h6.59L4 18.59 5.41 20 17 8.41V15h2V5H9z"></path>
            </svg>
          </Link>
        </div>
      </div>
      <div className="job-card__lower">
        <div className="job-card__lower__description">
          Full-time hours with amazing overtime opportunities! Working in
          supportive environment with great opportunities to grow.
        </div>
        <div className="job-card__lower__tags">
          {/* // TODO taglar backendden gelecek */}
          <JobTag text="Full-time" icon={Wallet} />
          <JobTag text="Full-time" icon={Wallet} />
          <JobTag text="Full-time" icon={Wallet} />
        </div>
      </div>
    </div>
  );
}
