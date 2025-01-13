import React from "react";

interface PostListProps {
  discussionId: number;
}

const PostList: React.FC<PostListProps> = ({ discussionId }) => {
  const posts = [
    { id: 1, discussionId: 1, body: "This is a post for discussion 1." },
    { id: 2, discussionId: 1, body: "Another post for discussion 1." },
    { id: 3, discussionId: 2, body: "This is a post for discussion 2." },
  ];

  const filteredPosts = posts.filter(
    (post) => post.discussionId === discussionId,
  );

  return (
    <div className="mt-4">
      <h4 className="text-gray-700 font-semibold mb-2">Posts</h4>
      {filteredPosts.map((post) => (
        <div
          key={post.id}
          className="border border-gray-200 rounded-lg p-2 mb-2 bg-white"
        >
          <p className="text-gray-600">{post.body}</p>
        </div>
      ))}
    </div>
  );
};

export default PostList;
