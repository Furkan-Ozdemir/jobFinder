import Categories from "../Categories/Categories";
import HorizontalLine from "../HorizontalLine/HorizontalLine";
import Main from "../Main/Main";
import PromotedCompanies from "../PromotedCompanies/PromotedCompanies";
import Section from "../Section/Section";

export default function Home() {
  return (
    <>
      <Main />
      <HorizontalLine />
      <Section>
        <Categories />
      </Section>
      <HorizontalLine />
      <PromotedCompanies />
    </>
  );
}
