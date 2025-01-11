import { ErrorMessage, Form, Formik, FieldArray } from "formik";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import JobDetail from "../JobDetail/JobDetail";
import "./index.scss";
import InputField from "../InputField/InputField";
import Button from "../Button/Button";
import * as Yup from "yup";
import TextArea from "../TextArea/TextArea";
import Select from "../Select/Select";

const initialValues = {
  jobTitle: "",
  aboutCompany: "",
  roleDescription: "",
  requirements: [""],
  responsibilities: [""],
  jobType: "",
  experience: "",
  salesPitch: "",
};

const validationSchema = Yup.object().shape({
  jobTitle: Yup.string().required("Job title is required"),
  aboutCompany: Yup.string().required("Company description is required"),
  roleDescription: Yup.string().required("Role description is required"),
  requirements: Yup.array()
    .of(Yup.string().required("Requirement cannot be empty"))
    .min(1, "At least one requirement is needed"),
  responsibilities: Yup.array()
    .of(Yup.string().required("Responsibility cannot be empty"))
    .min(1, "At least one responsibility is needed"),
  jobType: Yup.string().required("Job type is required"),
  experience: Yup.string().required("Experience is required"),
  salesPitch: Yup.string().required("Sales pitch is required"),
});

export default function PostJob() {
  const handleSubmit = (values: any) => {
    console.log(values);
  };

  return (
    <div className="container">
      <Header />
      <main>
        <div className="post-job">
          <h1 className="post-job__title">
            Create a job posting and live preview it
          </h1>
          <div className="post-job__container">
            <div className="post-job__container__form__container">
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ handleChange, handleBlur, handleSubmit, isSubmitting }) => (
                  <Form className="post-job__container__form__container__form">
                    <div>
                      <InputField
                        label="Job title"
                        placeholder="Marketing sales representative"
                        required
                        name="jobTitle"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <ErrorMessage
                        name="jobTitle"
                        component="div"
                        className="error"
                      />
                    </div>
                    <div>
                      <TextArea
                        name="salesPitch"
                        label="Sales Pitch"
                        placeholder="Join our dynamic team as a Marketing Sales Representative..."
                        required
                        onChange={handleChange}
                        onBlur={handleBlur}
                        id="salesPitch"
                      />
                      <ErrorMessage
                        name="salesPitch"
                        component="div"
                        className="error"
                      />
                    </div>
                    <div>
                      <TextArea
                        name="aboutCompany"
                        label="About Company"
                        placeholder="Unicorn is a leading tele-comm company..."
                        required
                        onChange={handleChange}
                        onBlur={handleBlur}
                        id="aboutCompany"
                      />
                      <ErrorMessage
                        name="aboutCompany"
                        component="div"
                        className="error"
                      />
                    </div>
                    <div>
                      <TextArea
                        name="roleDescription"
                        label="Role description"
                        placeholder="As a Marketing Sales Representative..."
                        required
                        onChange={handleChange}
                        onBlur={handleBlur}
                        id="roleDescription"
                      />
                      <ErrorMessage
                        name="roleDescription"
                        component="div"
                        className="error"
                      />
                    </div>
                    <div className="d-flex gap-4">
                      <div className="flex-1">
                        <Select
                          required
                          showLabel
                          label="Job Type"
                          defaultValue=""
                          options={[
                            { value: "internship", label: "Internship" },
                            { value: "fullTime", label: "Full Time" },
                            { value: "partTime", label: "Part Time" },
                          ]}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          id="jobType"
                          name="jobType"
                        />
                        <ErrorMessage
                          name="jobType"
                          component="div"
                          className="error"
                        />
                      </div>
                      <div className="flex-1">
                        <Select
                          required
                          showLabel
                          label="Experience"
                          defaultValue=""
                          options={[
                            { value: "junior", label: "Junior" },
                            { value: "mid", label: "Mid" }, //TODO dbden gelecek",,
                            { value: "senior", label: "Senior" },
                          ]}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          id="experience"
                          name="experience"
                        />
                        <ErrorMessage
                          name="experience"
                          component="div"
                          className="error"
                        />
                      </div>
                    </div>
                    <div className="post-job__container__form__rows">
                      <div className="flex-1">
                        <FieldArray name="requirements">
                          {({ push, remove, form }) => (
                            <div className="field-array__container">
                              {form.values.requirements.map(
                                (req: string, index: number) => (
                                  <div key={index} className="field-array-item">
                                    <div className="flex-1">
                                      <InputField
                                        label={
                                          index === 0
                                            ? "Requirement"
                                            : undefined
                                        }
                                        name={`requirements.${index}`}
                                        placeholder="Enter requirement"
                                        required={index === 0}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                      />
                                      <ErrorMessage
                                        name={`requirements.${index}`}
                                        component="div"
                                        className="error"
                                      />
                                    </div>
                                    {index > 0 && (
                                      <Button
                                        onClick={() => remove(index)}
                                        color="pink"
                                        type="button"
                                      >
                                        Remove
                                      </Button>
                                    )}
                                  </div>
                                )
                              )}
                              <Button
                                onClick={() => push("")}
                                color="blue"
                                type="button"
                              >
                                Add Requirement
                              </Button>
                            </div>
                          )}
                        </FieldArray>
                      </div>
                      <div className="flex-1">
                        <FieldArray name="responsibilities">
                          {({ push, remove, form }) => (
                            <div className="field-array__container">
                              {form.values.responsibilities.map(
                                (resp: string, index: number) => (
                                  <div key={index} className="field-array-item">
                                    <div className="flex-1">
                                      <InputField
                                        label={
                                          index === 0
                                            ? "Responsibility"
                                            : undefined
                                        }
                                        name={`responsibilities.${index}`}
                                        placeholder="Enter responsibility"
                                        required={index === 0}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                      />
                                      <ErrorMessage
                                        name={`responsibilities.${index}`}
                                        component="div"
                                        className="error"
                                      />
                                    </div>
                                    {index > 0 && (
                                      <Button
                                        onClick={() => remove(index)}
                                        color="pink"
                                        type="button"
                                      >
                                        Remove
                                      </Button>
                                    )}
                                  </div>
                                )
                              )}
                              <Button
                                onClick={() => push("")}
                                color="blue"
                                type="button"
                              >
                                Add Responsibility
                              </Button>
                            </div>
                          )}
                        </FieldArray>
                      </div>
                    </div>
                    <Button
                      type="submit"
                      color="dark"
                      disabled={isSubmitting}
                      onClick={() => handleSubmit()}
                    >
                      Post Job
                    </Button>
                  </Form>
                )}
              </Formik>
            </div>
            <div className="post-job__container__preview">
              <JobDetail preview />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
