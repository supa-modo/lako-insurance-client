import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  FiMenu,
  FiX,
  FiHeart,
  FiPhoneCall,
  FiChevronDown,
} from "react-icons/fi";
import { TbPhoneCall } from "react-icons/tb";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white shadow-lg py-0"
          : "bg-white/80 backdrop-blur-sm py-1 sm:py-2"
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="">
            
            <div className="w-24">
              <img src="/lako-logo.png" alt="lako-logo" className="w-full h-full object-cover " />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden -mr-24 md:flex items-center space-x-1 font-outfit font-medium pt-6">
            <NavLink to="/" label="Home" />
            <NavLink to="/compare" label="Compare Plans" />
            <NavDropdown
              label="Resources"
              items={[
                { to: "/guide", label: "Insurance Guide" },
                { to: "/faq", label: "FAQs" },
              ]}
            />
            <NavLink to="/about" label="About Us" />
          </nav>

          {/* Contact Button */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="tel:+1234567890"
              className="flex items-center text-neutral-900 hover:text-primary-500 transition-all duration-300 group"
            >
              <span className="relative w-9 h-9 flex items-center justify-center bg-neutral-200 rounded-full mr-2 overflow-hidden group-hover:bg-primary-50">
                <TbPhoneCall className="h-5 w-5 text-primary-500 z-10" />
                <div className="absolute inset-0 bg-primary-200 transform scale-0 group-hover:scale-100 transition-transform duration-300 origin-bottom-right rounded-full"></div>
              </span>
              <div>
                <span className="font-semibold tracking-wide font-outfit text-sm">+254712345678</span>
                <div className="h-0.5 w-0 group-hover:w-full bg-primary-500 transition-all duration-300"></div>
              </div>
            </a>
            <Link
              to="/compare"
              className="relative overflow-hidden px-6 py-2.5 font-semibold rounded-lg bg-secondary-500 text-white hover:text-white hover:bg-primary-600 border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:translate-y-[-2px]"
            >
              <span className="relative z-10">Get Started</span>
              <div className="absolute inset-0 bg-gradient-to-r from-secondary-600 to-secondary-500 transform translate-y-full hover:translate-y-0 transition-transform duration-300"></div>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden w-12 h-12 flex items-center justify-center rounded-lg bg-neutral-100 hover:bg-neutral-200 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <FiX className="h-6 w-6 text-gray-900" />
            ) : (
              <FiMenu className="h-6 w-6 text-gray-900" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 bg-white shadow-xl transform transition-all duration-300 origin-top ${
          isMenuOpen
            ? "opacity-100 scale-y-100"
            : "opacity-0 scale-y-0 pointer-events-none"
        }`}
      >
        <div className="container-custom py-6 space-y-6">
          <nav className="flex flex-col space-y-2">
            <MobileNavLink
              to="/"
              label="Home"
              onClick={() => setIsMenuOpen(false)}
            />
            <MobileNavLink
              to="/compare"
              label="Compare Plans"
              onClick={() => setIsMenuOpen(false)}
            />
            <MobileNavLink
              to="/guide"
              label="Insurance Guide"
              onClick={() => setIsMenuOpen(false)}
            />
            <MobileNavLink
              to="/faq"
              label="FAQs"
              onClick={() => setIsMenuOpen(false)}
            />
            <MobileNavLink
              to="/about"
              label="About Us"
              onClick={() => setIsMenuOpen(false)}
            />
            {/* <MobileNavLink
              to="/contact"
              label="Contact"
              onClick={() => setIsMenuOpen(false)}
            /> */}
          </nav>

          <div className="pt-4 border-t border-neutral-200">
            <a
              href="tel:+1234567890"
              className="flex items-center text-gray-700 hover:text-primary-500 transition mb-4"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center mr-3">
                <TbPhoneCall className="h-5 w-5 text-primary-500" />
              </div>
              <span className="font-semibold tracking-wide font-outfit text-sm">+254712345678</span>
            </a>
            <Link
              to="/compare"
              className="block w-full py-3 px-4 bg-secondary-500 hover:bg-primary-600 text-white hover:text-white text-center font-semibold rounded-lg shadow-md transition-all"
              onClick={() => setIsMenuOpen(false)}
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

// Desktop navigation link
const NavLink = ({ to, label }) => (
  <Link
    to={to}
    className="relative px-4 py-2 text-[1.05rem] text-neutral-800 font-semibold hover:text-primary-600 transition-colors duration-300 rounded-lg hover:bg-neutral-50 overflow-hidden group"
  >
    <span className="relative z-10">{label}</span>
    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
  </Link>
);

// Desktop dropdown navigation
const NavDropdown = ({ label, items }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative" onMouseLeave={() => setIsOpen(false)}>
      <button
        className="flex items-center px-4 py-2 text-neutral-800 font-semibold hover:text-primary-600 transition-colors duration-300 rounded-lg hover:bg-neutral-50"
        onMouseEnter={() => setIsOpen(true)}
        onClick={() => setIsOpen(!isOpen)}
      >
        {label}
        <FiChevronDown
          className={`ml-1 h-4 w-4 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`absolute left-0 bg-white rounded-lg shadow-xl py-2 mt-1 min-w-[200px] transform transition-all duration-200 origin-top-left z-20 ${
          isOpen
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        {items.map((item, index) => (
          <Link
            key={index}
            to={item.to}
            className="block px-4 py-2 text-neutral-800 hover:text-primary-500 hover:bg-neutral-50 transition-colors duration-200"
            onClick={() => setIsOpen(false)}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

// Mobile navigation link
const MobileNavLink = ({ to, label, onClick }) => (
  <Link
    to={to}
    className="flex items-center px-2 py-3 text-neutral-800 hover:text-primary-500 font-medium font-outfit border-b border-neutral-100"
    onClick={onClick}
  >
    <span>{label}</span>
    <div className="ml-auto">
      <FiChevronDown className="h-4 w-4 rotate-[-90deg] text-neutral-700" />
    </div>
  </Link>
);

export default Header;
