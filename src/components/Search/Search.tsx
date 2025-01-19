import { useState } from "react";
import Button from "../Button/Button";
import ClickableTag from "../ClickableTag/ClickableTag";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import InputField from "../InputField/InputField";
import Select from "../Select/Select";
import JobCard from "../JobCard/JobCard";
import "./index.scss";
import { useApiQuery, usePaginatedApiQuery } from "../../hooks/useApi";
import { JobCategory, Job } from "../../models/models";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";

export default function Search() {
  const [timeRange, setTimeRange] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [salaryRange, setSalaryRange] = useState("");
  const [selectedEmploymentTypes, setSelectedEmploymentTypes] = useState<
    string[]
  >([]);
  const [selectedExperienceTypes, setSelectedExperienceTypes] = useState<
    string[]
  >([]);
  const [currentPage, setCurrentPage] = useState(1);

  const categories = useApiQuery<JobCategory[]>(
    ["categories"],
    "/api/categories"
  );

  const handleEmployementTagClick = (value: string) => {
    setSelectedEmploymentTypes((prev) => {
      if (prev.includes(value)) {
        return prev.filter((type) => type !== value);
      }
      return [...prev, value];
    });
  };

  const handleExperienceTagClick = (value: string) => {
    setSelectedExperienceTypes((prev) => {
      if (prev.includes(value)) {
        return prev.filter((type) => type !== value);
      }
      return [...prev, value];
    });
  };

  const advancedSearchResults = usePaginatedApiQuery<Job[]>(
    [
      "jobs",
      timeRange,
      jobTitle,
      category,
      location,
      salaryRange,
      ...selectedEmploymentTypes,
      ...selectedExperienceTypes,
    ],
    `/api/jobs/advancedSearch?title=${jobTitle}&location=${location}&salaryRange=${salaryRange}&employmentTypes=${selectedEmploymentTypes.join(
      ","
    )}&experienceTypes=${selectedExperienceTypes.join(
      ","
    )}&timeRange=${timeRange}&category=${category}`,
    { page: currentPage, limit: 10 },
    {
      enabled: false,
    }
  );

  const handleSearch = () => {
    advancedSearchResults.refetch();
  };
  return (
    <div className="container">
      <Header />
      <main>
        <div className="search">
          <div className="search__title">Advanced job search</div>
          <div className="search__filters">
            <div>
              <div className="search__filters__item">
                <label htmlFor="Time range">Time range</label>
                <Select
                  label="Time range"
                  options={[
                    { value: "24_hours", label: "Last 24 hours" },
                    { value: "7_days", label: "Last 7 days" },
                    { value: "30_days", label: "Last 30 days" },
                  ]}
                  value={timeRange}
                  defaultValue={""}
                  onChange={(e) => setTimeRange(e.target.value)}
                />
              </div>
              <InputField
                label="Job title"
                placeholder="i.e. Ruby Developer"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
              />
              <div className="search__filters__item">
                <label htmlFor="Category">Category</label>
                <Select
                  label="Category"
                  options={
                    categories.data?.data?.map((category) => ({
                      value: category.category_name,
                      label: category.category_name,
                    })) || []
                  }
                  defaultValue=""
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </div>
              <div className="search__filters__tags">
                <p className="search__filters__tags__title">Job Type</p>
                <div className="search__filters__tags__container">
                  <ClickableTag
                    label="Full Time"
                    value="full"
                    onClick={handleEmployementTagClick}
                  />
                  <ClickableTag
                    label="Part Time"
                    value="part"
                    onClick={handleEmployementTagClick}
                  />
                  <ClickableTag
                    label="On-site"
                    value="onsite"
                    onClick={handleEmployementTagClick}
                  />
                  <ClickableTag
                    label="Remote"
                    value="remote"
                    onClick={handleEmployementTagClick}
                  />
                  <ClickableTag
                    label="Internship"
                    value="internship"
                    onClick={handleEmployementTagClick}
                  />
                </div>
              </div>
            </div>
            <div>
              <div className="search__filters__item">
                <label htmlFor="Salary Range">Salary Range</label>
                <Select
                  label="Salary range"
                  options={[
                    { value: "0-30", label: "0-30k" },
                    { value: "30-60", label: "30k-60k" },
                    { value: "60-90", label: "60k-90k" },
                    { value: "90-120", label: "90k-120k" },
                    { value: "120-150", label: "120k-150k" },
                    { value: "150+", label: "150k+" },
                  ]}
                  value={salaryRange}
                  defaultValue=""
                  onChange={(e) => setSalaryRange(e.target.value)}
                />
              </div>
              <InputField
                label="Location"
                placeholder="i.e. London"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              <div className="search__filters__tags">
                <p className="search__filters__tags__title">Experience</p>
                <div className="search__filters__tags__container">
                  <ClickableTag
                    label="Junior"
                    value="junior"
                    onClick={handleExperienceTagClick}
                  />
                  <ClickableTag
                    label="Mid Level"
                    value="mid"
                    onClick={handleExperienceTagClick}
                  />
                  <ClickableTag
                    label="Senior"
                    value="senior"
                    onClick={handleExperienceTagClick}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="search__button">
            <Button
              color="dark"
              type="submit"
              onClick={handleSearch}
              disabled={advancedSearchResults.isFetching}
            >
              {advancedSearchResults.isFetching
                ? "Searching..."
                : "Search Jobs"}
            </Button>
          </div>
          {advancedSearchResults.data?.data && (
            <div className="explore__jobs">
              <p className="explore__jobs__count">
                <span>We've found </span>
                {new Intl.NumberFormat().format(
                  advancedSearchResults.data.metadata.total
                )}
                <span> job postings</span>
              </p>
              {advancedSearchResults.isLoading && <LoadingIndicator />}
              {advancedSearchResults.data.data.map((job) => (
                <div className="explore__jobs__job" key={job._id}>
                  <JobCard job={job} />
                </div>
              ))}
              <div className="explore__jobs__load-more">
                {advancedSearchResults.data.metadata.totalPages ===
                currentPage ? (
                  <Button color="blue" type="button" disabled>
                    No more job postings to show :(
                  </Button>
                ) : (
                  <Button
                    color="dark"
                    type="button"
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                  >
                    {advancedSearchResults.isLoading ? (
                      <LoadingIndicator />
                    ) : (
                      "Load more jobs"
                    )}
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
