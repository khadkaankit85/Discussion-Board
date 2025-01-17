import { useEffect, useState } from "react";
import DiscussionForm from "../components/Discussionform";
import DiscussionList from "../components/Discussionlist";
import PostForm from "../components/Postform";
import { backendUrl } from "../../constants";
import { useNavigate } from "react-router-dom";
import { Discussion } from "../types/types";

export const Homepage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function loginWithCookie() {
      try {
        const response = await fetch(
          `${backendUrl}/user/authentication/loginwithcookie`,
          {
            method: "POST",
            credentials: "include",
          },
        );
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
        navigate("/login");
      }
    }

    loginWithCookie();
  }, [backendUrl, navigate]);

  if (isLoading) {
    return <p></p>;
  }

  const [discussions, setDiscussions] = useState<Discussion[]>([]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Discussion Board
      </h1>
      <div className="w-full max-w-3xl bg-white shadow-md rounded-lg p-6">
        <DiscussionForm
          discussions={discussions}
          setDiscussions={setDiscussions}
        />
        <DiscussionList
          discussions={discussions}
          setDiscussions={setDiscussions}
        />
      </div>
    </div>
  );
};
