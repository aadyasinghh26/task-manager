"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleRegister = async () => {
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

const data = await res.json();
console.log(data); 

if (res.ok) {
  alert("Registered successfully");
  router.push("/login");
} else {
  alert(
    typeof data.error === "string"
      ? data.error
      : data.error?.message || data.message || "Something went wrong"
  );
}
    } catch (err) {
      alert("Register failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <h1 className="text-2xl mb-4">Register</h1>

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
        onClick={handleRegister}
        className="bg-green-500 px-4 py-2 mt-2"
      >
        Register
      </button>
    </div>
  );
}