import { FaPlusCircle } from "react-icons/fa";
import { FaChartLine } from "react-icons/fa";
import { FaRegChartBar } from "react-icons/fa";

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="bg-base-100 py-16 px-6 md:px-20">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-semibold text-base-content mb-3">
          How It Works
        </h2>
        <p className="text-base-content/70 max-w-2xl mx-auto mb-10">
          Manage your money in three simple steps with a clear workflow.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-base-200 border border-base-300 rounded-2xl p-6 min-h-[220px] flex flex-col items-center text-center hover:shadow-lg transition-all duration-300">
            <div className="w-12 h-12 rounded-full bg-success/15 text-success flex items-center justify-center text-2xl mb-4">
              <FaPlusCircle />
            </div>
            <h3 className="text-xl font-semibold text-base-content mb-2">
              Add Transactions
            </h3>
            <p className="text-base-content/70 text-sm">
              Record income and expenses as they happen to keep your data accurate.
            </p>
          </div>

          <div className="bg-base-200 border border-base-300 rounded-2xl p-6 min-h-[220px] flex flex-col items-center text-center hover:shadow-lg transition-all duration-300">
            <div className="w-12 h-12 rounded-full bg-success/15 text-success flex items-center justify-center text-2xl mb-4">
              <FaChartLine />
            </div>
            <h3 className="text-xl font-semibold text-base-content mb-2">
              Track Expenses
            </h3>
            <p className="text-base-content/70 text-sm">
              See spending patterns by category to stay on budget every month.
            </p>
          </div>

          <div className="bg-base-200 border border-base-300 rounded-2xl p-6 min-h-[220px] flex flex-col items-center text-center hover:shadow-lg transition-all duration-300">
            <div className="w-12 h-12 rounded-full bg-success/15 text-success flex items-center justify-center text-2xl mb-4">
              <FaRegChartBar />
            </div>
            <h3 className="text-xl font-semibold text-base-content mb-2">
              View Reports
            </h3>
            <p className="text-base-content/70 text-sm">
              Get clear insights with monthly summaries and category breakdowns.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
