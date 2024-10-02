import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/loginPage";
import SignupPage from "../pages/signupPage";
import { APP_SIGNUP } from "../assets/routes";

function AuthRoutes() {
  return (
    <Routes>
      <Route path="/" Component={LoginPage} />
      <Route path={APP_SIGNUP} Component={SignupPage} />
    </Routes>
  );
}

export default AuthRoutes;
