import Card from "../Card/Card";
import Section from "../Section/Section";
import SkeletonCard from "../SkeletonCard/SkeletonCard";
import "./index.scss";

import { usePaginatedApiQuery } from "../../hooks/useApi";
import { Company } from "../../models/models";
import { Link } from "react-router-dom";

const backgroundColors: (
  | "transparent"
  | "pink"
  | "green"
  | "yellow"
  | "purple"
)[] = ["transparent", "pink", "green", "yellow", "purple"];
export default function PromotedCompanies() {
  const promotedCompanies = usePaginatedApiQuery<Company[]>(
    ["promotedCompanies"],
    "/api/companies/promoted"
  );

  return (
    <Section>
      <div className="promoted">
        <p className="pageTitle">Promoted Companies</p>
        <div className="promoted__container">
          {promotedCompanies.isLoading ? (
            <>
              {[...Array(4)].map((_, index) => (
                <SkeletonCard key={index} variant="company" />
              ))}
            </>
          ) : (
            promotedCompanies.data?.data?.map((company) => (
              <Link
                to={`/search?company_name=${company.company_name}`}
                key={company._id}
              >
                <Card
                  title={company.company_name}
                  description={`${company.people_count} employees`}
                  image={company.img_path}
                  positionCenter
                  backgroundColor={
                    backgroundColors[
                      Math.floor(Math.random() * backgroundColors.length)
                    ]
                  }
                  button={"View"}
                />
              </Link>
            ))
          )}
        </div>
      </div>
    </Section>
  );
}
