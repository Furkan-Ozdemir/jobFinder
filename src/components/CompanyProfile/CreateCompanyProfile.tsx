import { useNavigate } from "react-router-dom";
import { Formik, Form, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import InputField from "../InputField/InputField";
import Button from "../Button/Button";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./index.scss";

interface CompanyFormData {
  company_name: string;
  address: string;
  category: string;
  people_count: number;
  company_locations: string[];
}

const initialValues: CompanyFormData = {
  company_name: "",
  address: "",
  category: "",
  people_count: 0,
  company_locations: [""],
};

const validationSchema = Yup.object().shape({
  company_name: Yup.string().required("Company name is required"),
  address: Yup.string().required("Address is required"),
  category: Yup.string().required("Category is required"),
  people_count: Yup.number()
    .required("Number of employees is required")
    .min(1, "Must have at least 1 employee"),
  company_locations: Yup.array()
    .of(Yup.string().required("Location cannot be empty"))
    .min(1, "At least one location is required"),
});

export default function CreateCompanyProfile() {
  const navigate = useNavigate();

  const handleSubmit = async (values: CompanyFormData) => {
    try {
      // TODO: Implement API call
      console.log("Form submitted:", values);
      // navigate('/dashboard');
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container">
      <Header />
      <main className="create-company">
        <div className="create-company__container">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({
              values,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
            }) => (
              <Form className="company-profile-form">
                <h1 className="company-profile-form__title">
                  Create Company Profile
                </h1>

                <div className="company-profile-form__content">
                  <div className="company-profile-form__field">
                    <InputField
                      label="Company Name"
                      name="company_name"
                      type="text"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      required
                    />
                    <ErrorMessage
                      name="company_name"
                      component="div"
                      className="error"
                    />
                  </div>

                  <div className="company-profile-form__field">
                    <InputField
                      label="Address"
                      name="address"
                      type="text"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      required
                    />
                    <ErrorMessage
                      name="address"
                      component="div"
                      className="error"
                    />
                  </div>

                  <div className="company-profile-form__field">
                    <InputField
                      label="Category"
                      name="category"
                      type="text"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      required
                    />
                    <ErrorMessage
                      name="category"
                      component="div"
                      className="error"
                    />
                  </div>

                  <div className="company-profile-form__field">
                    <InputField
                      label="Number of Employees"
                      name="people_count"
                      type="number"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      required
                    />
                    <ErrorMessage
                      name="people_count"
                      component="div"
                      className="error"
                    />
                  </div>

                  <FieldArray name="company_locations">
                    {({ push, remove }) => (
                      <div className="company-profile-form__locations">
                        <h2>Company Locations</h2>
                        {values.company_locations.map((_, index) => (
                          <div
                            key={index}
                            className="company-profile-form__field"
                          >
                            <div className="company-profile-form__location-row">
                              <div className="flex-1">
                                <InputField
                                  label={`Location ${index + 1}`}
                                  name={`company_locations.${index}`}
                                  type="text"
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  required
                                />
                                <ErrorMessage
                                  name={`company_locations.${index}`}
                                  component="div"
                                  className="error"
                                />
                              </div>
                              {values.company_locations.length > 1 && (
                                <Button
                                  type="button"
                                  onClick={() => remove(index)}
                                  className="company-profile-form__remove-btn"
                                  color="pink"
                                >
                                  <span className="company-profile-form__remove-btn__text">
                                    Remove
                                  </span>
                                  <span className="company-profile-form__remove-btn__icon">
                                    X
                                  </span>
                                </Button>
                              )}
                            </div>
                          </div>
                        ))}
                        <Button
                          type="button"
                          onClick={() => push("")}
                          className="company-profile-form__add-btn"
                          color="blue"
                        >
                          Add Location
                        </Button>
                      </div>
                    )}
                  </FieldArray>

                  <div className="company-profile-form__actions">
                    <Button
                      type="submit"
                      color="dark"
                      disabled={isSubmitting}
                      onClick={() => handleSubmit(values)}
                    >
                      Create Profile
                    </Button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </main>
      <Footer />
    </div>
  );
}
