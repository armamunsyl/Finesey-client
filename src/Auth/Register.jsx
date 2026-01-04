import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../Auth/AuthProvider";
import Swal from "sweetalert2";

const Register = () => {
  const { createUser, updateUserProfile, googleLogin } =
    useContext(AuthContext) || {};

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    setLoading(true);

    const name = e.target.name.value;
    const email = e.target.email.value;
    const photo = e.target.photo.value;
    const password = e.target.password.value;

    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasLength = password.length >= 6;

    if (!hasUpper || !hasLower || !hasLength) {
      Swal.fire({
        icon: "error",
        title: "Weak Password!",
        text: "Password must contain 1 uppercase, 1 lowercase and at least 6 characters.",
        confirmButtonColor: "#EF4444",
      });
      setLoading(false);
      return;
    }

    createUser(email, password)
      .then(() => {
        updateUserProfile(name, photo)
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "Registration Successful!",
              text: "Welcome to FinEase.",
              confirmButtonColor: "#22C55E",
            });
            navigate("/");
          })
          .catch(() => {
            Swal.fire({
              icon: "error",
              title: "Profile Update Failed!",
              confirmButtonColor: "#EF4444",
            });
          });
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Registration Failed!",
          confirmButtonColor: "#EF4444",
        });
      })
      .finally(() => setLoading(false));
  };

  const handleGoogleRegister = () => {
    setLoading(true);
    googleLogin()
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Google Sign Up Successful!",
          confirmButtonColor: "#22C55E",
        });
        navigate("/");
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Google Registration Failed!",
          confirmButtonColor: "#EF4444",
        });
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4 mt-4">
      <div className="bg-base-100 shadow border border-base-300 rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-base-content mb-2">
          Create an Account
        </h2>
        <p className="text-center text-base-content/60 mb-8">
          Join FinEase and manage your money smartly
        </p>

        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label className="block text-sm text-base-content mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              required
              placeholder="Abdur Rahman"
              className="w-full px-4 py-2 border border-base-300 bg-base-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#22C55E]"
            />
          </div>

          <div>
            <label className="block text-sm text-base-content mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder="example@email.com"
              className="w-full px-4 py-2 border border-base-300 bg-base-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#22C55E]"
            />
          </div>

          <div>
            <label className="block text-sm text-base-content mb-1">
              Photo URL
            </label>
            <input
              type="text"
              name="photo"
              required
              placeholder="Photo URL"
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
              className="w-full px-4 py-2 border border-base-300 bg-base-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#22C55E]"
            />
            <p className="text-xs text-base-content/60 mt-1">
              Must include 1 uppercase, 1 lowercase & minimum 6 characters
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full text-white py-2 rounded-lg font-semibold"
            style={{ backgroundColor: "#22C55E", border: "1px solid #22C55E" }}
          >
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>

        <div className="flex items-center my-6">
          <hr className="flex-1 border-base-300" />
          <span className="px-2 text-sm text-base-content/50">or</span>
          <hr className="flex-1 border-base-300" />
        </div>

        <button
          onClick={handleGoogleRegister}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 border border-base-300 py-2 rounded-lg hover:bg-base-200 transition-all"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/281/281764.png"
            alt="Google icon"
            className="w-5 h-5"
          />
          <span className="font-medium text-base-content">
            Sign up with Google
          </span>
        </button>

        <p className="text-center text-sm text-base-content/60 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-[#22C55E] font-medium hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
