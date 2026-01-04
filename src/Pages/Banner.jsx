import { Link } from "react-router";
import bannering from "../assets/banner-right.png";

const Banner = () => {
  return (
    <section className="bg-gradient-to-br from-base-100 via-base-100 to-base-200 min-h-[65vh] flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-12">
      <div className="md:w-1/2 text-center md:text-left space-y-6">
        <span className="inline-flex items-center justify-center px-4 py-1 rounded-full bg-success/15 text-success text-sm font-medium">
          Personal Finance Manager
        </span>

        <h1 className="text-4xl md:text-5xl font-bold text-base-content leading-tight">
          Take Control of Your{" "}
          <span className="text-success">Finances</span>
        </h1>

        <p className="text-base-content/70 text-lg max-w-md mx-auto md:mx-0">
          FinEase helps you track income, expenses, and savings in one smart
          dashboard - stay organized and grow your money effortlessly.
        </p>

        <div className="flex flex-wrap justify-center md:justify-start gap-4">
          <Link
            to="/add-transaction"
            className="px-6 py-3 rounded-lg font-semibold text-white bg-success hover:bg-success/90 transition-all"
          >
            Get Started
          </Link>
          <Link
            to="/reports"
            className="px-6 py-3 rounded-lg font-semibold text-success border-2 border-success hover:bg-success/10 transition-all"
          >
            View Reports
          </Link>
        </div>
      </div>

      <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
        <img
          src={bannering}
          alt="Finance Illustration"
          className="w-90 md:w-[420px] drop-shadow-lg"
        />
      </div>
    </section>
  );
};

export default Banner;
