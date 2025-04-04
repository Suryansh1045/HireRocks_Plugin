import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function EmpLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOtpVerification, setShowOtpVerification] = useState(false);
  const [otp, setOtp] = useState("");
  const [forgotPassword, setForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    setError(null);

    const payload = {
      UserName: email,
      Password: password,
      RememberMe: true,
    };

    try {
      const response = await fetch("/api/Account/Login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Login Successful:", data);
        // Handle success (e.g., save token, redirect user)
      } else if (data === "Your email not verified yet.") {
        setShowOtpVerification(true);
      } else {
        setError(data || "Login failed. Please try again.");
      }
    } catch (err) {
      console.error("Network Error:", err);
      setError("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async () => {
    if (!otp.trim()) {
      setError("Please enter the OTP");
      return;
    }
    try {
      const response = await fetch(`/api/Account/VerifyEmailAddress?emailVerificationCode=${otp}`);

      const data = await response.json();
      if (response.ok) {
        alert("Email verified successfully! Please Login again");
        setShowOtpVerification(false);
      } else {
        setError(data.message || "OTP verification failed");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="p-6 bg-white rounded-md">
      {!showOtpVerification ? (
        <>
          <h2 className="w-[50%] text-xl font-bold text-gray-700">Employee Login</h2>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="space-y-4">
            <div>
              <label className="block text-lg text-gray-700">UserName:</label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 rounded-md border border-gray-300 text-gray-800 outline-none"
              />
            </div>
            <div>
              <label className="block text-lg text-gray-700">Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 rounded-md border border-gray-300 text-gray-800 outline-none"
              />
            </div>
            <button
              onClick={handleLogin}
              disabled={loading}
              className={`w-full py-2 rounded-md text-white ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-700 transition-all"}`}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
        </>
      ) : (
        <>
          <h2 className="text-xl font-bold text-gray-700">Verify Your Email</h2>
          <p className="text-gray-600 mt-2">Enter the OTP sent to your email</p>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full p-3 rounded-md border border-gray-300 text-gray-800 outline-none mt-2"
            placeholder="Enter OTP"
          />
          <button
            onClick={handleOtpSubmit}
            className="w-full bg-green-500 hover:bg-green-700 text-white py-2 rounded-md mt-4 transition-all"
          >
            Verify OTP
          </button>
        </>
      )}
    </div>
  );
}

export default EmpLogin;
