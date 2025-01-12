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
import {
  ApiResponse,
  PostJobRequest,
  PostJobResponse,
} from "../../models/models";
import { useApiMutation } from "../../hooks/useApi";
import { toast } from "react-toastify";
import React, { useState } from "react";
import { selectCurrentUser } from "../../store/slices/authSlice";
import { useAppSelector } from "../../store/hooks";

const initialValues = {
  role: "",
  about_the_company: "",
  role_description: "",
  required_skills: [""],
  responsibilities: [""],
  employement_type: "",
  experience_level: "",
  work_model: "",
  salesPitch: "",
  additionalInfo: "",
  company_name: "",
};

const validationSchema = Yup.object().shape({
  role: Yup.string().required("Job title is required"),
  about_the_company: Yup.string().required("Company description is required"),
  role_description: Yup.string().required("Role description is required"),
  required_skills: Yup.array()
    .of(Yup.string().required("Requirement cannot be empty"))
    .min(1, "At least one requirement is needed"),
  responsibilities: Yup.array()
    .of(Yup.string().required("Responsibility cannot be empty"))
    .min(1, "At least one responsibility is needed"),
  employement_type: Yup.string().required("Job type is required"),
  experience_level: Yup.string().required("Experience is required"),
  salesPitch: Yup.string().required("Sales pitch is required"),
  additionalInfo: Yup.string(),
  work_model: Yup.string().required("Work model is required"),
});

export default function PostJob() {
  const [values, setValues] = useState<PostJobRequest>(initialValues);
  const user = useAppSelector(selectCurrentUser);

  const mutation = useApiMutation<PostJobResponse, PostJobRequest>("/api/jobs");
  const handleSubmit = async (values: PostJobRequest) => {
    try {
      await toast.promise<ApiResponse<PostJobResponse>>(
        mutation.mutateAsync({ ...values, company_name: user?.company_name }),
        {
          pending: "Creating job...",
          error: {
            render({ data }) {
              return data.error || "Something went wrong";
            },
          },
          success: {
            render() {
              return "Job created successfully";
            },
          },
        }
      );
    } catch (error) {
      console.log("error", error);
    }
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
                        name="role"
                        onChange={(e) => {
                          handleChange(e);
                          setValues((prev) => ({
                            ...prev,
                            role: e.target.value,
                          }));
                        }}
                        onBlur={handleBlur}
                        value={formValues.role}
                      />
                      <ErrorMessage
                        name="role"
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
                        name="about_the_company"
                        label="About Company"
                        placeholder="Unicorn is a leading tele-comm company..."
                        required
                        onChange={(
                          e: React.ChangeEvent<HTMLTextAreaElement>
                        ) => {
                          handleChange(e);
                          setValues((prev) => ({
                            ...prev,
                            about_the_company: e.target.value,
                          }));
                        }}
                        onBlur={handleBlur}
                        id="about_the_company"
                        value={formValues.about_the_company}
                      />
                      <ErrorMessage
                        name="about_the_company"
                        component="div"
                        className="error"
                      />
                    </div>
                    <div>
                      <TextArea
                        name="role_description"
                        label="Role description"
                        placeholder="As a Marketing Sales Representative..."
                        required
                        onChange={(
                          e: React.ChangeEvent<HTMLTextAreaElement>
                        ) => {
                          handleChange(e);
                          setValues((prev) => ({
                            ...prev,
                            role_description: e.target.value,
                          }));
                        }}
                        onBlur={handleBlur}
                        id="role_description"
                        value={formValues.role_description}
                      />
                      <ErrorMessage
                        name="role_description"
                        component="div"
                        className="error"
                      />
                    </div>
                    <div className="d-flex gap-4 post-job__container__form__container__form__job-type">
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
                          id="employement_type"
                          name="employement_type"
                          value={formValues.employement_type}
                        />
                        <ErrorMessage
                          name="employement_type"
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
                          id="experience_level"
                          name="experience_level"
                          value={formValues.experience_level}
                        />
                        <ErrorMessage
                          name="experience_level"
                          component="div"
                          className="error"
                        />
                      </div>
                      <div className="flex-1">
                        <Select
                          required
                          showLabel
                          label="Work Model"
                          defaultValue=""
                          options={[
                            { value: "Hybrid", label: "Hybrid" },
                            { value: "Remote", label: "Remote" },
                            { value: "Onsite", label: "Onsite" },
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
                          id="work_model"
                          name="work_model"
                          value={formValues.work_model}
                        />
                        <ErrorMessage
                          name="work_model"
                          component="div"
                          className="error"
                        />
                      </div>
                    </div>
                    <div className="post-job__container__form__rows">
                      <div className="flex-1">
                        <FieldArray name="required_skills">
                          {({ push, remove, form }) => (
                            <div className="field-array__container">
                              {form.values.required_skills.map(
                                (_: string, index: number) => (
                                  <div key={index} className="field-array-item">
                                    <div className="flex-1">
                                      <InputField
                                        label={
                                          index === 0
                                            ? "Requirement"
                                            : undefined
                                        }
                                        name={`required_skills.${index}`}
                                        placeholder="Enter requirement"
                                        required={index === 0}
                                        onChange={(
                                          e: React.ChangeEvent<HTMLInputElement>
                                        ) => {
                                          handleChange(e);
                                          const newRequirements = [
                                            ...formValues.required_skills,
                                          ];
                                          newRequirements[index] =
                                            e.target.value;
                                          setFieldValue(
                                            "required_skills",
                                            newRequirements
                                          );
                                          setValues((prev) => ({
                                            ...prev,
                                            required_skills: newRequirements,
                                          }));
                                        }}
                                        onBlur={handleBlur}
                                        value={
                                          formValues.required_skills[index]
                                        }
                                      />
                                      <ErrorMessage
                                        name={`required_skills.${index}`}
                                        component="div"
                                        className="error"
                                      />
                                    </div>
                                    {index > 0 && (
                                      <Button
                                        onClick={() => {
                                          setValues((prev) => ({
                                            ...prev,
                                            required_skills: [
                                              ...prev.required_skills.slice(
                                                0,
                                                index
                                              ),
                                              ...prev.required_skills.slice(
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
                                (_: string, index: number) => (
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
