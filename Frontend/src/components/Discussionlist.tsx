import { useState, useEffect } from "react";
import { backendUrl } from "../../constants";
import PostList from "./Postlist";
import PostForm from "./Postform";
import { Discussion, Post } from "../types/types";

import before_liked from "./../assets/like_unliked.png";
import liked from "./../assets/like_liked.png";

import before_dislike from "./../assets/dislike_undisliked.png";
import disliked from "./../assets/dislike_disliked.png";

interface DiscussionListProps {
  discussions: Discussion[];
  setDiscussions: (discussions: Discussion[]) => void;
}

const DiscussionList = ({
  discussions,
  setDiscussions,
}: DiscussionListProps) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);

  const [likedDiscussions, setLikedDiscussions] = useState<string[]>([]);
  const [dislikedDiscussions, setDislikedDiscussions] = useState<string[]>([]);

  //if user clicks on like button
  const handleLike = (discussionId: string) => {
    //if it was already liked then unlike it
    if (likedDiscussions.includes(discussionId)) {
      setLikedDiscussions(likedDiscussions.filter((id) => id !== discussionId));
    } else {
      //if it was disliked then like it
      if (dislikedDiscussions.includes(discussionId)) {
        setDislikedDiscussions(
          dislikedDiscussions.filter((id) => id !== discussionId),
        );
      }
      setLikedDiscussions([...likedDiscussions, discussionId]);
    }
  };

  const handleDislike = (discussionId: string) => {
    //if it was already disliked
    if (dislikedDiscussions.includes(discussionId)) {
      setDislikedDiscussions(
        dislikedDiscussions.filter((id) => id !== discussionId),
      );
    } else {
      //if it was not disliked then dislike it and remove from liked one
      setDislikedDiscussions([...dislikedDiscussions, discussionId]);
      if (likedDiscussions.includes(discussionId)) {
        setLikedDiscussions(
          likedDiscussions.filter((id) => id !== discussionId),
        );
      }
    }
  };

  useEffect(() => {
    const fetchDiscussions = async () => {
      try {
        const response = await fetch(
          `${backendUrl}/user/actions/getDiscussions`,
        );
        if (!response.ok) {
          throw new Error("Failed to fetch discussions");
        }
        const data = await response.json();
        setDiscussions(data);
        setError(null);
      } catch (err) {
        setError("Error loading discussions");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDiscussions();
  }, []);

  if (loading) {
    return <p className="text-gray-500">Loading discussions...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Discussions</h2>
      {discussions.length === 0 ? (
        <p className="text-gray-600">No discussions available.</p>
      ) : (
        discussions.map((discussion, index) => (
          <div
            key={index}
            className="border border-gray-300 rounded-lg p-4 mb-4 bg-gray-50"
          >
            <h3 className="font-bold text-lg text-gray-800">
              {discussion.title}
            </h3>
            <p className="text-gray-600">{discussion.body}</p>
            <div className="flex items-center gap-4 mt-4 like_dislikeButtons">
              <button
                onClick={() => {
                  handleLike(discussion._id);
                }}
              >
                <p>{likedDiscussions.includes(discussion._id) ? "01" : ""}</p>
                <img
                  src={
                    likedDiscussions.includes(discussion._id)
                      ? liked
                      : before_liked
                  }
                  width={30}
                  height={30}
                />
              </button>
              <button
                onClick={() => {
                  handleDislike(discussion._id);
                }}
              >
                <p>
                  {dislikedDiscussions.includes(discussion._id) ? "01 " : ""}
                </p>
                <img
                  src={
                    dislikedDiscussions.includes(discussion._id)
                      ? disliked
                      : before_dislike
                  }
                  width={30}
                  height={30}
                />
              </button>
            </div>
            <PostList
              discussionId={discussion._id}
              posts={posts}
              setPosts={setPosts}
            />
            <PostForm
              discussionId={discussion._id}
              userId={"6785e4c3306d91ef520910c0"}
              posts={posts}
              setPosts={setPosts}
            />
          </div>
        ))
      )}
    </div>
  );
};

export default DiscussionList;
