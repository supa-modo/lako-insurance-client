import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { TbChevronDown, TbMenu2, TbX, TbPhone } from "react-icons/tb";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const location = useLocation();

  // Handle scrolling effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Services submenu
  const services = [
    { name: "Motor Insurance", path: "/motor-insurance" },
    { name: "Property Insurance", path: "/property-insurance" },
    { name: "Health Insurance", path: "/health-insurance" },
    { name: "Life Insurance", path: "/life-insurance" },
    { name: "Education Policy", path: "/education-policy" },
    { name: "Seniors Cover", path: "/seniors-cover" },
    { name: "WIBA", path: "/wiba" },
    { name: "Travel Insurance", path: "/travel-insurance" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 font-outfit ${
        scrolled ? "bg-white shadow-md py-2" : "bg-transparent py-3 lg:py-4"
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center z-50">
            <span
              className={`text-2xl font-black font-lexend ${
                scrolled ? "text-primary-900" : "text-white"
              }`}
            >
              LAKO
              <span
                className={
                  scrolled ? "text-secondary-500" : "text-secondary-400"
                }
              >
                .
              </span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            <NavLink to="/" label="Home" scrolled={scrolled} />
            <NavLink to="/about" label="About Us" scrolled={scrolled} />

            {/* Services Dropdown */}
            <div className="relative group">
              <button
                className={`px-4 py-2 rounded-lg group flex items-center ${
                  scrolled
                    ? "text-neutral-700 hover:text-primary-600 hover:bg-neutral-100"
                    : "text-white/90 hover:text-white hover:bg-white/10"
                } transition-colors`}
                onClick={() => setServicesOpen(!servicesOpen)}
              >
                Insurance
                <TbChevronDown
                  className={`ml-1 h-4 w-4 transition-transform duration-200 ${
                    servicesOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div className="absolute left-0 mt-2 w-60 rounded-xl bg-white shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-left">
                <div className="p-2">
                  {services.map((service) => (
                    <Link
                      key={service.path}
                      to={service.path}
                      className="block px-4 py-2 rounded-lg text-neutral-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                    >
                      {service.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <NavLink to="/faqs" label="FAQs" scrolled={scrolled} />
            <NavLink to="/contact" label="Contact" scrolled={scrolled} />
          </nav>

          {/* Action Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            <Link
              to="/compare"
              className="px-5 py-2 bg-secondary-500 text-white rounded-lg hover:bg-secondary-600 transition-colors shadow-md hover:shadow-lg"
            >
              Compare Plans
            </Link>
            <Link
              to="/contact"
              className={`px-5 py-2 rounded-lg transition-colors shadow-md hover:shadow-lg flex items-center ${
                scrolled
                  ? "bg-primary-600 text-white hover:bg-primary-700"
                  : "bg-white text-primary-700 hover:bg-neutral-100"
              }`}
            >
              <TbPhone className="mr-2" />
              Get a Quote
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden z-50 p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <TbX
                className={`h-6 w-6 ${
                  scrolled ? "text-neutral-700" : "text-white"
                }`}
              />
            ) : (
              <TbMenu2
                className={`h-6 w-6 ${
                  scrolled ? "text-neutral-700" : "text-white"
                }`}
              />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden fixed inset-0 bg-primary-900 z-40 overflow-hidden"
          >
            <div className="container-custom pt-24 pb-8 h-full overflow-y-auto">
              <div className="space-y-5">
                <MobileNavLink to="/" label="Home" />
                <MobileNavLink to="/about" label="About Us" />

                {/* Mobile Services Dropdown */}
                <div>
                  <button
                    onClick={() => setServicesOpen(!servicesOpen)}
                    className="w-full flex justify-between items-center text-white/90 hover:text-white text-xl font-medium transition-colors py-1"
                  >
                    Insurance Services
                    <TbChevronDown
                      className={`transition-transform duration-200 ${
                        servicesOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {servicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="pl-4 pt-2 space-y-3"
                      >
                        {services.map((service) => (
                          <Link
                            key={service.path}
                            to={service.path}
                            className="block text-white/70 hover:text-white transition-colors"
                          >
                            {service.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <MobileNavLink to="/faqs" label="FAQs" />
                <MobileNavLink to="/contact" label="Contact" />

                <div className="pt-2 space-y-4">
                  <Link
                    to="/compare"
                    className="block w-full py-3 bg-secondary-500 text-white text-center rounded-lg hover:bg-secondary-600 transition-colors shadow-md hover:shadow-lg"
                  >
                    Compare Plans
                  </Link>
                  <Link
                    to="/contact"
                    className="block w-full py-3 bg-white text-primary-700 text-center rounded-lg hover:bg-neutral-100 transition-colors shadow-md hover:shadow-lg flex items-center justify-center"
                  >
                    <TbPhone className="mr-2" />
                    Get a Quote
                  </Link>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <p className="text-white/70 mb-2">Need help?</p>
                  <a
                    href="tel:+254720636363"
                    className="text-white text-lg font-medium hover:text-secondary-400 transition-colors"
                  >
                    +254 720 636363
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

// Desktop nav link component
const NavLink = ({ to, label, scrolled }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`px-4 py-2 rounded-lg ${
        isActive
          ? scrolled
            ? "text-primary-600 bg-primary-50"
            : "text-white bg-white/10"
          : scrolled
          ? "text-neutral-700 hover:text-primary-600 hover:bg-neutral-100"
          : "text-white/90 hover:text-white hover:bg-white/10"
      } transition-colors`}
    >
      {label}
    </Link>
  );
};

// Mobile nav link component
const MobileNavLink = ({ to, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`block text-xl font-medium py-1 ${
        isActive ? "text-white" : "text-white/90 hover:text-white"
      } transition-colors`}
    >
      {label}
    </Link>
  );
};

export default Navigation;
