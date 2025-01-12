import { useState } from "react";
import Button from "../Button/Button";
import "./index.scss";
import Login from "../Login/Login";
import Register from "../Register/Register";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { logout, selectIsAuthenticated } from "../../store/slices/authSlice";
import { toast } from "react-toastify";

export default function Header() {
  const isLoggedIn = useAppSelector(selectIsAuthenticated);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [modals, setModals] = useState<{ login: boolean; register: boolean }>({
    login: false,
    register: false,
  });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <nav className="header">
        <ul className="header__nav">
          <li>
            <span className="header__nav__logo">
              <svg viewBox="0 0 24 24">
                <path d="M0 0h24v24H0V0z" fill="none"></path>
                <path d="M14 6V4h-4v2h4zM4 8v11h16V8H4zm16-2c1.11 0 2 .89 2 2v11c0 1.11-.89 2-2 2H4c-1.11 0-2-.89-2-2l.01-11c0-1.11.88-2 1.99-2h4V4c0-1.11.89-2 2-2h4c1.11 0 2 .89 2 2v2h4z"></path>
              </svg>
              <h1 onClick={() => navigate("/")}>MVST. Jobs</h1>
            </span>
          </li>
          <button
            className="header__nav__mobile-toggle"
            onClick={toggleMobileMenu}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          <div
            className={`header__nav__center ${
              isMobileMenuOpen ? "mobile-open" : ""
            }`}
          >
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/explore">Explore</Link>
            </li>
            <li>
              <Link to="/post-job">Post A Job</Link>
            </li>
            <li>
              <Link to="/search">Search</Link>
            </li>
            <div className="header__nav__buttons">
              {isLoggedIn ? (
                <>
                  <li>
                    <Button
                      color="dark"
                      type="button"
                      onClick={() => alert("not implemented yet :(")}
                    >
                      Profile
                    </Button>
                  </li>
                  <li>
                    <Button
                      color="dark"
                      type="button"
                      onClick={async () => {
                        await toast.promise(
                          new Promise((resolve) => setTimeout(resolve, 500)),
                          {
                            pending: "Logging out...",
                            error: "Something went wrong",
                            success: "Logged out successfully",
                          }
                        );

                        dispatch(logout());
                      }}
                    >
                      Logout
                    </Button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Button
                      color="dark"
                      type="button"
                      onClick={() =>
                        setModals((prev) => ({ ...prev, login: true }))
                      }
                    >
                      Log in
                    </Button>
                  </li>
                  <li>
                    <Button
                      color="dark"
                      type="button"
                      onClick={() =>
                        setModals((prev) => ({ ...prev, register: true }))
                      }
                    >
                      Register
                    </Button>
                  </li>
                </>
              )}
            </div>
          </div>
        </ul>
      </nav>
      {modals.login && (
        <Login
          isOpen={modals.login}
          onClose={() => setModals({ ...modals, login: false })}
        />
      )}
      {modals.register && (
        <Register
          isOpen={modals.register}
          onClose={() => setModals({ ...modals, register: false })}
        />
      )}
    </>
  );
}
