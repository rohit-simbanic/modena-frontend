import React from "react";
import imgBanner from "@/public/images/img-banner.jpg";
import Image from "next/image";
const ImgBanner = () => {
  return (
    <Image
      src={imgBanner}
      alt="Descriptive Alt Text"
      className="w-full h-auto max-h-[500px] my-10 object-cover"
    />
  );
};

export default ImgBanner;
