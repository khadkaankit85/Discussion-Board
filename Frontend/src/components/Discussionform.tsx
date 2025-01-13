import React from "react";

const DiscussionForm: React.FC = () => {
  return (
    <form className="mb-6">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">
        Create a New Discussion
      </h2>
      <input
        type="text"
        placeholder="Enter discussion title"
        className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <textarea
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
