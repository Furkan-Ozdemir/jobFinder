import Button from "../Button/Button";
import "./index.scss";

export default function InlineForm() {
  return (
    <form className="form">
      <div className="form__group">
        <div className="form__group__search">
          <input type="text" placeholder="What are you looking for ?" />
        </div>
        <div className="form__group__location">
          <input type="text" placeholder="Enter Location" />
          <Button color="dark" type="submit">
            Search
          </Button>
        </div>
      </div>
    </form>
  );
}
