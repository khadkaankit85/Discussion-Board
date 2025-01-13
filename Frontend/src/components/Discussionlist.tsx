import React from "react";
import PostList from "./Postlist";

const DiscussionList: React.FC = () => {
  const discussions = [
    { id: 1, title: "First Discussion", body: "This is the first discussion." },
    {
      id: 2,
      title: "Second Discussion",
      body: "This is the second discussion.",
    },
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Discussions</h2>
      {discussions.map((discussion) => (
        <div
          key={discussion.id}
          className="border border-gray-300 rounded-lg p-4 mb-4 bg-gray-50"
        >
          <h3 className="font-bold text-lg text-gray-800">
            {discussion.title}
          </h3>
          <p className="text-gray-600">{discussion.body}</p>
          <PostList discussionId={discussion.id} />
        </div>
      ))}
    </div>
  );
};

export default DiscussionList;
