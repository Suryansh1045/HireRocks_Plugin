import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function EmpLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  // const navigate = useNavigate();

  // const handleLogin = (e) => {
  //   e.preventDefault();

  //   if (!email || !password) {
  //     setError("Both fields are required");
  //     return;
  //   }

  //   // Dummy authentication (replace with API call)
  //   if (email === "employee@example.com" && password === "password123") {
  //     navigate("/dashboard");
  //   } else {
  //     setError("Invalid email or password");
  //   }
  // };
  const handleLogin = async () => {
    setLoading(true);
    setError(null);

    const payload = {
      UserName: email,
      Password: password,
      RememberMe: true,
    };

    try {
      const response = await fetch("http://72.167.143.107:1024/api/tracker/account/login", {
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
      } else {
        console.error("Login Failed:", data);
        setError(data.message || "Login failed. Please try again.");
      }
    } catch (err) {
      console.error("Network Error:", err);
      setError("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
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
      </form>
    </div>
  );
}

export default EmpLogin;
