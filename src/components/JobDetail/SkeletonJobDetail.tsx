import "./index.scss";

export default function SkeletonJobDetail() {
  return (
    <main>
      <div className="jobDetail">
        <div className="jobDetail__details">
          <div className="jobDetail__details__breadCrumb skeleton-loading"></div>
          <div className="jobDetail__details__company-main">
            <div className="jobDetail__details__company-main__apply__container">
              <div className="flex">
                <div className="jobDetail__details__company-main__logo skeleton-loading"></div>
                <div className="jobDetail__details__company-main__info">
                  <div className="skeleton-loading" style={{ width: "200px", height: "24px" }}></div>
                  <div className="skeleton-loading" style={{ width: "150px", height: "20px", marginTop: "8px" }}></div>
                </div>
              </div>
            </div>
          </div>
          <div className="jobDetail__details__tags">
            {[1, 2, 3].map((i) => (
              <div key={i} className="skeleton-loading" style={{ width: "100px", height: "32px", marginRight: "8px" }}></div>
            ))}
          </div>
          <div className="jobDetail__details__description">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="skeleton-loading" style={{ width: "100%", height: "16px", marginBottom: "8px" }}></div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
