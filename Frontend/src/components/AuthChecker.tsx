import { useContext, useEffect, useState } from "react";
import { backendUrl } from "../../constants";
import { useNavigate } from "react-router-dom";
import { UserInformationContext } from "../Configs/Contexts";

const Protected = ({
  Children,
  role,
  redirectTo,
}: {
  Children: React.ComponentType;
  role: "admin" | "user" | "noauth";
  redirectTo: string;
}) => {
  //provider that provides user infromation context
  const userContext = useContext(UserInformationContext);

  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userContext) {
      throw new Error("User context is not availble in Auth checker");
    }
    if (role == "noauth") {
      //if no auth is required, return the component
      setIsLoading(false);
    } else {
      loginWithCookie();
    }

    async function loginWithCookie() {
      try {
        const response = await fetch(
          `${backendUrl}/user/authentication/login/withcookie`,
          {
            method: "POST",
            credentials: "include",
          },
        );

        //if the user is not authenticated/loggedin
        if (!response.ok) {
          console.error(
            "Failed to authenticate with cookie:",
            response.statusText,
          );
          navigate(redirectTo);
          return;
        }

        //if the user is logged in
        const userdata = await response.json();

        //if the role matches
        if (role === userdata?.role) {
          setIsLoading(false);
        }
        //if the role of the user is 'admin' but the required role is 'user' then allow the user to view the page
        else if (role === "user" && userdata?.role === "admin") {
          setIsLoading(false);
        } else {
          navigate(redirectTo);
        }
      } catch (error) {
        console.error("An error occurred during authentication:", error);
        navigate(redirectTo);
      }
    }
  }, [navigate, redirectTo, userContext, role]);

  if (isLoading) {
    return <p></p>;
  }

  return <>{<Children />}</>;
};

export default Protected;
