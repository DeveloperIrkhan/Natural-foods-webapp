import React, { useEffect } from "react";
import SearchBar from "./SearchBar";
import CartIcon from "./CartIcon";
import FavoriteButton from "./FavoriteButton";
import SignIn from "./SignIn";
import { ClerkLoaded, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";

const AdminMenu = async () => {
  const LoggedInUser = await currentUser();
  // console.log(LoggedInUser);
  // useEffect(() => {}, [LoggedInUser]);
  return (
    <div className="w-auto md:w-1/3 gap-4 flex items-center justify-end font-Jost">
      <SearchBar />
      <CartIcon />
      <FavoriteButton />
      <ClerkLoaded>
        <SignedIn>
          <UserButton />
        </SignedIn>
        {!LoggedInUser ? <SignIn /> : <SignedOut />}
      </ClerkLoaded>
    </div>
  );
};

export default AdminMenu;
