import { Link } from "react-router-dom";
import { Ghost } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8FAFC] text-gray p-6">
      <Ghost size={64} className="text-primary mb-4 animate-bounce" />
      <h1 className="text-4xl font-bold mb-2 text-primary">404 - Not Found</h1>
      <p className="text-center text-gray-600 max-w-md mb-6">
        The page you’re looking for might be no longer exists.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-primary rounded-lg shadow-md text-white transition"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
