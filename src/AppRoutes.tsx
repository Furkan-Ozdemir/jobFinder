import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Explore from "./components/Explore/Explore";
import JobDetail from "./components/JobDetail/JobDetail";
import JobApply from "./components/JobApply/JobApply";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/job/:id" element={<JobDetail />} />
        <Route path="/job/:id/apply" element={<JobApply />} />
      </Routes>
    </BrowserRouter>
  );
}
