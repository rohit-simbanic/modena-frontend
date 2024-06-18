"use client";

import { Pagination } from "@/theme/components/pagination/pagination";
import SectionTitle from "@/theme/components/section-title/section-title";
import React, { useEffect, useState } from "react";

import { fetchAllProperties } from "@/helpers/product-fetch";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-provider";
import { getCloudinaryUrl } from "@/helpers/cloudinary-image-fetch";
import Image from "next/image";
import { PreconstructedPropertyDetails } from "@/types/property-preconstructed-types";
import { PropertyDetails } from "@/types/property-card-types";
import { truncateText } from "@/helpers/utils";

const SoldProperties = () => {
  const [property, setProperty] = useState<PreconstructedPropertyDetails[]>([]);
  const [loadingData, setLoadingData] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(property.length / itemsPerPage);
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, loading, logout } = useAuth();
  useEffect(() => {
    const fetchData = async () => {
      setLoadingData(true);
      try {
        const endpoint = isAuthenticated
          ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/property/my-properties`
          : `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/property/properties`;
        const data = await fetchAllProperties(endpoint);
        const soldProperties = data.filter(
          (item: PropertyDetails) => item.category === "sold"
        );
        setProperty(soldProperties);
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoadingData(false);
      }
    };

    if (!loading) {
      fetchData();
    }
  }, [loading, logout]);

  const handleDelete = async (propertyId: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this property?"
    );

    if (confirmDelete) {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/property/properties/${propertyId}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to delete property");
        }
        setProperty((prevProperties) =>
          prevProperties.filter((prop) => prop.listing_id !== propertyId)
        );
      } catch (error) {
        console.error("Error deleting property:", error);
      }
    }
  };
  const currentItems = property.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  return (
    <section className="container mx-auto px-4">
      <div className="flex flex-wrap -mx-4 my-10">
        <SectionTitle title="Sold Properties" description="" />
        {loadingData ? (
          <div className="container">
            <div className="flex flex-wrap -mx-4 my-10">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  className={`w-full ${
                    pathname === "/admin"
                      ? "lg:w-full xl:w-1/3 "
                      : "xl:w-1/4 lg:w-1/3 md:w-1/2"
                  } px-4 mb-8`}
                  key={index}
                >
                  <div key={index} className="border border-gray-200 p-4">
                    <div className="animate-pulse space-y-2">
                      <div className="bg-gray-200 h-48"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-16 bg-gray-200 w-full"></div>
                        <div className="space-x-2 flex">
                          <div className="h-8 bg-gray-200 w-full"></div>
                          <div className="h-8 bg-gray-200 w-full"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : currentItems.length !== 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3  px-12 py-12">
            {currentItems.map((card, index) => (
              <div key={index} className="mb-8">
                <div className="bg-white rounded-lg shadow-xl border border-gray-300 dark:border-gray-700">
                  <div className="h-[225px] overflow-hidden rounded-t-lg relative">
                    <Image
                      src={
                        card.property_image
                          ? getCloudinaryUrl(card.property_image.filename)
                          : "https://st4.depositphotos.com/14953852/24787/v/450/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg"
                      }
                      alt={card.name}
                      layout="fill"
                      objectFit="cover"
                      className="w-full h-full hover:scale-125 duration-1000"
                    />
                    <span className="absolute top-0 right-0 bg-green-500 m-2 p-1 text-[10px] font-semibold text-white">
                      {card.category === "sold" ? "Sold" : "N/A"}
                    </span>
                  </div>
                  <div className="p-4">
                    <h5 className="my-2 text-[14px] font-semibold tracking-tight text-gray-900 dark:text-white text-left">
                      {card.name}
                    </h5>
                    <p className="mb-1 text-[22px] font-normal text-gray-500 dark:text-gray-400 text-left">
                      ${card.price}
                    </p>
                    <p className="mb-3 text-[14px] font-normal text-gray-500 dark:text-gray-400 text-left">
                      {truncateText(card.general_details.Address, 40)}
                    </p>
                    <div className="pt-4 pb-2 border-t border-gray-300">
                      <div className="flex justify-between">
                        <span className="inline-block px-3 py-1 text-[13px] font-semibold border border-gray-300 text-gray-700 text-left">
                          <i className="fa-solid fa-bed mx-2"></i>
                          {card.general_details.Bedrooms} Bedrooms
                        </span>
                        <span className="inline-block px-3 py-1 text-[13px] font-semibold border border-gray-300 text-gray-700 text-left">
                          <i className="fa-solid fa-sink mx-2"></i>
                          {card.general_details.Rooms} Rooms
                        </span>
                      </div>
                    </div>
                    {pathname === "/admin" && (
                      <div className="flex justify-end mt-4 space-x-2">
                        <button
                          onClick={() => handleDelete(card.listing_id)}
                          className="text-red-500"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className=" max-h-14 container w-full mx-auto">
            <h4 className="text-gray-600 dark:text-gray-100 text-center font-bold">
              No property listed yet!
            </h4>
          </div>
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        paginate={paginate}
      />
    </section>
  );
};

export default SoldProperties;
