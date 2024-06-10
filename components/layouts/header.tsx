"use client";
import { useEffect, FC } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/public/images/logo.png";

const Header: FC = () => {
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
        <div>
          <Image src={logo} width={200} height={54} alt="header-image" />
        </div>
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
        <div className="toggle hidden w-full md:w-auto md:flex row-gap-25 text-bold mt-5 md:mt-0 md:border-none">
          <Link href="#">
            <p className="block md:inline-block lg:text-[16px] md:text-[12px] font-bold px-2 lg:px-3 py-3">
              PROPERTIES<i className="fa-solid fa-angle-right mx-2"></i>
            </p>
          </Link>

          <Link href="#">
            <p className="block md:inline-block px-2 lg:px-3 py-3 lg:text-[16px] md:text-[12px] font-bold">
              CONTACT US
            </p>
          </Link>
          <Link href="#">
            <p className="block md:inline-block px-2 lg:px-3 py-3 lg:text-[16px] md:text-[12px] font-bold">
              PAGES<i className="fa-solid fa-angle-right mx-2"></i>
            </p>
          </Link>
          <Link href="#">
            <p className="block md:inline-block px-2 lg:px-3 py-3 lg:text-[16px] md:text-[12px] font-bold">
              <i className="fa-brands fa-whatsapp text-green-500 font-semibold text-[25px] md:text-[18px] mx-1"></i>
              CALL US TODAY <span className="text-green-500">899-504-629</span>
            </p>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
