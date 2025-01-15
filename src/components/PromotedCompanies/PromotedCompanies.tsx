import Card from "../Card/Card";
import Section from "../Section/Section";
import "./index.scss";

import { useApiQuery } from "../../hooks/useApi";
import { Company } from "../../models/models";

const backgroundColors: (
  | "transparent"
  | "pink"
  | "green"
  | "yellow"
  | "purple"
)[] = ["transparent", "pink", "green", "yellow", "purple"];
export default function PromotedCompanies() {
  const promotedCompanies = useApiQuery<Company[]>(
    ["promotedCompanies"],
    "/api/companies/promoted"
  );
  return (
    <Section>
      <div className="promoted">
        <p className="pageTitle">Promoted Companies</p>
        <div className="promoted__container">
          {promotedCompanies.data?.data?.map((company) => (
            <Card
              key={company._id}
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
          ))}
        </div>
      </div>
    </Section>
  );
}
