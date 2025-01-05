import { Link } from "react-router-dom";
import Button from "../Button/Button";
import InputField from "../InputField/InputField";
import "./index.scss";
import Modal from "../Modal/Modal";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function Login({ isOpen, onClose }: Props) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Login"
      className="login-modal"
    >
      <div className="login">
        <form className="login__form">
          <div>
            <InputField
              label="Email"
              placeholder="Enter your email"
              id="email"
            />
          </div>
          <div>
            <InputField
              label="Password"
              placeholder="Enter your password"
              type="password"
              id="password"
            />
          </div>
          <div className="login__form__bottom">
            <div className="login__form__checkbox">
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            <div className="login__form__forgot">
              <Link to="/reset-password">Forgot password?</Link>
            </div>
          </div>
          <Button color="dark" type="submit">
            Login
          </Button>
        </form>
      </div>
    </Modal>
  );
}
