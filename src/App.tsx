import { ToastContainer, Zoom } from "react-toastify";
import Categories from "./components/Categories/Categories";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import HorizontalLine from "./components/HorizontalLine/HorizontalLine";
import Main from "./components/Main/Main";
import PromotedCompanies from "./components/PromotedCompanies/PromotedCompanies";
import Section from "./components/Section/Section";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <Main />
      <HorizontalLine />
      <Section>
        <Categories />
      </Section>
      <HorizontalLine />
      <PromotedCompanies />
      {/* <HorizontalLine /> */}
      {/* <BoostYourCareer /> */}
      <Footer />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Zoom}
        style={{ fontSize: "1.4rem", fontFamily: "Montserrat" }}
      />
    </QueryClientProvider>
  );
}

export default App;
