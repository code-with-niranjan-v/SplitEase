import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";
import GroupDetail from "../components/GroupDetail";
import GroupMenu from "../components/GroupMenu";
import LandingPage from "../pages/LandingPage";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/groups" element={<GroupMenu />} />
        <Route path="/groups/:groupId" element={<GroupDetail />} />
      </Routes>
    </BrowserRouter>
  );
}
