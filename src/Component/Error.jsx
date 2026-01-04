import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <section className="bg-[#F7FAFC] min-h-screen flex flex-col justify-center items-center text-center px-6">
 
      <img
        src="https://cdn-icons-png.flaticon.com/512/7486/7486803.png"
        alt="Error Illustration"
        className="w-48 md:w-64 mb-6"
      />

      <h1 className="text-6xl font-bold text-[#3BB273] mb-2">404</h1>
      <h2 className="text-2xl font-semibold text-[#1F2937] mb-3">
        Oops! Page Not Found
      </h2>
      <p className="text-[#6B7280] max-w-md mb-6">
        The page you're looking for doesn't exist or has been moved.  
        Please check the URL or go back to the homepage.
      </p>

      <Link
        to="/"
        className="bg-[#3BB273] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#34A267] transition-all duration-200"
      >
        Back to Home
      </Link>
    </section>
  );
};

export default ErrorPage;
