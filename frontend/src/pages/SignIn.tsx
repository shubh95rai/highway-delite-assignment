import { useState } from "react";
import { useAuthStore } from "../store/authStore.tsx";
import toast from "react-hot-toast";
import assets from "../assets/assets.ts";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Loader } from "lucide-react";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [showOtpField, setShowOtpField] = useState(false);

  const signin = useAuthStore((state) => state.signin);
  const getOtpOnSignIn = useAuthStore((state) => state.getOtpOnSignIn);
  const isSigningIn = useAuthStore((state) => state.isSigningIn);

  function validateForm() {
    if (!email.trim()) {
      return toast.error("Email is required");
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      return toast.error("Invalid email");
    }

    if (showOtpField && !otp.trim()) {
      return toast.error("OTP is required");
    }

    return true;
  }

  async function handleGetOtp(e: React.FormEvent) {
    e.preventDefault();

    const success = validateForm();

    if (success === true) {
      const response = await getOtpOnSignIn({ email });
      if (response) {
        setShowOtpField(true);
      }
    }
  }

  async function handleSignin(e: React.FormEvent) {
    e.preventDefault();

    const success = validateForm();

    if (success === true) {
      await signin({ email, otp });
    }
  }

  return (
    <div className="flex h-screen p-2">
      {/* Left panel */}
      <div className="w-full p-6">
        <Link to="/">
          <img src={assets.logo} alt="Logo" className="h-7" />
        </Link>
        <div className="max-w-sm mx-auto  w-full flex flex-col justify-center h-full">
          <h1 className="text-3xl font-bold mb-2">Sign in</h1>
          <p className="text-gray-400 mb-4">
            Please login to continue to your account.
          </p>

          <form
            className="space-y-4 w-full"
            onSubmit={showOtpField ? handleSignin : handleGetOtp}
          >
            <div>
              <input
                type="text"
                placeholder="Enter email address"
                className="py-3 px-4 border-1 border-gray-400 focus:outline-primary  rounded-md w-full placeholder:text-gray-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {showOtpField && (
              <div className="relative">
                <input
                  type={showOtp ? "text" : "password"}
                  placeholder="Enter OTP"
                  className="py-3 px-4 border-1 border-gray-400 focus:outline-primary  rounded-md w-full placeholder:text-gray-400"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />

                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center z-10"
                  onClick={() => setShowOtp(!showOtp)}
                >
                  {showOtp ? (
                    <Eye className="h-5 w-5 text-gray-400" />
                  ) : (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-primary text-white py-2 rounded-lg h-10"
              disabled={isSigningIn}
            >
              {isSigningIn ? (
                <div>
                  <Loader className="size-5 animate-spin mx-auto" />
                </div>
              ) : showOtpField ? (
                "Sign in"
              ) : (
                "Get OTP"
              )}
            </button>
          </form>

          <p className="text-sm mt-4 text-center">
            Need an account?{" "}
            <Link
              to="/signup"
              className="text-primary hover:underline underline-offset-2"
            >
              Create one
            </Link>
          </p>
        </div>
      </div>

      {/* Right panel image */}
      <img
        src={assets.bg}
        alt="Background"
        className="object-cover h-full hidden lg:inline"
      />
    </div>
  );
}
