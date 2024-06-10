"use client";

import React, { FC } from "react";
import Image from "next/image";
import bannerlogo from "@/public/images/banner-logo.png";

// Main Banner component
const Banner: FC = () => {
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
          FIND YOUR NEXT
        </h1>
        <h1 className="text-[42px] text-white text-center font-semibold leading-tight">
          REAL ESTATE PROPERTY
        </h1>
        <p className="font-semibold text-[15px] text-white py-3">
          WE HAVE THE RIGHT PROPERTY FOR YOU
        </p>
        <button className="px-4 py-2 border-primary text-primary font-semibold text-[15px] border rounded-full items-center justify-center hover:bg-primary hover:text-white duration-1000">
          Learn more
        </button>
      </div>
    </div>
  );
};

export default Banner;
