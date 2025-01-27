import { useEffect, useState } from "react";
import DiscussionForm from "../components/Discussionform";
import DiscussionList from "../components/Discussionlist";
import { backendUrl } from "../../constants";
import { useNavigate } from "react-router-dom";
import { Discussion } from "../types/types";
import Navbar from "../components/Navbar";

export const Homepage = () => {
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
  }, [navigate]);

  const [discussions, setDiscussions] = useState<Discussion[]>([]);

  if (isLoading) {
    return <p></p>;
  }

  return (
    <>
      <Navbar />
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
    </>
  );
};
