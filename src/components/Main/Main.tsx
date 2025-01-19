import { usePaginatedApiQuery } from "../../hooks/useApi";
import { Job } from "../../models/models";
import InlineForm from "../InlineForm/InlineForm";
import Section from "../Section/Section";
import "./index.scss";

export default function Main() {
  const jobs = usePaginatedApiQuery<Job[]>(["jobs"], `/api/jobs`);

  return (
    <Section arcBackground>
      <main className="main">
        <div className="main__container">
          <div>
            <p className="main__container__title">
              <span>Over</span>
              <span className="main__container__title__highlight">
                {" "}
                {jobs.data?.metadata.total}{" "}
              </span>
              <span>jobs are waiting for you</span>
            </p>
            <p>
              Work with the best companies, hire the experienced professionals
            </p>
          </div>
          <div className="main__form">
            <InlineForm />
          </div>
        </div>
      </main>
    </Section>
  );
}
