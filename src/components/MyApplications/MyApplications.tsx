import { useApiQuery } from "../../hooks/useApi";
import { JobApplication } from "../../models/models";
import SkeletonCard from "../SkeletonCard/SkeletonCard";
import { Link } from "react-router-dom";
import "./index.scss";

export default function MyApplications() {
  const { data: response, isLoading } = useApiQuery<JobApplication[]>(
    ["applications"],
    `/api/applications/user`
  );

  const applications = response?.data || [];

  const renderSkeletons = () => {
    return Array(6)
      .fill(0)
      .map((_, index) => (
        <div key={index} className="skeleton-wrapper">
          <SkeletonCard variant="company" />
        </div>
      ));
  };

  return (
    <main className="my-applications-container">
      <h1>My Applications</h1>
      {isLoading ? (
        <div className="applications-grid">{renderSkeletons()}</div>
      ) : (
        <div className="applications-content">
          {applications.length === 0 ? (
            <div className="no-applications">
              <p>You haven't applied to any jobs yet.</p>
            </div>
          ) : (
            <div className="applications-grid">
              {applications.map((application) => (
                <div key={application.jobId} className="application-card">
                  <div className="application-card__header">
                    <div className="application-card__company-info">
                      <div className="application-card__logo">
                        <svg height={24} width={24} viewBox="0 0 24 24">
                          <path d="M0 0h24v24H0z" fill="none"></path>
                          <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"></path>
                        </svg>
                      </div>
                      <div>
                        <h3>{application.fullName}</h3>
                        <Link
                          to={`/job/${application.jobId}`}
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
                      <span className="label">Contact:</span>
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
