"use client";
import { SignInButton } from "@clerk/nextjs";
import React from "react";
import { useSearchParams } from "next/navigation";

const SignInPage = () => {
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect_url") || "/";

  return (
    <div className="flex justify-center items-center h-[70vh] flex-col gap-4">
      <p className="text-lg text-gray-700">
        Please sign in to view your shopping cart
      </p>

      {/* ✅ Use `asChild` to prevent passing props to <button> */}
      <SignInButton fallbackRedirectUrl={redirectUrl} mode="modal">
        <button className="bg-primary-color px-4 py-2 rounded-md text-white text-sm hover:bg-white hover:text-primary-color hover:border hover:border-primary-color hover:shadow-[0_0_15px_rgba(131,184,53,0.5)] transition duration-300">
          Sign In
        </button>
      </SignInButton>
    </div>
  );
};

export default SignInPage;
