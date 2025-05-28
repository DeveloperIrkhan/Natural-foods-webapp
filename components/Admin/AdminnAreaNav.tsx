"use client";
import axios from "axios";
import Cookies from "js-cookie";
import Spinner from "../Loading/LoadingScreen";
import Link from "next/link";
import React, { useEffect, useState } from "react";
interface IAdminAreaProps {
  name: string;
  isAdmin: string;
  email: string;
  isVerfied: string;
  avatorUrl: string;
}
const AdminnAreaNav = () => {
  const [user, setUser] = useState<IAdminAreaProps | null>(null);
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    const gettingUser = storedUser ? JSON.parse(storedUser) : null;
    setUser(gettingUser);
    console.log(gettingUser);
  }, []);
  const signOutasync = async () => {
    try {
      setLoading(true);
      const storedUser = localStorage.getItem("loggedInUser");
      const _id = storedUser ? JSON.parse(storedUser)._id : null;
      const response = await axios.post("/api/auth/signout", { _id });
      console.log(response.data);
      localStorage.removeItem("loggedInUser");
      Cookies.remove("accessToken");
      Cookies.remove("loggedInUser");
      Cookies.remove("refreshToken");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="relative p-2 group inline-block">
      {isLoading && <Spinner />}

      <form action="">
        <div className="text-sm text-gray-600">
          <img
            className="w-10 h-10 rounded-full"
            src={user?.avatorUrl ? user.avatorUrl : "/profile.png"}
            alt="user image"
          />
          <div className="bg-white font-medium shadow-md rounded-md hidden group-hover:block absolute z-50 w-32 p-2 right-0">
            {user ? (
              <>
                <p className="font-bold py-2">Welcome!</p>
                <div className="flex flex-col gap-y-2">
                  <p className="text-xs">{user?.name ? `${user.name}` : ""}</p>
                  <hr />
                  <Link className="p-1 hoverEffect hover:bg-gray-200" href={""}>
                    Profile
                  </Link>
                  <p
                    onClick={signOutasync}
                    className="p-1 hoverEffect hover:bg-gray-200 hover:cursor-pointer"
                  >
                    Sign Out
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-col gap-y-2">
                  <Link
                    className="p-1 hoverEffect hover:bg-gray-200"
                    href={"/auth"}
                  >
                    sign in
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default AdminnAreaNav;
