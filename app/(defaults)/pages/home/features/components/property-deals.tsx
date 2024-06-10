"use client";

import { fetchProperties } from "@/helpers/product-fetch";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-provider";
import { getCloudinaryUrl } from "@/helpers/cloudinary-image-fetch";
import Image from "next/image";
import { PreconstructedPropertyDetails } from "@/types/property-preconstructed-types";
import { useEffect, useState } from "react";

const PropertyDeals: React.FC = () => {
  const [property, setProperty] = useState<PreconstructedPropertyDetails[]>([]);
  const [loadingData, setLoadingData] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(property.length / itemsPerPage);
  const pathname = usePathname();
  const { isAuthenticated, loading, logout } = useAuth();
  console.log("propertyItem", property);
  console.log("pre-constructed properties", property);

  useEffect(() => {
    const fetchData = async () => {
      setLoadingData(true);
      try {
        const endpoint = isAuthenticated
          ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/property/my-properties`
          : `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/property/pre-constructed-property`;
        const data = await fetchProperties(endpoint);
        const soldProperties = data.filter(
          (item: PreconstructedPropertyDetails) => item.category === "sold"
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
  }, [loading, isAuthenticated, logout]);

  const currentItems = property.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

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
          {loadingData ? (
            <div className="w-full text-center">
              <p>Loading...</p>
            </div>
          ) : currentItems.length !== 0 ? (
            currentItems.map((card, index) => (
              <div
                key={index}
                className="w-full lg:max-w-[600px] border border-gray-300 lg:flex bg-white shadow-md rounded-lg overflow-hidden"
              >
                <div className="overflow-hidden h-[277px] w-full lg:w-48 flex-none relative">
                  <Image
                    src={
                      card.property_image
                        ? getCloudinaryUrl(card.property_image.filename)
                        : "https://st4.depositphotos.com/14953852/24787/v/450/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg"
                    }
                    alt="Property"
                    layout="fill"
                    objectFit="cover"
                    className="hover:scale-125 duration-1000"
                  />
                  <span className="absolute top-0 right-0 bg-red-500 m-2 p-1 text-[10px] font-semibold text-white">
                    {card.category === "sold" ? "Sold" : "N/A"}
                  </span>
                </div>
                <div className="p-4 flex flex-col justify-between leading-normal">
                  <div className="mb-8">
                    <p className="text-[15px] mb-3 text-left font-bold">
                      {card.name}
                    </p>
                    <div className="text-gray-900 text-left text-2xl mb-3">
                      ${card.price}
                    </div>
                    <p className="text-gray-700 text-left text-xl">
                      {card.general_details.Address}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <p className="text-gray-500 text-[18px] leading-none mr-4 border border-gray-300 p-5">
                      <i className="fa-solid fa-bed mx-2"></i>
                      {card.general_details.Bedrooms} Bedrooms
                    </p>
                    <p className="text-gray-500 text-[18px] leading-none border border-gray-300 p-5">
                      <i className="fa-solid fa-sink mx-2"></i>
                      {card.general_details.Rooms} Bathrooms
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="max-h-14 w-full mx-auto">
              <h4 className="text-gray-600 dark:text-gray-100 text-center font-bold">
                No property listed by you yet!
              </h4>
            </div>
          )}
        </div>
        <hr className="h-px my-10 bg-gray-400 border-0" />
      </div>
    </div>
  );
};

export default PropertyDeals;
