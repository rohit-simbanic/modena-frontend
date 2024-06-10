"use client";
import React, { useEffect, useState } from "react";
import Banner from "./features/components/banner";

import Blog from "./features/components/blog";
import ImgBanner from "./features/components/image-banner";
import Testimonials from "./features/components/tesimonial";
import Pricing from "./features/components/pricing-plan";
import DataInfoComponent from "./features/components/info-component";
import PropertyDeals from "./features/components/property-deals";
import Team from "./features/components/team";
import Subscribe from "./features/components/subscribe";
import Properties from "./features/components/properties";
import Carousal from "./features/components/carousel-slider";
import AboutUs from "./features/components/about";
import PropertyCard from "./features/components/property-card";
import AOS from "aos";

const HomePage = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-out-cubic",
    });
  }, []);
  return (
    <div>
      <Banner />
      <PropertyCard
        onEdit={function (id: string): void {
          throw new Error("Function not implemented.");
        }}
      />
      <AboutUs />
      <Carousal />
      <Properties />
      <Subscribe />
      <Team />
      <PropertyDeals />
      <DataInfoComponent />
      <Pricing />
      <Testimonials />
      <ImgBanner />
      <Blog />
    </div>
  );
};

export default HomePage;
