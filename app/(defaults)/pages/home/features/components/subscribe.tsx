"use client";

import React, { FC } from "react";
import Image from "next/image";
import BannerImage from "@/public/images/subscribe-banner.jpg";
import Subsc from "@/public/images/subs-logo.png";

const Subscribe: FC = () => {
  return (
    <div className="py-10">
      <div className="flex flex-col md:flex-row mx-auto">
        <div className="basis-full md:basis-1/2 bg-primary px-3 relative">
          <div
            className="flex flex-col items-center md:items-center justify-center min-h-[50px] mt-[120px]"
            data-aos="fade-right"
          >
            <Image
              src={Subsc}
              alt="banner-image"
              width={60}
              height={30}
              className="filter invert brightness-0"
            />
            <h1 className="text-[37px] text-white font-semibold text-left">
              Subscribe to our
            </h1>
            <h1 className="text-[37px] text-white font-semibold text-left">
              Newsletter
            </h1>
            <p className="font-semibold text-white text-[15px] py-2 text-left">
              WE HAVE THE RIGHT PROPERTY FOR YOU
            </p>

            <form action="#" className="mx-auto md:w-[80%] lg:w-[60%] w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-1 px-2 md:px-0">
                <input
                  type="text"
                  placeholder="Name"
                  className="border border-gray-500 py-1 h-[40px] px-2"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="border border-gray-500 py-1 px-2 h-[40px]"
                />
              </div>

              <div className="text-center my-1 md:text-left">
                <button
                  type="submit"
                  className="btn h-[45px] w-full text-white font-semibold border border-gray-500 bg-black-800 mt-4 md:mt-0 hover:bg-gray-500 hover:text-white duration-1000"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="basis-full md:basis-1/2">
          <Image
            src={BannerImage}
            alt="subscribe-image"
            layout="responsive"
            width={600}
            height={500}
            objectFit="cover"
            className="!w-full !h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
