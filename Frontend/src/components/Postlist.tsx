import React, { useEffect, useState } from "react";
import { backendUrl } from "../../constants";
import { Post } from "../types/types";

interface PostListProps {
  discussionId: string;
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
}
const PostList: React.FC<PostListProps> = ({
  discussionId,
  posts,
  setPosts,
}) => {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Function to fetch posts from the backend using fetch
    const fetchPosts = async () => {
      try {
        const res = await fetch(`${backendUrl}/user/actions/findposts`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ discussionId: discussionId }),
        });

        // Check if the response is successful
        if (!res.ok) {
          throw new Error("Couldn't fetch posts");
        }

        // Parse the response as JSON
        const data = await res.json();

        // Update the posts state with the fetched posts
        setPosts(data);
      } catch (err) {
        // Set error message if the request fails
        setError("Couldn't fetch posts");
        console.error("Error fetching posts:", err);
      }
    };

    // Fetch posts when the component mounts or discussionId changes
    if (discussionId) {
      fetchPosts();
    }
  });

  return (
    <div className="mt-4">
      <h4 className="text-dark font-weight-semibold mb-2">Posts</h4>
      {error && <p className="text-danger">{error}</p>}
      {posts.length > 0 ? (
        posts.map((post) => (
          <div
            key={post._id}
            className="border border-light rounded p-2 mb-2 bg-white"
          >
            <p className="text-secondary">{post.body}</p>
          </div>
        ))
      ) : (
        <p className="text-muted">No posts available.</p>
      )}
    </div>
  );
};

export default PostList;
