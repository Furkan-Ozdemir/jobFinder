import { Link } from "react-router-dom";
import Button from "../Button/Button";
import InputField from "../InputField/InputField";
import "./index.scss";
import Modal from "../Modal/Modal";
import { ErrorMessage, Form, Formik } from "formik";
import { object, string } from "yup";
import { useApiMutation } from "../../hooks/useApi";
import { ApiResponse, RegisterResponse } from "../../models/models";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../store/hooks";
import { setCredentials } from "../../store/slices/authSlice";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

interface FormValues {
  email: string;
  password: string;
}

const validationSchema = object({
  email: string().email("Invalid email").required("Required"),
  password: string().required("Required"),
});

const initialValues = {
  email: "",
  password: "",
};

export default function Login({ isOpen, onClose }: Props) {
  const dispatch = useAppDispatch();
  const register = useApiMutation<RegisterResponse>("/api/auth/login");

  const handleSubmit = async (values: FormValues) => {
    try {
      await toast.promise<ApiResponse<RegisterResponse>>(
        register.mutateAsync(values),
        {
          pending: "Logging in...",
          error: {
            render({ data }) {
              return data.error || "Something went wrong";
            },
          },
          success: {
            render(response) {
              console.log("response", response);
              if (response.data.data?.data) {
                dispatch(
                  setCredentials({
                    token: response.data.data.data?.token,
                    user: response.data.data.data?.user,
                  })
                );
              }
              onClose();
              return "Logged in successfully";
            },
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Login"
      className="login-modal"
    >
      <div className="login">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({
            values,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <Form className="login__form">
              <div>
                <InputField
                  label="Email"
                  placeholder="Enter your email"
                  id="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
                <ErrorMessage name="email" component="div" className="error" />
              </div>
              <div>
                <InputField
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                  id="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="error"
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
              <Button
                onClick={() => handleSubmit()}
                color="dark"
                type="submit"
                disabled={isSubmitting}
              >
                Login
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </Modal>
  );
}
