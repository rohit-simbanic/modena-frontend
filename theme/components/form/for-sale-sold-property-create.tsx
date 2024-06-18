"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { getCloudinaryUrl } from "@/helpers/cloudinary-image-fetch";

interface GeneralDetails {
  Price: string;
  Address: string;
  Rooms: string;
  Bedrooms: string;
}

interface FormData {
  name: string;
  category: string;
  price: string;
  available_for: string;
  listing_id: string;
  property_description: string;
  property_image: { file: File | null; url: string };
  general_details: GeneralDetails;
}

const initialFormData: FormData = {
  name: "",
  category: "",
  price: "",
  available_for: "",
  listing_id: "",
  property_description: "",
  property_image: { file: null, url: "" },
  general_details: {
    Price: "",
    Address: "",
    Rooms: "",
    Bedrooms: "",
  },
};

interface PropertyFormProps {
  propertyId: string | null;
  onClose?: () => void;
}

const ForSaleSoldPropertyForm: React.FC<PropertyFormProps> = ({
  propertyId,
  onClose,
}) => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  console.log("formData", formData);
  console.log("propertyId", propertyId);
  const [error, setError] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [success, setSuccess] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("category");
  const scrollableContainerRef = React.useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.price) newErrors.price = "Price is required";
    if (!formData.available_for)
      newErrors.available_for = "Available for is required";
    if (!formData.listing_id) newErrors.listing_id = "Listing ID is required";
    if (!formData.property_description)
      newErrors.property_description = "Property description is required";
    if (!formData.property_image.url) {
      newErrors.property_image = "A property image is required";
    }
    const { general_details } = formData;

    if (!general_details.Price)
      newErrors.general_details_Price = "Price is required";

    if (!general_details.Address)
      newErrors.general_details_Address = "Address is required";
    if (!general_details.Rooms)
      newErrors.general_details_Rooms = "Rooms are required";
    if (!general_details.Bedrooms)
      newErrors.general_details_Bedrooms = "Number of bedrooms is required";

    return newErrors;
  };

  const hasTabErrors = (tab: string) => {
    switch (tab) {
      case "category":
        return !!(
          errors.category ||
          errors.name ||
          errors.price ||
          errors.available_for ||
          errors.listing_id ||
          errors.property_description ||
          errors.property_image
        );
      case "general_details":
        return !!(
          errors.general_details_Price ||
          errors.general_details_Address ||
          errors.general_details_Rooms ||
          errors.general_details_Bedrooms
        );

      default:
        return false;
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleCancel = () => {
    if (onClose) {
      onClose();
    }
    setFormData(initialFormData);
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleNestedChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    category: keyof FormData
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [category]: {
        ...(prevFormData[category] as Record<string, any>),
        [name]: value,
      },
    }));
  };

  const handleListingIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      listing_id: `PXYZ${value.replace(/^PXYZ/, "")}`,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    const maxSize = 5 * 1024 * 1024; // 5 MB size limit
    const allowedFormats = [
      "image/png",
      "image/jpeg",
      "image/jpg",
      "image/webp",
    ];

    if (files && files[0]) {
      const file = files[0];
      if (!allowedFormats.includes(file.type)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          property_image: "Only PNG, JPG, JPEG, and WEBP formats are allowed.",
        }));
        return;
      }
      if (file.size > maxSize) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          property_image: "File size should not exceed 5 MB.",
        }));
        return;
      }
      setFormData((prevFormData) => ({
        ...prevFormData,
        property_image: { file, url: URL.createObjectURL(file) },
      }));
    }
  };

  const handleDeleteImage = async () => {
    const imageToDelete = formData.property_image;
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Unauthorized. Please log in.");
      return;
    }

    try {
      if (propertyId) {
        const response = await axios.delete(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/property/preconstructed/${propertyId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            data: { filename: imageToDelete.url.split("/upload/")[1] },
          }
        );

        if (response.status !== 200) {
          throw new Error("Failed to delete image from backend.");
        }
      }
      setFormData((prevFormData) => ({
        ...prevFormData,
        property_image: { file: null, url: "" },
      }));
    } catch (error) {
      console.error("Error deleting image:", error);
      setError("Failed to delete image.");
    }
  };

  const appendNestedObject = (
    formData: FormData,
    formDataToSend: globalThis.FormData
  ) => {
    Object.keys(formData).forEach((key) => {
      const value = formData[key as keyof FormData];
      if (
        typeof value === "object" &&
        !(value instanceof File) &&
        !Array.isArray(value)
      ) {
        formDataToSend.append(key, JSON.stringify(value)); // Serialize the nested object
      } else if (key !== "property_image") {
        formDataToSend.append(key, value as string | Blob);
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const file = formData.property_image.file;

      // Prepare FormData
      const data = new FormData();
      if (file) {
        data.append("property_image", file);
      }

      // Append other fields
      appendNestedObject(formData, data);

      let response;
      if (propertyId) {
        console.log("before updating property", data);
        response = await axios.put(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/property/pre-constructed-property/${propertyId}`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("response message", response);
      } else {
        response = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/property/pre-constructed-property`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }

      setSuccess(true);
      setError(null);
      setErrors({});
      setFormData(initialFormData);
      if (onClose) {
        onClose();
      }
      router.push("/admin");
    } catch (err) {
      console.error(err);
      setError("Error saving property. Please try again.");
      setSuccess(false);
    }
  };

  useEffect(() => {
    if (propertyId) {
      const fetchPropertyData = async () => {
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/property/pre-constructed-property/${propertyId}`
          );
          const propertyData = response.data;

          const formattedPropertyData = {
            ...propertyData,

            property_image: {
              file: null,
              url: getCloudinaryUrl(propertyData.property_image.filename || ""),
            },
          };

          setFormData(formattedPropertyData);
        } catch (err) {
          console.error(err);
          setError("Failed to fetch property data.");
        }
      };

      fetchPropertyData();
    }
  }, [propertyId]);

  useEffect(() => {
    if (scrollableContainerRef.current) {
      scrollableContainerRef.current.scrollTop = 0;
    }
  }, [activeTab]);

  const tabContent = () => {
    switch (activeTab) {
      case "category":
        return (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
            <div>
              <label className="block font-semibold">Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded w-full"
              />
              {errors.name && <p className="text-red-500">{errors.name}</p>}
            </div>
            <div>
              <label className="block font-semibold">Category:</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleSelectChange}
                className="p-3 border border-gray-300 rounded w-full"
              >
                <option value="">Select Category</option>
                <option value="sale">For Sale</option>
                <option value="sold">Sold</option>
              </select>
              {errors.category && (
                <p className="text-red-500">{errors.category}</p>
              )}
            </div>
            <div>
              <label className="block font-semibold">Price:</label>
              <input
                type="text"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded w-full"
              />
              {errors.price && <p className="text-red-500">{errors.price}</p>}
            </div>
            <div>
              <label className="block font-semibold">Available For:</label>
              <select
                name="available_for"
                value={formData.available_for}
                onChange={handleSelectChange}
                className="p-3 border border-gray-300 rounded w-full"
              >
                <option value="">Select one</option>
                <option value="sale">Sale</option>
                <option value="lease">Lease</option>
              </select>

              {errors.available_for && (
                <p className="text-red-500">{errors.available_for}</p>
              )}
            </div>

            <div>
              <label className="block font-semibold">Listing ID:</label>
              <input
                type="text"
                name="listing_id"
                value={formData.listing_id}
                onChange={handleListingIdChange}
                className="p-3 border border-gray-300 rounded w-full"
              />
              {errors.listing_id && (
                <p className="text-red-500">{errors.listing_id}</p>
              )}
            </div>

            <div>
              <label className="block font-semibold">
                Property Description:
              </label>
              <textarea
                name="property_description"
                value={formData.property_description}
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded w-full"
              ></textarea>
              {errors.property_description && (
                <p className="text-red-500">{errors.property_description}</p>
              )}
            </div>

            <div>
              <label className="block font-semibold">Property Image:</label>
              <input
                type="file"
                name="property_image"
                onChange={handleFileChange}
                className="p-3 border border-gray-300 rounded w-full"
              />
              {errors.property_image && (
                <p className="text-red-500">{errors.property_image}</p>
              )}
              {formData.property_image?.url && (
                <div className="mt-2">
                  <p>Uploaded Image:</p>
                  <div className="relative w-[200px]">
                    <img
                      src={formData.property_image.url}
                      alt="Property Image"
                      className="w-[200px] sm:w-[200px] object-cover h-[100px] rounded"
                    />
                    <button
                      type="button"
                      onClick={handleDeleteImage}
                      className="absolute top-0 right-0 bg-red-600 text-white p-1 rounded-full"
                    >
                      &times;
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      case "general_details":
        return (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
            <h3 className="text-xl font-bold mb-4">General Details</h3>
            <div>
              <label className="block font-semibold">Price:</label>
              <input
                type="text"
                name="Price"
                value={formData.general_details.Price}
                onChange={(e) => handleNestedChange(e, "general_details")}
                className="p-3 border border-gray-300 rounded w-full"
              />
              {errors.general_details_Price && (
                <p className="text-red-500">{errors.general_details_Price}</p>
              )}
            </div>

            <div>
              <label className="block font-semibold">Address:</label>
              <input
                type="text"
                name="Address"
                value={formData.general_details.Address}
                onChange={(e) => handleNestedChange(e, "general_details")}
                className="p-3 border border-gray-300 rounded w-full"
              />
              {errors.general_details_Address && (
                <p className="text-red-500">{errors.general_details_Address}</p>
              )}
            </div>

            <div>
              <label className="block font-semibold">Rooms:</label>
              <input
                type="text"
                name="Rooms"
                value={formData.general_details.Rooms}
                onChange={(e) => handleNestedChange(e, "general_details")}
                className="p-3 border border-gray-300 rounded w-full"
              />
              {errors.general_details_Rooms && (
                <p className="text-red-500">{errors.general_details_Rooms}</p>
              )}
            </div>

            <div>
              <label className="block font-semibold">Bedrooms:</label>
              <input
                type="text"
                name="Bedrooms"
                value={formData.general_details.Bedrooms}
                onChange={(e) => handleNestedChange(e, "general_details")}
                className="p-3 border border-gray-300 rounded w-full"
              />
              {errors.general_details_Bedrooms && (
                <p className="text-red-500">
                  {errors.general_details_Bedrooms}
                </p>
              )}
            </div>
          </div>
        );
      // Add the other tabs content similarly
      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl p-8 w-full mx-auto lg:w-[40%] bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">
        {propertyId
          ? "Edit For Sale Property"
          : "Create For Sale/Sold Property"}
      </h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}
      {errors && <p className="text-red-500 mb-4">{errors.length}</p>}
      {success && (
        <p className="text-green-500 mb-4">Property saved successfully!</p>
      )}

      <div className="mb-6">
        <div className="flex space-x-4 flex-col md:flex-row gap-4">
          <button
            className={`${
              activeTab === "category"
                ? "border-b-2 border-indigo-600 text-indigo-600"
                : hasTabErrors("category")
                ? "text-red-500 font-bold"
                : ""
            } pb-2`}
            onClick={() => setActiveTab("category")}
          >
            Category
          </button>
          <button
            className={`${
              activeTab === "general_details"
                ? "border-b-2 border-indigo-600 text-indigo-600"
                : hasTabErrors("general_details")
                ? "text-red-500 font-bold"
                : ""
            } pb-2`}
            onClick={() => setActiveTab("general_details")}
          >
            General Details
          </button>
          {/* Add other tabs similarly */}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div
          ref={scrollableContainerRef}
          className="max-h-[500px] overflow-y-auto scrollable-container px-3"
        >
          {tabContent()}
          <div className="flex gap-4">
            <button
              type="submit"
              className="mt-4 bg-indigo-600 text-white px-5 py-3 rounded hover:bg-blue-600"
            >
              {propertyId ? "Update Property" : "Create Property"}
            </button>
            {onClose && propertyId && (
              <button
                type="button"
                className="mt-4 bg-gray-700 text-white px-5 py-3 rounded hover:bg-gray-600"
                onClick={handleCancel}
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default ForSaleSoldPropertyForm;
