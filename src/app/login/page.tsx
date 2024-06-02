"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

const page = () => {
  const router = useRouter();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [btnDisabled, setBtnDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);

      const response = await axios.post("/api/users/login", user);
      console.log(response.data);

      router.push("/profile");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0
    ) {
      setBtnDisabled(false);
    } else {
      setBtnDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? "Processing" : "Login"}</h1>
      <hr />

      <label htmlFor="email">Email</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        placeholder="Email"
        type="email"
        id="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />

      <label htmlFor="password">Password</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        placeholder="Password"
        type="password"
        id="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />

      <button
        disabled={btnDisabled}
        className={`bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg ${btnDisabled ? "cursor-not-allowed" : ""}`}
        onClick={onLogin}
      >
        {btnDisabled ? "Fill the form" : "Login"}
      </button>

      <Link href="/signup">Visit sign up page</Link>
    </div>
  );
};

export default page;
