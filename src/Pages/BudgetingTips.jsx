import { FaRegListAlt } from "react-icons/fa";
import { FaBullseye } from "react-icons/fa";
import { FaBalanceScale } from "react-icons/fa";

const BudgetingTips = () => {
  return (
    <section id="budgeting-tips" className="bg-base-200 py-16 px-6 md:px-20">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-semibold text-base-content mb-3">
          Smart Budgeting Tips
        </h2>

        <p className="text-base-content/70 max-w-2xl mx-auto mb-10">
          Build simple habits that keep your spending on track and your goals
          within reach.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-base-100 border border-base-300 rounded-2xl p-6 min-h-[220px] flex flex-col items-center text-center hover:shadow-lg transition-all duration-300">
            <div className="w-12 h-12 rounded-full bg-success/15 text-success flex items-center justify-center text-2xl mb-4">
              <FaRegListAlt />
            </div>
            <h3 className="text-xl font-semibold text-base-content mb-2">
              Track Every Expense
            </h3>
            <p className="text-base-content/70 text-sm">
              Record even small purchases so you can spot patterns and tighten
              your budget quickly.
            </p>
          </div>

          <div className="bg-base-100 border border-base-300 rounded-2xl p-6 min-h-[220px] flex flex-col items-center text-center hover:shadow-lg transition-all duration-300">
            <div className="w-12 h-12 rounded-full bg-success/15 text-success flex items-center justify-center text-2xl mb-4">
              <FaBullseye />
            </div>
            <h3 className="text-xl font-semibold text-base-content mb-2">
              Set Monthly Targets
            </h3>
            <p className="text-base-content/70 text-sm">
              Define spending caps and savings goals to keep your month focused.
            </p>
          </div>

          <div className="bg-base-100 border border-base-300 rounded-2xl p-6 min-h-[220px] flex flex-col items-center text-center hover:shadow-lg transition-all duration-300">
            <div className="w-12 h-12 rounded-full bg-success/15 text-success flex items-center justify-center text-2xl mb-4">
              <FaBalanceScale />
            </div>
            <h3 className="text-xl font-semibold text-base-content mb-2">
              Balance Needs & Wants
            </h3>
            <p className="text-base-content/70 text-sm">
              Prioritize essentials first and leave room for mindful extras.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BudgetingTips;
