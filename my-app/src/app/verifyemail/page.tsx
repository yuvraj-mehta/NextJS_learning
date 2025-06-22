"use client";
import axios from "axios";
import Link from "next/link";
import React from "react";
import { useEffect, useState, useCallback } from "react";

export default function VerifyEmail() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verfyUserEmail = useCallback(async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
    } catch (error: unknown) {
      setError(true);
      console.error("Error verifying email:", error);
    }
  }, [token]);

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verfyUserEmail();
    }
  }, [token, verfyUserEmail]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold">&quot;Verify Email&quot;</h1>
      <h2>{token ? `Token found: ${token}` : "No token found"}</h2>

      {verified && (
        <div className="text-green-500 mt-4">
          Email verified successfully!
          <Link href="/login" className="text-blue-500 underline ml-2">
            Go to Login
          </Link>
        </div>
      )}

      {error && (
        <div className="text-red-500 mt-4">
          Error verifying email. Please try again later.
        </div>
      )}

      {!verified && !error && (
        <div className="text-gray-500 mt-4">
          Verifying your email, please wait...
        </div>
      )}
    </div>
  );
}
