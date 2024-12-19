import InlineForm from "../InlineForm/InlineForm";
import "./index.scss";

export default function Main() {
  return (
    <main className="main">
      <div>
        <p className="main__title">
          <span>Over</span>
          <span className="main__title__highlight"> 5,000 jobs </span>
          <span>are waiting for you</span>
        </p>
        <p>Work with the best companies, hire the experienced professionals</p>
      </div>
      <div className="main__form">
        <InlineForm />
      </div>
    </main>
  );
}
