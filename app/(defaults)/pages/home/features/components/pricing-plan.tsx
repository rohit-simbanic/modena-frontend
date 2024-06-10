"use client";

import React, { FC } from "react";
import Image from "next/image";
import Link from "next/link";

// Define TypeScript interface for pricing plan data
interface PricingPlan {
  id: number;
  title: string;
  price: string;
  description: string;
  features: string[];
}

// Mock data for pricing plans
const pricingData: PricingPlan[] = [
  {
    id: 1,
    title: "Basic Plan",
    price: "$29",
    description: "An affordable plan with essential features.",
    features: ["Access to basic features", "Basic support", "Community access"],
  },
  {
    id: 2,
    title: "Standard Plan",
    price: "$49",
    description: "The most popular plan with additional features.",
    features: [
      "Access to all features",
      "Priority support",
      "Premium content",
      "Community access",
    ],
  },
  {
    id: 3,
    title: "Premium Plan",
    price: "$99",
    description: "All the features you need for professional use.",
    features: [
      "All features included",
      "24/7 support",
      "Exclusive content",
      "Personalized assistance",
      "Community access",
    ],
  },
];

// Reusable PricingCard component
const PricingCard: FC<{ plan: PricingPlan }> = ({ plan }) => (
  <div className="max-w-sm mx-auto my-6 bg-white border-t p-5 rounded-lg shadow-xl border border-gray-300 dark:border-gray-700">
    <Link href="#">
      <h5 className="my-2 text-[13px] mx-4 text-left font-bold tracking-tight text-gray-900 dark:text-white">
        {plan.title}
      </h5>
    </Link>
    <p className="mb-3 mx-4 text-[40px] text-left font-bold text-primary dark:text-gray-400">
      {plan.price}
    </p>
    <p className="mb-3 text-lg font-normal mx-4 text-gray-500 dark:text-gray-400">
      {plan.description}
    </p>
    {plan.features.map((feature, index) => (
      <div key={index} className="px-3 pt-4 pb-2 border-t border-gray-300">
        <h1 className="text-left text-[19px] text-gray-750">
          <i className="fa-solid text-primary fa-circle-check"></i> {feature}
        </h1>
        <p className="text-left text-[14px] text-gray-500 mx-6">
          Enjoy an all day solar heated pool.
        </p>
        {index < plan.features.length - 1 && (
          <hr className="h-px my-3 bg-gray-400 border-0" />
        )}
      </div>
    ))}
    <div className="px-3 pt-4 pb-2 border-t mx-auto border-gray-300">
      <button className="font-semibold text-primary h-12 w-full border border-primary hover:bg-primary hover:text-white duration-1000">
        Choose this Plan
      </button>
    </div>
  </div>
);

// Main Pricing component
const Pricing: FC = () => (
  <div className="container mx-auto relative py-10 px-4">
    <div className="my-5 text-center">
      <h1 className="text-[13px] py-1 font-bold">PRICING</h1>
      <h1 className="text-[30px]">Simple Plans Pricing</h1>
      <p className="my-1 text-[15px] text-gray-400">
        Enjoy this amazing amenity that has all you need to jump in
      </p>
    </div>
    <div className="bg-accent/20">
      <div
        className="max-w-7xl mx-auto grid gap-10 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1"
        data-aos="fade-up"
      >
        {pricingData.map((plan) => (
          <PricingCard key={plan.id} plan={plan} />
        ))}
      </div>
      <hr className="h-px my-10 bg-gray-400 border-0" />
    </div>
  </div>
);

export default Pricing;
