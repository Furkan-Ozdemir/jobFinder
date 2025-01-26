import Card from "../Card/Card";
import SkeletonCard from "../SkeletonCard/SkeletonCard";
import "./index.scss";
import { usePaginatedApiQuery } from "../../hooks/useApi";
import { JobCategory } from "../../models/models";
import { Link } from "react-router-dom";

const imageColors = [
  "blue",
  "pink",
  "green",
  "purple",
  "lightgreen",
  "lightblue",
];

export default function Categories() {
  const categories = usePaginatedApiQuery<JobCategory[]>(
    ["categories"],
    "/api/categories"
  );

  return (
    <div className="categories">
      <div className="categories__wrapper">
        <p className="categories__wrapper__title pageTitle">
          Most Popular Categories
        </p>
        <div className="categories__wrapper__container">
          {categories.isLoading ? (
            <>
              {[...Array(6)].map((_, index) => (
                <SkeletonCard key={index} variant="category" />
              ))}
            </>
          ) : (
            categories.data?.data?.map((category) => (
              <Link
                to={`/search?company_category=${category.category_name}`}
                key={category._id}
              >
                <Card
                  title={category.category_name}
                  description={`${category.total_listings_count} postings`}
                  image={category.img_path}
                  backgroundColor="transparent"
                  imageColor={
                    imageColors[Math.floor(Math.random() * imageColors.length)]
                  }
                />
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
