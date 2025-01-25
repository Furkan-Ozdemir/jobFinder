import { Link, useParams } from "react-router-dom";

import "./index.scss";
import JobTag from "../JobTag/JobTag";
import Wallet from "/assets/images/Wallet.png";
import HorizontalLine from "../HorizontalLine/HorizontalLine";
import InputField from "../InputField/InputField";
import Button from "../Button/Button";
import {
  ApiResponse,
  Job,
  PostJobApplicationRequest,
  PostJobRequest,
} from "../../models/models";
import { useApiMutation, useApiQuery } from "../../hooks/useApi";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAppSelector } from "../../store/hooks";
import { selectCurrentUser } from "../../store/slices/authSlice";
import { toast } from "react-toastify";

type JobDetailProps = {
  apply?: boolean;
  preview?: boolean;
  previewValues?: PostJobRequest;
};

const validationSchema = Yup.object({
  fullName: Yup.string().required("Full name is required"),
  phone: Yup.string().required("Phone number is required"),
  linkedin: Yup.string().url("Invalid URL"),
  resume: Yup.mixed().required("Resume is required"),
  project: Yup.string().required("Project description is required"),
});

export default function JobDetail(props: JobDetailProps) {
  const { apply, preview, previewValues } = props;

  const user = useAppSelector(selectCurrentUser);

  const params = useParams();
  const jobId = params.id ?? "0";

  const job = useApiQuery<Job>(["job", jobId], `/api/jobs/${jobId}`, {
    enabled: !preview,
  });

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

  return (
    <main>
      <div className="jobDetail">
        <div className={`jobDetail__details ${preview && "preview"}`}>
          <div className="jobDetail__details__breadCrumb">
            <ul className="jobDetail__details__breadCrumb__list">
              <li className="jobDetail__details__breadCrumb__list__item">
                <Link to="/explore">Explore</Link>
              </li>
              <li>
                {job.data?.data?.role ||
                  previewValues?.role ||
                  "Marketing sales representative"}
              </li>
              {apply && <li>Apply</li>}
            </ul>
          </div>
          <div className="jobDetail__details__company-main">
            <div className="jobDetail__details__company-main__apply__container">
              <div className="flex">
                <div className="jobDetail__details__company-main__logo">
                  <svg height={35} width={35} viewBox="0 0 24 24">
                    <path d="M0 0h24v24H0z" fill="none"></path>
                    <path d="m19 9 1.25-2.75L23 5l-2.75-1.25L19 1l-1.25 2.75L15 5l2.75 1.25L19 9zm-7.5.5L9 4 6.5 9.5 1 12l5.5 2.5L9 20l2.5-5.5L17 12l-5.5-2.5L9 4z"></path>
                  </svg>
                </div>
                <div className="jobDetail__details__company-main__info">
                  <p className="jobDetail__details__company-main__info__job">
                    {job.data?.data?.role ||
                      previewValues?.role ||
                      "Marketing sales representative"}
                  </p>
                  <p className="jobDetail__details__company-main__info__company">
                    {job.data?.data?.company_name ||
                      previewValues?.company_name ||
                      "Company Name"}
                  </p>
                </div>
              </div>
              {!apply && (
                <div className="jobDetail__details__company-main__apply__container__apply">
                  <Link to={`/job/${jobId}/apply`}>
                    <span>Apply now</span>
                    <svg
                      height={20}
                      width={20}
                      color="#fff"
                      fill="#fff"
                      viewBox="0 0 24 24"
                    >
                      <path fill="none" d="M0 0h24v24H0z"></path>
                      <path d="M9 5v2h6.59L4 18.59 5.41 20 17 8.41V15h2V5H9z"></path>
                    </svg>
                  </Link>
                </div>
              )}
            </div>
            {!apply && (
              <div className="jobDetail__details__company-main__details">
                <div>
                  <div className="jobDetail__details__company-main__details__address">
                    <div className="jobDetail__details__company-main__details__address__img">
                      <svg height={24} width={24} viewBox="0 0 24 24">
                        <path d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z"></path>
                      </svg>
                    </div>
                    <div className="jobDetail__details__company-main__details__address__text">
                      {job.data?.data?.location ||
                        "Magic Street 676/51, London"}
                    </div>
                  </div>
                  <div className="jobDetail__details__company-main__details__count">
                    <div className="jobDetail__details__company-main__details__count__img">
                      <svg height={24} width={24} viewBox="0 0 24 24">
                        <path fill="none" d="M0 0h24v24H0z"></path>
                        <path d="M17 19.22H5V7h7V5H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-7h-2v7.22z"></path>
                        <path d="M19 2h-2v3h-3c.01.01 0 2 0 2h3v2.99c.01.01 2 0 2 0V7h3V5h-3V2zM7 9h8v2H7zm0 3v2h8v-2H7zm0 3h8v2H7z"></path>
                      </svg>
                    </div>
                    <div className="jobDetail__details__company-main__details__count__text">
                      {job.data?.data?.applicant_count || "139"} Applicants
                    </div>
                  </div>
                </div>
                <div className="jobDetail__details__company-main__details__description">
                  <p>
                    {job.data?.data?.salesPitch ||
                      previewValues?.salesPitch ||
                      "Join our dynamic team as a Marketing Sales Representative," +
                        "where you'll leverage your exceptional interpersonal" +
                        "skills and strategic mindset to drive sales and build" +
                        "lasting client."}
                  </p>
                </div>
                <div className="jobDetail__details__company-main__details__tags">
                  {
                    <>
                      <JobTag
                        text={
                          job.data?.data?.employment_type ||
                          previewValues?.employment_type ||
                          "Full-time"
                        }
                        icon={Wallet}
                        jobDetail={true}
                      />
                      <JobTag
                        text={
                          job.data?.data?.experience_level ||
                          previewValues?.experience_level ||
                          "Junior"
                        }
                        icon={Wallet}
                        jobDetail={true}
                      />

                      <JobTag
                        text={
                          job.data?.data?.work_model ||
                          previewValues?.work_model ||
                          "Hybrid"
                        }
                        icon={Wallet}
                        jobDetail={true}
                      />
                    </>
                  }
                </div>
              </div>
            )}
          </div>
        </div>
        <HorizontalLine />

        {!apply && (
          <div className="jobDetail__blabla">
            <div className="jobDetail__blabla__container">
              <div className="jobDetail__blabla__container__about">
                <p className="jobDetail__blabla__container__about__title">
                  About company
                </p>
                <p>
                  {job.data?.data?.about_the_company ||
                    previewValues?.about_the_company ||
                    "Unicorn is a leading tele-comm company, dedicated to" +
                      "delivering innovative solutions and driving exceptional" +
                      "growth in the market. As we expand our team, we are seeking" +
                      "a highly motivated and results-oriented Marketing Sales" +
                      "Representative to join us in achieving our ambitious sales" +
                      "targets and further strengthening our market presence."}
                </p>
              </div>
              <div className="jobDetail__blabla__container__role">
                <p className="jobDetail__blabla__container__role__title">
                  Role description
                </p>
                <p>
                  {job.data?.data?.role_description ||
                    previewValues?.role_description ||
                    "As a Marketing Sales Representative, you will play a crucial" +
                      "role in driving revenue generation and building long-term" +
                      "client relationships. You will be responsible for" +
                      "effectively promoting our products/services, identifying new" +
                      "business opportunities, and converting leads into sales." +
                      "Your keen understanding of market trends and customer needs" +
                      "will enable you to develop and implement strategic sales" +
                      "plans to maximize our market share and exceed targets."}
                </p>
              </div>
              <div className="jobDetail__blabla__container__responsibilities">
                <p className="jobDetail__blabla__container__responsibilities__title">
                  Responsibilities
                </p>
                <ul>
                  {(job.data?.data?.responsibilities &&
                  job.data.data.responsibilities[0] !== ""
                    ? job.data.data.responsibilities
                    : previewValues?.responsibilities &&
                      previewValues.responsibilities[0] !== ""
                    ? previewValues.responsibilities
                    : [
                        "Develop and implement strategic sales plans",
                        "Identify new business opportunities",
                        "Build and maintain strong client relationships",
                        "Conduct market research and analysis",
                        "Meet and exceed sales targets",
                      ]
                  ).map((item: string) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="jobDetail__blabla__container__requirements">
                <p className="jobDetail__blabla__container__requirements__title">
                  Requirements
                </p>
                <ul>
                  {(job.data?.data?.required_skills &&
                  job.data.data.required_skills[0] !== ""
                    ? job.data.data.required_skills
                    : previewValues?.required_skills &&
                      previewValues.required_skills[0] !== ""
                    ? previewValues.required_skills
                    : [
                        "Minimum 2 years of experience in sales",
                        "Proven track record of meeting and exceeding sales targets",
                        "Strong communication and interpersonal skills",
                        "Excellent negotiation and persuasion abilities",
                        "Ability to work independently and as part of a team",
                      ]
                  ).map((item: string) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="jobDetail__blabla__container__additional">
                <p className="jobDetail__blabla__container__additional__title">
                  Additional information
                </p>
                <p>
                  {job.data?.data?.additionalInfo ||
                    previewValues?.additionalInfo ||
                    "This is a full-time position with competitive salary and benefits package. If you are a results-driven individual with a passion for sales and a desire to grow your career in a dynamic environment, we want to hear from you!"}
                </p>
              </div>

              <div className="jobDetail__blabla__container__apply">
                <Link to={`/job/${jobId}/apply`}>
                  <span>Apply now</span>
                  <svg
                    height={20}
                    width={20}
                    color="#fff"
                    fill="#fff"
                    viewBox="0 0 24 24"
                  >
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path d="M9 5v2h6.59L4 18.59 5.41 20 17 8.41V15h2V5H9z"></path>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        )}
        {apply && (
          <div className="jobDetail__form">
            <div className="jobDetail__form__container">
              <p className="jobDetail__form__container__title">
                The Application Form
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
                              const file =
                                event.currentTarget.files?.[0] || null;
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

                    <div className="jobDetail__form__container__main__button">
                      <Button
                        color="dark"
                        type="submit"
                        style={{ width: "100%" }}
                        disabled={formik.isSubmitting}
                      >
                        <span>Apply now</span>
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
