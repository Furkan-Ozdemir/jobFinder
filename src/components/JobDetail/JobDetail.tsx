import { Link } from "react-router-dom";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import "./index.scss";
import JobTag from "../JobTag/JobTag";
import Wallet from "/assets/images/Wallet.png";

export default function JobDetail() {
  return (
    <>
      <Header />
      <div className="jobDetail">
        <div className="jobDetail__details">
          <div className="jobDetail__details__breadCrumb">
            <ul className="jobDetail__details__breadCrumb__list">
              <li className="jobDetail__details__breadCrumb__list__item">
                <Link to="/explore">Explore</Link>
              </li>
              <li>Marketing sales representative</li>
            </ul>
          </div>
          <div className="jobDetail__details__company-main">
            <div className="jobDetail__details__company-main__apply__container">
              <div className="flex">
                <div className="jobDetail__details__company-main__logo">
                  <svg height={35} width={35} viewBox="0 0 24 24">
                    <path d="M0 0h24v24H0z" fill="none"></path>
                    <path d="m19 9 1.25-2.75L23 5l-2.75-1.25L19 1l-1.25 2.75L15 5l2.75 1.25L19 9zm-7.5.5L9 4 6.5 9.5 1 12l5.5 2.5L9 20l2.5-5.5L17 12l-5.5-2.5zM19 15l-1.25 2.75L15 19l2.75 1.25L19 23l1.25-2.75L23 19l-2.75-1.25L19 15z"></path>
                  </svg>
                </div>
                <div className="jobDetail__details__company-main__info">
                  <p className="jobDetail__details__company-main__info__job">
                    Marketing sales representative
                  </p>
                  <p className="jobDetail__details__company-main__info__company">
                    Company Name
                  </p>
                </div>
              </div>
              <div className="jobDetail__details__company-main__apply__container__apply">
                <Link to={`/job/1/apply`}>
                  <span>Apply now</span>
                  <svg
                    height={20}
                    width={20}
                    color="#fff"
                    fill="#fff"
                    viewBox="0 0 24 24"
                  >
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path d="M9 5v2h6.59L4 18.59 5.41 20 17 8.41V15h2V5H9z"></path>
                  </svg>
                </Link>
              </div>
            </div>
            <div className="jobDetail__details__company-main__details">
              <div>
                <div className="jobDetail__details__company-main__details__address">
                  <div className="jobDetail__details__company-main__details__address__img">
                    <svg height={24} width={24} viewBox="0 0 24 24">
                      <path d="M0 0h24v24H0z" fill="none"></path>
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z"></path>
                    </svg>
                  </div>
                  <div className="jobDetail__details__company-main__details__address__text">
                    Magic Street 676/51, London
                  </div>
                </div>
                <div className="jobDetail__details__company-main__details__count">
                  <div className="jobDetail__details__company-main__details__count__img">
                    <svg height={24} width={24} viewBox="0 0 24 24">
                      <path fill="none" d="M0 0h24v24H0z"></path>
                      <path d="M17 19.22H5V7h7V5H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-7h-2v7.22z"></path>
                      <path d="M19 2h-2v3h-3c.01.01 0 2 0 2h3v2.99c.01.01 2 0 2 0V7h3V5h-3V2zM7 9h8v2H7zm0 3v2h8v-2h-3zm0 3h8v2H7z"></path>
                    </svg>
                  </div>
                  <div className="jobDetail__details__company-main__details__count__text">
                    139 Applicants
                  </div>
                </div>
              </div>
              <div className="jobDetail__details__company-main__details__description">
                <p>
                  Join our dynamic team as a Marketing Sales Representative,
                  where you'll leverage your exceptional interpersonal skills
                  and strategic mindset to drive sales and build lasting client.
                </p>
              </div>
              <div className="jobDetail__details__company-main__details__tags">
                <JobTag text="Full-time" icon={Wallet} jobDetail />
                <JobTag text="Full-time" icon={Wallet} jobDetail />
                <JobTag text="Full-time" icon={Wallet} jobDetail />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
}
