import "./index.scss";

export default function SkeletonJobApply() {
  return (
    <div className="jobDetail__form">
      <div className="jobDetail__form__container">
        <div className="skeleton-title"></div>
        <div className="skeleton-form">
          <div className="skeleton-form__inputs">
            <div className="skeleton-input"></div>
            <div className="skeleton-input"></div>
            <div className="skeleton-input"></div>
          </div>
          <div className="skeleton-form__inputs">
            <div className="skeleton-input"></div>
            <div className="skeleton-input"></div>
          </div>
          <div className="skeleton-button"></div>
        </div>
      </div>
    </div>
  );
}
