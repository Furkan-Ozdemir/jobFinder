import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Explore from "./components/Explore/Explore";
import JobDetail from "./components/JobDetail/JobDetail";
import JobApply from "./components/JobApply/JobApply";
import Search from "./components/Search/Search";
import NotFound from "./components/NotFound/NotFound";
import PostJob from "./components/PostJob/PostJob";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/job/:id" element={<JobDetail />} />
        <Route path="/job/:id/apply" element={<JobApply />} />
        <Route path="/search" element={<Search />} />
        <Route path="/post-job" element={<PostJob />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
