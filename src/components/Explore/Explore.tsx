import Card from "../Card/Card";
import Header from "../Header/Header";
import HorizontalLine from "../HorizontalLine/HorizontalLine";
import InlineForm from "../InlineForm/InlineForm";
import Select from "../Select/Select";
import "./index.scss";
import Wallet from "/assets/images/Wallet.png";

export default function Explore() {
  return (
    <>
      <Header />
      <div className="explore">
        <div className="explore__wrapper">
          <p className="explore__wrapper__title pageTitle">Explore Jobs</p>
        </div>
        <div className="explore__wrapper__container">
          <div className="explore__wrapper__container__form">
            <InlineForm />
          </div>
          <div className="explore__wrapper__container__filter">
            <span className="explore__wrapper__container__filter__text">
              Filter By:
            </span>
            <div className="explore__wrapper__container__filter__categories">
              <Select
                label="Date Posted"
                options={[
                  //dbden gelecek
                  { value: "oldest", label: "Oldest" },
                  { value: "newest", label: "Newest" },
                ]}
                defaultValue={"Date Posted"}
              />
              <Select
                label="Salary"
                options={[
                  //dbden gelecek
                  { value: "asc", label: "Ascending" },
                  { value: "desc", label: "Descending" },
                ]}
                defaultValue={"Salary"}
              />
              <Select
                label="Job Type"
                options={[
                  //dbden gelecek
                  { value: "full-time", label: "Full-time" },
                  { value: "part-time", label: "Part-time" },
                  { value: "internship", label: "Internship" },
                ]}
                defaultValue={"Job Type"}
              />

              <Select
                label="Experience Level"
                options={[
                  //dbden gelecek
                  { value: "entry", label: "Entry" },
                  { value: "mid", label: "Mid" },
                  { value: "senior", label: "Senior" },
                ]}
                defaultValue={"Experience Level"}
              />
              <Select
                label="Location"
                options={[
                  //dbden gelecek
                  { value: "remote", label: "Remote" },
                  { value: "office", label: "Office" },
                  { value: "hybrid", label: "Hybrid" },
                ]}
                defaultValue={"On-site/Remote"}
              />
            </div>
          </div>
        </div>
        <HorizontalLine />
        <div className="explore__jobs">
          <p className="explore__jobs__count">
            We've found {new Intl.NumberFormat().format(3730)} job postings
          </p>
          <div className="explore__jobs__job"></div>
        </div>
      </div>
    </>
  );
}
