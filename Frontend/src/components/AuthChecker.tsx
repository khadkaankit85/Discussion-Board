import { useEffect, useState } from "react";
import { backendUrl } from "../../constants";
import { useNavigate } from "react-router-dom";

const Protected = ({
  Children,
  role,
  redirectTo,
}: {
  Children: React.ComponentType;
  role: "admin" | "user" | "noauth";
  redirectTo: string;
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function loginWithCookie() {
      try {
        const response = await fetch(
          `${backendUrl}/user/authentication/login/withcookie`,
          {
            method: "POST",
            credentials: "include",
          },
        );
        console.log(await response.json());
        if (!response.ok) {
          console.error(
            "Failed to authenticate with cookie:",
            response.statusText,
          );
          navigate("/login");
          return;
        }
        setIsLoading(false);
      } catch (error) {
        console.error("An error occurred during authentication:", error);
        navigate(redirectTo);
      }
    }

    loginWithCookie();
  }, [navigate]);

  if (isLoading) {
    return <p></p>;
  }

  return <>{<Children />}</>;
};

export default Protected;
