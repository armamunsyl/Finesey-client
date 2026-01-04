import { FaShieldAlt } from "react-icons/fa";
import { FaFlagCheckered } from "react-icons/fa";
import { FaHandHoldingHeart } from "react-icons/fa";

const FinancialPlanning = () => {
  return (
    <section className="bg-base-100 py-16 px-6 md:px-20">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-semibold text-base-content mb-3">
          Why Financial Planning Matters
        </h2>

        <p className="text-base-content/70 max-w-2xl mx-auto mb-10">
          Small, consistent decisions protect your future and keep your goals on
          track.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="bg-base-200 border border-base-300 rounded-2xl p-6 min-h-[200px] hover:shadow-lg transition-all duration-300">
            <div className="w-10 h-10 rounded-full bg-success/15 text-success flex items-center justify-center text-lg mb-4">
              <FaShieldAlt />
            </div>
            <h3 className="text-lg font-semibold text-base-content mb-2">
              Build an Emergency Buffer
            </h3>
            <p className="text-base-content/70 text-sm">
              Prepare for surprises without disrupting your monthly budget.
            </p>
          </div>

          <div className="bg-base-200 border border-base-300 rounded-2xl p-6 min-h-[200px] hover:shadow-lg transition-all duration-300">
            <div className="w-10 h-10 rounded-full bg-success/15 text-success flex items-center justify-center text-lg mb-4">
              <FaFlagCheckered />
            </div>
            <h3 className="text-lg font-semibold text-base-content mb-2">
              Reach Long-term Goals
            </h3>
            <p className="text-base-content/70 text-sm">
              Turn big plans into achievable milestones with clear targets.
            </p>
          </div>

          <div className="bg-base-200 border border-base-300 rounded-2xl p-6 min-h-[200px] hover:shadow-lg transition-all duration-300">
            <div className="w-10 h-10 rounded-full bg-success/15 text-success flex items-center justify-center text-lg mb-4">
              <FaHandHoldingHeart />
            </div>
            <h3 className="text-lg font-semibold text-base-content mb-2">
              Reduce Money Stress
            </h3>
            <p className="text-base-content/70 text-sm">
              Know exactly where your money goes and feel more in control.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinancialPlanning;
