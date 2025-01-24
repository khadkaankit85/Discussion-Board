import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Homepage } from "./pages/Homepage";
import LoginPage from "./pages/Loginpage";
import SignupPage from "./pages/Signup";
import OTPVerification from "./pages/OTPverification";
import { createContext, useState } from "react";
import UserProfile from "./pages/UserProfilePage";
import AuthChecker from "./components/AuthChecker";

export default function App() {
  const [userInformation, setUserInformation] = useState(null);
  const UserInformationContext = createContext({
    userInformation,
    setUserInformation,
  });
  return (
    <UserInformationContext.Provider
      value={{ userInformation, setUserInformation }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/home" element={<Homepage />} />
          <Route
            path="/user/profile"
            element={<AuthChecker Children={UserProfile} role="user" />}
          />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/signup/otpverification/:username/:userid"
            element={<OTPVerification />}
          />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </BrowserRouter>
    </UserInformationContext.Provider>
  );
}
