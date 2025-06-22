"use client";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { set } from "mongoose";
import { get } from "http";

export default function ProfilePage() {
  const [data, setData] = useState("nothing");
  const router = useRouter();

  const logout = async () => {
    try {
      const token = await axios.get("/api/users/logout");
      console.log("Logging out...");
      toast.success("Logged out successfully!");
      router.push("/login");
    } catch (error) {
      console.log("Error during logout:", error);
      toast.error("An error occurred while logging out.");
    }
  };

  const getUserDetails = async () => {
    const res = await axios.get("/api/users/me");
    console.log(res.data);
    setData(res.data.data._id);
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile</h1>
      <hr />
      <p>This is the profile page.</p>
      <p className="text-gray-500">
        {data === "nothing" ? (
          <span className="text-gray-500">"Nothing"</span>
        ) : (
          <Link href={`/profile/${data}`}>
            <span className="text-blue-500">View Profile: {data}</span>
          </Link>
        )}
      </p>
      <p>Here you can view and edit your profile information.</p>
      <hr />

      <button
        onClick={logout}
        className="mt-4 p-2 bg-red-600 text-white rounded-md w-80 cursor-pointer hover:bg-red-700 transition-colors duration-200"
      >
        Logout
      </button>
      <button
        onClick={getUserDetails}
        className="mt-4 p-2 bg-blue-600 text-white rounded-md w-80 cursor-pointer hover:bg-blue-700 transition-colors duration-200"
      >
        get user details
      </button>
    </div>
  );
}
