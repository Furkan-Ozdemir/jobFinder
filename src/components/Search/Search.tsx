import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Button from "../Button/Button";
import ClickableTag from "../ClickableTag/ClickableTag";

import InputField from "../InputField/InputField";
import Select from "../Select/Select";
import "./index.scss";
import { useApiQuery, usePaginatedApiQuery } from "../../hooks/useApi";
import { JobCategory, Job } from "../../models/models";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";
import JobCard from "../JobCard/JobCard";

export default function Search() {
  const [searchParams] = useSearchParams();
  const [timeRange, setTimeRange] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [category, setCategory] = useState("");
  const [company_name, setCompanyName] = useState("");
  const [location, setLocation] = useState("");
  const [salaryRange, setSalaryRange] = useState("");
  const [selectedEmploymentTypes, setSelectedEmploymentTypes] = useState<
    string[]
  >([]);
  const [selectedExperienceTypes, setSelectedExperienceTypes] = useState<
    string[]
  >([]);
  const [selectedWorkModels, setSelectedWorkModels] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const categories = usePaginatedApiQuery<JobCategory[]>(
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

  const handleWorkModelTagClick = (value: string) => {
    setSelectedWorkModels((prev) => {
      if (prev.includes(value)) {
        return prev.filter((type) => type !== value);
      }
      return [...prev, value];
    });
  };

  const advancedSearchResults = useApiQuery<Job[]>(
    ["jobs"],
    `/api/jobs/advancedSearch?title=${jobTitle}&location=${location}&salaryRange=${salaryRange}&employmentTypes=${selectedEmploymentTypes.join(
      ","
    )}&experienceTypes=${selectedExperienceTypes.join(
      ","
    )}&timeRange=${timeRange}&company_category=${category}&workModel=${selectedWorkModels.join(
      ","
    )}&company_name=${company_name}`,
    {
      enabled: false,
    }
  );

  const handleFetch = () => {
    setCurrentPage(1);
    advancedSearchResults.refetch();
  };

  const paginationData = useMemo(() => {
    const totalItems = advancedSearchResults.data?.data?.length || 0;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = advancedSearchResults.data?.data?.slice(
      indexOfFirstItem,
      indexOfLastItem
    );

    return {
      totalItems,
      totalPages,
      currentItems,
    };
  }, [advancedSearchResults.data?.data, currentPage, itemsPerPage]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    const categoryParam = searchParams.get("company_category");
    if (categoryParam) {
      setCategory(categoryParam);
    }
  }, [searchParams]);

  useEffect(() => {
    const company_nameParam = searchParams.get("company_name");
    if (company_nameParam) {
      setCompanyName(company_nameParam);
    }
  }, [searchParams]);

  useEffect(() => {
    if (category) {
      handleFetch();
    }
  }, [category]);

  useEffect(() => {
    if (company_name) {
      handleFetch();
    }
  }, [company_name]);

  return (
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
              <p className="search__filters__tags__title">Work Model</p>
              <div className="search__filters__tags__container">
                <ClickableTag
                  label="On-site"
                  value="on-site"
                  onClick={handleWorkModelTagClick}
                />
                <ClickableTag
                  label="Remote"
                  value="remote"
                  onClick={handleWorkModelTagClick}
                />
                <ClickableTag
                  label="Hybrid"
                  value="hybrid"
                  onClick={handleWorkModelTagClick}
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
            <InputField
              label="Company Name"
              placeholder="i.e. Google"
              value={company_name}
              onChange={(e) => setCompanyName(e.target.value)}
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
            <div className="search__filters__tags">
              <p className="search__filters__tags__title">Employment Type</p>
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
                  label="Internship"
                  value="internship"
                  onClick={handleEmployementTagClick}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="search__button">
          <Button
            color="dark"
            type="submit"
            disabled={advancedSearchResults.isFetching}
            onClick={handleFetch}
          >
            {advancedSearchResults.isFetching ? "Searching..." : "Search Jobs"}
          </Button>
        </div>

        {paginationData.totalItems > 0 && (
          <div className="explore__jobs">
            <p className="explore__jobs__count">
              <span>We've found </span>
              {new Intl.NumberFormat().format(paginationData.totalItems)}
              <span> job postings</span>
            </p>
            {advancedSearchResults.isLoading && <LoadingIndicator />}
            {paginationData.currentItems?.map((job) => (
              <div className="explore__jobs__job" key={job._id}>
                <JobCard job={job} />
              </div>
            ))}

            {paginationData.totalPages > 1 && (
              <div className="search__pagination">
                <Button
                  color="dark"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <span className="pagination__info">
                  Page {currentPage} of {paginationData.totalPages}
                </span>
                <Button
                  color="dark"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === paginationData.totalPages}
                >
                  Next
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
