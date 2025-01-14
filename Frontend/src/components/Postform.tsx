import React, { useState } from "react";
import { backendUrl } from "../../constants";
import { Post } from "../types/types";

interface PostFormProps {
  discussionId: string; // ID of the discussion where the post will be added
  userId: string; // ID of the user creating the post
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<any>>;
}

const PostForm: React.FC<PostFormProps> = ({
  discussionId,
  userId,
  posts,
  setPosts,
}) => {
  const [postContent, setPostContent] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!postContent.trim()) {
      setError("Post content cannot be empty.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch(`${backendUrl}/user/actions/createPost`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          discussionId: discussionId,
          body: postContent,
          userId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create post.");
      }

      const data: Post = await response.json();
      setPosts([...posts, data]);

      // Clear the input field after successful submission
      setPostContent("");
    } catch (err) {
      console.error(err);
      setError("An error occurred while creating the post.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <textarea
        value={postContent}
        onChange={(e) => setPostContent(e.target.value)}
        placeholder="Write a post..."
        className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows={2}
        disabled={isSubmitting}
      ></textarea>
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
      <button
        type="submit"
        className={`bg-blue-500 text-white py-1 px-4 rounded-lg hover:bg-blue-600 ${
          isSubmitting ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Add Post"}
      </button>
    </form>
  );
};

export default PostForm;
