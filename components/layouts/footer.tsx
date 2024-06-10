import { FC } from "react";
import Image from "next/image";

// Social Icon List
const socialIcons = [
  { className: "fa-instagram", label: "Instagram" },
  { className: "fa-whatsapp", label: "Whatsapp" },
  { className: "fa-facebook", label: "Facebook" },
  { className: "fa-twitter", label: "Twitter" },
  { className: "fa-youtube", label: "YouTube" },
  { className: "fa-tiktok", label: "TikTok" },
];

const Footer: FC = () => {
  return (
    <div className="bg-primary">
      <div className="max-w-[1320px] flex flex-col mx-auto sm:flex-row">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 text-center md:text-left lg:grid-cols-5 my-10 px-5 gap-6">
          <div className="text-white">
            <Image
              src="/images/banner-Image.png"
              alt="blog img"
              width={120}
              height={30}
              className="my-6 mx-auto md:mx-0"
              style={{ filter: "invert(1) brightness(0)" }}
            />
            <h1 className="text-[20px] font-semibold">MODENA</h1>
            <p className="text-[15px] my-3">
              Modena is a Real Estate Webflow template that was thought to be
              easy to customize and easy to create your property listings.
            </p>
            <div className="space-x-3 py-3">
              {socialIcons.map((social, index) => (
                <i
                  key={index}
                  className={`text-[15px] fab ${social.className} hover:text-gray-300`}
                  aria-label={social.label}
                ></i>
              ))}
            </div>
          </div>
          <FooterMenu
            title="MENU"
            items={[
              "Home",
              "Services",
              "About Us",
              "Properties",
              "Faq",
              "Blog",
              "Contact Us",
            ]}
          />
          <FooterMenu
            title="SOCIAL"
            items={["Facebook", "Twitter", "Instagram", "LinkedIn"]}
          />
          <FooterContact />
          <FooterProperties />
        </div>
      </div>
      <div className="flex justify-center">
        <hr className="h-[1px] bg-gray-500 border-0 w-[100%] max-w-[1500px]" />
      </div>
      <p className="text-[16px] p-5 md:mx-20 text-white underline text-center">
        Buy Template | Image show | Made By Prakash Pal | Visit My Templates |
        Powered By Simbanic
      </p>
    </div>
  );
};

export default Footer;

// FooterMenu Component
const FooterMenu: FC<{ title: string; items: string[] }> = ({
  title,
  items,
}) => (
  <div className="text-white">
    <h1 className="text-[17px] font-semibold my-5">{title}</h1>
    {items.map((item, index) => (
      <p key={index} className="text-[15px] py-1">
        {item}
      </p>
    ))}
  </div>
);

// FooterContact Component
const FooterContact: FC = () => (
  <div className="text-white">
    <h1 className="text-[17px] font-semibold my-5">CONTACT</h1>
    <p className="text-[15px] py-1">Evergreen 27</p>
    <p className="text-[15px] py-1">San Francisco, Cal</p>
    <p className="text-[15px] py-1">800 123-456</p>
    <p className="text-[15px] py-1">abc@shivay.com</p>
  </div>
);

// FooterProperties Component
const FooterProperties: FC = () => (
  <div className="text-white">
    <h1 className="text-[17px] font-semibold my-5">LATEST PROPERTIES</h1>
    <div className="grid gap-4">
      <PropertyCard src="/images/card-1.jpg" title="HOUSE" price="$500,000" />
      <Divider />
      <PropertyCard src="/images/card-2.jpg" title="OFFICE" price="$200,000" />
      <Divider />
      <PropertyCard
        src="/images/card-3.jpg"
        title="APARTMENT"
        price="$300,000"
      />
    </div>
  </div>
);

// PropertyCard Component
const PropertyCard: FC<{ src: string; title: string; price: string }> = ({
  src,
  title,
  price,
}) => (
  <div className="w-full lg:max-w-[250px] lg:flex shadow-md rounded-lg overflow-hidden">
    <Image
      src={src}
      alt="Property"
      width={80}
      height={100}
      className="h-48 w-full lg:h-auto lg:w-20 sm:h-[100px] object-cover hover:scale-125 duration-1000"
    />
    <div className="p-4 flex flex-col justify-between leading-normal">
      <p className="text-white font-bold text-left">{title}</p>
      <div className="text-white text-left text-[18px] mb-2">{price}</div>
    </div>
  </div>
);

// Divider Component
const Divider: FC = () => (
  <div className="flex justify-center">
    <hr className="h-[1px] bg-gray-500 border-0 w-full" />
  </div>
);
