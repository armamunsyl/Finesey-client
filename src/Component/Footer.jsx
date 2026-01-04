import { Link } from "react-router";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content mt-16 border-t border-base-300">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <h2 className="text-2xl font-bold mb-2">
            <span className="text-success">Fin</span>Ease
          </h2>
          <p className="text-sm text-base-content/70 leading-relaxed">
            Simplify your finances with a clear view of income, expenses, and
            savings progress in one dashboard.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm text-base-content/70">
            <li>
              <Link to="/" className="hover:text-success transition">
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/add-transaction"
                className="hover:text-success transition"
              >
                Add Transaction
              </Link>
            </li>
            <li>
              <Link
                to="/my-transactions"
                className="hover:text-success transition"
              >
                My Transactions
              </Link>
            </li>
            <li>
              <Link to="/reports" className="hover:text-success transition">
                Reports
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Contact</h3>
          <p className="text-sm text-base-content/70">Email: support@finees.app</p>
          <p className="text-sm text-base-content/70">Phone: +880 1234 567 890</p>
          <div className="flex gap-4 mt-4 text-xl text-success">
            <a
              href="https://www.linkedin.com/in/armamunsyl/"
              className="hover:opacity-80 transition"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://github.com/armamunsyl/"
              className="hover:opacity-80 transition"
              aria-label="Facebook"
            >
             <FaGithub />
            </a>
            <a
              href="https://www.x.com/armamunsyl"
              className="hover:opacity-80 transition"
              aria-label="X"
            >
              <FaSquareXTwitter />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-base-300 text-center py-4 text-sm text-base-content/70">
        © {new Date().getFullYear()} FinEase. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
