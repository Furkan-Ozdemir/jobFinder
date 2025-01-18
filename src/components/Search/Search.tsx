import Button from "../Button/Button";
import ClickableTag from "../ClickableTag/ClickableTag";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import InputField from "../InputField/InputField";
import Select from "../Select/Select";
import "./index.scss";

export default function Search() {
  const handleTagClick = (value: string) => {
    console.log(value);
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
                    { value: "7", label: "Last 7 days" },
                    { value: "30", label: "Last 30 days" },
                  ]}
                  defaultValue="Last 24 hours"
                />
              </div>
              <InputField label="Job title" placeholder="i.e. Ruby Developer" />
              <div className="search__filters__item">
                <label htmlFor="Category">Category</label>
                <Select
                  label="Category"
                  options={[
                    { value: "1", label: "Information Technology" },
                    { value: "2", label: "Engineering" },
                  ]}
                  defaultValue="Marketing"
                />
              </div>
              <div className="search__filters__tags">
                <p className="search__filters__tags__title">Job Type</p>
                <div className="search__filters__tags__container">
                  <ClickableTag
                    label="Full Time"
                    value="full"
                    onClick={handleTagClick}
                  />
                  <ClickableTag
                    label="Part Time"
                    value="part"
                    onClick={handleTagClick}
                  />
                  <ClickableTag
                    label="On-site"
                    value="onsite"
                    onClick={handleTagClick}
                  />
                  <ClickableTag
                    label="Remote"
                    value="remote"
                    onClick={handleTagClick}
                  />
                  <ClickableTag
                    label="Internship"
                    value="internship"
                    onClick={handleTagClick}
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
                    //TODO make dynamic
                    { value: "1", label: "0-30k" },
                    { value: "2", label: "30k-60k" },
                    { value: "3", label: "60k-90k" },
                    { value: "4", label: "90k-120k" },
                    { value: "5", label: "120k-150k" },
                    { value: "6", label: "150k+" },
                  ]}
                  defaultValue="0-30k"
                />
              </div>
              <InputField label="Location" placeholder="i.e. London" />
              <div className="search__filters__tags">
                <p className="search__filters__tags__title">Experience</p>
                <div className="search__filters__tags__container">
                  <ClickableTag
                    label="Junior"
                    value="junior"
                    onClick={handleTagClick}
                  />
                  <ClickableTag
                    label="Mid Level"
                    value="mid"
                    onClick={handleTagClick}
                  />
                  <ClickableTag
                    label="Senior"
                    value="senior"
                    onClick={handleTagClick}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="search__submit">
            <Button color="dark" type="submit">
              Search
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
