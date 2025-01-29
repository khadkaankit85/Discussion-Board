import { useContext, useEffect } from "react";
import { UserInformationContext } from "../Configs/Contexts";
import { backendUrl } from "../../constants";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const userContext = useContext(UserInformationContext);
  const navigate = useNavigate();

  const logout = async () => {
    const res = await fetch(`${backendUrl}/user/authentication/logout`, {
      method: "POST",
      credentials: "include", // Include cookies in the request
    });
    if (res.status == 200) {
      navigate("/login");
    }
  };

  useEffect(() => {
    console.log("navbar mounted");
  }, []);

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        {userContext?.userInformation?.image && (
          <img
            src={userContext.userInformation.image}
            alt="User Avatar"
            className="w-10 h-10 rounded-full"
          />
        )}
        <span className="font-semibold text-lg">
          {userContext?.userInformation?.name}
        </span>
      </div>
      <div className="flex items-center space-x-4">
        <span className="text-sm">{userContext?.userInformation?.email}</span>
        <span
          className="text-sm bg-blue-500 px-2 py-1 cursor-pointer rounded"
          onClick={() => {
            logout();
          }}
        >
          Logout
        </span>
      </div>
    </nav>
  );
}
