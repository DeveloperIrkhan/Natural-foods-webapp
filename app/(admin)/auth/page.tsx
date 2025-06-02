"use client";
import LoadingScreen from "@/components/Loading/LoadingScreen";
import PageTitle from "@/components/PageTitle";
import { images } from "@/public/ImagesUrls";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const UserAuth = () => {
  const [currentState, setCurrentState] = useState("Sign Up");
  const [name, setName] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [avatorUrl, setAvatorUrl] = useState<File>();
  const router = useRouter();
  useEffect(() => {}, [currentState]);
  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    if (avatorUrl) {
      formData.append("avator", avatorUrl); // Safe now
    }
    try {
      setIsLoading(true);
      if (currentState === "Sign Up") {
        const response = await axios.post("/api/auth/signup", formData);
        console.log("Response from backend:", response.data);
        if (response.data.success === true) {
          console.log("Raw response:", response);
          localStorage.setItem("loggedInUser", response.data.createdUser);
          localStorage.setItem("email", email);
          setCurrentState("Log in");
        }
      } else {
        const response = await axios.post("/api/auth/signin", formData);
        console.log("Response from backend:", response.data);
        if (response.data.success === true) {
          console.log("Raw response:", response.data.loggedInUser);
          localStorage.setItem(
            "loggedInUser",
            JSON.stringify(response.data.loggedInUser)
          );
          localStorage.setItem("email", email);
          setCurrentState("Log in");
          router.push("/setup-2fa");
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="h-full">
      {isLoading && <LoadingScreen />}
      <div className="max-w-xl mx-auto p-4 bg-white shadow-lg rounded-2xl">
        <PageTitle>{currentState}</PageTitle>
        <form onSubmit={submitHandler} className="">
          {currentState === "Sign Up" ? (
            <div className="flex flex-col gap-y-6">
              <div className="flex justify-center items-center relative">
                <label className="cursor-pointer" htmlFor="avator">
                  <Image
                    alt="avatorUrl"
                    src={
                      avatorUrl && avatorUrl !== undefined
                        ? `${URL.createObjectURL(avatorUrl)}`
                        : images.Profile
                    }
                    className={`border rounded-full shadow-md drop-shadow-black
                     border-black/20 my-3 h-20 w-20 ${
                       !avatorUrl && "opacity-50"
                     }`}
                    width={80}
                    height={80}
                  />
                  <Image
                    alt="avatorUrl"
                    src={images.Camera}
                    className={`absolute top-0 left-0 right-0 bottom-0 z-50 m-auto w-7 h-7 ${
                      avatorUrl ? "hidden" : "opacity-100 block"
                    }`}
                    width={80}
                    height={80}
                  />
                  <input
                    type="file"
                    name="avator"
                    id="avator"
                    hidden
                    required
                    onChange={(e) => {
                      setAvatorUrl(e.target.files?.[0]);
                    }}
                  />
                </label>
                <p className="mt-4 p-0 text-gray-600 font-bold absolute top-20">
                  Upload Avator
                </p>
              </div>
              {currentState === "Sign Up" && (
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="custom-input"
                />
              )}
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="custom-input"
              />
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Enter Your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="custom-input"
              />
              <div className="w-full flex justify-between text-gray-600 mt-3">
                <p
                  onClick={() => setCurrentState("Log in")}
                  className="text-sm pb-1 cursor-pointer transition-colors duration-200 hover:text-gray-300"
                >
                  I have account
                </p>
              </div>
              <button className="custom-button uppercase">Sign up</button>
            </div>
          ) : (
            <div className="flex flex-col gap-y-6">
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="custom-input"
              />
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Enter Your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="custom-input"
              />
              <div className="w-full flex justify-between text-gray-600 mt-3">
                {currentState === "Log in" && (
                  <p className="text-sm pb-1 cursor-pointer transition-colors duration-200 hover:text-gray-300">
                    Forgot password?
                  </p>
                )}
                <p
                  onClick={() => setCurrentState("Sign Up")}
                  className="text-sm pb-1 cursor-pointer transition-colors duration-200 hover:text-gray-300"
                >
                  can't have account
                </p>
              </div>
              <button className="custom-button uppercase">Log in</button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default UserAuth;
