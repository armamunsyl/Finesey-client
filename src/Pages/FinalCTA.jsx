import { Link } from "react-router";

const FinalCTA = () => {
  return (
    <section className="bg-base-200 py-16 px-6 md:px-20">
      <div className="max-w-5xl mx-auto text-center border border-base-300 rounded-3xl p-10 bg-base-100 shadow-sm">
        <h2 className="text-3xl font-semibold text-base-content mb-3">
          Start managing your money with confidence
        </h2>
        <p className="text-base-content/70 max-w-2xl mx-auto mb-6">
          Keep everything organized, see your progress clearly, and make smarter
          decisions every month.
        </p>
        <Link
          to="/add-transaction"
          className="inline-flex items-center justify-center px-7 py-3 rounded-lg font-semibold text-white bg-success hover:bg-success/90 transition-all"
        >
          Add Your First Transaction
        </Link>
      </div>
    </section>
  );
};

export default FinalCTA;
