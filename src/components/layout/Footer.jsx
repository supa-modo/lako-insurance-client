import { Link } from "react-router-dom";
import {
  FiHeart,
  FiMail,
  FiPhone,
  FiMapPin,
  FiFacebook,
  FiTwitter,
  FiInstagram,
  FiLinkedin,
  FiChevronRight,
  FiArrowUp,
  FiShield,
  FiMessageSquare,
} from "react-icons/fi";
import { GrInstagram } from "react-icons/gr";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaXTwitter,
} from "react-icons/fa6";
import { motion } from "framer-motion";
import {
  TbChevronRight,
  TbMail,
  TbMailFilled,
  TbMapPin,
  TbMapPinShare,
  TbPhone,
} from "react-icons/tb";
import { PiMapPinAreaBold } from "react-icons/pi";
import { useModal } from "../../context/ModalContext";

const Footer = () => {
  const { openCallbackModal } = useModal();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const links = {
    explore: [
      { label: "Home", to: "/" },
      { label: "Buy Insurance Online", to: "/buy-online" },
      { label: "Compare Plans", to: "/compare" },
      { label: "About Us", to: "/about" },
      { label: "Contact Us", to: "/contact" },
      // { label: "FAQs", to: "/faq" },
      // { label: "FAQs", to: "/" },
    ],
    services: [
      { label: "Motor Insurance", to: "/services/motor-insurance" },
      { label: "Property Insurance", to: "/services/property-insurance" },
      { label: "Health Insurance", to: "/services/health-insurance" },
      { label: "Seniors Cover", to: "/services/seniors-cover" },
      { label: "Admin Login", to: "/admin/login" },
    ],
  };

  return (
    <>
      {/* Scroll to top button */}
      <motion.div
        className="fixed left-4 md:left-6 bottom-4 z-30"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.button
          onClick={scrollToTop}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="w-12 h-12 rounded-xl bg-primary-500 text-white shadow-lg flex items-center justify-center transition-all focus:outline-none"
          aria-label="Scroll to top"
        >
          <FiArrowUp size={20} />
        </motion.button>
      </motion.div>

      {/* Main Footer */}
      <footer className="bg-white py-6 border-t border-neutral-200 font-outfit">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[80rem]">
          {/* Top section with logo and social */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 pb-4 border-b border-neutral-200">
            <Link
              to="/"
              className="flex items-center space-x-3 group mb-4 md:mb-0"
            >
              <img
                src="/logo.png"
                alt="Lako Insurance Agency"
                className="w-32 "
              />
            </Link>

            <div className="flex items-center space-x-6">
              <div className="hidden md:flex items-center mr-4">
                <span className="text-sm font-outfit text-gray-500 mr-4">
                  Follow us
                </span>
                <span className="w-10 h-px bg-gray-300"></span>
              </div>
              <div className="flex space-x-3">
                <SocialLink
                  icon={FaFacebook}
                  href="https://web.facebook.com/lakoinsuranceagency?_rdc=1&_rdr"
                />
                <SocialLink icon={FaXTwitter} href="#" />
                <SocialLink
                  icon={FaInstagram}
                  href="https://www.instagram.com/lakoinsurance"
                />
                <SocialLink
                  icon={FaLinkedin}
                  href="https://www.linkedin.com/company/lako-insurance/"
                />
              </div>
            </div>
          </div>

          {/* Main footer content */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {/* Company description */}
            <div className="lg:pr-10">
              <p className="text-gray-600 text-sm sm:text-base mb-6">
                We safeguard what matters to you most by providing comprehensive
                tailored solutions fitting your unique needs.
              </p>

              <Link
                to="/compare"
                className="inline-flex items-center text-primary-600 text-sm sm:text-base hover:underline underline-offset-4 font-medium hover:text-primary-500 transition-colors group"
              >
                <span>Start comparing plans</span>
                <FiChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Links section */}
            <div className="col-span-1 md:col-span-2 lg:col-span-2">
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h4 className="text-secondary-600 text-sm sm:text-base font-bold mb-4">
                    Explore
                  </h4>
                  <ul className="space-y-2">
                    {links.explore.map((link, i) => (
                      <FooterLink
                        key={i}
                        to={link.to}
                        label={link.label}
                        className="text-sm sm:text-base"
                      />
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-secondary-600 text-sm sm:text-base font-bold mb-4">
                    Services
                  </h4>
                  <ul className="space-y-2">
                    {links.services.map((link, i) => (
                      <FooterLink
                        key={i}
                        to={link.to}
                        label={link.label}
                        className="text-sm sm:text-base"
                      />
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Contact info */}
            <div className="bg-neutral-200 md:-my-3 pt-3 px-5 pb-6 rounded-[0.75rem] border border-neutral-100">
              <h4 className="text-secondary-600 text-sm sm:text-base font-bold mb-4">
                Contact Us
              </h4>
              <div className="space-y-3">
                <a
                  href="tel:+1234567890"
                  className="flex items-center text-[0.87rem] text-primary-600 font-medium hover:text-secondary-600 transition-colors"
                >
                  <TbPhone className="mr-3 text-primary-500 text-lg" />
                  <span>+254 726 581487 / +254 720 636363</span>
                </a>

                <a
                  href="mailto:info@seniorcare.com"
                  className="flex items-center text-[0.95rem] text-gray-600 hover:text-primary-600 hover:underline underline-offset-4 transition-colors"
                >
                  <TbMailFilled className="mr-3 text-primary-500 text-lg" />
                  <span>info@lako.co.ke</span>
                </a>

                <div className="flex items-start text-[0.9rem] text-gray-600">
                  <PiMapPinAreaBold className="mr-3 text-primary-500 text-2xl" />
                  <span>SNDBX Office, Ground Floor, Kilimani, Nairobi</span>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={openCallbackModal}
                  className="text-[0.85rem] lg:text-[0.9rem] text-white px-4 py-2 bg-primary-600 hover:bg-primary-700 rounded-lg w-full transition-colors duration-200"
                >
                  <div className="flex items-center justify-center">
                    <span>Request a Callback!</span>
                    <TbChevronRight className="ml-2" />
                  </div>
                </motion.button>
              </div>
            </div>
          </div>

          {/* Bottom footer */}
          <div className="mt-12 pt-6 border-t border-neutral-200 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-[0.87rem]">
              &copy; {new Date().getFullYear()} Lako Insurance Agency.{" "}
              <span className="ml-3">All rights reserved.</span>
            </p>
            <div className="mt-4 md:mt-0 text-gray-500 text-sm flex items-center">
              <span className="flex items-center">
                <ul className="flex items-center space-x-4">
                  <FooterLink
                    to="/"
                    label="Privacy Policy"
                    className="text-[0.85rem]"
                  />
                  <FooterLink
                    to="/"
                    label="Terms of Service"
                    className="text-[0.85rem]"
                  />
                </ul>
              </span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

const FooterLink = ({ to, label, className }) => (
  <li>
    <Link
      to={to}
      className={`text-gray-600  hover:text-primary-600 hover:font-medium font-outfit transition-colors inline-block ${className}`}
    >
      {label}
    </Link>
  </li>
);

const SocialLink = ({ icon: Icon, href }) => (
  <motion.a
    href={href}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center text-primary-600 hover:bg-secondary-100 hover:text-primary-600 transition-colors"
    target="_blank"
    rel="noopener noreferrer"
  >
    <Icon size={20} />
  </motion.a>
);

export default Footer;
