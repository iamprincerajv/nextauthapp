"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-hot-toast";

const page = () => {
  const router = useRouter();

  const [data, setData] = useState("");

  const getUserDetails = async () => {
    try {
      const res = await axios.get("/api/users/me");

      setData(res.data.data._id);
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout success");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-3xl">Profile</h1>
      <hr />
      <h2>
        {data === "" ? (
          "Nothing"
        ) : (
          <Link href={`/profile/${data}`}>{data}</Link>
        )}
        <hr />

        <button
          className="bg-blue-500 hover:bg-blue-700 mt-4 text-white font-bold rounded py-2 px-4"
          onClick={logout}
        >
          Logout
        </button>
        <br />
        <button
          className="bg-red-500 hover:bg-red-700 mt-4 text-white font-bold rounded py-2 px-4"
          onClick={getUserDetails}
        >
          Get User
        </button>
      </h2>
    </div>
  );
};

export default page;
