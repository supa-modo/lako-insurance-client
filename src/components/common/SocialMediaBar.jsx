import React from "react";
import { motion } from "framer-motion";
import {
  TbBrandFacebook,
  TbBrandTwitter,
  TbBrandLinkedin,
  TbBrandInstagram,
  TbMail,
  TbBrandYoutube,
  TbMailFilled,
} from "react-icons/tb";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaWhatsapp,
  FaXTwitter,
} from "react-icons/fa6";

const SocialMediaBar = () => {
  const socialLinks = [
    {
      name: "Facebook",
      url: "https://facebook.com/lakoinsurance",
      icon: FaFacebookF,
      bgColor: "bg-[#1877F2]", // Facebook official blue
    },
    {
      name: "Twitter",
      url: "https://twitter.com/lakoinsurance",
      icon: FaXTwitter,
      bgColor: "bg-[#000000]", // X official black
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/company/lakoinsurance",
      icon: FaLinkedinIn,
      bgColor: "bg-[#0A66C2]", // LinkedIn official blue
    },
    {
      name: "Instagram",
      url: "https://instagram.com/lakoinsurance",
      icon: FaInstagram,
      bgColor: "bg-gradient-to-r from-[#E4405F] to-[#833AB4]", // Instagram gradient
    },

    {
      name: "Email",
      url: "mailto:info@lako.co.ke",
      icon: TbMailFilled,
      bgColor: "bg-[#34495E]", // Professional dark gray
    },
    {
      name: "WhatsApp",
      url: "https://wa.me/254722345678",
      icon: FaWhatsapp,
      bgColor: "bg-[#199046]", // WhatsApp green - needs to be a little darker with some gradient effect
    },
  ];

  return (
    <div className="fixed right-0 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block">
      <div className="bg-white shadow-lg rounded-l-[0.7rem]  overflow-hidden">
        <div className="flex flex-col ">
          {socialLinks.map((link, index) => (
            <motion.a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`py-3 pr-2 pl-3 ${link.bgColor} text-white`}
              whileHover={{ x: -4 }}
              whileTap={{ x: -4 }}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2, ease: "linear" }}
              title={link.name}
            >
              <link.icon size={19} className="" />
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SocialMediaBar;
