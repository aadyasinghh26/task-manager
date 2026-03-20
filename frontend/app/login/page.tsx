"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        router.push("/dashboard");
      } else {
        alert(data.error || "Login failed");
      }
    } catch {
      alert("Login failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <h1 className="text-2xl mb-4">Login</h1>

      <input
  type="email"
  placeholder="Email"
  className="p-2 mb-2 text-black bg-white"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>

<input
  type="password"
  placeholder="Password"
  className="p-2 mb-2 text-black bg-white"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
/>

      <button
        onClick={handleLogin}
        className="bg-blue-500 px-4 py-2"
      >
        Login
      </button>
    </div>
  );
}