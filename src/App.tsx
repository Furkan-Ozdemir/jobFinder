import Categories from "./components/Categories/Categories";
import Header from "./components/Header/Header";
import HorizontalLine from "./components/HorizontalLine/HorizontalLine";
import Main from "./components/Main/Main";
import PromotedCompanies from "./components/PromotedCompanies/PromotedCompanies";
import Section from "./components/Section/Section";

function App() {
  return (
    <>
      <Header />
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

export default App;
