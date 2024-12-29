import "./index.scss";

interface Props {
  text: string;
  icon: string;
  jobDetail?: boolean;
}

export default function JobTag(props: Props) {
  //TODO text ve iconlar backendden gelecek
  const { text, icon, jobDetail } = props;
  return (
    <div className={`job-tag ${jobDetail ? "job-tag-jobDetail" : ""}`}>
      <img src={icon} alt="tag-icon" className="job-tag__icon" />
      <div className="job-tag__text">{text}</div>
    </div>
  );
}
