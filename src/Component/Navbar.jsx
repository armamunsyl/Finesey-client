import { Link, NavLink, useLocation } from "react-router";
import { useContext, useEffect, useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi";
import { AuthContext } from "../Auth/AuthProvider";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const location = useLocation();

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const activeLink =
    "text-success font-semibold border-b-2 border-success pb-1";
  const normalLink = "hover:text-success transition";
  const isHashActive = (hash) =>
    location.pathname === "/" && location.hash === hash;

  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive && !location.hash ? activeLink : normalLink
          }
        >
          Home
        </NavLink>
      </li>

      {!user && (
        <>
          <li>
            <a
              href="/#how-it-works"
              className={isHashActive("#how-it-works") ? activeLink : normalLink}
            >
              How It Works
            </a>
          </li>
          <li>
            <a
              href="/#budgeting-tips"
              className={
                isHashActive("#budgeting-tips") ? activeLink : normalLink
              }
            >
              Smart Budgeting Tips
            </a>
          </li>
        </>
      )}

      {user && (
        <>
          <li>
            <NavLink
              to="/add-transaction"
              className={({ isActive }) => (isActive ? activeLink : normalLink)}
            >
              Add Transaction
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/my-transactions"
              className={({ isActive }) => (isActive ? activeLink : normalLink)}
            >
              My Transactions
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/reports"
              className={({ isActive }) => (isActive ? activeLink : normalLink)}
            >
              Reports
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) => (isActive ? activeLink : normalLink)}
            >
              Dashboard
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <nav className="sticky top-0 z-50 bg-base-100/95 backdrop-blur border-b border-base-300">
      <div className="px-6 md:px-20">
        <div className="max-w-6xl mx-auto py-3 grid grid-cols-2 md:grid-cols-[auto_1fr_auto] items-center">
        <div className="flex items-center gap-2">
          <Link to="/" className="text-2xl font-bold tracking-wide">
            <span className="text-success">Fin</span>
            <span>Ease</span>
          </Link>
        </div>

        <div className="hidden md:flex justify-center">
          <ul className="flex flex-nowrap gap-6 lg:gap-8 text-sm lg:text-[16px] font-medium whitespace-nowrap relative z-10">
            {navLinks}
          </ul>
        </div>

        <div className="hidden md:flex items-center justify-end gap-3">
          <button
            onClick={toggleTheme}
            className="w-9 h-9 rounded-full border border-success text-success flex items-center justify-center hover:bg-success/15 transition"
            aria-label="Toggle theme"
          >
            {theme === "light" ? <FiMoon /> : <FiSun />}
          </button>

          {!user ? (
            <>
              <Link
                to="/login"
                className="px-5 py-2 rounded-lg border border-success text-success hover:bg-success hover:text-white transition-all"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-5 py-2 rounded-lg bg-success text-white hover:bg-success/90 transition-all"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} className="cursor-pointer">
                <img
                  src={
                    user.photoURL ||
                    "https://cdn-icons-png.flaticon.com/512/847/847969.png"
                  }
                  alt="Profile"
                  className="w-10 h-10 rounded-full border-2 border-success object-cover"
                />
              </div>

              <ul
                tabIndex={0}
                className="dropdown-content menu p-3 shadow bg-base-100 rounded-xl w-64 border border-base-300"
              >
                <li className="mb-2">
                  <div className="flex items-center gap-3">
                    <img
                      src={
                        user.photoURL ||
                        "https://cdn-icons-png.flaticon.com/512/847/847969.png"
                      }
                      alt="Profile"
                      className="w-10 h-10 rounded-full border border-success object-cover"
                    />
                    <div className="text-sm">
                      <p className="font-semibold">
                        {user.displayName || "User"}
                      </p>
                      <p className="opacity-70">{user.email}</p>
                    </div>
                  </div>
                </li>

              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>

              <li>
                <Link to="/myprofile">Profile</Link>
              </li>

                <li>
                  <button onClick={logOut} className="text-left text-red-500">
                    Log out
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>

        <div className="md:hidden flex items-center justify-end gap-3">
          <button
            onClick={toggleTheme}
            className="w-9 h-9 rounded-full border border-success text-success flex items-center justify-center hover:bg-success/15 transition"
            aria-label="Toggle theme"
          >
            {theme === "light" ? <FiMoon /> : <FiSun />}
          </button>

          {user && (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} className="cursor-pointer">
                <img
                  src={
                    user.photoURL ||
                    "https://cdn-icons-png.flaticon.com/512/847/847969.png"
                  }
                  alt="Profile"
                  className="w-8 h-8 rounded-full border border-success object-cover"
                />
              </div>

              <ul
                tabIndex={0}
                className="dropdown-content menu p-3 shadow bg-base-100 rounded-xl w-60 border border-base-300"
              >
                <li className="mb-2">
                  <div className="flex items-center gap-2">
                    <img
                      src={
                        user.photoURL ||
                        "https://cdn-icons-png.flaticon.com/512/847/847969.png"
                      }
                      alt="Profile"
                      className="w-8 h-8 rounded-full border border-success object-cover"
                    />
                    <div className="text-sm">
                      <p className="font-semibold">
                        {user.displayName || "User"}
                      </p>
                      <p className="opacity-70 truncate">{user.email}</p>
                    </div>
                  </div>
                </li>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>

              <li>
                <Link to="/myprofile">Profile</Link>
              </li>

                <li>
                  <button onClick={logOut} className="text-left text-red-500">
                    Log out
                  </button>
                </li>
              </ul>
            </div>
          )}

          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost text-success text-2xl">
              ☰
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[10] p-3 shadow bg-base-100 rounded-box w-56"
            >
              {navLinks}

              {!user && (
                <div className="mt-2 border-t border-base-300 pt-2">
                  <Link to="/login" className="block py-1 text-success">
                    Login
                  </Link>
                  <Link to="/register" className="block py-1 text-success">
                    Sign Up
                  </Link>
                </div>
              )}
            </ul>
          </div>
        </div>
      </div>
      </div>
    </nav>
  );
};

export default Navbar;
