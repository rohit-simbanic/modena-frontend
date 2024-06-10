"use client";

import React, { FC } from "react";
import Image, { StaticImageData } from "next/image";
import card1 from "@/public/images/c-1.jpg";
import card2 from "@/public/images/c-2.jpg";
import card3 from "@/public/images/c-3.jpg";
import card4 from "@/public/images/c-4.jpg";
import card5 from "@/public/images/c-5.jpg";
import card6 from "@/public/images/c-6.jpg";

// Define TypeScript interface for property data
interface Property {
  id: number;
  type: string;
  price: string;
  address: string;
  bedrooms: number;
  bathrooms: number;
  image: StaticImageData;
}

// Mock data for properties
const properties: Property[] = [
  {
    id: 1,
    type: "HOUSE",
    price: "$290,000",
    address: "Rodeo Drive, 325",
    bedrooms: 3,
    bathrooms: 2,
    image: card1,
  },
  {
    id: 2,
    type: "HOUSE",
    price: "$290,000",
    address: "Rodeo Drive, 325",
    bedrooms: 3,
    bathrooms: 2,
    image: card2,
  },
  {
    id: 3,
    type: "HOUSE",
    price: "$290,000",
    address: "Rodeo Drive, 325",
    bedrooms: 3,
    bathrooms: 2,
    image: card3,
  },
  {
    id: 4,
    type: "HOUSE",
    price: "$290,000",
    address: "Rodeo Drive, 325",
    bedrooms: 3,
    bathrooms: 2,
    image: card4,
  },
  {
    id: 5,
    type: "HOUSE",
    price: "$290,000",
    address: "Rodeo Drive, 325",
    bedrooms: 3,
    bathrooms: 2,
    image: card5,
  },
  {
    id: 6,
    type: "HOUSE",
    price: "$290,000",
    address: "Rodeo Drive, 325",
    bedrooms: 3,
    bathrooms: 2,
    image: card6,
  },
];

// Reusable PropertyCard component
const PropertyCard: FC<{ property: Property }> = ({ property }) => (
  <div className="w-full lg:max-w-[600px] border border-gray-300 lg:flex bg-white shadow-md rounded-lg overflow-hidden">
    <div className="overflow-hidden h-[250px] w-full lg:w-48 flex-none relative">
      <Image
        src={property.image}
        alt="Property"
        layout="fill"
        objectFit="cover"
        className="hover:scale-125 duration-1000"
      />
      <span className="absolute top-0 right-0 bg-green-500 m-2 p-1 text-[10px] font-semibold text-white">
        For Sale
      </span>
    </div>
    <div className="p-4 flex flex-col justify-between leading-normal">
      <div className="mb-8">
        <p className="text-[15px] mb-3 text-left font-bold">{property.type}</p>
        <div className="text-gray-900 text-left text-2xl mb-3">
          {property.price}
        </div>
        <p className="text-gray-700 text-left text-xl">{property.address}</p>
      </div>
      <div className="flex items-center">
        <p className="text-gray-500 text-[18px] leading-none mr-4 border border-gray-300 p-5">
          <i className="fa-solid fa-bed mx-2"></i>
          {property.bedrooms} Bedrooms
        </p>
        <p className="text-gray-500 text-[18px] leading-none border border-gray-300 p-5">
          <i className="fa-solid fa-sink mx-2"></i>
          {property.bathrooms} Bathrooms
        </p>
      </div>
    </div>
  </div>
);

// Main PropertyDeals component
const PropertyDeals: FC = () => {
  return (
    <div className="container mx-auto px-4">
      <div className="my-10 ml-[93px]">
        <h1 className="text-[26px] text-left font-semibold">
          Last Property Deals
        </h1>
        <p className="my-2 text-[15px] text-left text-gray-400">
          Enjoy this amazing amenity that has all you need to jump in
        </p>
      </div>
      <div className="bg-accent/20">
        <div className="max-w-[1320px] mx-auto grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
        <hr className="h-px my-10 bg-gray-400 border-0" />
      </div>
    </div>
  );
};

export default PropertyDeals;
