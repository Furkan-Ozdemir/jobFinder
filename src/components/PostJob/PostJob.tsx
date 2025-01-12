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
import { PostJobRequest } from "../../models/models";
import { useApiMutation } from "../../hooks/useApi";
import { toast } from "react-toastify";
import React, { useState } from "react";

const initialValues = {
  jobTitle: "",
  aboutCompany: "",
  roleDescription: "",
  requirements: [""],
  responsibilities: [""],
  jobType: "",
  experience: "",
  salesPitch: "",
  additionalInfo: "",
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
  additionalInfo: Yup.string(),
});

export default function PostJob() {
  const [values, setValues] = useState<PostJobRequest>(initialValues);

  const mutation = useApiMutation("/api/job");
  const handleSubmit = async (values: PostJobRequest) => {
    const response = await toast.promise(mutation.mutateAsync(values), {
      pending: "Creating job...",
      error: "Something went wrong",
    });
    console.log(response);
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
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                  values: formValues,
                  setFieldValue,
                }) => (
                  <Form className="post-job__container__form__container__form">
                    <div>
                      <InputField
                        label="Job title"
                        placeholder="Marketing sales representative"
                        required
                        name="jobTitle"
                        onChange={(e) => {
                          handleChange(e);
                          setValues((prev) => ({
                            ...prev,
                            jobTitle: e.target.value,
                          }));
                        }}
                        onBlur={handleBlur}
                        value={formValues.jobTitle}
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
                        onChange={(
                          e: React.ChangeEvent<HTMLTextAreaElement>
                        ) => {
                          handleChange(e);
                          setValues((prev) => ({
                            ...prev,
                            salesPitch: e.target.value,
                          }));
                        }}
                        onBlur={handleBlur}
                        id="salesPitch"
                        value={formValues.salesPitch}
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
                        onChange={(
                          e: React.ChangeEvent<HTMLTextAreaElement>
                        ) => {
                          handleChange(e);
                          setValues((prev) => ({
                            ...prev,
                            aboutCompany: e.target.value,
                          }));
                        }}
                        onBlur={handleBlur}
                        id="aboutCompany"
                        value={formValues.aboutCompany}
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
                        onChange={(
                          e: React.ChangeEvent<HTMLTextAreaElement>
                        ) => {
                          handleChange(e);
                          setValues((prev) => ({
                            ...prev,
                            roleDescription: e.target.value,
                          }));
                        }}
                        onBlur={handleBlur}
                        id="roleDescription"
                        value={formValues.roleDescription}
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
                            { value: "Internship", label: "Internship" },
                            { value: "Full Time", label: "Full Time" },
                            { value: "Part Time", label: "Part Time" },
                          ]}
                          onChange={(
                            e: React.ChangeEvent<HTMLSelectElement>
                          ) => {
                            handleChange(e);
                            setValues((prev) => ({
                              ...prev,
                              [e.target.name]: e.target.value,
                            }));
                          }}
                          onBlur={handleBlur}
                          id="jobType"
                          name="jobType"
                          value={formValues.jobType}
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
                            { value: "Junior", label: "Junior" },
                            { value: "Mid", label: "Mid" }, //TODO dbden gelecek",,
                            { value: "Senior", label: "Senior" },
                          ]}
                          onChange={(
                            e: React.ChangeEvent<HTMLSelectElement>
                          ) => {
                            handleChange(e);
                            setValues((prev) => ({
                              ...prev,
                              [e.target.name]: e.target.value,
                            }));
                          }}
                          onBlur={handleBlur}
                          id="experience"
                          name="experience"
                          value={formValues.experience}
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
                                        onChange={(
                                          e: React.ChangeEvent<HTMLInputElement>
                                        ) => {
                                          handleChange(e);
                                          const newRequirements = [
                                            ...formValues.requirements,
                                          ];
                                          newRequirements[index] =
                                            e.target.value;
                                          setFieldValue(
                                            "requirements",
                                            newRequirements
                                          );
                                          setValues((prev) => ({
                                            ...prev,
                                            requirements: newRequirements,
                                          }));
                                        }}
                                        onBlur={handleBlur}
                                        value={formValues.requirements[index]}
                                      />
                                      <ErrorMessage
                                        name={`requirements.${index}`}
                                        component="div"
                                        className="error"
                                      />
                                    </div>
                                    {index > 0 && (
                                      <Button
                                        onClick={() => {
                                          setValues((prev) => ({
                                            ...prev,
                                            requirements: [
                                              ...prev.requirements.slice(
                                                0,
                                                index
                                              ),
                                              ...prev.requirements.slice(
                                                index + 1
                                              ),
                                            ],
                                          }));
                                          return remove(index);
                                        }}
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
                                        onChange={(
                                          e: React.ChangeEvent<HTMLInputElement>
                                        ) => {
                                          handleChange(e);
                                          const newResponsibilities = [
                                            ...formValues.responsibilities,
                                          ];
                                          newResponsibilities[index] =
                                            e.target.value;
                                          setFieldValue(
                                            "responsibilities",
                                            newResponsibilities
                                          );
                                          setValues((prev) => ({
                                            ...prev,
                                            responsibilities:
                                              newResponsibilities,
                                          }));
                                        }}
                                        value={
                                          formValues.responsibilities[index]
                                        }
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
                                        onClick={() => {
                                          setValues((prev) => ({
                                            ...prev,
                                            responsibilities: [
                                              ...prev.responsibilities.slice(
                                                0,
                                                index
                                              ),
                                              ...prev.responsibilities.slice(
                                                index + 1
                                              ),
                                            ],
                                          }));
                                          return remove(index);
                                        }}
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
                    <div>
                      <TextArea
                        label="Additional Information"
                        placeholder="This is a full-time position with competitive..."
                        name="additionalInfo"
                        onChange={(
                          e: React.ChangeEvent<HTMLTextAreaElement>
                        ) => {
                          handleChange(e);
                          setValues((prev) => ({
                            ...prev,
                            additionalInfo: e.target.value,
                          }));
                        }}
                        onBlur={handleBlur}
                        id="additionalInfo"
                        value={formValues.additionalInfo}
                      />
                      <ErrorMessage
                        name="additionalInfo"
                        component="div"
                        className="error"
                      />
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
              <JobDetail preview previewValues={values} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
