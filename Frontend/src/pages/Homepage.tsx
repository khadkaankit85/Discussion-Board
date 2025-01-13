import DiscussionForm from "../components/Discussionform";
import DiscussionList from "../components/Discussionlist";
import PostForm from "../components/Postform";
export const Homepage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Discussion Board
      </h1>
      <div className="w-full max-w-3xl bg-white shadow-md rounded-lg p-6">
        <DiscussionForm />
        <DiscussionList />
        <PostForm />
      </div>
    </div>
  );
};
