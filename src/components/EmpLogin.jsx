import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function EmpLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [forgotPassword, setForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Both fields are required");
      return;
    }

    // Dummy authentication (replace with API call)
    if (email === "employee@example.com" && password === "password123") {
      navigate("/dashboard");
    } else {
      setError("Invalid email or password");
    }
  };
  // const handleLogin = async () => {
  //   setLoading(true);
  //   setError(null);

  //   const payload = {
  //     UserName: email,
  //     Password: password,
  //     RememberMe: true,
  //   };

  //   try {
  //     const response = await fetch("http://72.167.143.107:1024/api/tracker/account/login", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(payload),
  //     });

  //     const data = await response.json();

  //     if (response.ok) {
  //       console.log("Login Successful:", data);
  //       // Handle success (e.g., save token, redirect user)
  //     } else {
  //       console.error("Login Failed:", data);
  //       setError(data.message || "Login failed. Please try again.");
  //     }
  //   } catch (err) {
  //     console.error("Network Error:", err);
  //     setError("An error occurred. Please try again later.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleForgotPasswordSubmit = () => {
    if (forgotEmail.trim() === "") {
      alert("Please enter your email.");
    } else {
      alert("Reset password link has been sent to your registered email.");
      setForgotPassword(false); // Close modal after showing the message
      setForgotEmail(""); // Clear email input
    }
  };
  return (
    <div className="p-6 bg-white rounded-md">
      <h2 className=" w-[50%] text-xl font-bold text-gray-700 ">
        Employee Login
      </h2>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-lg  text-gray-700">Email:</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-md border border-gray-300 text-gray-800 outline-none"
            required
          />
        </div>
        <div>
          <label className="block text-lg  text-gray-700">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-md border border-gray-300 text-gray-800 outline-none"
            required
          />
        </div>
        <button
          onClick={handleLogin}
          disabled={loading}
          className={`w-full py-2 rounded-md text-white ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-700 transition-all"
          }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        <p className="text-center mt-4">
                  <button
                    onClick={() => setForgotPassword(true)}
                    className="text-green-600 hover:underline"
                  > 
                    Forgot Password?
                  </button>
                </p>
         {/* Forgot Password Modal */}
         {forgotPassword && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[400px] text-center">
              <h2 className="text-xl font-bold text-gray-800">Forgot Password</h2>
              <p className="text-gray-600 mt-2">Enter your email to reset your password</p>
              <input
                type="email"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                className="w-full p-2 mt-4 rounded-md border border-gray-300 text-gray-800 outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter your email"
              />
              <button
                onClick={handleForgotPasswordSubmit}
                className="w-full bg-green-500 hover:bg-green-700 text-white py-2 rounded-md mt-4 transition-all"
              >
                Submit
              </button>
              <button
                onClick={() => setForgotPassword(false)}
                className="text-gray-600 mt-2 underline hover:text-gray-800"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

export default EmpLogin;
