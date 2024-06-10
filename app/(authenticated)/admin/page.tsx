"use client";

import withAuth from "@/helpers/with-auth-hoc";
import PreConstructedPropertyForm from "@/theme/components/form/pre-constructed-property-create";
import PropertyForm from "@/theme/components/form/property-create";
import React, { useState } from "react";

const Page = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [propertyId, setPropertyId] = useState<string | null>(null);

  const handleEdit = (id: string, tab: number) => {
    setPropertyId(id);
    setActiveTab(tab);
  };
  const handleCloseProperty = () => {
    setPropertyId(null);
    setActiveTab(2);
  };
  const handleClosePreconstructed = () => {
    setPropertyId(null);
    setActiveTab(4);
  };
  const tabs = [
    {
      name: "Featured/Sold Property",
      icon: (
        <svg
          className="w-4 h-4 me-2 text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
        </svg>
      ),
      content: (
        <PropertyForm propertyId={propertyId} onClose={handleCloseProperty} />
      ),
    },
    {
      name: "Pre-Constructed Property",
      icon: (
        <svg
          className="w-4 h-4 me-2 text-gray-500 dark:text-gray-400"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 18 18"
        >
          <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
        </svg>
      ),
      content: (
        <PreConstructedPropertyForm
          propertyId={propertyId}
          onClose={handleClosePreconstructed}
        />
      ),
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <div className="md:flex">
        <ul className="flex flex-col space-y-4 text-sm font-medium text-gray-500 dark:text-gray-400 md:me-4 mb-4 md:mb-0">
          {tabs.map((tab, index) => (
            <li key={index}>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab(index);
                  setPropertyId(null);
                }}
                className={`inline-flex items-center px-4 py-3 rounded-lg w-full ${
                  activeTab === index
                    ? "text-white bg-blue-700 dark:bg-blue-600"
                    : "hover:text-gray-900 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white"
                }`}
                aria-current={activeTab === index ? "page" : undefined}
              >
                {tab.icon}
                {tab.name}
              </a>
            </li>
          ))}
        </ul>
        <div className="p-6 bg-gray-50 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg w-full">
          {tabs[activeTab].content}
        </div>
      </div>
    </div>
  );
};

export default withAuth(Page);
