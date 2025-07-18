"use client";
import axios from "axios";
import Cookies from "js-cookie";
import Spinner from "../Loading/LoadingScreen";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { images } from "@/public/ImagesUrls";
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
    // console.log(gettingUser);
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
        <div className="text-sm text-gray-300">
          <div className="w-10 h-10 cursor-pointer rounded-full bg-gray-400 flex items-center justify-center text-white font-semibold">
            {user?.name
              ?.split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()}
          </div>
          <div
            className="bg-white/98 text-gray-600 font-medium hidden shadow-2xl rounded-md  
          group-hover:block absolute hoverEffect z-50 w-64 p-2 right-0"
          >
            {user ? (
              <>
                <div className="flex justify-between items-center">
                  <img className="w-10" src="/Logo.png" />
                  <p
                    onClick={signOutasync}
                    className="p-1 text-blue-500 hoverEffect hover:border-b hover:cursor-pointer"
                  >
                    Sign Out
                  </p>
                </div>
                <hr className="my-2" />

                <div className="">
                  <div
                    className="flex justify-start gap-5 items-center '
                  flex-row gap-y-2"
                  >
                    <img
                      className="w-14 h-14 rounded-full"
                      src={user?.avatorUrl ? user.avatorUrl : "/profile.png"}
                      alt="user image"
                    />
                    <div className="flex flex-col justify-end">
                      <p className="py-2 flex items-center gap-2">
                        <span className="font-bold">Welcome!</span>
                        <span className="text-xs">
                          Mr. {user?.name ? `${user.name}` : ""}
                        </span>
                      </p>
                      <p className="text-md mb-2">
                        {user?.email ? `${user.email}` : ""}
                      </p>
                      <hr />
                      <Link
                        className="p-1 w-fit hoverEffect hover:text-gray-900"
                        href={""}
                      >
                        My Profile
                      </Link>
                    </div>
                  </div>
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
