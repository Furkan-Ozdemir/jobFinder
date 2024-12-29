import "./index.scss";

interface Props {
  text: string;
  icon: string;
}

export default function JobTag(props: Props) {
  //TODO text ve iconlar backendden gelecek
  const { text, icon } = props;
  return (
    <div className="job-tag">
      <img src={icon} alt="tag-icon" className="job-tag__icon" />
      <div className="job-tag__text">{text}</div>
    </div>
  );
}
