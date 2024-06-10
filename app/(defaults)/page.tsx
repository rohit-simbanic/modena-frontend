import { Metadata } from "next";
import React, { useEffect } from "react";
import HomePage from "./pages/home/home";
import AOS from "aos";
export const metadata: Metadata = {
  title: "Home Page",
};

const Home = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-out-cubic",
    });
  }, []);
  return <HomePage />;
};

export default Home;
