"use client";

import React, { FC } from "react";
import Image, { StaticImageData } from "next/image";
import card1 from "@/public/images/c-1.jpg";
import card2 from "@/public/images/c-2.jpg";
import card3 from "@/public/images/c-3.jpg";
import card4 from "@/public/images/c-4.jpg";

// Define TypeScript interface for the card data
interface FeatureCard {
  image: StaticImageData;
  type: string;
  price: string;
  location: string;
  bedrooms: number;
  bathrooms: number;
}

// Mock data for featured cards
const FetureData: FeatureCard[] = [
  {
    image: card1,
    type: "OFFICE",
    price: "$420,000",
    location: "Rodeo Drive, 325.",
    bedrooms: 3,
    bathrooms: 2,
  },
  {
    image: card2,
    type: "APARTMENT",
    price: "$330,000",
    location: "Rodeo Drive, 325.",
    bedrooms: 3,
    bathrooms: 2,
  },
  {
    image: card3,
    type: "APARTMENT",
    price: "$330,000",
    location: "Rodeo Drive, 325.",
    bedrooms: 3,
    bathrooms: 2,
  },
  {
    image: card4,
    type: "HOUSE",
    price: "$370,000",
    location: "Rodeo Drive, 325.",
    bedrooms: 3,
    bathrooms: 2,
  },
];

// Main Card component
const PropertyCard: FC = () => {
  return (
    <div className="max-w-[1320px] mx-auto relative">
      <div className="my-5">
        <h1 className="text-[14px] text-center py-2 font-bold">FEATURED</h1>
        <h1 className="text-[30px] text-center">Best Property Deals</h1>
        <p className="my-1 text-[15px] text-center text-gray-400">
          Enjoy this amazing amenity that has all you need to jump in
        </p>
      </div>
      <div className="bg-accent/20">
        <div className="max-w-[1320px] grid grid-cols-1 gap-6 sm:text-center sm:grid-cols-2 lg:grid-cols-4 px-12">
          {FetureData.map((card, index) => (
            <div
              key={index}
              className="my-6 bg-white rounded-lg shadow-xl border border-gray-300 dark:border-gray-700"
            >
              <div className="h-[225px] overflow-hidden rounded-t-lg relative">
                <Image
                  src={card.image}
                  alt={card.type}
                  layout="fill"
                  objectFit="cover"
                  className="w-full h-full hover:scale-125 duration-1000"
                />
                <span className="absolute top-0 right-0 bg-green-500 m-2 p-1 text-[10px] font-semibold text-white">
                  For Sale
                </span>
              </div>
              <div className="p-4">
                <h5 className="my-2 text-[14px] font-semibold tracking-tight text-gray-900 dark:text-white text-left">
                  {card.type}
                </h5>
                <p className="mb-1 text-[22px] font-normal text-gray-500 dark:text-gray-400 text-left">
                  {card.price}
                </p>
                <p className="mb-3 text-[14px] font-normal text-gray-500 dark:text-gray-400 text-left">
                  {card.location}
                </p>
                <div className="pt-4 pb-2 border-t border-gray-300">
                  <div className="flex justify-between">
                    <span className="inline-block px-3 py-1 text-[13px] font-semibold border border-gray-300 text-gray-700 text-left">
                      <i className="fa-solid fa-bed mx-2"></i>
                      {card.bedrooms} Bedrooms
                    </span>
                    <span className="inline-block px-3 py-1 text-[13px] font-semibold border border-gray-300 text-gray-700 text-left">
                      <i className="fa-solid fa-sink mx-2"></i>
                      {card.bathrooms} Bathrooms
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <hr className="h-px my-10 bg-gray-400 border-0" />
      </div>
    </div>
  );
};

export default PropertyCard;
