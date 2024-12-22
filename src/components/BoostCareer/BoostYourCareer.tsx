import "./index.scss";
import Card from "../Card/Card";
import Pen from "/assets/images/Pen.png";
import Wallet from "/assets/images/Wallet.png";
import Calculator from "/assets/images/Calculator.png";

export default function BoostYourCareer() {
  return (
    <div className="boost-your-career">
      <p className="boost-your-career__title pageTitle">Boost Your Career</p>

      <div className="boost-your-career__container">
        <Card
          title="How to write a good CV"
          image={Pen}
          backgroundColor="green"
          positionCenter
        />
        <Card
          title="Compare your salary"
          image={Wallet}
          backgroundColor="purple"
          positionCenter
        />
        <Card
          title="Tax Calculator"
          image={Calculator}
          backgroundColor="blue"
          positionCenter
        />
      </div>
    </div>
  );
}
