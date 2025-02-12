import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Homepage } from "./pages/Homepage";
import LoginPage from "./pages/Loginpage";
import SignupPage from "./pages/Signup";
import OTPVerification from "./pages/OTPverification";
import UserProfile from "./pages/UserProfilePage";
import AuthChecker from "./components/AuthChecker";
import NotFound from "./pages/NotFound";
import UserInformationProvider from "./Configs/UserInfoContext";
import Protected from "./components/AuthChecker";

export default function App() {
  return (
    <UserInformationProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Protected redirectTo="/login" Children={Homepage} role="user" />
            }
          />
          <Route
            path="/home"
            element={
              <Protected redirectTo="/login" Children={Homepage} role="user" />
            }
          />
          <Route
            path="/user/profile"
            element={
              <AuthChecker
                redirectTo={"/login"}
                Children={UserProfile}
                role={"user"}
              />
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/signup/otpverification/:username/:userid"
            element={<OTPVerification />}
          />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </UserInformationProvider>
  );
}
