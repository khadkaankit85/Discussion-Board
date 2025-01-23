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
    <form onSubmit={handleSubmit}>
      <h2 className="h4 font-weight-bold text-dark mb-4">
        Create a New Discussion
      </h2>

      {/* Error & Success Messages */}
      {error && <div className="text-danger mb-4">{error}</div>}
      {success && <div className="text-success mb-4">{success}</div>}

      {/* Title Input */}
      <div className="form-group mb-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter discussion title"
          className="form-control"
        />
      </div>

      {/* Discussion Body Textarea */}
      <div className="form-group mb-4">
        <textarea
          value={discussionBody}
          onChange={(e) => setDiscussionBody(e.target.value)}
          placeholder="Enter discussion body"
          className="form-control"
          rows={4}
        ></textarea>
      </div>

      {/* Submit Button */}
      <button type="submit" className="btn btn-primary w-100">
        Submit Discussion
      </button>
    </form>
  );
};

export default DiscussionForm;
