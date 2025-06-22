"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import axios from "axios";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });
  const [loading, setLoading] = React.useState(false);

  const [buttonDisabled, setButtonDisabled] = React.useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      console.log("Creating user with details:");
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup successful:", response.data);
      toast.success("Signup successful!");

      router.push("/login");
    } catch (error: unknown) {
      console.log("Error during signup:", error);

      // TODO: handle error properly
      toast.error((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? "Processing..." : "Sign Up"}</h1>
      <hr />
      <label htmlFor="username">username</label>
      <input
        className="p-2 border-2 border-gray-300 rounded-md w-80"
        id="username"
        type="text"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="username"
      />

      <label htmlFor="email">email</label>
      <input
        className="p-2 border-2 border-gray-300 rounded-md w-80"
        id="email"
        type="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
      />

      <label htmlFor="password">password</label>
      <input
        className="p-2 border-2 border-gray-300 rounded-md w-80"
        id="password"
        type="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
      />

      <button
        className="mt-4 p-2 bg-blue-600 text-white rounded-md w-80 cursor-pointer hover:bg-blue-700 transition-colors duration-200"
        onClick={onSignup}
      >
        {buttonDisabled ? "Please fill all fields" : "Sign Up"}
      </button>
      <Link href="/login" className="mt-4 text-blue-500">
        Already have an account? Log in
      </Link>
    </div>
  );
}
