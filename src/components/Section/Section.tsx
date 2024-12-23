import "./index.scss";

export default function Section({
  children,
  arcBackground,
}: {
  children: React.ReactNode;
  arcBackground?: boolean;
}) {
  return (
    <section className={`section ${arcBackground ? "arcBackground" : ""}`}>
      {arcBackground && (
        <div className="image-arc">
          <div className="image__container-1">
            <svg className="arc-image image-1" viewBox="0 0 24 24">
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm4.2 14.2L11 13V7h1.5v5.2l4.5 2.7-.8 1.3z"></path>
            </svg>
          </div>
          <div className="image__container-2">
            <svg className="arc-image image-2" viewBox="0 0 24 24">
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path d="M20 7h-5V4c0-1.1-.9-2-2-2h-2c-1.1 0-2 .9-2 2v3H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zM9 12c.83 0 1.5.67 1.5 1.5S9.83 15 9 15s-1.5-.67-1.5-1.5S8.17 12 9 12zm3 6H6v-.75c0-1 2-1.5 3-1.5s3 .5 3 1.5V18zm1-9h-2V4h2v5zm5 7.5h-4V15h4v1.5zm0-3h-4V12h4v1.5z"></path>
            </svg>
          </div>
          <div className="image__container-3">
            <svg className="arc-image image-3" viewBox="0 0 24 24">
              <path
                d="M0 0h24v24H0zm10 5h4v2h-4zm0 0h4v2h-4z"
                fill="none"
              ></path>
              <path d="M10 16v-1H3.01L3 19c0 1.11.89 2 2 2h14c1.11 0 2-.89 2-2v-4h-7v1h-4zm10-9h-4.01V5l-2-2h-4l-2 2v2H4c-1.1 0-2 .9-2 2v3c0 1.11.89 2 2 2h6v-2h4v2h6c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zm-6 0h-4V5h4v2z"></path>
            </svg>
          </div>
          <div className="image__container-4">
            <svg className="arc-image image-4" viewBox="0 0 24 24">
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path d="M18 4H6C3.79 4 2 5.79 2 8v8c0 2.21 1.79 4 4 4h12c2.21 0 4-1.79 4-4V8c0-2.21-1.79-4-4-4zm-1.86 9.77c-.24.2-.57.28-.88.2L4.15 11.25C4.45 10.52 5.16 10 6 10h12c.67 0 1.26.34 1.63.84l-3.49 2.93zM6 6h12c1.1 0 2 .9 2 2v.55c-.59-.34-1.27-.55-2-.55H6c-.73 0-1.41.21-2 .55V8c0-1.1.9-2 2-2z"></path>
            </svg>
          </div>
          <div className="image__container-5">
            <svg className="arc-image image-5" viewBox="0 0 24 24">
              <path d="M0 0h24v24H0V0z" fill="none"></path>
              <path d="M15.5 8a1.5 1.5 0 1 0 0 3 1.5 1.5 0 1 0 0-3zM8.5 8a1.5 1.5 0 1 0 0 3 1.5 1.5 0 1 0 0-3z"></path>
              <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm-5-6c.78 2.34 2.72 4 5 4s4.22-1.66 5-4H7z"></path>
            </svg>
          </div>
        </div>
      )}
      {children}
    </section>
  );
}
