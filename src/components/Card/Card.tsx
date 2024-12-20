import "./index.scss";

type Props = {
  title: string;
  description: string;
  image: string;
  backgroundColor:
    | "transparent"
    | "blue"
    | "pink"
    | "green"
    | "yellow"
    | "purple";
  positionCenter?: boolean;
};

export default function Card({
  title,
  description,
  image,
  backgroundColor,
  positionCenter,
}: Props) {
  return (
    <div
      className={`card ${backgroundColor ? ` card--${backgroundColor}` : ""}
        ${positionCenter ? ` card--center` : ""}
      `}
    >
      <div className="card__image-container">
        <img src={image} alt={title} className="image" />
      </div>
      <div>
        <div className="card__title-container">
          <p className="title">{title}</p>
        </div>
        <div className="card__description-container">
          <p className="description">{description}</p>
        </div>
      </div>
    </div>
  );
}
