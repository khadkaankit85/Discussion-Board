import React from "react";

const PostForm: React.FC = () => {
  return (
    <form className="mt-4">
      <textarea
        placeholder="Write a post..."
        className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows={2}
      ></textarea>
      <button
        type="submit"
        className="bg-blue-500 text-white py-1 px-4 rounded-lg hover:bg-blue-600"
      >
        Add Post
      </button>
    </form>
  );
};

export default PostForm;
