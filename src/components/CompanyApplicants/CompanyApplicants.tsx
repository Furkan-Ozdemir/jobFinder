import { useApiQuery } from "../../hooks/useApi";
import { JobApplication } from "../../models/models";
import SkeletonCard from "../SkeletonCard/SkeletonCard";
import { Link } from "react-router-dom";
import "./index.scss";
import { selectCurrentUser } from "../../store/slices/authSlice";
import { useAppSelector } from "../../store/hooks";

export default function CompanyApplicants() {
  const user = useAppSelector(selectCurrentUser);
  console.log("company user", user);
  const { data: response, isLoading } = useApiQuery<JobApplication[]>(
    ["company-applications"],
    `/api/jobs/company/${user?.id}/applicants`
  );

  const applications = response?.data || [];
  console.log("applicants", applications);
  const renderSkeletons = () => {
    return Array(6)
      .fill(0)
      .map((_, index) => <SkeletonCard key={index} variant="category" />);
  };

  return (
    <main className="company-applicants-container">
      <h1>Job Applicants</h1>
      {isLoading ? (
        <div className="applications-grid">{renderSkeletons()}</div>
      ) : (
        <div className="applications-content">
          {applications.length === 0 ? (
            <div className="no-applications">
              <p>You don't have any applicants yet.</p>
            </div>
          ) : (
            <div className="applications-grid">
              {applications.map((application) => (
                <div key={application._id} className="application-card">
                  <div className="application-card__header">
                    <div className="application-card__applicant-info">
                      <div className="application-card__avatar">
                        <svg height={24} width={24} viewBox="0 0 24 24">
                          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path>
                        </svg>
                      </div>
                      <div>
                        <h3>{application.fullName}</h3>
                        <Link
                          to={`/job/${application.job._id}`}
                          target="_blank"
                          className="job-link"
                        >
                          View Job Details
                        </Link>
                      </div>
                    </div>
                    <div className="application-card__status">
                      <span className="status-badge">Applied</span>
                    </div>
                  </div>

                  <div className="application-card__details">
                    <div className="detail-item">
                      <span className="label">Applied on:</span>
                      <span className="value">
                        {new Date(application.appliedAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="detail-item">
                      <span className="label">Phone number:</span>
                      <span className="value">{application.phone}</span>
                    </div>
                    <div className="detail-item">
                      <span className="label">Resume:</span>
                      <a
                        href={application.resume.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="resume-link"
                      >
                        {application.resume.originalName}
                      </a>
                    </div>
                    <div className="detail-item">
                      <span className="label">LinkedIn:</span>
                      <a
                        href={application.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="linkedin-link"
                      >
                        View Profile
                      </a>
                    </div>
                    {application.project && (
                      <div className="detail-item">
                        <span className="label">Project:</span>
                        <span className="value">{application.project}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </main>
  );
}
