import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Explore from "./components/Explore/Explore";
import JobDetail from "./components/JobDetail/JobDetail";
import JobApply from "./components/JobApply/JobApply";
import Search from "./components/Search/Search";
import NotFound from "./components/NotFound/NotFound";
import PostJob from "./components/PostJob/PostJob";
import ProtectedRoute from "./components/ProtectedRoute";
import EmployerRoute from "./components/EmployerRoute";
import CreateCompanyProfile from "./components/CompanyProfile/CreateCompanyProfile";
import MyApplications from "./components/MyApplications/MyApplications";
import Home from "./components/Home/Home";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/job/:id" element={<JobDetail />} />
          <Route path="/job/:id/apply" element={<JobApply />} />
          <Route path="/search" element={<Search />} />
          <Route
            path="/my-applications"
            element={
              <ProtectedRoute>
                <MyApplications />
              </ProtectedRoute>
            }
          />
          <Route
            path="/post-job"
            element={
              <ProtectedRoute>
                <PostJob />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-company"
            element={
              <EmployerRoute>
                <CreateCompanyProfile />
              </EmployerRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
