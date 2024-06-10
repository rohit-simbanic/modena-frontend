"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

// Sample data
import test1 from "@/public/images/testimonial-1.jpeg";
import test2 from "@/public/images/testimonial-2.jpeg";
import test3 from "@/public/images/testimonial-3.jpg";
import test4 from "@/public/images/testimonial-4.jpeg";

// Define TypeScript interface for card data
interface CardData {
  id: number;
  content: string;
  job: string;
}

const cardData: CardData[] = [
  {
    id: 1,
    content: "This is a wonderful product. Highly recommended!",
    job: "CEO at Company",
  },
  {
    id: 2,
    content: "A fantastic solution to our business needs.",
    job: "Manager at Corporation",
  },
  {
    id: 3,
    content: "The best service we have ever used!",
    job: "Director at Enterprise",
  },
];

// Reusable ImageCircle component
const ImageCircle: React.FC<{ src: string; alt: string; size?: number }> = ({
  src,
  alt,
  size = 120,
}) => (
  <div
    className="relative rounded-full overflow-hidden border border-green-400"
    style={{ height: size, width: size }}
  >
    <Image src={src} alt={alt} layout="fill" objectFit="cover" />
  </div>
);

// Reusable CarouselItem component
const CarouselItem: React.FC<{ item: CardData; isActive: boolean }> = ({
  item,
  isActive,
}) => (
  <div
    className={`absolute inset-0 pt-6 transition-opacity duration-700 ease-in-out ${
      isActive ? "opacity-100" : "opacity-0"
    }`}
    data-carousel-item={isActive}
  >
    <div className="text-center mx-auto py-10 w-full max-w-[44rem] px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-bold">Testimonials</h2>
      <h1 className="lg:text-3xl text-xl my-5 lg:leading-normal mx-auto">
        {item.content}
      </h1>
      <div className="flex justify-center">
        <hr className="h-[2px] bg-gray-800 border-0 w-[200px]" />
      </div>
      <div className="mx-auto text-center my-5">
        <h1 className="text-xl font-semibold">{item.job}</h1>
      </div>
    </div>
  </div>
);

// Main Testimonials component
const Testimonials: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex(
      (prevIndex) => (prevIndex - 1 + cardData.length) % cardData.length
    );
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % cardData.length);
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center my-5 w-[70%] mx-auto">
        <ImageCircle src={test1.src} alt="test img 1" size={80} />
        <ImageCircle src={test2.src} alt="test img 2" size={80} />
      </div>
      <div
        id="controls-carousel"
        className="relative w-full bg-carosalImage h-[320px] rounded-lg"
      >
        <div className="relative w-full h-full">
          {cardData.map((item, index) => (
            <CarouselItem
              key={item.id}
              item={item}
              isActive={index === activeIndex}
            />
          ))}
        </div>
        <button
          type="button"
          className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          onClick={handlePrev}
        >
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/80 group-focus:ring-4 group-focus:ring-red">
            <svg
              className="w-4 h-4 text-red-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 1 1 5l4 4"
              />
            </svg>
            <span className="sr-only">Previous</span>
          </span>
        </button>
        <button
          type="button"
          className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          onClick={handleNext}
        >
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/80 group-focus:ring-4 group-focus:ring-red">
            <svg
              className="w-4 h-4 text-red-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
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
      <div className="flex justify-between items-center w-[50%] mx-auto mt-5">
        <ImageCircle src={test3.src} alt="test img 3" size={80} />
        <ImageCircle src={test4.src} alt="test img 4" size={80} />
      </div>
      <div className="flex justify-center my-5">
        <hr className="h-[1px] bg-gray-500 border-0 w-[1500px]" />
      </div>
    </div>
  );
};

export default Testimonials;
