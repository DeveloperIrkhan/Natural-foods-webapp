import { SignInButton } from "@clerk/nextjs";
import React from "react";

const SignIn = () => {
  return (
    <SignInButton mode="modal">
      <button
        className="bg-primary-color px-2 py-1 rounded-md
       text-white duration-300 transition text-[12px]
        hover:translate-y-0.5 hover:bg-white
         hover:text-primary-color hover:border
         hover:border-primary-color
        hover:shadow-[0_0_15px_rgba(131_184_53/0.5)]"
      >
        SignIn
      </button>
    </SignInButton>
  )
  // ;rgb(131, 184, 53)
};

export default SignIn;
