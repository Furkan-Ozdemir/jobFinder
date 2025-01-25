import { useSearchParams } from "react-router-dom";
import { useApiQuery, usePaginatedApiQuery } from "../../hooks/useApi";
import {
  DatePosted,
  ExperienceLevel,
  Job,
  JobType,
  WorkModelType,
  Salary,
} from "../../models/models";
import Button from "../Button/Button";

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
  const [filteredJobs, setFilteredJobs] = useState<Job[]>(totalJobs);
  const [currentFilters, setCurrentFilters] = useState({
    jobType: "",
    experienceLevel: "",
    workModel: "",
    datePosted: "",
    salary: "",
  });

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

  const employmentTypes = useApiQuery<JobType[]>(
    ["jobType"],
    `/api/filters/job-types`
  );
  const experienceLevels = useApiQuery<ExperienceLevel[]>(
    ["experienceLevel"],
    `/api/filters/experience-levels`
  );

  const workModels = useApiQuery<WorkModelType[]>(
    ["workModel"],
    `/api/filters/work-models`
  );

  const datePosted = useApiQuery<DatePosted[]>(
    ["datePosted"],
    `/api/filters/date-posted`
  );
  const salary = useApiQuery<Salary[]>(
    ["salary"],
    `/api/filters/salary-ranges`
  );

  const filterJobs = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newFilters = {
      ...currentFilters,
      [e.target.name]: e.target.value,
    };
    setCurrentFilters(newFilters);

    let filtered = totalJobs;
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value) {
        filtered = filtered.filter((job) => {
          const jobValue = job[key as keyof Job];
          if (typeof jobValue === "string") {
            return jobValue.toLowerCase() === value.toLowerCase();
          }
          return false;
        });
      }
    });

    setFilteredJobs(filtered);
  };

  useEffect(() => {
    filterJobs({
      target: { name: "", value: "" },
    } as React.ChangeEvent<HTMLSelectElement>);
  }, [totalJobs]);

  return (
    <main>
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
              {/* TODO Joblarin date i yok */}
              <Select
                label="Date Posted"
                name="datePosted"
                options={
                  datePosted.data?.data?.map((date) => ({
                    value: date.value,
                    label: date.label,
                  })) || []
                }
                defaultValue={"Date Posted"}
                onChange={filterJobs}
              />
              {/* TODO Salary i yok */}
              <Select
                label="Salary"
                name="salary"
                options={
                  salary.data?.data?.map((salary) => ({
                    value: salary.value,
                    label: salary.label,
                  })) || []
                }
                defaultValue={"Salary"}
                onChange={filterJobs}
              />
              <Select
                label="Employment Type"
                name="employment_type"
                options={
                  employmentTypes.data?.data?.map((employmentType) => ({
                    value: employmentType.value,
                    label: employmentType.label,
                  })) || []
                }
                defaultValue={"Employment Type"}
                onChange={filterJobs}
              />

              <Select
                label="Experience Level"
                name="experience_level"
                options={
                  experienceLevels.data?.data?.map((experienceLevel) => ({
                    value: experienceLevel.value,
                    label: experienceLevel.label,
                  })) || []
                }
                defaultValue={"Experience Level"}
                onChange={filterJobs}
              />
              <Select
                label="Work Model"
                name="work_model"
                options={
                  workModels.data?.data?.map((workModel) => ({
                    value: workModel.value,
                    label: workModel.label,
                  })) || []
                }
                defaultValue={"Work Model"}
                onChange={filterJobs}
              />
            </div>
          </div>
        </div>
        <HorizontalLine />
        <div className="explore__jobs">
          <p className="explore__jobs__count">
            <span>We've found </span>
            {new Intl.NumberFormat().format(
              searchJob.data?.metadata.total || 0
            )}
            <span> job postings</span>
          </p>
          {searchJob.isLoading && <LoadingIndicator />}
          {filteredJobs.map((job) => (
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
                {searchJob.isLoading ? <LoadingIndicator /> : "Load more jobs"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
