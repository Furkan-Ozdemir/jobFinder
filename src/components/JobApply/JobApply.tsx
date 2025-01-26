import { useNavigate, useParams } from "react-router-dom";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

import "./index.scss";
import InputField from "../InputField/InputField";
import Button from "../Button/Button";
import {
  ApiResponse,
  Job,
  PostJobApplicationRequest,
} from "../../models/models";
import { useApiMutation, useApiQuery } from "../../hooks/useApi";
import { useAppSelector } from "../../store/hooks";
import { selectCurrentUser } from "../../store/slices/authSlice";
import SkeletonJobApply from "./SkeletonJobApply";

const validationSchema = Yup.object({
  fullName: Yup.string().required("Full name is required"),
  phone: Yup.string().required("Phone number is required"),
  linkedin: Yup.string().url("Invalid URL"),
  resume: Yup.mixed().required("Resume is required"),
  project: Yup.string().required("Project description is required"),
});

export default function JobApply() {
  const navigate = useNavigate();
  const user = useAppSelector(selectCurrentUser);
  const params = useParams();
  const jobId = params.id ?? "0";

  const job = useApiQuery<Job>(["job", jobId], `/api/jobs/${jobId}`);
  const jobApplication = useApiMutation<PostJobApplicationRequest>(
    `/api/jobs/apply/${jobId}`
  );

  const handleSubmit = async (values: PostJobApplicationRequest) => {
    if (!user) {
      console.error("No user found");
      return;
    }
    console.log(values);
    try {
      const formData = new FormData();
      formData.append("fullName", values.fullName);
      formData.append("phone", values.phone);
      formData.append("linkedin", values.linkedin || "");
      formData.append("project", values.project);
      formData.append("userEmail", user.email);
      if (values.resume instanceof File) {
        formData.append("resume", values.resume);
      }

      await toast.promise<ApiResponse<PostJobApplicationRequest>>(
        jobApplication.mutateAsync(formData),
        {
          pending: "Applying...",
          error: {
            render({ data }) {
              //@ts-expect-error TODO will fix
              return data.error.message || "Something went wrong";
            },
          },
          success: {
            render(data) {
              console.log(data);
              return "Applied successfully";
            },
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  if (job.isLoading) {
    return <SkeletonJobApply />;
  }

  return (
    <main className="d-flex align-center">
      <div className="jobDetail__form flex-1">
        <div className="jobDetail__form__container">
          <p className="jobDetail__form__container__title">
            The Application Form for {job.data?.data?.role} at{" "}
            {job.data?.data?.company_name}
          </p>
          <Formik
            initialValues={{
              fullName: "",
              phone: "",
              linkedin: "",
              resume: null,
              project: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {(formik) => (
              <Form>
                <div className="jobDetail__form__container__main">
                  <div className="jobDetail__form__container__main__inputs">
                    <div className="input-wrapper">
                      <InputField
                        label="Full Name"
                        type="text"
                        name="fullName"
                        placeholder="Enter your full name"
                        value={formik.values.fullName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        required
                      />
                      <ErrorMessage
                        name="fullName"
                        component="div"
                        className="error"
                      />
                    </div>
                    <div className="input-wrapper">
                      <InputField
                        label="Phone Number"
                        type="text"
                        name="phone"
                        placeholder="Enter your phone number"
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        required
                      />
                      <ErrorMessage
                        name="phone"
                        component="div"
                        className="error"
                      />
                    </div>
                    <div className="input-wrapper">
                      <InputField
                        label="Linkedin Profile"
                        type="text"
                        name="linkedin"
                        placeholder="Paste Link"
                        value={formik.values.linkedin}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      <ErrorMessage
                        name="linkedin"
                        component="div"
                        className="error"
                      />
                    </div>
                  </div>
                  <div className="jobDetail__form__container__main__inputs">
                    <div className="input-wrapper">
                      <InputField
                        label="Resume"
                        type="file"
                        name="resume"
                        onChange={(event) => {
                          const file = event.currentTarget.files?.[0] || null;
                          formik.setFieldValue("resume", file);
                        }}
                        onBlur={formik.handleBlur}
                        required
                        accept=".pdf"
                        size={5 * 1024 * 1024} //5mb
                      />
                      <ErrorMessage
                        name="resume"
                        component="div"
                        className="error"
                      />
                    </div>
                    <div className="input-wrapper">
                      <InputField
                        label="The project you are most proud of"
                        type="text"
                        name="project"
                        placeholder="Explain the project"
                        value={formik.values.project}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        required
                      />
                      <ErrorMessage
                        name="project"
                        component="div"
                        className="error"
                      />
                    </div>
                  </div>
                </div>
                <div className="jobDetail__form__container__main__buttons">
                  <div className="jobDetail__form__container__main__buttons__button">
                    <Button
                      color="blue"
                      type="button"
                      style={{ width: "100%" }}
                      disabled={formik.isSubmitting}
                      onClick={() => {
                        navigate(`/job/${job.data?.data?._id}`);
                      }}
                    >
                      <span>Go back to job details</span>
                    </Button>
                  </div>
                  <div className="jobDetail__form__container__main__buttons__button">
                    <Button
                      color="dark"
                      type="submit"
                      style={{ width: "100%" }}
                      disabled={formik.isSubmitting}
                    >
                      <span>Apply now</span>
                    </Button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </main>
  );
}
