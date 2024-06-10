"use client";

import PreConstructedProject from "@/app/(defaults)/pages/home/features/components/pre-constructed-project";
import SoldProperties from "@/app/(defaults)/pages/home/features/components/sold-properties";
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
    setActiveTab(2);
  };
  const tabs = [
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
    {
      name: "Sold Properties",
      icon: (
        <svg
          className="w-4 h-4 me-2 text-gray-500 dark:text-gray-400"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M7.824 5.937a1 1 0 0 0 .726-.312 2.042 2.042 0 0 1 2.835-.065 1 1 0 0 0 1.388-1.441 3.994 3.994 0 0 0-5.674.13 1 1 0 0 0 .725 1.688Z" />
          <path d="M17 7A7 7 0 1 0 3 7a3 3 0 0 0-3 3v2a3 3 0 0 0 3 3h1a1 1 0 0 0 1-1V7a5 5 0 1 1 10 0v7.083A2.92 2.92 0 0 1 12.083 17H12a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h1a1.993 1.993 0 0 0 1.722-1h.361a4.92 4.92 0 0 0 4.824-4H17a3 3 0 0 0 3-3v-2a3 3 0 0 0-3-3Z" />
        </svg>
      ),
      content: <SoldProperties />,
    },
    {
      name: "Pre-constructed Properties",
      icon: (
        <svg
          className="w-4 h-4 me-2 text-gray-400 dark:text-gray-500"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
        </svg>
      ),
      content: (
        <PreConstructedProject onEdit={(id: string) => handleEdit(id, 0)} />
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
