import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../Auth/AuthProvider";
import Swal from "sweetalert2";

const Login = () => {
  const { loginUser, googleLogin } = useContext(AuthContext) || {};
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const demoEmail = "demo@gmail.com";
  const demoPassword = "Demo###1";

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    loginUser(email, password)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Login Successful!",
          text: "Welcome back to FinEase.",
          confirmButtonColor: "#22C55E",
        });
        navigate(from, { replace: true });
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Login Failed!",
          text: "Invalid email or password.",
          confirmButtonColor: "#EF4444",
        });
      })
      .finally(() => setLoading(false));
  };

  const handleDemoFill = () => {
    setEmail(demoEmail);
    setPassword(demoPassword);
  };

  const handleDemoLogin = () => {
    setEmail(demoEmail);
    setPassword(demoPassword);
    setLoading(true);

    loginUser(demoEmail, demoPassword)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Demo Login Successful!",
          text: "You are now exploring FinEase as a demo user.",
          confirmButtonColor: "#22C55E",
        });
        navigate(from, { replace: true });
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Demo Login Failed!",
          text: "Demo credentials are not working right now.",
          confirmButtonColor: "#EF4444",
        });
      })
      .finally(() => setLoading(false));
  };

  const handleGoogleLogin = () => {
    setLoading(true);
    googleLogin()
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Google Login Successful!",
          confirmButtonColor: "#22C55E",
        });
        navigate(from, { replace: true });
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Google Login Failed!",
          confirmButtonColor: "#EF4444",
        });
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4 mt-4">
      <div className="bg-base-100 shadow border border-base-300 rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-base-content mb-2">
          Welcome Back!
        </h2>
        <p className="text-center text-base-content/60 mb-8">
          Login to your FinEase account
        </p>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm text-base-content mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder="example@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-base-300 bg-base-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#22C55E]"
            />
          </div>

          <div>
            <label className="block text-sm text-base-content mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-base-300 bg-base-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#22C55E]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full text-white py-2 rounded-lg font-semibold"
            style={{ backgroundColor: "#22C55E", border: "1px solid #22C55E" }}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="mt-4 rounded-xl border border-base-300 bg-base-200/60 p-4">
          <p className="text-sm text-base-content/70">
            Want a demo account? Use:
          </p>
          <p className="text-sm font-medium text-base-content mt-2">
            Email: {demoEmail}
          </p>
          <p className="text-sm font-medium text-base-content">
            Pass: {demoPassword}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mt-3">
            <button
              type="button"
              onClick={handleDemoFill}
              className="flex-1 px-4 py-2 rounded-lg border border-base-300 text-sm hover:bg-base-100 transition"
            >
              Autofill Demo
            </button>
            <button
              type="button"
              onClick={handleDemoLogin}
              disabled={loading}
              className="flex-1 px-4 py-2 rounded-lg text-sm font-semibold text-white bg-success hover:bg-success/90 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Logging in..." : "One-click Demo Login"}
            </button>
          </div>
        </div>

        <div className="flex items-center my-6">
          <hr className="flex-1 border-base-300" />
          <span className="px-2 text-sm text-base-content/50">or</span>
          <hr className="flex-1 border-base-300" />
        </div>

        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 border border-base-300 py-2 rounded-lg hover:bg-base-200 transition-all"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/281/281764.png"
            alt="Google icon"
            className="w-5 h-5"
          />
          <span className="font-medium text-base-content">
            Continue with Google
          </span>
        </button>

        <p className="text-center text-sm text-base-content/60 mt-6">
          Don't have an account?{" "}
          <Link to="/register" className="text-[#22C55E] font-medium hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
