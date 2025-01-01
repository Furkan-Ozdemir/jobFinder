import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import InputField from "../InputField/InputField";
import Select from "../Select/Select";
import "./index.scss";

export default function Search() {
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
              <InputField label="Location" placeholder="i.e. London" />
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
            </div>
            <div>
              <div className="">
                <label htmlFor="Salary Range">Salary Range</label>
                <Select
                  label="Salary range"
                  options={[
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
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
