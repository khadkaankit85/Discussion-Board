import React, { useState } from "react";
import { backendUrl } from "../../constants";
import { Discussion } from "../types/types";

interface DiscussionFormProps {
  discussions: Discussion[];
  setDiscussions: (discussions: Discussion[]) => void;
}

const DiscussionForm = ({
  discussions,
  setDiscussions,
}: DiscussionFormProps) => {
  const [title, setTitle] = useState<string>("");
  const [discussionBody, setDiscussionBody] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const userId = "6785e4c3306d91ef520910c0"; // Replace with the actual userId (e.g., from context or props)
    if (!userId || !title || !discussionBody) {
      setError("All fields are required");
      setSuccess(null);
      return;
    }

    try {
      const response = await fetch(
        `${backendUrl}/user/actions/createDiscussion`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId, title, discussionBody }),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to create discussion");
      }

      const data: Discussion = await response.json();
      setDiscussions([...discussions, data]);
      setSuccess("Discussion created successfully!");
      setError(null);
      console.log("Discussion created:", data);

      // Clear form fields
      setTitle("");
      setDiscussionBody("");
    } catch (error) {
      setError("Error creating discussion");
      setSuccess(null);
      console.error("Error:", error);
    }
  };

  return (
    <form className="mb-6" onSubmit={handleSubmit}>
      <h2 className="text-xl font-semibold text-gray-700 mb-4">
        Create a New Discussion
      </h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter discussion title"
        className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <textarea
        value={discussionBody}
        onChange={(e) => setDiscussionBody(e.target.value)}
        placeholder="Enter discussion body"
        className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows={4}
      ></textarea>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
      >
        Submit Discussion
      </button>
    </form>
  );
};

export default DiscussionForm;
