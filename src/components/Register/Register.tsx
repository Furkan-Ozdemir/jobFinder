import Button from "../Button/Button";
import InputField from "../InputField/InputField";
import "./index.scss";
import Modal from "../Modal/Modal";
import { ErrorMessage, Field, Form, Formik } from "formik";
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
  fullName: string;
  email: string;
  password: string;
  personType: string;
}

const validationSchema = object({
  fullName: string().required("Required"),
  email: string().email("Invalid email").required("Required"),
  password: string()
    .min(6, "Password must be at least 6 characters")
    .required("Required"),
  personType: string().required("Required"),
});

const initialValues = {
  fullName: "",
  email: "",
  password: "",
  personType: "",
};

export default function Register({ isOpen, onClose }: Props) {
  const dispatch = useAppDispatch();
  const register = useApiMutation<RegisterResponse>("/api/auth/register");
  const handleSubmit = async (values: FormValues) => {
    try {
      await toast.promise<ApiResponse<RegisterResponse>>(
        register.mutateAsync(values),
        {
          pending: "Registering...",
          error: {
            render({ data }) {
              //@ts-expect-error TODO will fix
              return data.error || "Something went wrong";
            },
          },
          success: {
            render(response) {
              if (response.data.data?.data) {
                dispatch(
                  setCredentials({
                    token: response.data.data.data?.token,
                    user: response.data.data.data?.user,
                  })
                );
              }
              onClose();

              return "Registered successfully";
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
      title="Sign Up"
      className="register-modal"
    >
      <div className="register">
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
            <Form className="register__form">
              <div>
                <InputField
                  label="Full name"
                  placeholder="Enter your full name"
                  id="fullName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.fullName}
                />
                <ErrorMessage
                  name="fullName"
                  component="div"
                  className="error"
                />
              </div>
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
              <div>
                <p className="register__form__role__title">You are a:</p>
                <div className="register__form__role">
                  <div className="register__form__role__option">
                    <Field
                      type="radio"
                      name="personType"
                      value="employer"
                      id="employer"
                    />
                    <label htmlFor="employer">Employer</label>
                  </div>
                  <div className="register__form__role__option">
                    <Field
                      type="radio"
                      name="personType"
                      value="job_seeker"
                      id="job_seeker"
                    />
                    <label htmlFor="job_seeker">Jobseeker</label>
                  </div>
                  <ErrorMessage
                    name="personType"
                    component="div"
                    className="error"
                  />
                </div>
              </div>

              <Button
                onClick={() => handleSubmit()}
                color="dark"
                type="submit"
                disabled={isSubmitting}
              >
                Sign Up
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </Modal>
  );
}
