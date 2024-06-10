"use client";
import { useEffect, FC } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/public/images/logo.png";
import { useAuth } from "@/contexts/auth-provider";
import { getCloudinaryUrl } from "@/helpers/cloudinary-image-fetch";
import ButtonAuth from "../button/button-auth";
const getInitial = (name: string) => {
  return name ? name.charAt(0).toUpperCase() : "";
};
const Header: FC = () => {
  const { isAuthenticated, agent, logout } = useAuth();

  useEffect(() => {
    const hamburger = document.getElementById("hamburger");
    const toggleMenu = () => {
      const navToggle = document.getElementsByClassName("toggle");
      for (let i = 0; i < navToggle.length; i++) {
        navToggle.item(i)?.classList.toggle("hidden");
      }
    };
    hamburger?.addEventListener("click", toggleMenu);

    // Cleanup event listener on component unmount
    return () => {
      hamburger?.removeEventListener("click", toggleMenu);
    };
  }, []);

  return (
    <header>
      <nav className="flex flex-wrap justify-between items-center my-5 px-5 lg:px-20 sticky">
        <Link href={"/"}>
          <Image src={logo} width={200} height={54} alt="header-image" />
        </Link>
        <div className="flex md:hidden">
          <button id="hamburger" aria-label="Toggle Menu">
            <Image
              className="toggle block"
              src="https://img.icons8.com/fluent-systems-regular/2x/menu-squared-2.png"
              width={40}
              height={40}
              alt="menu icon"
            />
            <Image
              className="toggle hidden"
              src="https://img.icons8.com/fluent-systems-regular/2x/close-window.png"
              width={40}
              height={40}
              alt="close icon"
            />
          </button>
        </div>
        <div className="toggle hidden w-full md:w-auto md:flex items-center row-gap-25 text-bold mt-5 md:mt-0 md:border-none">
          <Link href={"/"}>
            <p className="block md:inline-block lg:text-[16px] md:text-[12px] font-bold px-2 lg:px-3 py-3">
              HOME
            </p>
          </Link>

          <Link href="#">
            <p className="block md:inline-block px-2 lg:px-3 py-3 lg:text-[16px] md:text-[12px] font-bold">
              CONTACT US
            </p>
          </Link>

          <Link href="#">
            <p className="block md:inline-block px-2 lg:px-3 py-3 lg:text-[16px] md:text-[12px] font-bold">
              <i className="fa-brands fa-whatsapp text-green-500 font-semibold text-[25px] md:text-[18px] mx-1"></i>
              <span className="text-green-500">899-504-629</span>
            </p>
          </Link>
          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <ButtonAuth
                text="Logout"
                textColor="white"
                href="/"
                borderColor="blue-500"
                borderWidth={0}
                borderRadius="md"
                bgColor="primary"
                hoverBgColor="blue-700"
                shadow={true}
                onClick={logout}
              />
              {agent?.profilePicture ? (
                <Link href={"/admin/agent-profile"} className="block">
                  <Image
                    src={getCloudinaryUrl(agent.profilePicture)}
                    alt="Profile"
                    height={52}
                    width={52}
                    className="rounded-[50%] flex items-center justify-center h-[52px] w-[53px]"
                  />
                </Link>
              ) : (
                <Link href={"/admin/agent-profile"}>
                  <div className="flex items-center justify-center w-[52px] h-[52px] bg-purple-700 text-white rounded-full text-2xl font-bold">
                    {getInitial(agent?.fullName)}
                  </div>
                </Link>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <ButtonAuth
                text="Login"
                textColor="white"
                href="/admin/login"
                borderColor="blue-500"
                borderWidth={0}
                borderRadius="md"
                bgColor="primary"
                hoverBgColor="blue-700"
                shadow={true}
              />
              <ButtonAuth
                text="Register"
                textColor="teal-600"
                href="/admin/signup"
                borderColor="blue-500"
                borderWidth={0}
                borderRadius="md"
                bgColor="gray-300"
                hoverBgColor="primary"
                shadow={false}
              />
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
