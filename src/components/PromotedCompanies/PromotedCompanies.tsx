import Card from "../Card/Card";
import Section from "../Section/Section";
import "./index.scss";
import IT from "/assets/images/IT.png";
import Sales from "/assets/images/Sales.png";
import Tech from "/assets/images/Tech.png";
import Science from "/assets/images/Science.png";

export default function PromotedCompanies() {
  return (
    <Section>
      <div className="promoted">
        <p className="pageTitle">Promoted Companies</p>
        <div className="promoted__container">
          <Card
            title="Unicorn"
            description="30 jobs"
            image={IT}
            positionCenter
            backgroundColor="purple"
          />
          <Card
            title="Tech Foals"
            description="30 jobs"
            image={Sales}
            backgroundColor="green"
            positionCenter
          />
          <Card
            title="B Bank"
            description="30 jobs"
            image={Tech}
            backgroundColor="yellow"
            positionCenter
          />
          <Card
            title="McBurger"
            description="30 jobs"
            image={Science}
            backgroundColor="pink"
            positionCenter
          />
        </div>
      </div>
    </Section>
  );
}
