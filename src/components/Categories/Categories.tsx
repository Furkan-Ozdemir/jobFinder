import Card from "../Card/Card";
import "./index.scss";
import DollarSign from "/assets/images/DollarSign.png";
import Gastronomy from "/assets/images/Gastronomy.png";
import IT from "/assets/images/IT.png";
import Marketing from "/assets/images/Marketing.png";
import Sales from "/assets/images/Sales.png";
import Tech from "/assets/images/Tech.png";
import Science from "/assets/images/Science.png";

export default function Categories() {
  return (
    <div className="categories">
      <p className="categories__title pageTitle">Most Popular Categories</p>
      <div className="categories__container">
        <Card
          title="Finance"
          description="1,720 postings"
          image={DollarSign}
          backgroundColor="transparent"
          imageColor="lightblue"
        />
        <Card
          title="Gastronomy"
          description="1,720 postings"
          image={Gastronomy}
          backgroundColor="transparent"
          imageColor="pink"
        />
        <Card
          title="IT"
          description="1,720 postings"
          image={IT}
          backgroundColor="transparent"
          imageColor="green"
        />
        <Card
          title="Marketing"
          description="1,720 postings"
          image={Marketing}
          backgroundColor="transparent"
          imageColor="yellow"
        />
        <Card
          title="Sales"
          description="1,720 postings"
          image={Sales}
          backgroundColor="transparent"
          imageColor="purple"
        />
        <Card
          title="Tech"
          description="1,720 postings"
          image={Tech}
          backgroundColor="transparent"
          imageColor="lightgreen"
        />
        <Card
          title="Science"
          description="1,720 postings"
          image={Science}
          backgroundColor="transparent"
          imageColor="lightblue"
        />
        <Card
          title="Finance"
          description="1,720 postings"
          image="https://dummyimage.com/60"
          backgroundColor="transparent"
        />
      </div>
    </div>
  );
}
