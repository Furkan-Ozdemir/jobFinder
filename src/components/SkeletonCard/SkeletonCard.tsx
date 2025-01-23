import "./index.scss";

interface SkeletonCardProps {
  variant?: "category" | "company";
}

export default function SkeletonCard({ variant = "category" }: SkeletonCardProps) {
  return (
    <div className={`skeleton-card ${variant}`}>
      <div className="skeleton-card__image"></div>
      <div className="skeleton-card__content">
        <div className="skeleton-card__title"></div>
        <div className="skeleton-card__description"></div>
      </div>
    </div>
  );
}
