import { NavLink, Outlet } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../Auth/AuthProvider";
import Navbar from "../Component/Navbar";
import Footer from "../Component/Footer";
import {
  FaChartPie,
  FaPlusCircle,
  FaListAlt,
  FaUserCircle,
  FaUsersCog,
  FaChartLine,
} from "react-icons/fa";

const DashboardLayout = () => {
  const { role } = useContext(AuthContext);

  const baseLink =
    "flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition";
  const activeLink = `${baseLink} bg-success text-white`;
  const normalLink = `${baseLink} text-base-content hover:bg-base-200`;

  return (
    <section className="min-h-screen bg-base-100">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 md:px-20 py-8 lg:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6 lg:gap-8">
          <aside className="bg-base-200 border border-base-300 rounded-2xl p-4 md:p-5 w-full lg:h-fit lg:sticky lg:top-24">
            <div className="mb-6">
              <p className="text-xs uppercase tracking-widest text-base-content/60">
                Dashboard
              </p>
              <h2 className="text-xl font-semibold text-base-content mt-1">
                FinEase Panel
              </h2>
            </div>

            <nav className="flex flex-col gap-2">
              <NavLink
                to="/dashboard"
                end
                className={({ isActive }) => (isActive ? activeLink : normalLink)}
              >
                <FaChartPie />
                Overview
              </NavLink>
              <NavLink
                to="/dashboard/add-transaction"
                className={({ isActive }) => (isActive ? activeLink : normalLink)}
              >
                <FaPlusCircle />
                Add Transaction
              </NavLink>
              <NavLink
                to="/dashboard/my-transactions"
                className={({ isActive }) => (isActive ? activeLink : normalLink)}
              >
                <FaListAlt />
                My Transactions
              </NavLink>
              <NavLink
                to="/dashboard/reports"
                className={({ isActive }) => (isActive ? activeLink : normalLink)}
              >
                <FaChartLine />
                Reports
              </NavLink>
              <NavLink
                to="/dashboard/profile"
                className={({ isActive }) => (isActive ? activeLink : normalLink)}
              >
                <FaUserCircle />
                Profile
              </NavLink>

              {["admin", "demo-admin"].includes(role) && (
                <>
                  <div className="h-px bg-base-300 my-2"></div>
                  <NavLink
                    to="/dashboard/manage-users"
                    className={({ isActive }) =>
                      isActive ? activeLink : normalLink
                    }
                  >
                    <FaUsersCog />
                    Manage Users
                  </NavLink>
                  <NavLink
                    to="/dashboard/analytics"
                    className={({ isActive }) =>
                      isActive ? activeLink : normalLink
                    }
                  >
                    <FaChartLine />
                    Analytics
                  </NavLink>
                </>
              )}
            </nav>
          </aside>

          <main className="bg-base-100 border border-base-300 rounded-2xl p-5 md:p-8 shadow-sm">
            <Outlet />
          </main>
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default DashboardLayout;
