import Container from "../Container";
import Logo from "./Logo";
import MenuButtons from "./MenuButtons";
import AdminMenu from "./AdminMenu";
import MobileMenu from "./MobileMenu";
import { useEffect, useState } from "react";
import SimpleNavbar from "./SimpleNavbar";
const Header = () => {

  return (
    <header className="bg-[#F8F3E8]/50 py-4">
      <Container>
        <div className="flex flex-row items-center justify-between">
          <div className="flex justify-start items-center gap-0.5">
            <MobileMenu />
            <Logo logoText="Khalis Foods" logoSrc="/Logo.png" />
          </div>
          <AdminMenu />
        </div>
        <div className="flex justify-center">
          <MenuButtons />
        </div>
        <div className="md:flex justify-center hidden">
          <SimpleNavbar />
        </div>

       
      </Container>
    </header>
  );
};

export default Header;
