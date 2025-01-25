import { useNavigate } from "react-router-dom";

import Button from "../Button/Button";
import "./index.scss";

export default function Unauthorized() {
  const navigate = useNavigate();

  return (
    <main>
      <div className="unauthorized">
        <main className="unauthorized__content">
          <div className="unauthorized__container">
            <h1>Access Denied</h1>
            <p>Sorry, you cannot access this page.</p>
            <div className="unauthorized__actions">
              <Button onClick={() => navigate("/")} color="dark">
                Go Home
              </Button>
            </div>
          </div>
        </main>
      </div>
    </main>
  );
}
