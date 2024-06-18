"use client";

import React, { FC, useEffect, useState } from "react";
import Image from "next/image";
import bannerlogo from "@/public/images/banner-logo.png";
import { fetchBannerData } from "@/helpers/product-fetch";

const Banner: FC = () => {
  const [bannerText, setBannerText] = useState({
    banner_header: "",
    banner_details_text: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getBannerData = async () => {
      try {
        const data = await fetchBannerData();
        setBannerText(data);
      } catch (error) {
        console.error("Error fetching banner data:", error);
      } finally {
        setLoading(false);
      }
    };

    getBannerData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center">
        <div className="skeleton h-10 w-3/4 mx-auto mb-6"></div>
        <div className="skeleton h-6 w-1/2 mx-auto mb-4"></div>
        <div className="flex justify-center mt-8 space-x-4">
          <div className="skeleton h-12 w-32 rounded-md"></div>
          <div className="skeleton h-12 w-32 rounded-md"></div>
        </div>
      </div>
    );
  }
  return (
    <div className="relative h-[700px] banner-bg bg-no-repeat shadow-insetcustom flex items-center justify-center">
      <div className="text-center container mx-auto">
        <Image
          src={bannerlogo}
          alt="banner-image"
          width={60}
          height={40}
          className="mx-auto "
        />
        <h1 className="text-[42px] text-center text-white font-semibold leading-tight">
          {bannerText.banner_header}
        </h1>

        <p className="font-semibold text-[15px] text-white py-3">
          {bannerText.banner_details_text}
        </p>
        <button className="px-4 py-2 border-primary text-primary font-semibold text-[15px] border rounded-full items-center justify-center hover:bg-primary hover:text-white duration-1000">
          Learn more
        </button>
      </div>
    </div>
  );
};

export default Banner;
