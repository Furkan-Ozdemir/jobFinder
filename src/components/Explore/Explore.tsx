import { useSearchParams } from "react-router-dom";
import { useApiQuery } from "../../hooks/useApi";
import { Job } from "../../models/models";
import Button from "../Button/Button";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import HorizontalLine from "../HorizontalLine/HorizontalLine";
import InlineForm from "../InlineForm/InlineForm";
import JobCard from "../JobCard/JobCard";
import Select from "../Select/Select";
import "./index.scss";

export default function Explore() {
  const [searchParams] = useSearchParams();

  const title = searchParams.get("title") || "";
  const location = searchParams.get("location") || "";

  const searchJob = useApiQuery<Job[]>(
    ["jobs", title, location],
    `/api/jobs?title=${title}&location=${location}`
  );

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
                  { value: "asc", label: "$$$" },
                  { value: "desc", label: "$" },
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
                  { value: "jr", label: "Junior" },
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
          {/* //TODO dbden gelecek */}
          {searchJob.data?.data?.map((job) => (
            <div className="explore__jobs__job" key={job.id}>
              <JobCard job={job} />
            </div>
          ))}
          <div className="explore__jobs__load-more">
            <Button color="dark" type="button">
              Load More
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
