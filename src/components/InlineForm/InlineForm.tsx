import Button from "../Button/Button";
import "./index.scss";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function InlineForm() {
  const [searchParams] = useSearchParams();

  const [title, setTitle] = useState<string>(searchParams.get("title") || "");
  const [location, setLocation] = useState<string>(
    searchParams.get("location") || ""
  );

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const currentPath = window.location.pathname;
    if (currentPath === "/") {
      navigate(`/explore?title=${title}&location=${location}`);
    }
  };
  return (
    <form className="form">
      <div className="form__group">
        <div className="form__group__search">
          <input
            type="text"
            placeholder="What are you looking for ?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form__group__location">
          <input
            type="text"
            placeholder="Enter Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <Button color="dark" type="submit" onClick={handleSubmit}>
            Search
          </Button>
        </div>
      </div>
    </form>
  );
}
