"use client";
// import React, { useEffect, useState } from "react";
import Container from "../Container";
import FooterTop from "./FooterTop";
import Logo from "../Navbar-components/Logo";
import SocialMediaIcons from "../SocialMediaIcons";
import PageTitle, { Textsm } from "../PageTitle";
import { categoriesData, QuickLinks } from "@/app/constants/constants";
import Link from "next/link";
import { useEffect, useState } from "react";

const Footer = () => {
  const [email, setEmail] = useState("");
  // const currentYear = new Date().getFullYear();
  return (
    <footer className="border-t">
      <Container>
        <div className="">
          <FooterTop />
        </div>

        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 py-3">
            <div className="text-sm">
              <Logo
                logoText="Khalis Foods"
                logoSrc="/Logo.png"
                width={100}
                height={100}
              />

              <Textsm className="px-2">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil
                voluptatum inventore recusandae mollitia, amet ullam placeat.
                Fugit rem consequuntur quia, autem reiciendis voluptates ducimus
                impedit quo nisi facilis aliquam nesciunt!
              </Textsm>
              <SocialMediaIcons
                className="text-black/70"
                toolTipClassName="bg-gray-700 text-white"
              />
            </div>
            <div className="flex flex-col gap-1 md:gap-3 font-medium">
              <PageTitle className="text-md md:text-xl text-gray-800">
                Quick Links
              </PageTitle>
              {QuickLinks.map((items) => (
                <Link
                  className="text-gray-700 capitalize hover:text-primary-color hoverEffect
                  hover:font-bold"
                  key={items.title}
                  href={items.href}
                >
                  {items.title}
                </Link>
              ))}
            </div>
            <div className="flex flex-col gap-1 md:gap-3 font-medium">
              <PageTitle className="text-md md:text-xl text-gray-800">
                Categories
              </PageTitle>
              {categoriesData.map((items) => (
                <Link
                  className="text-gray-700 capitalize hover:text-primary-color hoverEffect
                  hover:font-bold"
                  key={items.title}
                  href={`/shop/${items.href}`}
                >
                  {items.title}
                </Link>
              ))}
            </div>
            <div className="flex flex-col gap-1 md:gap-3 font-medium">
              <PageTitle className="text-md md:text-xl text-gray-800">
                Newsletter
              </PageTitle>
              <Textsm className="font-bold">
                Subscribe to our newsletter to recieve news and offers
              </Textsm>
              {/* <form className="grid gap-3">
                <input
                  id="newsletter-email"
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border px-2 py-1.5 rounded-lg w-full focus:outline-none focus:border-primary-color"
                  placeholder="Enter your Email"
                />
                <button
                  className="bg-black w-1/3 text-white py-2 px-3 rounded-sm
              hover:translate-y-1 hoverEffect transition-all 
              hover:shadow-[0_0_15px_rgba(0_0_0/0.5)]"
                >
                  Subscribe
                </button>
              </form> */}
            </div>
          </div>
        </Container>
      </Container>
      <div className="border-t text-center bg-gray-100 py-2 text-gray-600">
        <p className="text-sm">
          © {"2025"} All rights reserved. Developed by
          <span className="uppercase px-3 text-primary-color font-bold text-[15px]">
            Khalis Foods
          </span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
