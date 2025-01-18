import { useSearchParams } from "react-router-dom";
import { useApiQuery, usePaginatedApiQuery } from "../../hooks/useApi";
import {
  DatePosted,
  ExperienceLevel,
  Job,
  JobType,
  LocationType,
  Salary,
} from "../../models/models";
import Button from "../Button/Button";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import HorizontalLine from "../HorizontalLine/HorizontalLine";
import InlineForm from "../InlineForm/InlineForm";
import JobCard from "../JobCard/JobCard";
import Select from "../Select/Select";
import "./index.scss";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";
import { useEffect, useState } from "react";

export default function Explore() {
  const [searchParams] = useSearchParams();

  const title = searchParams.get("title") || "";
  const location = searchParams.get("location") || "";
  const [currentPage, setCurrentPage] = useState(1);
  const [totalJobs, setTotalJobs] = useState<Job[]>([]);

  const searchJob = usePaginatedApiQuery<Job[]>(
    ["jobs", title, location],
    `/api/jobs?title=${title}&location=${location}`,
    { page: currentPage, limit: 10 }
  );

  useEffect(() => {
    if (searchJob.data) {
      setTotalJobs((prev) => [...prev, ...searchJob.data.data]);
    }
  }, [searchJob.data]);

  const jobTypes = useApiQuery<JobType[]>(
    ["jobType"],
    `/api/filters/job-types`
  );
  const experienceLevels = useApiQuery<ExperienceLevel[]>(
    ["experienceLevel"],
    `/api/filters/experience-levels`
  );

  const locationTypes = useApiQuery<LocationType[]>(
    ["locationType"],
    `/api/filters/location-types`
  );

  const datePosted = useApiQuery<DatePosted[]>(
    ["datePosted"],
    `/api/filters/date-posted`
  );
  const salary = useApiQuery<Salary[]>(
    ["salary"],
    `/api/filters/salary-ranges`
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
                options={
                  datePosted.data?.data?.map((date) => ({
                    value: date.value,
                    label: date.label,
                  })) || []
                }
                defaultValue={"Date Posted"}
              />
              <Select
                label="Salary"
                options={
                  salary.data?.data?.map((salary) => ({
                    value: salary.value,
                    label: salary.label,
                  })) || []
                }
                defaultValue={"Salary"}
              />
              <Select
                label="Job Type"
                options={
                  jobTypes.data?.data?.map((jobType) => ({
                    value: jobType.value,
                    label: jobType.label,
                  })) || []
                }
                defaultValue={"Job Type"}
              />

              <Select
                label="Experience Level"
                options={
                  experienceLevels.data?.data?.map((experienceLevel) => ({
                    value: experienceLevel.value,
                    label: experienceLevel.label,
                  })) || []
                }
                defaultValue={"Experience Level"}
              />
              <Select
                label="Location"
                options={
                  locationTypes.data?.data?.map((locationType) => ({
                    value: locationType.value,
                    label: locationType.label,
                  })) || []
                }
                defaultValue={"Location"}
              />
            </div>
          </div>
        </div>
        <HorizontalLine />
        <div className="explore__jobs">
          <p className="explore__jobs__count">
            <span>We've found </span>
            {new Intl.NumberFormat().format(totalJobs.length)}
            <span> job postings</span>
          </p>
          {searchJob.isFetching && <LoadingIndicator />}
          {totalJobs.map((job) => (
            <div className="explore__jobs__job" key={job._id}>
              <JobCard job={job} />
            </div>
          ))}
          <div className="explore__jobs__load-more">
            {searchJob.data?.metadata.totalPages === currentPage ? (
              <Button color="blue" type="button" disabled>
                No more job postings to show :(
              </Button>
            ) : (
              <Button
                color="dark"
                type="button"
                onClick={() => setCurrentPage((prev) => prev + 1)}
              >
                {searchJob.isFetching ? <LoadingIndicator /> : "Load more jobs"}
              </Button>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
