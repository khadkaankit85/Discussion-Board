const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <div className="w-full h-[70vh] mb-6">
        <img
          src="/notfound.jpg"
          alt="404 Not Found"
          className="w-full h-full object-contain"
        />
      </div>
      <p className="text-gray-600 mb-8 text-xl">
        Sorry, the page you are looking for does not exist or has been moved.
      </p>
      <button
        onClick={() => (window.location.href = "/")}
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
      >
        Go to Homepage
      </button>
    </div>
  );
};

export default NotFound;
