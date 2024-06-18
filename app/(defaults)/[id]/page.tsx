"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import test from "@/public/images/slider-header-1.jpg";
import test1 from "@/public/images/slider-header-2.jpg";
import { fetchSingleProperty } from "@/helpers/product-fetch";

interface PageProps {
  params: {
    id: string;
  };
}

const Page = ({ params }: PageProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [displayProduct, setDisplayProduct] = useState(null);

  const images = [test, test1];

  const handlePrev = () => {
    setActiveIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
  };
  useEffect(() => {
    const fetchProperty = async () => {
      const singleProperty = await fetchSingleProperty(params.id);
      setDisplayProduct(singleProperty);
      console.log("single property: ", singleProperty);
    };

    fetchProperty();
  }, [params.id]);
  return (
    <>
      <div id="controls-carousel" className="relative w-full overflow-hidden">
        <div className="relative w-full h-[600px]">
          {images.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                activeIndex === index ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={image}
                alt={`Slide ${index}`}
                className="object-cover w-full h-full"
              />
            </div>
          ))}
        </div>
        {/* Slider controls */}
        <button
          type="button"
          className="absolute top-1/2 left-0 transform -translate-y-1/2 px-4 cursor-pointer group focus:outline-none"
          onClick={handlePrev}
        >
          <span className="inline-flex items-center justify-center w-10 h-10 text-green-500 bg-white rounded-full shadow">
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 6 10"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 1L1 5l4 4"
              />
            </svg>
            <span className="sr-only">Previous</span>
          </span>
        </button>
        <button
          type="button"
          className="absolute top-1/2 right-0 transform -translate-y-1/2 px-4 cursor-pointer group focus:outline-none"
          onClick={handleNext}
        >
          <span className="inline-flex items-center justify-center w-10 h-10 text-green-500 bg-white rounded-full shadow">
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 6 10"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
            <span className="sr-only">Next</span>
          </span>
        </button>
      </div>
      <div className="max-w-[1320px] my-10  mx-auto relative">
        <div className="bg-accent/20">
          <div className="max-w-[1320px] grid grid-cols-1 md:grid-cols-1 md:text-right md:justify-items-right  lg:grid-cols-3 py-5 px-5 sm:px-12 gap-5">
            <div className="md:col-span-2 my-10 text-left flex flex-col overflow-y-auto h-[500px] scrollable-container">
              <div className="my-10">
                <h1 className="text-[15px] font-bold text-left sm:text-center lg:text-left opacity-85">
                  SAN FRANCISCO
                </h1>
                <h1 className="text-[30px] text-left sm:text-center lg:text-left opacity-85">
                  Comfortable Apartment With Great View
                </h1>
                <hr className="h-[2px] bg-green-500 border-0 w-[200px] my-4" />
              </div>
              <div className="my-3">
                <span className="text-[22px] font-normal">Description</span>
                <p className="text-[17px] text-gray-500 text-left my-3 lg:text-left">
                  Gorgeous 2 story 5 bdrm. 3.5 bath home situated on 1/2 acre
                  wooded lot. Home boasts Expansive open concept formal Living &
                  Dining rooms with abundant light, spacious Breakfast Area and
                  Executive study. Island kitchen w/granite counters and granite
                  breakfast bar. Master bedroom w/sitting area, double vanities,
                  luxurious soak tub, walk in shower and expansive walk in
                  closets.
                </p>
              </div>
              <div className="my-3">
                <span className="text-[22px] font-normal my-5">
                  Living Room
                </span>
                <p className="text-[17px] text-gray-500 text-left my-3 lg:text-left">
                  All rooms have a super efficient air conditioner unit that
                  reduces the electricity bill by 50% on summer and 70% on
                  winter. ‍The thermostat can be regulated individually or all
                  the thermostat at the same time.
                </p>
              </div>
              <div className="my-3">
                <span className="text-[22px] font-normal my-5">Kitchen</span>
                <p className="text-[17px] text-gray-500 text-left my-3 lg:text-left">
                  Island kitchen w/granite counters and granite breakfast bar
                  Master bedroom w/sitting area, double vanities, luxurious soak
                  tub, walk in shower and expansive walk in closets. The house
                  also includes a brand new Solar Panel System, that provides
                  the 35% of the electricity required for the house operation.
                </p>
              </div>
              <div className="my-3">
                <span className="text-[22px] font-normal my-5">
                  Credit Options
                </span>
                <p className="text-[17px] text-gray-500 text-left my-3 lg:text-left">
                  Estate style drive leading to a 3 car detached/full
                  porte-cochere garage and fenced backyard. Book your visit to
                  this beautiful property today!
                </p>
              </div>
            </div>

            <div className="flex flex-col mx-auto justify-center lg:order-last order-first">
              {/* card  */}
              <div className="my-6 bg-white rounded-lg border border-gray-300 dark:border-gray-700 h-[203px] w-[320px]">
                <div className="h-[30px] overflow-hidden rounded-t-lg relative">
                  <span className="absolute top-0 right-0 bg-green-500 m-2 p-1 text-[10px] font-semibold text-white">
                    For Sale
                  </span>
                </div>
                <a href="#">
                  <h5 className="my-2 text-[14px] mx-4 font-semibold tracking-tight text-gray-900 dark:text-white text-left">
                    APARTMENT
                  </h5>
                </a>
                <p className="mb- font-normal mx-4 text-[22px] text-gray-500 dark:text-gray-400 text-left">
                  $330,000
                </p>
                <p className="mb-3 font-[14px] mx-4 text-gray-500 dark:text-gray-400 text-left">
                  Rodeo Drive, 325.
                </p>
                <div className="pt-4 ml-[8px] pb-2 border-t border-gray-300">
                  <div className="flex justify-between">
                    <span className="inline-block px-3 py-1 text-[13px] font-semibold border p-5 border-gray-300 opacity-85 text-gray-700 mr-2 mb-2 text-left">
                      <i className="fa-solid fa-bed mx-2"></i> 3 Bedrooms
                    </span>
                    <span className="inline-block px-3 py-1 text-[13px] font-semibold border p-5 opacity-85 border-gray-300 text-gray-700 mr-2 mb-2 text-left">
                      <i className="fa-solid fa-sink mx-2"></i> 2 Bathrooms
                    </span>
                  </div>
                </div>
              </div>
              {/* card-1  */}
              <div className=" bg-white rounded-md border border-gray-300 dark:border-gray-700 h-[220px] w-[320px]">
                <div className="h-[30px] overflow-hidden rounded-t-lg"></div>
                <a href="#">
                  <h5 className="my-2 text-[14px] mx-4 font-bold tracking-tight text-gray-900 dark:text-white text-left">
                    CONTACT US
                  </h5>
                </a>
                <p className="mb- font-normal mx-4 text-[14px] text-green-500 dark:text-gray-400 text-left">
                  800 123-456
                </p>
                <p className="font-[14px] mx-4 text-green-500 dark:text-gray-400 text-left">
                  Rodeo Drive, 325.
                </p>
                <p className="font-[14px] mx-4 text-gray-500 dark:text-gray-400 text-left">
                  Monday to Friday
                </p>
                <p className="mb-3 font-[14px] mx-4 text-gray-500 dark:text-gray-400 text-left">
                  9am - 5pm
                </p>

                <button className="bg-green-500 text-white p-3 text-center w-full">
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
